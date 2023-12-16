import {toDo, toDoList} from "./todoLogic.js"


const thetoDoList = new toDoList() 

export function setupTodoUI() {
    document.addEventListener("DOMContentLoaded", () => {

        const addbutton = document.querySelector("#add-toDo");

        addbutton.addEventListener("click", () => {
            const value = document.querySelector("#todo-title").value;
            const description = document.querySelector("#todo-description").value;
            const date = document.querySelector("#todo-dueDate").value;
            const priority = document.querySelector("#todo-priority").value;      

            addnewtoDo(title, description, dueDate, priority)
        })
    })
}


function addnewtoDo (title, description, dueDate, priority) {
    thetoDoList.addToDo(title, description, dueDate, priority)
}


function updateUIDisplay() {
    const big_container = document.querySelector("#todo-container");
    big_container.innerHTML = "";

    thetoDoList.todos.forEach(todo  => {
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo-item");

        tododiv.innerHTML = `
        <h3>Title: ${title}</h3>
        <p>Description: ${description}</p>
        <p>Date: ${dueDate}</p>
        <p> ${priority} </p>
        `;
        
        const deletebtn = document.createElement("button")
        deletebtn.textContent = "Delete"

        deletebtn.addEventListener("click", () => {
            thetoDoList.deleteToDo(todo.title);
            updateUIDisplay();
        });

        tododiv.appendChild(deleteButton)
        big_container.appendChild(tododiv)
        
    });
}