const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/facebook-posts", async (req, res) => {
  console.log("Received request for Facebook posts");
  let browser = null;
  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: false, // Changement temporaire pour debug
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-notifications",
        "--start-maximized",
        "--disable-web-security",
      ],
    });

    console.log("Creating new page...");
    const page = await browser.newPage();

    // Augmenter le timeout de navigation
    page.setDefaultNavigationTimeout(180000);
    await page.setViewport({ width: 1280, height: 800 });

    // Navigation vers la page avec attente plus longue
    await page.goto("https://www.facebook.com/kitpoupuille", {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    // Attendre que le contenu principal soit chargé
    await page.waitForSelector('div[role="main"]', { timeout: 60000 });

    // Scroll plus lent et plus long
    for (let i = 0; i < 15; i++) {
      console.log(`Scroll iteration ${i + 1}/15`);
      await page.evaluate(() => {
        window.scrollBy(0, 500);
      });
      await page.waitForTimeout(1500);
    }

    // Nouveaux sélecteurs plus précis
    const posts = await page.evaluate(() => {
      const postElements = Array.from(
        document.querySelectorAll('div[role="article"]')
      );
      console.log("Nombre de posts trouvés:", postElements.length);

      return postElements
        .map((post) => {
          // Extraction du texte avec plus de sélecteurs
          const textSelectors = [
            'div[data-ad-comet-preview="message"]',
            'div[data-ad-preview="message"]',
            ".x1iorvi4",
            ".xdj266r",
            'div[dir="auto"]',
          ];

          let textContent = "";
          for (const selector of textSelectors) {
            const elements = post.querySelectorAll(selector);
            elements.forEach((el) => {
              const text = el.textContent.trim();
              if (text && text.length > 10 && !textContent.includes(text)) {
                textContent += text + "\n";
              }
            });
          }

          // Extraction des images avec meilleur filtre
          const images = Array.from(post.querySelectorAll("img"))
            .filter((img) => {
              const src = img.src || "";
              return (
                src.includes("facebook.com") && // Images Facebook
                src.length > 100 && // Éviter les petites images
                !src.includes("emoji") &&
                !src.includes("avatar")
              );
            })
            .map((img) => img.src);

          // Extraction du lien et de la date
          const link =
            post.querySelector('a[href*="/posts/"], a[href*="/photos/"]')
              ?.href || "";
          const dateElement = post.querySelector('a[role="link"] span');
          const date = dateElement
            ? dateElement.textContent
            : new Date().toLocaleDateString();

          console.log("Post extrait:", { textContent, images, date, link });

          return {
            text: textContent.trim(),
            images,
            date,
            link,
          };
        })
        .filter((post) => {
          return (
            (post.text || post.images.length > 0) &&
            !post.text.includes("a partagé") &&
            !post.text.includes("vous invite")
          );
        });
    });
    console.log(`Successfully extracted ${posts.length} posts`, posts);

    await browser.close();
    res.json(posts);
  } catch (error) {
    console.error("Scraping error:", error);
    if (browser) {
      await browser.close();
    }
    res.status(500).json({
      error: "Failed to scrape Facebook posts",
      details: error.message,
      stack: error.stack,
    });
  }
});

// Helper function to scroll the page
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight || totalHeight > 20000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

const PORT = process.env.PORT || 3001; // Changer le port à 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
