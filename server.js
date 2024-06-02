const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  const videoID = ytdl.getURLVideoID(videoURL);
  const info = await ytdl.getInfo(videoID);
  const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
  const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

  res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
  ytdl(videoURL, { format }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
