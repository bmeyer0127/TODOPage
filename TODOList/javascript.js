/*
TODO:
- Create bigger text box to allow multiple entries per submission !DONE!
- Put each task in an individual box !DONE!
- Allow the ability to move the boxes to change prioritization !DONE!
- Do not allow submission if textbox is empty !DONE!
- Allow the ability to delete a task

BUGS:
- After clicking anywhere after clicking 'submit tasks', the dragged element 
    will take over both drag source and drag destination rather than switching
    information.
- Clicking anywhere on screen created a buildup of propagation
- Dragging the boxes takes away the functionality of remove button
*/

const taskList = [];
let idfk = false;

function addTask() {

    
    if (idfk) {
        document.getElementById('submitButton').removeEventListener('click', handleDragEnd(e));
        document.getElementById('submitButton').removeEventListener('click', handleDragEnter(e));
        document.getElementById('submitButton').removeEventListener('click', handleDragLeave(e));
        document.getElementById('submitButton').removeEventListener('click', handleDragOver(e));
        document.getElementById('submitButton').removeEventListener('click', handleDragStart(e));
        document.getElementById('submitButton').removeEventListener('click', handleDrop(e));
    }
    idfk = true;

    //Gathers input from text box

    let taskSubmission = document.getElementById('tasksWritten').value;

    if (taskSubmission.trim() == '') {
        alert('Empty String');
        return;
    }

    //Splits up multiple entires separarated by "\n"
    let lastTasksSubmittedParsed = taskSubmission.split('\n');

    // Loop to run through entries separated by "\n" and push each into taskList[]
    for(let currentSub = 0; currentSub < lastTasksSubmittedParsed.length; currentSub++) {
        taskList.push(lastTasksSubmittedParsed[currentSub]);
    }

    //Put each entry in a box
    for(let length = 0; length < lastTasksSubmittedParsed.length; length++) {
        createBox(lastTasksSubmittedParsed[length]);
    }
}

// For each task submission, this runs to create a new box with the task loaded in
let i = 1;
function createBox(task) {
    // Creates individual box and appends all necessary attributes
    let el = document.createElement('div');
    el.draggable = true;
    el.classList.add('box');
    el.innerHTML = task;
    el.id = "element";
    
    // Appends remove button onto each box
    let rmButton = document.createElement('button');
    rmButton.classList.add('remove');
    rmButton.id = ("rmButton");

    rmButton.onclick = removeTask.bind(this, el.innerHTML);
    
    rmButton.innerHTML = i;
    i++
    //rmButton.innerHTML = 'X';

    el.appendChild(rmButton);


    // Appends all children to taskBox div element
    const box = document.getElementById('taskBox');
    box.appendChild(el);

}

// Remove Task
function removeTask(task) {
    console.log("Removed: " + task);
}

// Drag and drop event listening
// Begins listening upon click
window.onload=function() {
    document.getElementById('submitButton').addEventListener('click', (event) => {
        event.stopPropagation();

        function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        console.log(document.getElementById("rmButton"));
        //console.log(dragSrcEl.innerHTML);
        //console.log(dragSrcEl.classList);
    }

        function handleDragEnd(e) {
            this.style.opacity = '1';

            items.forEach(function (item) {
                item.classList.remove('over');
        });
        }

        function handleDragOver(e) {
            e.preventDefault();
            return false;
        }

        function handleDragEnter(e) {
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {
            e.stopPropagation(); //stops the browser from redirecting

            if (dragSrcEl !== this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }

            return false;
        }

        let items = document.querySelectorAll('.box');
        items.forEach(function(item) {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragenter', handleDragEnter);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('drop', handleDrop);
        });
    });
}