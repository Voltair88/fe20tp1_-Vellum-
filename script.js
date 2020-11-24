tinymce.init({
    selector: '#mytextarea',
    plugins: 'lists',
    toolbar: 'SaveButton|undo redo | styleselect | bold italic|PrintDoc | DeleteButton | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent',

    height: 800,
    
//////////////////Added custom save button and Print btn
    setup: function(mytextarea) {
    
        mytextarea.ui.registry.addButton('SaveButton', {
            icon: 'save',
            text: 'Save',
            onAction: function () {
                saveNote(edit);
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
let leftCanvas = document.getElementById("leftCanvas");
let subjectEl = document.getElementById("subjectTextfieldId");
let edit = false; // to check whether it is an edit or new note when saving 
let clickedDiv;


document.addEventListener("DOMContentLoaded", function() {
    pageOnLoadFunction();
  });




function fetchLocalStorageLastKey(){
    //check browser support
    if(typeof(Storage) !== "undefined"){
        currentKey = localStorage.length;
        return true;
    }

}

function saveNote(edit){

    let today = new Date();
    let myContent = tinymce.get("mytextarea").getContent();
    let obj = {};
    if(myContent != '' && subjectEl.value != ''){
        if(!edit){   //This block for new entries
            if(fetchLocalStorageLastKey()){
                console.log("SAVE");
                obj['id'] = localStorage.length;
                obj['note'] = myContent;
                obj['date'] = today;
                obj['favorite'] = true;
                obj['subject'] = subjectEl.value;
    
                localStorage.setItem(currentKey, JSON.stringify(obj));
                displaySavedNoteElement(obj);  //Display saved note in left panel
                tinymce.activeEditor.windowManager.alert('Successfully saved');
                tinymce.get("mytextarea").setContent("");
                subjectEl.value = "";
                
            }else{ //This block is for edit 
                
            }
        }else{

            if(myContent.localeCompare(JSON.parse(localStorage.getItem(clickedDiv.id)).note) === 0){
                tinymce.get("mytextarea").setContent("");
                subjectEl.value = "";
                tinymce.activeEditor.windowManager.alert('No changes to save');
                  
            }else{
                //Textarea has changed, ask uset to create a new note

                tinymce.activeEditor.windowManager.confirm("Do you want to save changes", function(s) {
                    if (s)
                        if(updateRecord()){
                            tinymce.activeEditor.windowManager.alert('Successfully saved');
                        }
                        else{
                            tinymce.activeEditor.windowManager.alert('Save error..!');
                        }
                    else{
                        tinymce.get("mytextarea").setContent("");
                        subjectEl.value = "";
                    }
                 });

                /* saveNote(false); */
                tinymce.get("mytextarea").setContent("");
                subjectEl.value = "";
            }

        }
        
    }else{
        tinymce.activeEditor.windowManager.alert('Text area or/and subject is empty..! Save error..!');
    }

    edit = false;

}

//Read localStorage and display in left panel
function pageOnLoadFunction(){

    let div;
    let p;
    let h1;

    for(let i=1; i < localStorage.length;i++){
        if(localStorage.key !== 0){
            
            div = document.createElement('div');
            div.id = i;
            //div.innerText = JSON.parse(localStorage.getItem(i)).time;
            div.className = 'divTag';

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

    edit = true;

    clickedDiv = event.target.closest('div');
    if (!clickedDiv) {
        return;
    }

    //get Clicked Id's note doc from localStorage
    let objNote = JSON.parse(localStorage.getItem(clickedDiv.id));
    tinymce.get("mytextarea").setContent(objNote.note);
    subjectEl.value = objNote.subject;
}

function clearLocalStorage(){
    localStorage.clear();
}

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

function updateRecord(){
    try{
        let obj = JSON.parse(localStorage.getItem(clickedDiv.id));
    
        obj['id'] = clickedDiv.id;
        obj['note'] = myContent;
        obj['date'] = today;
        obj['favorite'] = true;
        obj['subject'] = subjectEl.value;


        localStorage.setItem(JSON.stringify(clickedDiv.id), JSON.stringify(obj));

        return true;
    }catch(err){
        tinymce.activeEditor.windowManager.alert('Update error..!');
    }
    
    edit = false;
}


/* var user = JSON.parse(localStorage.getItem('user')); */
