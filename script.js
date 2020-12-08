tinymce.init({
    selector: '#mytextarea',
    placeholder: 'Write something...',
    /* plugins:'image lists print', */
    plugins: 'lists print quickbars image',
    menubar: false,
    toolbar: false,
    quickbars_selection_toolbar: ' formatselect | bold italic underline',
    quickbars_insert_toolbar: 'quickimage',
    /* toolbar_location: 'bottom', */
    contextmenu: 'link image print',
    /* contextmenu: 'print | bold italic customItem1 numlist customItem2 | nesteditem wordcount quickbars ', */

    content_style: "body { margin: 14%; }",

    


    //To removed the warning notification "This domain is not registered with TinyMCE Cloud. Start...."
    init_instance_callback : function(mytextarea) {
        var freeTiny = document.querySelector('.tox .tox-notification--in');
       freeTiny.style.display = 'none';
       
      },

    //////////////////Added custom save button and Print btn
    setup: function (mytextarea) {
        
        //*************context menu items */



        mytextarea.ui.registry.addContextToolbar('imageselection', {
            predicate: function(node) {
              return node.nodeName === 'P';
            },
            items: 'quicklink',
            position: 'node',
            quickbars_selection_toolbar: 'bold italic | formatselect |  blockquote | print'
          });

        /* mytextarea.ui.registry.addMenuItem('customItem1', {
            text: 'Menu Item 1',
            context: 'tools',
            items: 'image',
            onAction: function () {
                alert('Menu item 1 clicked');
            }
        }); */
/* 
        mytextarea.ui.registry.addMenuItem('customItem2', {
            text: 'Menu Item 2',
            context: 'tools',
            menu: [ {
                text: "Sub-menu item 1",
                onAction: function () {
                    alert('Sub-menu item 1');
                }
            }, {
                text: "Sub-menu item 2",
                onAction: function () {
                    alert('Sub-menu item 2');
                }
            }]
        });
        

        mytextarea.ui.registry.addNestedMenuItem('nesteditem', {
            text: 'My nested menu item',
            getSubmenuItems: function () {
              return [
                {
                  type: 'menuitem',
                  icon: 'new-document',
                  text: 'My submenu item',
                  onAction: function () {
                    mytextarea.insertContent('<p>Here\'s some content inserted from a submenu item!</p>');
                  }
                }
              ];
            }
          }); */


          /* mytextarea.ui.registry.addContextToolbar('textalignment', {
            /* predicate: function (node) {
                return mytextarea.dom.getParent(node, '.myclass') !== null;
            }, 
            items: 'alignleft aligncenter alignright styleselect New',
            position: 'selection',
            scope: 'node'
          }); */
      
          /* mytextarea.ui.registry.addToggleMenuItem('toggleitem', {
            text: 'My toggle menu item',
            onAction: function () {
              toggleState = !toggleState;
              mytextarea.insertContent('<p class="toggle-item">Here\'s some content inserted from a toggle menu!</p>');
            },
            onSetup: function (api) {
              api.setActive(toggleState);
              return function () {};
            }
          }); */
         




          /* mytextarea.ui.registry.addContextToolbar('imagealignment', {
            predicate: function (node) {
                return node.nodeName.toLowerCase() === 'img'
            },
            items: 'alignleft aligncenter alignright print',
            position: 'node',
            scope: 'node'
          }); */

          mytextarea.ui.registry.addContextToolbar('textselection', {
            predicate: function (node) {
              return !mytextarea.selection.isCollapsed();
            },
            items: 'formatselect | bold italic underline | numlist bullist | image',
            position: 'selection',
            scope: 'node'
          });





        /////**************Menu Items */

        /* mytextarea.ui.registry.addButton('New', {
            icon: 'new-document',
            text: 'New',
            onAction: function () {
                newNote();
            }
        });

        mytextarea.ui.registry.addButton('SaveButton', {
            icon: 'save',
            text: 'Save',
            onAction: function () {
                saveNote(edit);
            }
        });

        mytextarea.ui.registry.addButton("PrintDoc", {
            icon: "print",
            onAction: function () {
                print();
            }
        });

        //delete note button
        mytextarea.ui.registry.addButton("DeleteButton", {
            icon: "remove",
            name: 'deleteBtn',
            onAction: function () {
                deleteNote();
            }
        });
 */



        /////////////////////////Menu when clicked dots*******


          /* mytextarea.ui.registry.addContextToolbar('textalignment', {
            predicate: function (node) {
                return mytextarea.dom.getParent(node, '.myclass') !== null;
            },
            items: 'alignleft aligncenter alignright styleselect New',
            position: 'node',
            scope: 'node'
          }); */
          
        /////////////////////////END Menu when clicked dots*******

    }


});

let mytextArea = document.getElementById("mytextarea");
let myForm = document.getElementById("myForm");
let currentKey;
let leftCanvas = document.getElementById("leftCanvas");
let subjectEl = document.getElementById("subjectTextfieldId");
let edit = false; // to check whether it is an edit or new note when saving
let clickedDiv;
let favToggle = document.getElementById("favToggle");



