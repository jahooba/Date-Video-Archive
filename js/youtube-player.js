let ytPlayer;
let isPlayerReady = false;
let pendingVideo = null;

function onYouTubeIframeAPIReady() {
    console.log("YouTube API ready");

    ytPlayer = new YT.Player('yt-frame', {
        width: '100%',
        height: '100%',
        playerVars: { playsinline: 1 },
        events: {
            onReady: () => {
                console.log("Player ready");
                isPlayerReady = true;

                if (pendingVideo) {
                    ytPlayer.loadVideoById(pendingVideo);
                    pendingVideo = null;
                }
            }
        }
    });

    setInterval(updateSubs, 120);
}

function loadYouTubeVideo(videoId) {
    if (!isPlayerReady) {
        console.warn("Queueing video...");
        pendingVideo = videoId;
        return;
    }

    ytPlayer.loadVideoById(videoId);
}