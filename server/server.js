const express = require("express");
const cors = require("cors");
const axios = require('axios');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());

// Configuration Facebook
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
let FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// Fonction pour sauvegarder le token dans le fichier .env
async function updateEnvFile(newToken) {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = await fs.readFile(envPath, 'utf-8');
    const updatedContent = envContent.replace(
      /FACEBOOK_ACCESS_TOKEN=.*/,
      `FACEBOOK_ACCESS_TOKEN=${newToken}`
    );
    await fs.writeFile(envPath, updatedContent);
    console.log('Token updated in .env file');
  } catch (error) {
    console.error('Error updating .env file:', error);
  }
}

// Fonction pour renouveler automatiquement le token
async function refreshLongLivedToken() {
  try {
    console.log("Checking Facebook token status...");
    const appAccessToken = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;
    
    console.log("Debugging token with params:", {
      input_token: `${FACEBOOK_ACCESS_TOKEN.substring(0, 10)}...`,
      access_token: `${appAccessToken.substring(0, 10)}...`
    });

    const debugResponse = await axios.get(
      `https://graph.facebook.com/v21.0/debug_token`,
      {
        params: {
          input_token: FACEBOOK_ACCESS_TOKEN,
          access_token: appAccessToken
        }
      }
    );

    console.log("Debug response:", debugResponse.data);

    const expiresAt = debugResponse.data.data.expires_at;
    const now = Math.floor(Date.now() / 1000);
    const daysUntilExpiration = Math.floor((expiresAt - now) / (60 * 60 * 24));

    // Si le token expire dans moins de 7 jours, on le renouvelle
    if (daysUntilExpiration < 7) {
      console.log("Token expires soon, refreshing...");
      console.log("Refreshing token with params:", {
        grant_type: 'fb_exchange_token',
        client_id: FACEBOOK_APP_ID,
        client_secret: `${FACEBOOK_APP_SECRET.substring(0, 5)}...`,
        fb_exchange_token: `${FACEBOOK_ACCESS_TOKEN.substring(0, 10)}...`
      });

      const response = await axios.get(
        'https://graph.facebook.com/v21.0/oauth/access_token',
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: FACEBOOK_APP_ID,
            client_secret: FACEBOOK_APP_SECRET,
            fb_exchange_token: FACEBOOK_ACCESS_TOKEN
          }
        }
      );

      FACEBOOK_ACCESS_TOKEN = response.data.access_token;
      console.log("Token refreshed successfully");
      
      // Sauvegarder le nouveau token dans le fichier .env
      await updateEnvFile(FACEBOOK_ACCESS_TOKEN);
    }
  } catch (error) {
    console.error("Error refreshing Facebook token:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      error: error.response?.data?.error || error.message
    });
  }
}

// Vérifier le token toutes les 24 heures
setInterval(refreshLongLivedToken, 24 * 60 * 60 * 1000);
// Vérifier le token au démarrage du serveur
refreshLongLivedToken();

