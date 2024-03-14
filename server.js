const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

// Middleware to set CORS response headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // Allowed methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  ); // Allowed headers
  res.setHeader("Access-Control-Allow-Credentials", true); // Allow credentials
  next();
});

// Route to handle video download request
app.get("/download-video", async (req, res) => {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).send("Video URL is not provided.");
    }

    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
    const downloadLink = format.url;

    res.send(downloadLink);
  } catch (error) {
    console.error("Error getting download link:", error);
    res.status(500).send("An error occurred while getting the download link.");
  }
});

// Rota para lidar com a solicitação de download do vídeo
app.get("/download-video", async (req, res) => {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).send("URL do vídeo não fornecida.");
    }

    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });
    const downloadLink = format.url;

    res.send(downloadLink);
  } catch (error) {
    console.error("Erro ao obter o link de download:", error);
    res.status(500).send("Ocorreu um erro ao obter o link de download.");
  }
});
// Route to handle audio download request
app.get("/download-audio", async (req, res) => {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).send("Video URL is not provided.");
    }

    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
    });
    const downloadLink = audioFormat.url;

    res.send(downloadLink);
  } catch (error) {
    console.error("Error getting audio download link:", error);
    res
      .status(500)
      .send("An error occurred while getting the audio download link.");
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
