var volume = document.getElementById("volume");

var mute = function(){
    if(volume.classList.contains('fa-volume-up')){
        volume.classList.add('fa-volume-off');
        volume.classList.remove('fa-volume-up');
    }else{
        volume.classList.add("fa-volume-up");
    }
}

volume.addEventListener("click", mute);