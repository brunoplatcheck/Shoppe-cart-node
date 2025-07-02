// src/services/cart.js
import createItem from './item.js';
import { readJSON } from '../utils/fileHelper.js';

async function addItem(userCart, productId, quantity) {
  const catalog = await readJSON('catalog.json');
  const product = catalog.find(p => p.id === productId);

  if (!product) {
    console.log("❌ Produto com este ID não encontrado no catálogo.");
    return userCart;
  }

  const itemIndex = userCart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    // Item já existe, apenas incrementa a quantidade
    const newCart = userCart.map((item, index) => 
      index === itemIndex ? { ...item, quantity: item.quantity + quantity } : item
    );
    console.log(`✅ ${quantity} unidade(s) de "${product.name}" adicionada(s) ao carrinho.`);
    return newCart;
  } else {
    // Adiciona novo item ao carrinho
    const newItem = createItem(product.id, product.name, product.price, quantity);
    console.log(`✅ Item "${product.name}" adicionado ao carrinho.`);
    return [...userCart, newItem];
  }
}

function removeItem(userCart, productId, quantity) {
  const itemIndex = userCart.findIndex(item => item.id === productId);

  if (itemIndex === -1) {
    console.log("❌ Item não encontrado no carrinho.");
    return userCart;
  }

  const currentItem = userCart[itemIndex];
  const newQuantity = currentItem.quantity - quantity;

  if (newQuantity > 0) {
    // Diminui a quantidade
    console.log(`➖ ${quantity} unidade(s) de "${currentItem.name}" removida(s).`);
    return userCart.map((item, index) => 
      index === itemIndex ? { ...item, quantity: newQuantity } : item
    );
  } else {
    // Remove o item completamente
    console.log(`🗑️ Item "${currentItem.name}" removido completamente do carrinho.`);
    return userCart.filter(item => item.id !== productId);
  }
}

function calculateTotal(userCart) {
  return userCart.reduce((total, item) => total + item.subtotal(), 0);
}

function displayCart(userCart) {
  console.log("\n🛒 Seu Carrinho de Compras:");
  if (userCart.length === 0) {
    console.log("Seu carrinho está vazio.");
    return;
  }
  
  userCart.forEach((item) => {
    console.log(
      `➡️ ID: ${item.id} | ${item.name} (R$ ${item.price.toFixed(2)}) | Qtd: ${item.quantity} | Subtotal: R$ ${item.subtotal().toFixed(2)}`
    );
  });
}

export { addItem, removeItem, calculateTotal, displayCart };
