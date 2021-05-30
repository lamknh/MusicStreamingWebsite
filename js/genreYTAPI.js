let tempData="";
var playlist_id;

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
                tempData += `
                <tr class="youtubeId" id="${item.snippet.resourceId.videoId}">
                <th><img src="${item.snippet.thumbnails.high.url}"></th>
                <th>${item.snippet.title}</th>
                <th>${item.snippet.videoOwnerChannelTitle}</th>
                `;
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
        playlist_id = "PL6Lt9p1lIRZ311J9ZHuzkR5A3xesae2pk";
        getYouTube(playlist_id);
    }
    document.getElementById("pop").onclick = () => {
        playlist_id = "PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10";
        getYouTube(playlist_id);
    }

    $(document).on('click', '.youtubeId', function(){
        onClick($(this).attr('id'));
    })
})

