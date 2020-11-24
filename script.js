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
let favToggle = document.getElementById("favToggle");


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
                obj['id'] = localStorage.length;
                obj['note'] = myContent;
                obj['date'] = today;
                obj['favorite'] = false;
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
            let newStar = createStar();
            div.appendChild(newStar);
            console.log(div);
        
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
    console.log(star);
    div = document.createElement('div');
    div.className = 'divTag';
    div.id = localStorage.length-1;  // Key 0 is to "check user har varit" , to remove that id use -1
    p = document.createElement('p');
    p.innerHTML = obj.subject;   //.subject;

    div.appendChild(p);
    let newStar = createStar();
    div.appendChild(newStar);
    div.addEventListener("click", function(){onClickDiv(event,this)},true);

    leftCanvas.appendChild(div);
} 

function updateRecord(){
    try{
        let obj = JSON.parse(localStorage.getItem(clickedDiv.id));
    
        obj['id'] = clickedDiv.id;
        obj['note'] = myContent;
        obj['date'] = today;
        obj['favorite'] = false;
        obj['subject'] = subjectEl.value;


        localStorage.setItem(JSON.stringify(clickedDiv.id), JSON.stringify(obj));

        return true;
    }catch(err){
        tinymce.activeEditor.windowManager.alert('Update error..!');
    }
    
    edit = false;
}

//Funktion som skapar en stjärna till en anteckning
function createStar() {
    let newStar = document.createElement('img');
    newStar.setAttribute('class', 'star');
    newStar.setAttribute('src', './images/star.png');
    newStar.setAttribute('alt', 'favorite button unlit');

    newStar .addEventListener('click', function(e){
        e.target.parentElement.classList.add('favorite')
        e.target.parentElement.appendChild(createFavStar());
        
        let favObj = JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute('id')));
        favObj.favorite = true;
        
        localStorage.setItem(e.target.parentElement.getAttribute('id'), JSON.stringify(favObj));
        e.target.parentElement.removeChild(e.target.parentElement.childNodes[1]);
    
    })

    return newStar;
}

//Funktion som skapar en favoritstjärna till en anteckning
function createFavStar() {
    let favStar = document.createElement('img');
    favStar.setAttribute('class', 'favstar');
    favStar.setAttribute('src', './images/favstar.png');
    favStar.setAttribute('alt', 'favorite button lit');

    favStar.addEventListener('click', function(e){
        e.target.parentElement.classList.remove('favorite')
        e.target.parentElement.appendChild(createStar());
    
        let unFavObj = JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute('id')));
        unFavObj.favorite = false;
        
        localStorage.setItem(e.target.parentElement.getAttribute('id'), JSON.stringify(unFavObj));
        e.target.parentElement.removeChild(e.target.parentElement.childNodes[1]);
    
    })

    return favStar;
}

favToggle.addEventListener('change', function(e){
    let leftCanvasChildren = leftCanvas.children;

    for (let i = 0; i < leftCanvasChildren.length; i++) {
        let leftCanvasChild = leftCanvasChildren[i];

        if(this.checked) {
            if(!leftCanvasChild.classList.contains('favorite')) {
                leftCanvasChild.classList.add('hidden')
            }

        } else {
            leftCanvasChild.classList.remove('hidden')
        }
    }
})
    
/* var user = JSON.parse(localStorage.getItem('user')); */
