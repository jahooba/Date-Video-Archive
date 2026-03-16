let ytPlayer;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-frame', {
        events: {
            onReady: () => { loadVideoArchive(); }
        }
    });

    setInterval(updateSubs, 120);
}

function loadYouTubeVideo(embedLink) {
    if (!ytPlayer) {
        return;
    }

    const id = extractVideoId(embedLink);
    ytPlayer.loadVideoById(id);
}

function extractVideoId(url) {
    const match = url.match(/embed\/([^?]+)/);

    return match ? match[1] : null;
}