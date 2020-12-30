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
            console.log(video.playbackRate)
            chrome.runtime.sendMessage({ "message": "current speed", "speed": video.playbackRate });
            clearInterval(intervalHandler);
        }, 100);
    }
});