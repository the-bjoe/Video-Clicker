var button = document.getElementById("button");
var text = document.getElementById("text");
var input = document.getElementById("urlInput");
var video = document.getElementById("video");
var clickAmount = 0;
var savedClickAmount = clickAmount;
var stoppingVideo = false;
var videoPlaying = false;
var inputSplit = [];
var savedInput = "";
var newInput = "";

window.addEventListener("load", Start);
window.addEventListener("keydown", KeyDown);

function Start() {
    setTimeout(LateStart, 50);
    window.requestAnimationFrame(Loop);
}

function LateStart() {
    button = document.getElementById("button");
    text = document.getElementById("text");
    input = document.getElementById("urlInput");
    video = document.getElementById("video");
}

function Loop() {
   Update();
   window.requestAnimationFrame(Loop);
}

var color = [0, 0, 0];
var changedColor = false;
function Update() {
    // pauses and unpauses the video
    if (video != null) {
        if (videoPlaying) {
            video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            if (!stoppingVideo) {
                setTimeout(StopVideo, 200);
                savedClickAmount = clickAmount;
                stoppingVideo = true;
            }
        }
        else if (!videoPlaying) {
            video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }
    if (text != null) {
        text.innerHTML = clickAmount;
    }
    if (input != savedInput) {
        newInput = "";
    }
    if (input != null && video != null) {
    }
}

function KeyDown(event) {
    if (event.code == "Enter") {
        SubmitClick();
    }
}

function ButtonClick() {
    clickAmount++;
    videoPlaying = true;
}

function SubmitClick() {
    var urlCode = "";
    var splitByAnd = input.value.split("&");
    var splitByEqual = input.value.split("=");
    var splitBySlash = input.value.split("/");

    // turns youtube link into embed link
    while (splitByAnd[1] != undefined) {
        splitByAnd.pop();
        splitByEqual = splitByAnd.join().split("=");
    }
    if (splitByEqual[1] != undefined) {
        urlCode = splitByEqual[1];
    }
    else {
        urlCode = splitBySlash[splitBySlash.length - 1];
    }

    newInput = "https://www.youtube-nocookie.com/embed/" + urlCode + "?controls=0&enablejsapi=1&rel=0&disablekb=1&modestbranding=1";
    try {
        video.src = newInput;
    }
    catch (error) {
        video.src = "";
    }
}

function StopVideo() {
    stoppingVideo = false;
    if (clickAmount == savedClickAmount) {
        videoPlaying = false;
    }
}