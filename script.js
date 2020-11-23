tinymce.init({
    selector: '#mytextarea',
    plugins: 'lists',
<<<<<<< HEAD
    toolbar: 'undo redo | styleselect | bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent',
=======
    toolbar: 'SaveButton|undo redo | styleselect | bold italic|PrintDoc | DeleteButton | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent',

    height: 800,
    
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

    
>>>>>>> Pathum_branch
  });

let mytextArea = document.getElementById("mytextarea");
let myForm = document.getElementById("myForm");
let currentKey;
let leftCanvas = document.getElementById("leftCanvas");
let subjectEl = document.getElementById("subjectTextfieldId");
let edit = false; // to check whether it is an edit or new note when saving 

document.getElementById("saveBtn").addEventListener("click", saveNote);
document.getElementById("clearLocalStorage").addEventListener("click", clearLocalStorage);

document.addEventListener("DOMContentLoaded", function() {
    pageOnLoadFunction();
  });




function fetchLocalStorageLastKey(){
    //check browser support
    if(typeof(Storage) !== "undefined"){
<<<<<<< HEAD
        currentKey = localStorage.length + 1;
        console.log("Current key: "+currentKey);
=======
        currentKey = localStorage.length;
>>>>>>> Pathum_branch
        return true;
    }

}

function saveNote(){
<<<<<<< HEAD

    console.log(mytextArea);
    if(fetchLocalStorageLastKey()){
        var myContent = tinymce.get("mytextarea").getContent();
        console.log(myContent)
        localStorage.setItem(currentKey, myContent);
=======
    let today = new Date();
    let myContent = tinymce.get("mytextarea").getContent();
    let obj = {};
    if(myContent!=''){
            if(fetchLocalStorageLastKey()){
                obj['id'] = localStorage.length;
                obj['note'] = myContent;
                obj['date'] = today;
                obj['favorite'] = true;
                obj['subject'] = subjectEl.value;
    
                localStorage.setItem(currentKey, JSON.stringify(obj));
                displaySavedNoteElement(obj);  //Display saved note in left panel
                tinymce.get("mytextarea").setContent("");
                subjectEl.value = "";
            }
        

    }else{
        alert("Text area is empty, fill the text area before save!")
>>>>>>> Pathum_branch
    }
    
}

//Read localStorage and display in left panel
function pageOnLoadFunction(){

    let div;
    let p;
    let h1;

<<<<<<< HEAD
    for(let i=1; i <= localStorage.length;i++){
        console.log("Item: "+i+"is"+ localStorage[i]);
=======
    for(let i=1; i < localStorage.length;i++){
        if(localStorage.key !== 0){
            
            div = document.createElement('div');
            div.id = i;
            //div.innerText = JSON.parse(localStorage.getItem(i)).time;
            div.className = 'divTag';
>>>>>>> Pathum_branch

            p = document.createElement('p');
            let objNote = JSON.parse(localStorage.getItem(i))
            p.innerHTML = objNote.subject; 

            div.appendChild(p);

        
            div.addEventListener("click", function(){onClickDiv(event,this)},true);

            leftCanvas.appendChild(div);
        }
        
        
    }


}

function onClickDiv(event){

    let edit = true;

    let clickedDiv = event.target.closest('div');
    if (!clickedDiv) {
        return;
    }
    /* var clickedID = clickedLI.getAttribute('data-id'); */

    console.log("ID: "+clickedDiv.id);
    console.log("Clicked DIV: : "+clickedDiv.tagName);
    //get Clicked Id's note doc from localStorage
    let objNote = JSON.parse(localStorage.getItem(clickedDiv.id));
    console.log(JSON.parse(localStorage.getItem(clickedDiv.id)));

    /* tinymce.get("mytextarea").setContent(event.target.innerHTML); */
    console.log(objNote.note);
    tinymce.get("mytextarea").setContent(objNote.note);
    subjectEl.value = objNote.subject;
}

function clearLocalStorage(){
    localStorage.clear();
}

<<<<<<< HEAD
=======
//Display saved note element direct after saving wihtout loading it from the localStorage
function displaySavedNoteElement(obj){
    div = document.createElement('div');
    div.className = 'divTag';
    div.id = localStorage.length-1;  // Key 0 is to "check user har varit" , to remove that id use -1
    p = document.createElement('p');
    p.innerHTML = obj.subject;   //.subject
    div.appendChild(p);
    div.addEventListener("click", function(){onClickDiv(event,this)},true);

    leftCanvas.appendChild(div);
} 

function stringCompare(str1,str2){
    return  string1.localeCompare(string2);
}


/* var user = JSON.parse(localStorage.getItem('user')); */
>>>>>>> Pathum_branch
