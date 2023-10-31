const { createItem, getItemById, getAllItems, updateItem, deleteItem, addToCart, getPriceFromCart, deleteCart, updateOneItem, printReceipt } = require("./src/cart");

// handles processing input from command line
function processInput() {
    const expectedCommand = process.argv[2];
    const item = process.argv.slice(3).reduce((acc, value) => {
        const [key, val] = value.split(':');
        acc[key] = val;
        return acc;
    }, {});

    let result = "Error: Command not found";

    switch (expectedCommand) {
        case "create":
            result = createItem(item);
            break;
        case "get":
            result = item.id ? getItemById(item.id) : getAllItems();
            break;
        case "update":
            result = updateItem(item.id, item);
            break;
        case "delete":
            result = deleteItem(item.id);
            break;
        case "addToCart":
            const itemDetails = getItemById(item.id);
            if (itemDetails.inStock >= item.takeFromInventory) {
                result = addToCart(itemDetails, item.takeFromInventory);
            }
            break;
        case "getPriceFromCart":
            result = getPriceFromCart();
            break;
        case "deleteCart":
            result = deleteCart();
            break;
        case "updateOneItem":
            result = updateOneItem(item.id, item);
            break;
        case "printReceipt":
            result = printReceipt();
            break;
    }

    return result;
}

module.exports = { processInput };
