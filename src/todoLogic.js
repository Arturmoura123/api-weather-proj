export class toDo {
    constructor(title, description, tag, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.tag = tag
        this.dueDate = dueDate;
        this.priority = priority;
    }
}


export class toDoList {
    constructor() {
        this.todos = []
    }


    addToDo(title, description, tag, dueDate, priority){
        const new_todo = new toDo(title, description, tag, dueDate, priority);
        this.todos.push(new_todo)
        return new_todo
    }


    deleteToDo(title) {
        this.todos = this.todos.filter(todo => todo.title !== title);
    }


    getTodo(title) {
        return this.todos.find(todo => todo.title === title);
    }
}


