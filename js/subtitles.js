let subtitles = [];
let subsEnabled = true;

function loadSubtitles(path) {
    fetch(path)
        .then(r => r.text())
        .then(parseSRT)
        .then(d => subtitles = d);
}

function parseSRT(data) {
    return data.replace(/\r/g, '')
        .trim()
        .split(/\n\n+/)
        .map(block => {
            const lines = block.split('\n');
            if (lines.length < 2) return null;

            const [start, end] = lines[1].split(' --> ').map(toSec);
            return { start, end, text: lines.slice(2).join(' ') };
        })
        .filter(Boolean);
}

function toSec(t) {
    const [h, m, s] = t.replace(',', '.').split(':');
    return h * 3600 + m * 60 + parseFloat(s);
}

function updateSubs() {
    const box = document.getElementById('subs');

    if (!ytPlayer?.getCurrentTime || !subsEnabled || subtitles.length === 0) {
        box.classList.add('hidden');
        return;
    }

    const t = ytPlayer.getCurrentTime();
    const line = subtitles.find(s => t >= s.start && t <= s.end);

    if (!line) {
        box.classList.add('hidden');
        return;
    }

    box.textContent = line.text;
    box.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('toggleCC')?.addEventListener("change", e => {
        subsEnabled = e.target.checked;
        if (!subsEnabled) document.getElementById('subs').classList.add('hidden');
    });
});