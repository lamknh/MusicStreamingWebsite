var player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

var playpause = function(){
    if(player.paused){
        player.play();
    }else{
        player.pause();
    }
}

playbtn.addEventListener("click", playpause);

player.onplay = function(){
    playbtn.classList.remove("fa-play-circle");
    playbtn.classList.add("fa-pause-circle");
}

player.onpause = function(){
    playbtn.classList.add("fa-play-circle");
    playbtn.classList.remove("fa-pause-circle");
}

player.ontimeupdate = function(){
    let ct = player.currentTime;
    current.innerHTML=timeFormat(ct);

    let duration = player.duration;
    prog = Math.floor((ct * 100)/duration);
    progress.style.setProperty("--progress", prog+"%");
}

function timeFormat(ct){
    minutes=Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if(seconds < 10){
        seconds = "0" + seconds;    }

    return minutes + ":" + seconds;
}