let tempData="";
var playlist_id;

function getDuration(duration){
    var hourRegex = new RegExp("[0-9]{1,2}H", "gi");
    var minRegex = new RegExp("[0-9]{1,2}M", "gi");
    var secRegex = new RegExp("[0-9]{1,2}S", "gi");
    
    var hour = hourRegex.exec(duration);
    var min = minRegex.exec(duration);
    var sec = secRegex.exec(duration);
    
    if(hour!==null){
        hour = hour.toString().split("H")[0] + ":";
    }else{
        hour = "";
    }
    if(min !==null){
        min = min.toString().split("M")[0];
        if(min.length<2){
        min = "0"+min;
    }
    }else{
        min = "00";
    }
    if(sec !==null){
        sec = sec.toString().split("S")[0];
        if(sec.length<2){
        sec = "0"+sec;
    }
    }else{
        sec = "00";
    }
    duration = hour+min+":"+sec;
    
    return duration;
}

function getVideo(vid){
    //let duration = getDuration(item.contentDetails.duration);

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/youtube/v3/videos",
        data : {"key":"AIzaSyBnTgWWE0hOJKYooTahPdejU3LWBh2Ja4s",
        "part": "contentDetails",
        "id":vid
        },
        contentType: "application/json",
        success: function (jd) {
            let {items} = jd;
            for(item of items){
                console.log(item.contentDetails.duration)
                tempData += `<th>${item.snippet.resourceId.videoId}</th>
                </tr>`     
            }
        },
        error: function (xhr, status, error) {
            console.log("유튜브 요청 에러: " + error);
        }
    });
}

function getYouTube(playlistId) {
    let genreDiv = $('#genre_div');
    let genres = $('.genres')

    for (var i=0;i<genres.length; i++){
        genres[i].style.display = 'none';
    }

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        data : {"key":"AIzaSyBnTgWWE0hOJKYooTahPdejU3LWBh2Ja4s",
        "part":"snippet",
        "playlistId": playlistId,
        "maxResults":50
        },
        contentType: "application/json",
        success: function (jd) {
            let {items} = jd;
            $("#playall").append('<i class="fa fa-play-circle playall" id="playall" aria-hidden="true"> 전체 재생</i>');
            $(function(){
                document.getElementById("playall").onclick = () =>{
                    playlistAll(playlist_id);
                }
            })
            tempData+='<div class="genre"><table>';
            for(item of items){                
                // getVideo(item.snippet.resourceId.videoId);
                tempData += `
                <tr>
                <th><img src="${item.snippet.thumbnails.high.url}"></th>
                <th>${item.snippet.title}</th>
                <th>${item.snippet.videoOwnerChannelTitle}</th>
                `;
                getVideo(item.snippet.videoId);
            }
            tempData+='</table></div>'
            
            genreDiv.append(tempData); 
        },
        error: function (xhr, status, error) {
            console.log("유튜브 요청 에러: " + error);
        }
    });
}

$(function(){
    document.getElementById("hiphop").onclick = () => {
        playlist_id = "PLetgZKHHaF-Zq1Abh-ZGC4liPd_CV3Uo4";
        getYouTube(playlist_id);
    }
    document.getElementById("rock").onclick = () => {
        playlist_id = "PLTC7VQ12-9rZRMqzpt9t69WxbcBBcMA5N";
        getYouTube(playlist_id);
    }
    document.getElementById("pop").onclick = () => {
        playlist_id = "PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10";
        getYouTube(playlist_id);
    }
})

