/*
TODO:
- Create bigger text box to allow multiple entries per submission !DONE!
- Put each task in an individual box !DONE!
- Allow the ability to move the boxes to change prioritization
*/

const taskList = [];

function addTask() {
    taskSubmission = document.getElementById("tasksWritten").value;

    //Splits up multiple entires separarated by "\n"
    let lastTasksSubmittedParsed = taskSubmission.split("\n");

    // Loop to run through entries separated by "\n" and push each into taskList[]
    for(let currentSub = 0; currentSub < lastTasksSubmittedParsed.length; currentSub++) {
        taskList.push(lastTasksSubmittedParsed[currentSub]);
    }

    // taskListDisplay is overwritten with each submission (not ideal)
    // This loop goes through all of taskList and appends each submission to taskListDisplay
    let taskListDisplay = "";
    for(let length = 0; length < taskList.length; length++) {
        taskListDisplay += taskList[length] + "<br>";
    }

    //Put each entry in a box
    let newTask = taskList[taskList.length - 1];
    for(let length = 0; length < lastTasksSubmittedParsed.length; length++) {
        createBox(lastTasksSubmittedParsed[length]);
    }
}

// For each task submission, this runs to create a new box with the task loaded in
// !!! DragSrcEl is currently not recieving any information from created boxes
function createBox(task) {
    const div = document.createElement("div");
    div.draggable = true;
    div.classList.add('box');
    let newTaskDisplay = document.createTextNode(task);
    div.appendChild(newTaskDisplay);

    const element = document.getElementById("taskBox");
    document.body.appendChild(div);
    element.appendChild(div);

    console.log("element innerHTMl " +element.innerHTML);

    
}

// Drag and drop event listening
document.addEventListener("DOMContentLoaded", (event) => {
    function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
    console.log(dragSrcEl.innerHTML);
}

    function handleDragEnd (e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove("over");
    });
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add("over");
    }

    function handleDragLeave(e) {
        this.classList.remove("over");
    }

    function handleDrop(e) {
        e.stopPropagation(); //stops the browser from redirecting

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData("text/html");
        }

        return false;
    }

    let items = document.querySelectorAll('.box');
    items.forEach(function(item) {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("dragenter", handleDragEnter);
        item.addEventListener("dragleave", handleDragLeave);
        item.addEventListener("dragend", handleDragEnd);
        item.addEventListener("drop", handleDrop);
    });
});