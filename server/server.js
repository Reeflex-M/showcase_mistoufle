/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(cors());

// Configuration Facebook
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID; 
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN; 

app.get("/api/facebook-posts", async (req, res) => {
  try {
    console.log("Attempting to fetch Facebook posts...");
    console.log("Using Page ID:", FACEBOOK_PAGE_ID);
    
    // Construire l'URL complète pour vérification
    const url = `https://graph.facebook.com/v21.0/${FACEBOOK_PAGE_ID}/posts`;
    const params = {
      access_token: FACEBOOK_ACCESS_TOKEN,
      fields: "message,created_time,full_picture,permalink_url,attachments{media,media_type,subattachments},reactions.summary(true),comments.summary(true),shares",
      limit: 10,
    };

    console.log("Request URL:", url);
    console.log("Request params:", {
      ...params,
      access_token: `${FACEBOOK_ACCESS_TOKEN.substring(0, 10)}...`, // Ne montrer que le début du token pour la sécurité
    });

    // Faire la requête
    const response = await axios.get(url, { params });

    // Si on arrive ici, la requête a réussi
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(response.data, null, 2));

    const posts = await Promise.all(
      response.data.data.map(async (post) => {
        let images = [];
        
        if (post.attachments && post.attachments.data) {
          const attachment = post.attachments.data[0];
          
          if (attachment.media_type === 'album' && attachment.subattachments) {
            images = attachment.subattachments.data.map(
              (subattachment) => subattachment.media.image.src
            );
          } else if (attachment.media && attachment.media.image) {
            images = [attachment.media.image.src];
          }
        } else if (post.full_picture) {
          images = [post.full_picture];
        }

        return {
          id: post.id,
          text: post.message || "",
          images: images,
          date: new Date(post.created_time).toLocaleDateString("fr-FR", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          link: post.permalink_url,
          reactions: post.reactions?.summary?.total_count || 0,
          comments: post.comments?.summary?.total_count || 0,
          shares: post.shares?.count || 0
        };
      })
    );

    res.json(posts);
  } catch (error) {
    console.error("Error fetching Facebook posts:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch Facebook posts",
      details: error.response?.data?.error?.message || error.message,
    });
  }
});

// Route de test pour vérifier le token Facebook
app.get("/api/facebook-test", async (req, res) => {
  try {
    console.log("Testing Facebook token...");
    
    // 1. D'abord, vérifions le token lui-même
    const debugTokenResponse = await axios.get(
      `https://graph.facebook.com/v21.0/debug_token`,
      {
        params: {
          input_token: FACEBOOK_ACCESS_TOKEN,
          access_token: FACEBOOK_ACCESS_TOKEN
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

const PORT = process.env.PORT || 3002; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
