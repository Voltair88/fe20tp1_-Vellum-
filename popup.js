//När sidan laddas kollar vi om besökaren besökt sidan tidigare
document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });

let popUp = document.querySelector('.background-popup'); 

function pageOnLoad(){
    if (localStorage.length === 0){
    
        popUp.classList.add('background-active');
        localStorage.setItem(0,"beenHere");
    }
    else {
        popUp.classList.add('background-popup');

    }
}

//När man klickar på X knappen i popupen försvinner rutan
var xButton = document.querySelector('.x-close'); 

xButton.addEventListener('click', function() {
    popUp.classList.remove('background-active');
});

