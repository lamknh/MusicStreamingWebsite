var heart = document.getElementById("heart-icon");

var changeColor = function(){
    if(heart.classList.contains('fa-heart')){
        heart.classList.toggle('fa-heart-o');
    }else{
        heart.classList.add("fa-heart");
    }
}

heart.addEventListener("click", changeColor);
