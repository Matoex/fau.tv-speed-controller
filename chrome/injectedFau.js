let video;
let targetVideoSpeed = 1;

function urlUpdate() {
    let index = location.href.indexOf("clip");
    chrome.runtime.sendMessage({ "message": "inactivate_icon" });
    video = undefined;
    if (index != -1) {
        let intervalHandler;
        function findVideo() {
            video = document.getElementsByTagName("video")[0];
            if (video !== undefined) {
                clearInterval(intervalHandler);
                chrome.runtime.sendMessage({ "message": "activate_icon" });
                video.playbackRate = targetVideoSpeed;
                let videoVar = video;
                video.addEventListener("play", () => {
                    videoVar.playbackRate = targetVideoSpeed;
                });
            }
        }
        intervalHandler = setInterval(findVideo, 1000);
        findVideo();
    }
}

{
    let lastURL;
    function verityURL() {
        if (location.href != lastURL) {
            urlUpdate();
            lastURL = location.href;
        }
    }
    setInterval(verityURL, 1000);
    verityURL();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message == "set playback speed") {
        let speed = message.speed;
        if (speed > 16 || speed < 0) {
            console.log(`invalid speed ${speed}`);
            return;
        }
        targetVideoSpeed = speed;
        video.playbackRate = speed;
    }
    else if (message.message == "get playback speed") {
        let intervalHandler = setInterval(() => {
            if (video === undefined) return;
            chrome.runtime.sendMessage({ "message": "current speed", "speed": video.playbackRate });
            clearInterval(intervalHandler);
        }, 100);
    }
    else if (message.message == "get video url") {
        let intervalHandler = setInterval(() => {
            if (video === undefined) return;
            var videourl = video.src;
            if (videourl.startsWith("http")) {
                inject("copyToClipboard(document.getElementsByTagName('video')[0].src);function copyToClipboard(str){ const el = document.createElement('textarea'); el.value = str;el.setAttribute('readonly', ''); el.style.position = 'absolute';   el.style.left = '-9999px'; document.body.appendChild(el); el.select(); document.execCommand('copy');document.body.removeChild(el); } alert('Video URL got copied to your clipboard')");
            } else if (videourl.startsWith("blob:")) {
                inject("copyToClipboard(combinedSources[0].sources[0].file);function copyToClipboard(str){ const el = document.createElement('textarea'); el.value = str;el.setAttribute('readonly', ''); el.style.position = 'absolute';   el.style.left = '-9999px'; document.body.appendChild(el); el.select(); document.execCommand('copy');document.body.removeChild(el); } alert('Video URL got copied to your clipboard')");
            }

            clearInterval(intervalHandler);
        }, 100);
    }
    else if (message.message == "open new Tab") {
        let intervalHandler = setInterval(() => {
            if (video === undefined) return;
            var videourl = video.src;
            if (videourl.startsWith("http")) {

                inject("window.open(document.getElementsByTagName('video')[0].src, '_blank');")
            } else if (videourl.startsWith("blob:")) {
                inject("if (window.confirm('The downloaded File is not a playable video. Do you want to downlaod the video anyway? If it does not download a video file, you can try to copy the video url and open it e.g. in VLC Media player as a Networkstream')){window.open(combinedSources[0].sources[0].file, '_blank');}");
            }

            clearInterval(intervalHandler);
        }, 100);
    }
});

function inject(source) {
    const j = document.createElement('script'),
        f = document.getElementsByTagName('script')[0];
    j.textContent = source;
    f.parentNode.insertBefore(j, f);
    f.parentNode.removeChild(j);
}