/* document.getElementById("toolsIcon").addEventListener("click", tools); */

//To update note
let globalTextContent;
let globalSubject;

//HUR TITELNS PLACEHOLDER FUNGERAR I DOKUMENTET
function dynamicTitle(){
    var titleText = "Title.."; 
    //default text after load 
    subjectEl.value = titleText;

    //on focus behaviour 
    subjectEl.onfocus = function() { 
        if (this.value == titleText){
            console.log("2");
        //clear text field 
            this.value = ''; }
        } 
    //on blur behaviour
    subjectEl.onblur = function() { 
        if (this.value == "") {
            console.log("3");
        //restore default text 
            this.value = titleText; }
        };
};

//Sidan laddas
document.addEventListener("DOMContentLoaded", function () {
    pageOnLoadFunction();
    dynamicTitle();
    initialize();
});


function initialize(){
    //Toolbar eventlisteners
    document.querySelector(".newNote").addEventListener("click",newNote);
    document.querySelector(".saveNote").addEventListener("click", function(){
        saveNote(edit);
    }); 
    document.querySelector(".deleteNote").addEventListener("click",deleteNote);

    document.getElementById("searchBar").addEventListener("input",searchNote);
}

function fetchLocalStorageLastKey() {
    //check browser support
    if (typeof (Storage) !== "undefined") {
        currentKey = localStorage.length;
        return true;
    }
}

function saveNote(edit) {

    let today = new Date();
    let myContent = tinymce.get("mytextarea").getContent();
    let obj = {};

    if (myContent != '' && subjectEl.value != '' && subjectEl.value != 'Title..') {
        if (!edit) {   //This block for new entries
            if (fetchLocalStorageLastKey()) {

                obj['id'] = localStorage.length;
                obj['note'] = myContent;
                obj['date'] = today.toLocaleDateString();
                obj['favorite'] = false;
                obj['subject'] = subjectEl.value;
                obj['delete'] = false;

                localStorage.setItem(currentKey, JSON.stringify(obj));
                displaySavedNoteElement(obj); //Display saved note in left panel
                tinymce.activeEditor.windowManager.alert("Successfully saved");
                clearInputFields();  // Clear the textarea and title

            } else { 
                tinymce.activeEditor.windowManager.alert('Object not found.!');
            }
        } else { //This block is for edit 

            if (myContent.localeCompare(JSON.parse(localStorage.getItem(clickedDiv.id)).note) === 0
                && subjectEl.value.localeCompare(JSON.parse(localStorage.getItem(clickedDiv.id)).subject) === 0 ) {
                newNote();  // If no changes, set new note
                tinymce.activeEditor.windowManager.alert('No changes to save');
                

            } else {
                //Textarea has changed, ask uset to create a new note
                globalSubject = document.getElementById("subjectTextfieldId").value;
                globalTextContent = tinyMCE.activeEditor.getContent();     //Set textarea content and subject as global, otherwise below line of code reset those values

                askToEditOrNew();  //Display a popup message to user to choose "Save changes" or "Create new note"

            }
        }

    } else {
        tinymce.activeEditor.windowManager.alert('Text area or/and title is empty..! Save error..!');
    }

    edit = false;


}


//Read localStorage and display in left panel
function pageOnLoadFunction() {

    let div;
    let p;

    for (let i = 1; i < localStorage.length; i++) {
        if (localStorage.key !== 0) {
            let objNote = JSON.parse(localStorage.getItem(i));
            if(objNote.delete === false){
                div = document.createElement('div');
                div.id = i;
                div.className = "divTag";

                p = document.createElement('p');
                
                p.innerHTML = objNote.subject;
                div.appendChild(p);
                let newStar = createStar();
                if(objNote.favorite){
                    div.classList.add('favorite');
                    newStar.setAttribute('src', './images/favstar.png');
                    newStar.setAttribute('alt', 'favorite button lit');
                };
                div.appendChild(newStar);


                pDate = document.createElement('p');
                pDate.innerHTML = objNote.date;   //.Date  .toLocaleDateString()
                pDate.className = 'pDate';
                div.appendChild(pDate);

                div.addEventListener("click", function () { onClickDiv(event) });

                leftCanvas.appendChild(div);
            }else{
                console.log("Deleted object");
            }
            
        }


    }
}

function onClickDiv(event) {
    edit = true;

    clickedDiv = event.target.closest("div");
    if (!clickedDiv) {
        return;
    }

    //get Clicked Id's note doc from localStorage
    let objNote = JSON.parse(localStorage.getItem(clickedDiv.id));
    tinymce.get("mytextarea").setContent(objNote.note);
    subjectEl.value = objNote.subject;
}

