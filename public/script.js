async function showPreview() {
  const url = document.getElementById("videoURL").value;
  if (!url) {
    alert("Please enter a valid URL");
    return;
  }

  const videoID = extractVideoID(url);
  if (!videoID) {
    alert("Invalid YouTube URL");
    return;
  }

  try {
    const response = await fetch(`/info?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch video information");
    }

    const info = await response.json();
    const previewDiv = document.getElementById("preview");
    previewDiv.innerHTML = `<h3>${info.videoDetails.title}</h3><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    const qualityOptions = document.getElementById("quality");
    qualityOptions.innerHTML = "";
    info.formats.forEach((format) => {
      if (format.qualityLabel) {
        const option = document.createElement("option");
        option.value = format.itag;
        option.text = format.qualityLabel;
        qualityOptions.appendChild(option);
      }
    });

    document.getElementById("qualityOptions").style.display = "block";
    document.getElementById("downloadBtn").style.display = "inline-block";
  } catch (error) {
    alert("Failed to load video preview. Please check the URL and try again.");
    console.error("Error:", error);
  }
}

function downloadVideo() {
  const url = document.getElementById("videoURL").value;
  const quality = document.getElementById("quality").value;
  window.location.href = `/download?url=${encodeURIComponent(
    url
  )}&quality=${quality}`;
}

function extractVideoID(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}
