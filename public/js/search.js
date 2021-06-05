var searchValue;

function search_input() {
    var sv = document.getElementById("searchtext").value;
    searchValue = encodeURI(sv);
    location.href = "/search?"+searchValue;
}


function sgetYouTube() {
    var url = decodeURI(location.href);
    var search = url.slice(url.indexOf('?') + 1, url.length);
    let albumDiv = $('#searchlist');
    let result = $('#searchresult');
    result.append("'"+search+"'에 대한 검색 결과입니다");
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/youtube/v3/search",
        data : {"key":"AIzaSyBnTgWWE0hOJKYooTahPdejU3LWBh2Ja4s",
        "part":"snippet",
        "maxResults":50,
        "q":search
    },  //"kakao"를 search로 변경해야함.
        contentType: "application/json",
        success: function (jd) {
            let {items} = jd;
            let tempData="";

            tempData+='<div class="albums"><table>';
            for(item of items){                
                tempData += `
                <tr class="youtubeId" id="${item.id.videoId}">
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
  sgetYouTube();

  $(document).on('click', '.youtubeId', function(){
      onClick($(this).attr('id'));
  })
})