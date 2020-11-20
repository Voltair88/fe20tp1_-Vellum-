tinymce.init({
    selector: '#mytextarea',
    plugins: 'lists',
    toolbar: 'SaveButton|undo redo | styleselect | bold italic|PrintDoc | DeleteButton | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent',
    


    

//////////////////Added custom save button and Print btn
    setup: function(mytextarea) {
    
        mytextarea.ui.registry.addButton('SaveButton', {
            icon: 'save',
            text: 'Save',
            onAction: function () {
                saveNote();
            }
          });

        mytextarea.ui.registry.addButton('PrintDoc', {
            icon: 'print',
            onAction: function () {
              alert('Wait..Print function is not implemented yet!');
            }
          });

        //Clear local storage
        mytextarea.ui.registry.addButton('DeleteButton', {
            icon: 'remove',
            text: 'Delete all',
            onAction: function () {
                clearLocalStorage();
            }
          });

      }
          

        
////////////////////

    
  });

let mytextArea = document.getElementById("mytextarea");
let myForm = document.getElementById("myForm");
let currentKey;


document.addEventListener("DOMContentLoaded", function() {
    pageOnLoad();
  });


function fetchLocalStorageLastKey(){
    //check browser support
    if(typeof(Storage) !== "undefined"){
        currentKey = localStorage.length + 1;
        return true;
    }

}

function saveNote(){

    let myContent = tinymce.get("mytextarea").getContent();
    if(myContent!=''){
        if(fetchLocalStorageLastKey()){
            localStorage.setItem(currentKey, myContent);
            displaySavedNoteElement(myContent);  //Display saved note in left panel
        }
    }else{
        alert("Text area is empty, fill the text area before save!")
    }
    
    
}

//Read localStorage and display in left panel
function pageOnLoad(){

    

    let div;
    let leftCanvas = document.getElementById("leftCanvas");
    let p;
    let h1;

    for(let i=1; i <= localStorage.length;i++){

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

//Display saved note element direct after saving wihtout loading it from the localStorage
function displaySavedNoteElement(myContent){
    div = document.createElement('div');
    div.className = 'divTag';
    p = document.createElement('p');
    p.innerHTML = myContent; 
    div.appendChild(p);
    div.addEventListener("click", function(){onClickDiv(event,this)},true);

    leftCanvas.appendChild(div);
}  
