//När sidan laddas kollar vi om besökaren besökt sidan tidigare
document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });

let popUp = document.querySelector('.button-bg'); 

function pageOnLoad(){
    if (localStorage.length === 0){
    
        popUp.classList.add('bg-active');
        localStorage.setItem(0,"varit");
    }
    else {
        popUp.classList.add('button-bg');

    }
}

//När man klickar på X knappen i popupen försvinner rutan
var xButton = document.querySelector('.x-close'); 

xButton.addEventListener('click', function() {
    popUp.classList.remove('bg-active');
});

