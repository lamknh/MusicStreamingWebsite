function getYouTube() {
    let albumDiv = $('#album_div');
        
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/youtube/v3/search",
        data : {"key":"AIzaSyBnTgWWE0hOJKYooTahPdejU3LWBh2Ja4s",
        "part":"snippet","maxResults":14,"q":"officalmusicvideo"},
        contentType: "application/json",
        success: function (jd) {
            let {items} = jd;
            let tempData="";
            
            items1 = items.slice(0, 4);
            items2 = items.slice(5, 9);
            items3 = items.slice(10);

            tempData+='<div class="albums">';
            for(item of items1){                
                tempData += `
                <div class="album">
                <img src="${item.snippet.thumbnails.high.url}">
                <span class="title">${item.snippet.title}</span>
                <span>${item.snippet.channelTitle}</span>
                </div>`;
            }
            tempData+='</div>'

            tempData+='<div class="albums">';
            for(item of items2){                
                tempData += `
                <div class="album">
                <img src="${item.snippet.thumbnails.high.url}">
                <span class="title">${item.snippet.title}</span>
                <span>${item.snippet.channelTitle}</span>
                </div>`;
            }
            tempData+='</div>'

            tempData+='<div class="albums">';
            for(item of items3){                
                tempData += `
                <div class="album">
                <img src="${item.snippet.thumbnails.high.url}">
                <span class="title">${item.snippet.title}</span>
                <span>${item.snippet.channelTitle}</span>
                </div>`;
            }
            tempData+='</div>'
            
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
})