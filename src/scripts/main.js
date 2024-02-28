const mainForm = document.getElementById("main-form");
const inputField = document.getElementById("todo-input");
const submitButton = document.getElementById("submit-button");
const todoList = document.getElementById("todo-list");

const validateInput = (text) => {
    let result = "";

    if(text.length === 0){
        result = "Empty values are not allowed";
    } else if(text.length < 3){
        result = "Value must be at least 3 characters";
    }
    return result;
}


const handleSubmitTodo = (e) => {
    e.preventDefault();
    
    const newTodoText = inputField.value;
    const isTodoTextValid = validateInput(newTodoText);

    if(isTodoTextValid.length > 0){
        alert(isTodoTextValid);
    } else{
        const newListItem = document.createElement("li");
        newListItem.append(newTodoText);
        newListItem.classList.add("todo-list-item");
        todoList.append(newListItem);
    
        inputField.value = "";
    }
    


    
}

mainForm.addEventListener("submit", handleSubmitTodo);

