import {toDoList} from "./todoLogic.js"


const thetoDoList = new toDoList() 

export function setupTodoUI() {


        const addbutton = document.querySelector("#add-toDo");

        addbutton.addEventListener("click", () => {
            const title = document.querySelector("#todo-title").value;
            const description = document.querySelector("#todo-description").value;
            const tag = document.querySelector("#todo-tag").value
            const dueDate = document.querySelector("#todo-dueDate").value;
            const priority = document.querySelector("#todo-priority").value;      

            addnewtoDo(title, description, tag, dueDate, priority)
        })

        const showTodosButton = document.querySelector("#show-todos");
        showTodosButton.addEventListener("click", () => {
        toggleTodosVisibility();
        });

       const searchTagButton = document.querySelector("#search-tag-btn");
       searchTagButton.addEventListener("click", () => {
       const tag_value = document.querySelector("#search-tag").value;
       displayFilteredTodos(tag_value);
       });
}


function displayFilteredTodos(tag_value) {
    const searchResultsContainer = document.querySelector("#search-results-container");
    searchResultsContainer.innerHTML = "";

    if(tag_value) {
        let filteredTodos = thetoDoList.todos.filter(todo => todo.tag === tag_value);
        filteredTodos.forEach(todo => {
            const todoDiv = searchTodoDiv(todo);
            searchResultsContainer.appendChild(todoDiv)
        })
    }
}

function searchTodoDiv(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("searched-item");

    todoDiv.innerHTML = `
        <h3>${todo.title}</h3>
        <p><strong>Description</strong>: ${todo.description}</p>
        <p><strong>Tag</strong>: ${todo.tag}</p>
        <p><strong>Date</strong>: ${todo.dueDate}</p>
        <p><strong>Priority</strong>: ${todo.priority}</p>
    `;

    return todoDiv;
}


function addnewtoDo (title, description, tag, dueDate, priority) {
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

    const isDuplicate = thetoDoList.todos.some(todo => 
        todo.title === title && 
        todo.description === description && 
        todo.dueDate === dueDate && 
        todo.priority === priority
    );
    if (isDuplicate) {
        alert("A todo with the same details already exists.");
        return;
    }

    else {
        thetoDoList.addToDo(title, description, tag, dueDate, priority)
        updateUIDisplay();  
    }
}


let isTodosVisible = true; 
function updateUIDisplay() {
    const big_container = document.querySelector("#todo-container");
    
    if (isTodosVisible) {
        big_container.innerHTML = ""; 

        thetoDoList.todos.forEach(todo => {
            const tododiv = document.createElement("div");
            tododiv.classList.add("todo-item");

            tododiv.innerHTML = `
            <h3>${todo.title}</h3>
            <p><strong>Description</strong>: ${todo.description}</p>
            <p><strong>Tag</strong>: ${todo.tag}</p>
            <p><strong>Date</strong>: ${todo.dueDate}</p>
            <p><strong>Priority</strong>: ${todo.priority} </p>
            `;
            
            const deletebtn = document.createElement("button")
            deletebtn.className = "deletebtn"
            deletebtn.textContent = "Delete"

            deletebtn.addEventListener("click", () => {
                thetoDoList.deleteToDo(todo.title);
                updateUIDisplay(); 
            });

            tododiv.appendChild(deletebtn);
            big_container.appendChild(tododiv);
        });
    } else {
        big_container.innerHTML = "";

    }
}


function toggleTodosVisibility() {
    isTodosVisible = !isTodosVisible;
    updateUIDisplay();

    const showbtn = document.querySelector("#show-todos");
    if (isTodosVisible) {
        showbtn.textContent = "Hide todos";
    } else {
        showbtn.textContent = "Show todos";
    }
}
