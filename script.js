tinymce.init({
    selector: '#mytextarea',
    plugins: 'lists',
    toolbar: 'undo redo | styleselect | bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent',
  });

let mytextArea = document.getElementById("mytextarea");
let myForm = document.getElementById("myForm");
let currentKey;

document.getElementById("saveBtn").addEventListener("click", saveNote);
document.getElementById("clearLocalStorage").addEventListener("click", clearLocalStorage);

document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });


function fetchLocalStorageLastKey(){
    //check browser support
    if(typeof(Storage) !== "undefined"){
        currentKey = localStorage.length + 1;
        console.log("Current key: "+currentKey);
        return true;
    }

}

function saveNote(){

    console.log(mytextArea);
    if(fetchLocalStorageLastKey()){
        var myContent = tinymce.get("mytextarea").getContent();
        console.log(myContent)
        localStorage.setItem(currentKey, myContent);
    }
    
}

//Read localStorage and display in left panel
function pageOnLoad(){

    

    let div;
    let leftCanvas = document.getElementById("leftCanvas");
    let p;
    let h1;

    for(let i=1; i <= localStorage.length;i++){
        console.log("Item: "+i+"is"+ localStorage[i]);

        div = document.createElement('div');
        div.id = i;
        //div.innerText = JSON.parse(localStorage.getItem(i)).time;
        div.className = 'divTag';

        p = document.createElement('p');
        /* p.innerHTML = JSON.parse(localStorage.getItem(i)); */ 
        p.innerHTML = localStorage.getItem(i); 

        div.appendChild(p);

    
        div.addEventListener("click", function(){onClickDiv(event,this)},true);

        leftCanvas.appendChild(div);
        


        
    }


}

function onClickDiv(event){
    tinymce.get("mytextarea").setContent(event.target.innerHTML);
}

function clearLocalStorage(){
    localStorage.clear();
}

