const mainForm = document.getElementById("main-form");
const inputField = document.getElementById("todo-input");
const submitButton = document.getElementById("submit-button");
const todoList = document.getElementById("todo-list");
const MAXTODOITEMS = 8;

let savedItems = [];

const handleDeleteListItem = (e) => {

    e.preventDefault();

    const classToWorkWith = "completed";
    const element = e.target;
    const parentElement = element.parentElement;

    if(parentElement.classList.contains(classToWorkWith)){
        alert("ELEMENT CANNOT BE DELETED")

    } else{
        const response = confirm("Are you sure you want to delete this item?")
        if(response) {
            console.log(response, parentElement.id);
            deleteItemFromLocalStorage(parentElement.id);
            parentElement.remove();
        }
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
            updateItemInLocalStorage({id: element.id, text: element.text, isCompleted: false});

        } else{
            elementClassList.add(classToWorkWith);
            elementButton.style.display = "none";
            updateItemInLocalStorage({id: element.id, text: element.text, isCompleted: true});
        }
    }
}

const appendTodoItem = ({id, text, isCompleted}) => {

    const newListItem = document.createElement("li");
    const newSpanItem = document.createElement("span");
    const newListItemButton = document.createElement("button");

    newListItem.id = id;

    newListItem.onclick = handleClickOnListItem;
    newListItemButton.onclick = handleDeleteListItem;

    newListItem.classList.add("todo-list-item");
    newListItemButton.classList.add("todo-list-item-button");
    if(isCompleted) {
        newListItem.classList.add("completed");
        newListItemButton.style.display = "none";
    }

    newSpanItem.append(text);
    newListItemButton.append("X");

    newListItem.appendChild(newSpanItem);
    newListItem.appendChild(newListItemButton);

    todoList.append(newListItem);
}

const addNewTodoItem = (e) => {
    e.preventDefault();

    if(listCanReceiveMoreItems(todoList, MAXTODOITEMS)){
        const newTodoText = inputField.value;
        const isTodoTextValid = validateInput(newTodoText);
        const newTodoItem = {id: getUniqueId("li"), text: newTodoText, isCompleted: false}
    
        if(isTodoTextValid.length > 0){
            alert(isTodoTextValid);
        } else{
            appendTodoItem(newTodoItem);
            saveItemToLocalStorage(newTodoItem);
            inputField.value = "";
        }
    } else {
        alert(`A maximum of ${MAXTODOITEMS} items are allowed in the list`)
    }    
}

const initializeData = (() => {
    if(localStorage.getItem("savedItems")){
        savedItems = retrieveItemsFromLocalStorage();
        if(savedItems.length > 0){
            savedItems.forEach((item) => {
                appendTodoItem({id: item.id, text: item.text, isCompleted: item.isCompleted});
            });
        } else{
            console.log('THERE ARE NO ITEMS SAVED, BUT THE LIST EXISTS');
        } 
    } else{
        //Create the local storage item if it doesn't already exists
        localStorage.setItem("savedItems", "");
    }
})();