function deleteNote() {
    if(clickedDiv != undefined){
        tinymce.activeEditor.windowManager.confirm("Do you want to delete the note", function (s) {
            if (s){
                let obj = JSON.parse(localStorage.getItem(clickedDiv.id));
                if(obj){
                    obj['delete'] = true;
    
                    localStorage.setItem(clickedDiv.id, JSON.stringify(obj));
                    tinymce.activeEditor.windowManager.alert('Successfully deleted');
                    location.reload();
    
                }else{
                    tinymce.activeEditor.windowManager.alert('Object not found');
                }
    
            }
        });
    }else{
        tinymce.activeEditor.windowManager.alert('Please select a note to delete');
    }
    


}

//Display saved note element direct after saving wihtout loading it from the localStorage
function displaySavedNoteElement(obj) {
    div = document.createElement('div');
    div.className = 'divTag';
    div.id = localStorage.length - 1;  // Key 0 is to "check user har varit" , to remove that id use -1
    p = document.createElement('p');
    p.innerHTML = obj.subject;   //.subject;

    div.appendChild(p);
    let newStar = createStar();
    div.appendChild(newStar);

    pDate = document.createElement('p');
    pDate.innerHTML = obj.date;   //.Date
    pDate.className = 'pDate';
    div.appendChild(pDate);
    
    div.addEventListener("click", function () { onClickDiv(event) });

    leftCanvas.appendChild(div);
}

function updateRecord() {

    let today = new Date();
    let obj = JSON.parse(localStorage.getItem(clickedDiv.id));

    obj['note'] = globalTextContent;
    obj['date'] = today.toLocaleDateString();
    obj['subject'] = globalSubject;

    //Update the subject div in left panel
    clickedDiv.firstChild.innerText = globalSubject;
    localStorage.setItem(clickedDiv.id, JSON.stringify(obj));
    
    return true;
}

//Funktion som skapar en stjärna till en anteckning
function createStar() {
    let newStar = document.createElement('img');
    newStar.setAttribute('class', 'star');
    newStar.setAttribute('src', './images/star.png');
    newStar.setAttribute('alt', 'favorite button unlit');
    
    let favObj;

    newStar.addEventListener('click', function(e){
        let targetID = e.target.parentElement.getAttribute('id')
        favObj = JSON.parse(localStorage.getItem(targetID));

        if(e.target.parentElement.classList.contains("favorite")){
            newStar.setAttribute('src', './images/star.png');
            newStar.setAttribute('alt', 'favorite button unlit');
            e.target.parentElement.classList.remove('favorite');
            
            favObj.favorite = false;
        } else {
            newStar.setAttribute('src', './images/favstar.png');
            newStar.setAttribute('alt', 'favorite button lit');
            e.target.parentElement.classList.add('favorite');

            favObj.favorite = true;
        }
        
    localStorage.setItem(e.target.parentElement.getAttribute('id'), JSON.stringify(favObj));
    
    })

    return newStar;
}

favToggle.addEventListener('change', function(e){
    let leftCanvasChildren = leftCanvas.children;

    for (let i = 0; i < leftCanvasChildren.length; i++) {
        let leftCanvasChild = leftCanvasChildren[i];

        if(this.value === 'showFav') {
            if(!leftCanvasChild.classList.contains('favorite')) {
                leftCanvasChild.classList.add('hidden')
            }

        } else {
            leftCanvasChild.classList.remove('hidden')
        }
    }
})
    
function print(){
    tinymce.activeEditor.execCommand('mcePrint');
}

function newNote(){
    edit = false;
    clearInputFields();  // Clear the textarea and title
}


function askToEditOrNew(){
    tinymce.activeEditor.windowManager.open({
        title: 'Save changes or Create new', // The dialog's title - displayed in the dialog header
        body: {
          type: 'panel', // The root body type - a Panel or TabPanel
          items: [ // A list of panel components
            {
              type: 'htmlpanel', // A HTML panel component
              html: 'Do you want to save changes to the current note or create a new note.'
            }
          ]
        },
        buttons: [

            {
                type: 'custom',
                name: 'updateBtn',
                text: 'Save changes',
                primary: true,
            },
            {
                type: 'custom',
                name: 'createNewBtn',
                text: 'Create a new note',
                primary: true,
            },
            {
                type: 'cancel',
                name: 'cancel',
                text: 'Close Dialog'
            }

        ],

        onAction: function (instance, trigger) {

            if(trigger.name === 'updateBtn'){
                if(updateRecord()){
                    tinymce.activeEditor.windowManager.alert('Successfully saved changes');
                    clearInputFields();
                    
                }else{
                    tinymce.activeEditor.windowManager.alert('Save error..!');
                }
            }else if(trigger.name === 'createNewBtn'){
                saveNote(false);
            }

            // close the dialog
            instance.close();
        }



      });
}

function clearInputFields(){
    tinymce.get("mytextarea").setContent("");
    dynamicTitle();
}

/* function tools(){
    alert("Tools");
} */