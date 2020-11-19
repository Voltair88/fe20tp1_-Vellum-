document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });


let popUp = document.querySelector('.button-bg'); 


function pageOnLoad(){
    if (localStorage.length === 0){
    
        popUp.classList.add('bg-active');
        localStorage.setItem('key',"varit");
    }
    else {
        popUp.classList.add('button-bg');

    }
}


