# YouTube Downloader

A simple Node.js application to download YouTube videos using the `ytdl-core` library.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic knowledge of command-line usage.

## Installation

1. **Clone the repository** (if you have a repository, otherwise create a project directory):
    ```sh
    git clone https://github.com/yourusername/youtube-downloader.git
    cd youtube-downloader
    ```

2. **Initialize the Node.js project**:
    ```sh
    npm init -y
    ```

3. **Install dependencies**:
    ```sh
    npm install ytdl-core
    ```

## Usage

1. **Create the main script file**:

    Create a file named `index.js` in your project directory and add the following code:

    ```javascript
    const ytdl = require('ytdl-core');
    const fs = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the YouTube video URL: ', (url) => {
        if (ytdl.validateURL(url)) {
            const videoID = ytdl.getURLVideoID(url);
            ytdl.getInfo(videoID).then(info => {
                const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
                const filePath = `./${title}.mp4`;
                const videoStream = ytdl(url, { quality: 'highest' });

                videoStream.pipe(fs.createWriteStream(filePath));
                videoStream.on('end', () => {
                    console.log(`Downloaded: ${title}`);
                    rl.close();
                });
            });
        } else {
            console.log('Invalid YouTube URL');
            rl.close();
        }
    });
    ```

2. **Run the script**:
    ```sh
    node index.js
    ```

3. **Input the YouTube Video URL** when prompted.

## Example

```sh
$ node index.js
Enter the YouTube video URL: https://www.youtube.com/watch?v=example
Downloaded: Example Video Title