// Cache par catégorie
const cache = {
  chien: { data: null, lastFetch: null },
  chat: { data: null, lastFetch: null },
  chaton: { data: null, lastFetch: null },
  evenement: { data: null, lastFetch: null }
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const POSTS_PER_PAGE = 10;

async function fetchFacebookPosts(category) {
  const url = `https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}/posts`;
  const params = {
    access_token: FACEBOOK_ACCESS_TOKEN,
    fields: "message,created_time,full_picture,attachments{media,media_type,subattachments}",
    limit: 50  // Réduit à 20 au lieu de 100 pour les événements
  };

  const response = await axios.get(url, { params });

  // Filtrer les posts par catégorie et transformer les données
  const filteredPosts = response.data.data
    .filter(post => {
      if (!post.message) return false;
      const message = post.message.toLowerCase();
      const hashtag = `#${category.toLowerCase()}`;
      // Vérifier si le hashtag est présent comme un mot entier
      return message.split(/\s+/).includes(hashtag);
    })
    .map(post => {
      let images = [];

      if (post.attachments?.data) {
        const attachment = post.attachments.data[0];
        if (attachment.media_type === 'album' && attachment.subattachments) {
          images = attachment.subattachments.data.map(
            sub => sub.media.image.src
          );
        } else if (attachment.media?.image) {
          images = [attachment.media.image.src];
        }
      } else if (post.full_picture) {
        images = [post.full_picture];
      }

      return {
        id: post.id,
        text: post.message,
        images,
        date: new Date(post.created_time).toLocaleDateString("fr-FR", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
    });

  return filteredPosts;
}

app.get("/api/facebook-posts", async (req, res) => {
  try {
    const { category = 'chien', page = 1 } = req.query;
    const pageNum = parseInt(page);
    const now = Date.now();

    // Vérifier le cache pour cette catégorie
    if (cache[category]?.data && (now - cache[category].lastFetch < CACHE_DURATION)) {
      console.log(`Returning cached posts for ${category}`);
      const start = (pageNum - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      return res.json({
        posts: cache[category].data.slice(start, end),
        hasMore: end < cache[category].data.length,
        total: cache[category].data.length
      });
    }

    console.log(`Fetching new posts for ${category}`);
    const posts = await fetchFacebookPosts(category);
    cache[category] = {
      data: posts,
      lastFetch: now
    };

    const start = (pageNum - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    res.json({
      posts: posts.slice(start, end),
      hasMore: end < posts.length,
      total: posts.length
    });

  } catch (error) {
    console.error("Error:", error.message);

    // En cas d'erreur, utiliser le cache même expiré
    const { category = 'chien', page = 1 } = req.query;
    const pageNum = parseInt(page);
    if (cache[category]?.data) {
      const start = (pageNum - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      return res.json({
        posts: cache[category].data.slice(start, end),
        hasMore: end < cache[category].data.length,
        total: cache[category].data.length,
        fromCache: true
      });
    }

    res.status(500).json({
      error: "Failed to fetch posts",
      details: error.message
    });
  }
});

// Route de test pour vérifier le token Facebook
app.get("/api/facebook-test", async (req, res) => {
  try {
    console.log("Testing Facebook token...");

    // 1. D'abord, vérifions le token lui-même
    const appAccessToken = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;
    const debugTokenResponse = await axios.get(
      `https://graph.facebook.com/v21.0/debug_token`,
      {
        params: {
          input_token: FACEBOOK_ACCESS_TOKEN,
          access_token: appAccessToken
        }
      }
    );

    console.log("Token debug info:", debugTokenResponse.data);

    // 2. Ensuite, essayons d'obtenir les informations de la page
    const pageResponse = await axios.get(
      `https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}`,
      {
        params: {
          access_token: FACEBOOK_ACCESS_TOKEN,
          fields: 'name,id,access_token'
        }
      }
    );

    console.log("Page info:", pageResponse.data);

    res.json({
      tokenInfo: debugTokenResponse.data,
      pageInfo: pageResponse.data
    });
  } catch (error) {
    console.error("Test error full response:", error.response?.data);
    res.status(500).json({
      error: "Token test failed",
      details: error.response?.data?.error || error.message,
      tokenUsed: `${FACEBOOK_ACCESS_TOKEN.substring(0, 10)}...`,
      pageId: FACEBOOK_PAGE_ID
    });
  }
});

// Route pour renouveler le token Facebook
app.get("/api/refresh-facebook-token", async (req, res) => {
  try {
    // Vérifier d'abord si le token actuel est proche de l'expiration
    const appAccessToken = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;
    const debugTokenResponse = await axios.get(
      `https://graph.facebook.com/v21.0/debug_token`,
      {
        params: {
          input_token: FACEBOOK_ACCESS_TOKEN,
          access_token: appAccessToken
        }
      }
    );

    const tokenData = debugTokenResponse.data.data;
    const expirationDate = new Date(tokenData.expires_at * 1000);
    const now = new Date();
    const daysUntilExpiration = Math.floor((expirationDate - now) / (1000 * 60 * 60 * 24));

    // Si le token expire dans moins de 7 jours, essayer de le renouveler
    if (daysUntilExpiration < 7) {
      // Obtenir un nouveau long-lived token
      const longLivedTokenResponse = await axios.get(
        'https://graph.facebook.com/v21.0/oauth/access_token',
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            fb_exchange_token: FACEBOOK_ACCESS_TOKEN
          }
        }
      );

      // Mettre à jour le token en mémoire et dans le fichier
      FACEBOOK_ACCESS_TOKEN = longLivedTokenResponse.data.access_token;
      await updateEnvFile(FACEBOOK_ACCESS_TOKEN);

      res.json({
        status: 'Token renewed',
        newToken: `${longLivedTokenResponse.data.access_token.substring(0, 10)}...`,
        expiresIn: longLivedTokenResponse.data.expires_in
      });
    } else {
      res.json({
        status: 'Token still valid',
        daysUntilExpiration,
        tokenInfo: {
          ...tokenData,
          access_token: `${FACEBOOK_ACCESS_TOKEN.substring(0, 10)}...`
        }
      });
    }
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to refresh token',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Fonction pour récupérer les albums Facebook avec pagination
async function fetchFacebookAlbums() {
  try {
    let allAlbums = [];
    let nextPage = `https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}/albums?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=name,cover_photo{source},count,created_time,description&limit=100`;

    while (nextPage) {
      const response = await axios.get(nextPage);
      const { data } = response.data;
      allAlbums = [...allAlbums, ...data];
      
      // Vérifier s'il y a une page suivante
      nextPage = response.data.paging?.next || null;
    }

    return allAlbums;
  } catch (error) {
    console.error("Error fetching Facebook albums:", error);
    throw error;
  }
}

// Endpoint pour récupérer les albums
app.get("/api/facebook-albums", async (req, res) => {
  try {
    const albums = await fetchFacebookAlbums();
    res.json({ albums });
  } catch (error) {
    console.error("Error in /api/facebook-albums:", error);
    res.status(500).json({ 
      error: "Erreur lors de la récupération des albums",
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
