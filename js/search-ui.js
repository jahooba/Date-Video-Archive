document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("videoSearch");
    const videoList = document.getElementById("videoList");

    function renderVideoList(videos) {
        videoList.innerHTML = "";

        videos.forEach(video => {
            const item = document.createElement("div");
            item.className = "video-item";
            item.textContent = video["date-title"];
            item.onclick = () => playVideo(video);
            videoList.appendChild(item);
        });
    }

    window.renderVideoList = renderVideoList;

    searchInput.addEventListener("input", e => {
        const query = e.target.value.toLowerCase();
        const filtered = videoArchive.filter(v =>
            v["date-title"].toLowerCase().includes(query)
        );
        renderVideoList(filtered);
    });
});