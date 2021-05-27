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
        "playlistId": "PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m",
        "maxResults":50
        },
        contentType: "application/json",
        success: function (jd) {
            let tempData="";
            let {items} = jd;
            tempData+='<div class="genre"><table>';
            for(item of items){                
                // getVideo(item.snippet.resourceId.videoId);
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
    getYouTube();

    $(document).on('click', '.youtubeId', function(){
        onClick($(this).attr('id'));
    })
})