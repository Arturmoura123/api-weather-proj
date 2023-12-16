import {toDo, toDoList} from "./todoLogic.js"


const thetoDoList = new toDoList() 

export function setupTodoUI() {


        const addbutton = document.querySelector("#add-toDo");

        addbutton.addEventListener("click", () => {
            const title = document.querySelector("#todo-title").value;
            const description = document.querySelector("#todo-description").value;
            const dueDate = document.querySelector("#todo-dueDate").value;
            const priority = document.querySelector("#todo-priority").value;      

            addnewtoDo(title, description, dueDate, priority)
        })
    }



function addnewtoDo (title, description, dueDate, priority) {
    let warnings = []
    let isFieldMissing = false

    if (!title.trim()) {
        isFieldMissing = true;
        warnings.push("You are missing the title")
    }

    if (!description.trim()) {
        isFieldMissing = true;
        warnings.push("You are missing the description")
    }

    const today = new Date();
    if (!dueDate) {
        isFieldMissing = true;
        warnings.push("You are missing the date")
    } else if (today > new Date(dueDate)) {
        isFieldMissing = true;
        warnings.push("The due date cannot be in the past")
    }

    if (isFieldMissing === true) {
        alert(warnings.join("\n"));
        return;
    } 
    else {
        thetoDoList.addToDo(title, description, dueDate, priority)
        updateUIDisplay();  
    }
}


function updateUIDisplay() {
    const big_container = document.querySelector("#todo-container");
    big_container.innerHTML = "";

    thetoDoList.todos.forEach(todo  => {
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo-item");

        tododiv.innerHTML = `
        <h3>Title: ${todo.title}</h3>
        <p>Description: ${todo.description}</p>
        <p>Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority} </p>
        `;
        
        const deletebtn = document.createElement("button")
        deletebtn.textContent = "Delete"

        deletebtn.addEventListener("click", () => {
            thetoDoList.deleteToDo(todo.title);
            updateUIDisplay();
        });

        tododiv.appendChild(deletebtn)
        big_container.appendChild(tododiv)
        
    });
}