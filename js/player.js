// var players = document.getElementById("player"); //audio
var players = document.getElementById("coverimg"); //audio
let progress = document.getElementById("progress"); //bar
let playbtn = document.getElementById("playbtn");
let prebtn = document.getElementById("prebtn");
let nextbtn = document.getElementById("nextbtn");
let volume = document.getElementById("volume");
let volControl = document.getElementById("myRange").value;
let rptbtn = document.getElementById("rptbtn");
let randbtn = document.getElementById("randbtn");

var maxTime;



//youtube API 불러오는 부분
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function audioPlayerInit(){
    // 공통사항 
	// : 타이머중지, 재생버튼으로 초기화, 볼륨버튼 초기화, 재생시간 초기화
    //stopAudioTimer();
   
    //togglePlay();
    //togglePlay($(".audio-control-btn.btn-mute"));
    $(".progress-bar #current").text('00:00');
    $(".progress-bar #end").text('00:00');
    $(".progress-bar #progress").width(0);
    //$(".volume-bar").slider({'value' : '70'});
    
}

//플레이어 변수 설정
var player;
function onYouTubeIframeAPIReady() {
    audioPlayerInit();
    player = new YT.Player(players, {
        height : '100',
        width: '100',
        //width&height를 설정할 수 있으나, 따로 css영역으로 뺐다.
        //videoId: playlist[idxOfPlaylist],
        //'M7lc1UVf-VE',
        playerVars: {
            listType:'playlist',
            // width: 0,
            // height: 0,
            autoplay: 1,         		// 자동재생 false
            controls: 0,         		// 컨트롤러 false
            fs:0,
            loop: 1,             		// 반복재생 true
            list: 'PLX0hwC_zw_t-r0XT_dmIHyDBTniU-_hQO',  		// 단일 영상 반복재생을 위해 동일한 ID를 넣는다. 
        },
        events: {
        'onReady': onPlayerReady,//로딩중에 이벤트 실행한다
        'onStateChange': onPlayerStateChange, //플레이어 상태 변화 시 이벤트를 실행한다.
        }
    });
}

function onPlayerReady(event) {
//로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것등등...)
    //event.target.playVideo();//자동재생
    var audio_info = event.target.getVideoData();
    if(audio_info.title != '') {
        // togglePlay();
        //$(".audio_modal_wrap").remove();
        // 제목 넣기
        $(".album-info .title").replaceWith('<span class="title">'+audio_info.title+'</span>')
        //$(".album-info .title").replaceWith('<marquee class="title" behavior="scroll" direction="left" scrollamount="3">'+audio_info.title+'</marquee>');
        //$(".album-info .chTitle").replaceWith(audio_info.videoOwnerChannelTitle);
        //$("#coverimg").replaceWith('<img id = "coverimg" src='+ audio_info.thumbnails+'>');
        // 재생시간 출력
        maxTime = Math.floor(event.target.getDuration());
        var duration = timeFormat(maxTime);
        // 볼륨 설정
        player.setVolume(volControl);
        $(".progress-bar #end").text(duration);
     } 
    //else {
    // // 동영상 정보를 얻을 수 없을 경우
    //     $(".audio-title-wrap").empty().append('<span id="audio-title"> 제목</span>');
    // }
}

function onPlayerStateChange(event) {
    togglePlay(event.data);
    if (event.data == YT.PlayerState.PLAYING) {
    	// 재생중
        resetting();
        //startAudioTimer(); // 오디오 재생시 타이머 시작, 재생바 진행, 재생시간 시작
    } else if(event.data == YT.PlayerState.PAUSED) {
    	// 일시정지
        stopAudioTimer(); // 오디오 재생시 타이머 중지
    } 
}

function togglePlay() {

    if(player.getPlayerState() == YT.PlayerState.PAUSED){
        playbtn.classList.remove("fa-pause-circle");
        playbtn.classList.add("fa-play-circle");
    }
    else if(player.getPlayerState() == YT.PlayerState.PLAYING){
        playbtn.classList.remove("fa-play-circle");
        playbtn.classList.add("fa-pause-circle");
    }
}


function toggleMute() {
    if(volume.classList.contains('fa-volume-up')){
        volume.classList.add('fa-volume-off');
        volume.classList.remove('fa-volume-up');
        player.mute();

    }else{
        volume.classList.add("fa-volume-up");
        player.unMute();
    }
}

function controlVolume(){
    volControl = document.getElementById("myRange").value;
    player.setVolume(volControl);
}

var resetting = function(){
    maxTime = Math.floor(player.getDuration());
    var duration = timeFormat(maxTime);
    $(".progress-bar #progress").width(0);
    $(".progress-bar #end").text(duration);
    startAudioTimer();
    $(".album-info .title").replaceWith('<span class="title">'+player.getVideoData().title+'</span>')

}

var playpause = function(){
    if(playbtn.classList.contains('fa-pause-circle')){
        player.pauseVideo();
    }
    else if(playbtn.classList.contains('fa-play-circle')){
        player.playVideo();
    }
    
}

var playpre = function(){
    player.previousVideo();
    resetting();    
}

var playnext = function(){
    player.nextVideo();
    resetting();
}

var replay = function(){
    player.seekTo(0, true);
}

var rd = false;
var shuffleList = function(){
    //player.setShuffle(true);
    if(!rd){
        rd = true;
        randbtn.style.color='orangered';
        player.setShuffle(true);
    }
    else{
        rd = false;
        randbtn.style.color="white";
        player.setShuffle(false);
    }
   // randbtn.style.color="orangered";
    
}

prebtn.addEventListener("click", playpre);
playbtn.addEventListener("click", playpause);
nextbtn.addEventListener("click", playnext);
volume.addEventListener("click", toggleMute);
rptbtn.addEventListener("click", replay);
if(randbtn){
    randbtn.addEventListener('click', shuffleList,false);
}

// random.addEventListener("click", shuffle);



function startAudioTimer(){
    //플레이어가 재생중일때 실시간재생 시간을 초단위로 출력
    var progressBar = $(".progress-bar #progress");
    var progress_val = 0;	// 재생 progress bar 값
    var playtime = 0;		// 재생 시간
    audioTimer = setInterval(function(){  
        currentTime = Math.floor(player.getCurrentTime());
        playtime = timeFormat(Math.floor(player.getCurrentTime()));
        // 가져온 현재 재생시간을 progress bar에 표기하기위해 currentTime가공
        // 재생 완료를 100으로 잡고 현재 재생시간을 계산
        // 소수점 첫번째 자리까지 계산
        progress_val = (currentTime/maxTime)*100;
        progress_val = progress_val.toFixed(1);
        $(".progress-bar #current").text(playtime);
        progressBar.css('width', progress_val+"%");
    }, 1000);
}


function stopAudioTimer(){
    clearInterval(audioTimer);
    $(".progress-bar #progress").css('width',0);
}

function timeFormat(ct){
    minutes=Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if(seconds < 10){
        seconds = "0" + seconds;    }

    return minutes + ":" + seconds;
}
