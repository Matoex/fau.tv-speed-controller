let video;
let targetVideoSpeed = 1;
let status;

function urlUpdate() {
    if (!!video) return;
    video = document.querySelector("video");
    let h5pIframeParent = document.querySelector("iframe.h5p-iframe");
    let h5pIframeDoc = h5pIframeParent?.contentDocument;

    if (!video && h5pIframeDoc) {
        video = h5pIframeDoc.querySelector("video");
        var iframe = document.getElementsByTagName('iframe')[0],
            iDoc = iframe.contentWindow     // sometimes glamorous naming of variable
                || iframe.contentDocument;  // makes your code working :)
        if (iDoc.document) {
            iDoc = iDoc.document;
            iDoc.body?.addEventListener('keyup', (e) => {
                onASDKeyListener(e);
            });
        };
    }
    if (video) {
        video.playbackRate = targetVideoSpeed;
        let videoVar = video;
        video.addEventListener("play", () => {
            videoVar.playbackRate = targetVideoSpeed;
        });
    }
    if (!status && !!video) {
        chrome.runtime.sendMessage({ "message": "activate_icon" });
        status = true;
        clearInterval(videoSearcher)
    } else if (!status) {
        chrome.runtime.sendMessage({ "message": "inactivate_icon" });
    }
}

urlUpdate();
var videoSearcher = setInterval(urlUpdate, 1000);

{
    document.addEventListener('keyup', (e) => {
        onASDKeyListener(e);
    });
}

function onASDKeyListener(e) {
    if (e.code === "KeyD") targetVideoSpeed += 0.25
    else if (e.code === "KeyA") targetVideoSpeed -= 0.25
    else if (e.code === "KeyS") targetVideoSpeed = 1;
    //  else if (e.code === "Space") video.paused ? video.play() : video.pause();;
    setVideoSpeed(targetVideoSpeed);

}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message == "set playback speed") {
        let speed = message.speed;
        setVideoSpeed(speed);
    } else if (message.message == "set playback speed up") {
        setVideoSpeed(targetVideoSpeed + 0.25);
    } else if (message.message == "set playback speed down") {
        setVideoSpeed(targetVideoSpeed - 0.25);
    } else if (message.message == "set playback speed one") {
        setVideoSpeed(1);
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
                inject("if(typeof combinedSources != 'undefined'){copyToClipboard(combinedSources[0].sources[0].file);}else{copyToClipboard(cameraSources[0].sources[0].file);}function copyToClipboard(str){ const el = document.createElement('textarea'); el.value = str;el.setAttribute('readonly', ''); el.style.position = 'absolute';   el.style.left = '-9999px'; document.body.appendChild(el); el.select(); document.execCommand('copy');document.body.removeChild(el); } alert('Video URL got copied to your clipboard')");
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
                inject("if (window.confirm('The downloaded File is not a playable video. Do you want to downlaod the video anyway? If it does not download a video file, you can try to copy the video url and open it e.g. in VLC Media player as a Networkstream')){if(typeof combinedSources != 'undefined'){window.open(combinedSources[0].sources[0].file, '_blank');}else{window.open(cameraSources [0].sources[0].file, '_blank');} }");
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

function setVideoSpeed(speed) {
    if (!video) return;
    if (speed > 16 || speed < 0) {
        console.log(`invalid speed ${speed}`);
        return;
    }
    targetVideoSpeed = speed;
    video.playbackRate = speed;
}