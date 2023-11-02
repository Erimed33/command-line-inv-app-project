const fs = require('fs');
const path = require('path');
// define the path to the JSON file
const filePath = path.join(__dirname, '../data/animeItems.json'); 
// read the JSON file
const items = JSON.parse(fs.readFileSync(filePath, 'utf8')); 


const items = require('../data/animeItems.json'); 



function findItemIndexById(id) {
    // find the index of an item by its unique ID
    const index = items.findIndex(item => item.itemId === id);
    return index;
}

function getItemById(id) {
    // get an item by its unique ID and find index, if not return error
    const index = findItemIndexById(id); 
    if (index !== -1) {
        return items[index]; 
    }
    return `Error: No item with such ID exists!`; 
}

// get all items in the inventory
function getAllItems() {
    
    return items;
}


// make a new item in the inventory do random values for price, in-stock, item ID, and rating
function createNewItem(itemDetails) {
    
    itemDetails.priceInCents = faker.datatype.float({ min: 100, max: 15000, precision: 1 });
    itemDetails.inStock = faker.datatype.float({ min: 0, max: 100, precision: 1 });
    itemDetails.itemId = nanoid(6);
    itemDetails.rating = Number(Math.random().toFixed(2));
    items.push(itemDetails); 
    saveItem(); 
    return itemDetails; 
}

function updateItemById(id, updatedItemDetails) {
    // update an existing item by its ID
    const index = findItemIndexById(id); 
    if (index !== -1) {
      
        items[index] = {
            ...items[index],
            ...updatedItemDetails
        };
        saveItem(); 
        return items[index]; 
    }
    return `Error: Item with ID ${id} not found`; 
}

function deleteItemById(id) {
  
    const index = findItemIndexById(id); 
    if (index !== -1) {
        // remove the item from the inventory by its index
        const deletedItem = items.splice(index, 1);
        saveItem(); 
        return deletedItem; 
    }
    return `Error: Item with ID ${id} not found`; 
} 

module.exports = { items };
