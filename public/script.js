function showPreview() {
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

  fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoID}&format=json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch video information");
      }
      return response.json();
    })
    .then((data) => {
      const previewDiv = document.getElementById("preview");
      previewDiv.innerHTML = `<h3>${data.title}</h3><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      document.getElementById("downloadBtn").style.display = "inline-block";
    })
    .catch((error) => {
      alert(
        "Failed to load video preview. Please check the URL and try again."
      );
      console.error("Error:", error);
    });
}

function downloadVideo() {
  const url = document.getElementById("videoURL").value;
  window.location.href = `/download?url=${encodeURIComponent(url)}`;
}

function extractVideoID(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}
