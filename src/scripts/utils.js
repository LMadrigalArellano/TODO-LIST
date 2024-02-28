const getUniqueId = (prefix) => {
    return prefix + (new Date()).getTime();
}

const saveItemToLocalStorage = (item) => {
    savedItems.push(item);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
}

const retrieveItemsFromLocalStorage = () => JSON.parse(localStorage.getItem("savedItems"));

const updateItemInLocalStorage = (updatedItem) => {
    const item = savedItems.find((item) => item.id === updatedItem.id);
    const itemIndex = savedItems.indexOf(item);
    
    savedItems[itemIndex] = {
        ...item,
        isCompleted: updatedItem.isCompleted,
    }
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
}

const deleteItemFromLocalStorage = (itemId) => {
    console.log(itemId, savedItems);
    const filteredItems = savedItems.filter((item) => item.id != itemId);

    localStorage.setItem("savedItems", JSON.stringify(filteredItems));
    savedItems = retrieveItemsFromLocalStorage();
}

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
