// add to cart
function addToCart(itemDetails, takeFromInventory) {
    itemDetails.takeFromInventory = takeFromInventory;
    cart.push(itemDetails);
    saveCart();
    return itemDetails;
}

// get price of items in cart
function getPriceFromCart() {
    let total = 0;
    for (const item of cart) {
        total += item.priceInCents * item.takeFromInventory;
    }
    return `$${(total / 100).toFixed(2)}`;
}

// update the cart with one item
function updateOneItem(id, updatedItem) {
    const result = cart.findIndex(item => item.id === id);
    if (result !== -1) {
        cart[result] = { ...cart[result], ...updatedItem };
        saveCart();
        return cart[result];
    }
    return `Error: Item with ID ${id} not found`;
}

// print the reciept of cart
function printReceipt() {
    const purchaseId = faker.random.alphaNumeric(12);
    const lines = [
        `We appreciate your patronage!`,
        `-------------------------------------------`,
    ];

    for (const item of cart) {
        lines.push(`${item.itemName}: $${(item.priceInCents * item.takeFromInventory / 100).toFixed(2)}`);
    }

    const purchasePrice = getPriceFromCart();
    lines.push(`-------------------------------------------`);
    lines.push(`TOTAL: ${purchasePrice}`);
    lines.push(`RECEIPT ID: ${purchaseId}`);
    lines.push(`--------------------------------------------------`);
    lines.push(`Enjoy your day!`);

    return chalk.green.italic(lines.join(`\n`));
}

// delete everything in cart
function deleteCart() {
    cart.length = 0;
    saveCart();
}


module.exports = {
    addToCart,
    getPriceFromCart,
    deleteCart,
    updateOneItem,
    printReceipt
};
