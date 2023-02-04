// get access to the button 'add' and add a listener to it.
let buttonAddNote = document.getElementById("button_add_note");
buttonAddNote.addEventListener("click", addNote);

//get access to the div in which add HTML.
let notes = document.getElementById('all_notes');

// get access to the input in which note are entered and add a listener to it.
let note = document.getElementById('input_add_note');

function setFocus() {
    note.focus();
}

// create an array of odject item note

let arrNoteBox = JSON.parse(localStorage.getItem('notes'));

function addNote () {
    
   if (note.value !== "") {
    
    arrNoteBox.push({name: note.value, task_done: false, id: Date.now()});
   }
    // clear string input.
    note.value = "";
    
   
    insertTemplate(arrNoteBox)
}

let arrNoteBoxHTML = [];

function insertTemplate(arrNoteBox) {
    localStorage.setItem("notes", JSON.stringify(arrNoteBox))
    arrNoteBoxHTML = arrNoteBox.map((item)=> {
        return `
                <div class="note_box" id=${item.id}>
                    <div class="note ${item.task_done ? 'task_done' : ""}" >
                        <strong>${item.name}</strong> 
                    </div>
                    <div>
                        <div class="note_button">
                            <button type="button" class="button_done">✔️</button>
                        </div>
                        <div class="note_button">
                            <button type="button" class="button_del">✖️</button>
                        </div>
                    </div>    
                </div>
                `
    }) 

    notes.innerHTML = arrNoteBoxHTML.join('');
    
}

// get block all note button and add a listener to it.

notes.addEventListener('click', getEvent);

// function which started when push the button done or delete
function getEvent(event) {
    event.preventDefault();

    let target = event.target;
    
    let getNotebox = event.target.closest('.note_box');

    let getNoteboxID = event.target.closest('.note_box').id;
    
    if (target.className === "button_done") {
        changeStatusClass(getNoteboxID)
    } else if (target.className === "button_del") {
        deleteNotes(getNoteboxID)
    }
   
    insertTemplate(arrNoteBox)
}

function changeStatusClass(getNoteboxID) {
       
    arrNoteBox = arrNoteBox.map((item)=> {
        if(item.id === +getNoteboxID) {
            return {
                ...item,
                task_done:!item.task_done
            } 
        } 
        return item;
        
    })
         
}

 
function  deleteNotes(getNoteboxID) {

    // let youShure = confirm('Ви хочете видалити цю нотатку назавжди?');
    // if(youShure) arrNoteBox = arrNoteBox.filter((item)=> item.id !== +getNoteboxID);
    
   
    let trashBox = [];
    for (let i = 0; i < arrNoteBox.length; i++) {
        if (arrNoteBox[i].id === +getNoteboxID) trashBox = arrNoteBox.splice(i, 1);
    }

    changedTrashBox(trashBox);
}

function changedTrashBox(trashBox) {
    let divTrashBox = document.getElementById('trash_box_img');
    
    
    
    console.log(divTrashBox.src)
}

insertTemplate(arrNoteBox)
   




  





 











