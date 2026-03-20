let videoArchive = [];

function loadVideoArchive() {
    fetch('data/video_archive.json')
        .then(r => r.json())
        .then(data => {
            videoArchive = data;
            renderVideoList(data);
        })
        .catch(err => console.error(err));
}

function playVideo(video) {
    document.getElementById('playerWrap').classList.remove('hidden');

    loadYouTubeVideo(video["video-id"]);
    loadSubtitles(video["subs-location"]);
}

document.addEventListener("DOMContentLoaded", loadVideoArchive);