let videoArchive = [];

function loadVideoArchive() {
    fetch('data/video_archive.json')
        .then(r => r.json())
        .then(data => {
            videoArchive = data;
            renderVideoList(data);
        });
}

function playVideo(video) {
    loadYouTubeVideo(video["embed-link"]);
    loadSubtitles(video["subs-location"]);
}