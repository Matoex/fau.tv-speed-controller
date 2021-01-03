let video;
let targetVideoSpeed = 1;

function urlUpdate() {
    let index = location.href.indexOf("clip");
    browser.runtime.sendMessage({ "message": "inactivate_icon" });
    video = undefined;
    if (index != -1) {
        let intervalHandler;
        function findVideo() {
            video = document.getElementsByTagName("video")[0];
            if (video !== undefined) {
                clearInterval(intervalHandler);
                browser.runtime.sendMessage({ "message": "activate_icon" });
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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
            browser.runtime.sendMessage({ "message": "current speed", "speed": video.playbackRate });
            clearInterval(intervalHandler);
        }, 100);
    }
    else if (message.message == "get video url") {
        let intervalHandler = setInterval(() => {
            if (video === undefined) return;
            var videourl = video.src;
            if (videourl.startsWith("http")) {
                inject('sessionStorage.setItem("videourl", document.getElementsByTagName("video")[0].src);');
                browser.runtime.sendMessage({ "message": "current videourl", "videourl": sessionStorage.getItem("videourl") });
            } else if (videourl.startsWith("blob:")) {
                inject('if(typeof combinedSources != "undefined"){sessionStorage.setItem("videourl", combinedSources[0].sources[0].file);}else{sessionStorage.setItem("videourl", cameraSources[0].sources[0].file);}');
                browser.runtime.sendMessage({ "message": "current videourl", "videourl": sessionStorage.getItem("videourl") });
            }
            clearInterval(intervalHandler);
        }, 100);
    }
    else if (message.message == "open new Tab") {
        if (message.videourl.includes(".m3u8")) {
            if (window.confirm("The downloaded File is not a playable video. Do you want to downlaod the video anyway? If it does not download a video file, you can try to copy the video url and open it e.g. in VLC Media player as a Networkstream")) {
                window.open(message.videourl, '_blank');
            }
        }
        window.open(message.videourl, '_blank');
    }
});

function inject(source) {
    const j = document.createElement('script'),
        f = document.getElementsByTagName('script')[0];
    j.textContent = source;
    f.parentNode.insertBefore(j, f);
    f.parentNode.removeChild(j);
}