const mainForm = document.getElementById("main-form");
const inputField = document.getElementById("todo-input");
const submitButton = document.getElementById("submit-button");
const todoList = document.getElementById("todo-list");
const MAXTODOITEMS = 8;


const listCanReceiveMoreItems = (list, maxItems) => {
    const currentItemCount = list.getElementsByTagName("li").length;

    return  currentItemCount < maxItems;
}

const validateInput = (text) => {
    let result = "";

    if(text.length === 0){
        result = "Empty values are not allowed";
    } else if(text.length < 3){
        result = "Value must be at least 3 characters";
    }
    return result;
}

const handleDeleteListItem = (e) => {

    e.preventDefault();

    const classToWorkWith = "completed";
    const element = e.target;
    const parentElement = element.parentElement;

    console.log(element.parentElement);


    if(parentElement.classList.contains(classToWorkWith)){

        //ITEM CAN'T BE DELETED
        alert("ELEMENT CANNOT BE DELETED")

    } else{
        const response = confirm("Are you sure you want to delete this item?")
        if(response) parentElement.remove();
    }
}

const handleClickOnListItem = (e) => {
    const element = e.target;

    if(element.tagName.toLowerCase() === "li"){
        const classToWorkWith = "completed";
        const elementButton = element.querySelector(".todo-list-item-button");
        const elementClassList = element.classList;

        if(elementClassList.contains(classToWorkWith)){
            elementClassList.remove(classToWorkWith);
            elementButton.style.display = "inline-block";

        } else{
            elementClassList.add(classToWorkWith);
            elementButton.style.display = "none";
        }

    }
}

const handleSubmitTodo = (e) => {
    e.preventDefault();

    if(listCanReceiveMoreItems(todoList, MAXTODOITEMS)){
        const newTodoText = inputField.value;
        const isTodoTextValid = validateInput(newTodoText);
    
        if(isTodoTextValid.length > 0){
            alert(isTodoTextValid);
        } else{
            const newListItem = document.createElement("li");
            const newSpanItem = document.createElement("span");
            const newListItemButton = document.createElement("button");

            newListItem.onclick = handleClickOnListItem;
            newListItemButton.onclick = handleDeleteListItem;
    
            newListItem.classList.add("todo-list-item");
            newListItemButton.classList.add("todo-list-item-button");
    
            newSpanItem.append(newTodoText);
            newListItemButton.append("X");
    
            newListItem.appendChild(newSpanItem);
            newListItem.appendChild(newListItemButton);
    
            todoList.append(newListItem);
        
            inputField.value = "";
        }
    } else {
        alert(`A maximum of ${MAXTODOITEMS} items are allowed in the list`)
    }    
}

