# YouTube Downloader

A simple web application to download YouTube videos using Node.js, Express, and the `ytdl-core` library.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Basic knowledge of command-line usage.

## Installation

1. **Clone the repository** (if you have a repository, otherwise create a project directory):
    ```sh
    git clone https://github.com/yourusername/youtube-downloader.git
    cd youtube-downloader
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Usage

1. **Start the server**:
    ```sh
    node server.js
    ```

2. **Open your browser and navigate to**: [http://localhost:3000](http://localhost:3000)

3. **Enter the YouTube Video URL** and click "Show Preview".

4. **Select video quality** from the dropdown menu.

5. **Click "Download"** to download the video after previewing it.

## Important Considerations

- **Legal Compliance**: Ensure that you comply with YouTube's terms of service and copyright laws. Downloading videos from YouTube without permission can be illegal and against YouTube's policies.
- **API Limits**: Be aware of any usage limits imposed by the `ytdl-core` library and YouTube's API.
- **Error Handling**: The script provided is basic and may need additional error handling for production use.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
