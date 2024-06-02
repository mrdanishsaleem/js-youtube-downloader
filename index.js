const ytdl = require("ytdl-core");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the YouTube video URL: ", (url) => {
  if (ytdl.validateURL(url)) {
    const videoID = ytdl.getURLVideoID(url);
    ytdl.getInfo(videoID).then((info) => {
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
      const filePath = `./${title}.mp4`;
      const videoStream = ytdl(url, { quality: "highest" });

      videoStream.pipe(fs.createWriteStream(filePath));
      videoStream.on("end", () => {
        console.log(`Downloaded: ${title}`);
        rl.close();
      });
    });
  } else {
    console.log("Invalid YouTube URL");
    rl.close();
  }
});
