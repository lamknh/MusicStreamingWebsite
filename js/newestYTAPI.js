function getYouTube() {
    let albumDiv = $('#album_div');
        
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/youtube/v3/search",
        data : {"key":"AIzaSyBnTgWWE0hOJKYooTahPdejU3LWBh2Ja4s",
        "part":"snippet","maxResults":50,"q":"officalmusicvideo"},
        contentType: "application/json",
        success: function (jd) {
            let {items} = jd;
            let tempData="";

            tempData+='<div class="albums"><table>';
            for(item of items){                
                tempData += `
                <tr class="youtubeId" id="${item.snippet.resourceId.videoId}">
                <th><img src="${item.snippet.thumbnails.high.url}"></th>
                <th><span class="title">${item.snippet.title}</span></th>
                <th><span>${item.snippet.channelTitle}</span></th>
                </tr>`;
            }
            tempData+='</table></div>'
            
            console.log(tempData);
            albumDiv.append(tempData); 
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