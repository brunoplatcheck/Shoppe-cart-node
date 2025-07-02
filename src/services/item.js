// src/services/item.js
function createItem(id, name, price, quantity) {
  return {
    id,
    name,
    price,
    quantity,
    subtotal: () => price * quantity,
  };
}

export default createItem;
