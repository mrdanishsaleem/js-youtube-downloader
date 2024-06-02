const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/info", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    res.json(info);
  } catch (error) {
    res.status(500).send("Failed to retrieve video info");
  }
});

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  const quality = req.query.quality;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  const videoID = ytdl.getURLVideoID(videoURL);
  const info = await ytdl.getInfo(videoID);
  const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

  res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
  ytdl(videoURL, { quality }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
