const mainForm = document.getElementById("main-form");
const inputField = document.getElementById("todo-input");
const submitButton = document.getElementById("submit-button");
const todoList = document.getElementById("todo-list");


const handleSubmitTodo = (e) => {
    e.preventDefault();
    
    const newTodoText = inputField.value;
    const newListItem = document.createElement("li");
    newListItem.append(newTodoText);

    todoList.append(newListItem);

    inputField.value = "";
}

mainForm.addEventListener("submit", handleSubmitTodo);

