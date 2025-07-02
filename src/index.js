// src/index.js
import readline from 'readline/promises';
import * as cartService from './services/cart.js';
import * as userService from './services/user.js';
import { readJSON } from './utils/fileHelper.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentUser = null;
let userCart = [];

async function mainMenu() {
  while (true) {
    console.log("\n====== Shopee Terminal ======");
    console.log("1. Login");
    console.log("2. Cadastrar");
    console.log("3. Ver Catálogo de Produtos");
    console.log("4. Ver Carrinho");
    if (currentUser) {
      console.log(`5. Adicionar Saldo (Logado como: ${currentUser.name})`);
    }
    console.log("0. Sair");
    
    const choice = await rl.question("> ");

    switch (choice) {
      case '1': await handleLogin(); break;
      case '2': await handleRegister(); break;
      case '3': await handleCatalog(); break;
      case '4': await handleCart(); break;
      case '5': 
        if (currentUser) {
          await handleWallet(); 
        } else {
          console.log("Opção inválida. Faça login para acessar a carteira."); 
        }
        break;
      case '0':
        console.log("👋 Até mais!");
        rl.close();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

async function handleLogin() {
  const email = await rl.question("Email: ");
  const password = await rl.question("Senha: ");
  currentUser = await userService.loginUser(email, password);
}

async function handleRegister() {
  const name = await rl.question("Nome completo: ");
  const email = await rl.question("Email: ");
  const password = await rl.question("Senha: ");
  currentUser = await userService.registerUser(name, email, password);
}

async function handleCatalog() {
  console.log("\n--- Catálogo de Produtos ---");
  const catalog = await readJSON('catalog.json');
  catalog.forEach(p => {
    console.log(`ID: ${p.id} | ${p.name} (${p.brand}) - R$ ${p.price.toFixed(2)}`);
  });

  while (true) {
    const choice = await rl.question("\nDeseja adicionar um item ao carrinho? (s/n): ");
    if (choice.toLowerCase() !== 's') break;

    if (!currentUser) {
      console.log("\n❗️ Você precisa fazer login ou se cadastrar para adicionar itens.");
      const loginChoice = await rl.question("Deseja fazer login (1) ou cadastrar (2)? ");
      if (loginChoice === '1') await handleLogin();
      else if (loginChoice === '2') await handleRegister();
      if (!currentUser) return; // Sai se o usuário não logou/cadastrou
    }

    const productId = parseInt(await rl.question("Digite o ID do produto: "), 10);
    const quantity = parseInt(await rl.question("Digite a quantidade: "), 10);

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
      console.log("❌ ID ou quantidade inválida.");
      continue;
    }
    
    userCart = await cartService.addItem(userCart, productId, quantity);
    cartService.displayCart(userCart);
  }
}

async function handleCart() {
  if (userCart.length === 0) {
    console.log("\nSeu carrinho está vazio.");
    return;
  }
  
  cartService.displayCart(userCart);
  const total = cartService.calculateTotal(userCart);
  console.log(`\nTotal do Carrinho: R$ ${total.toFixed(2)}`);

  while (true) {
    console.log("\nOpções do Carrinho:");
    console.log("1. Remover item/quantidade");
    console.log("2. Finalizar Compra");
    console.log("0. Voltar ao menu principal");
    const choice = await rl.question("> ");

    if (choice === '1') {
      const productId = parseInt(await rl.question("ID do produto a remover: "), 10);
      const quantity = parseInt(await rl.question("Quantidade a remover (deixe em branco para remover tudo): "), 10);
      
      const itemInCart = userCart.find(item => item.id === productId);
      if (!itemInCart) {
          console.log("Item não encontrado no carrinho.");
          continue;
      }

      const qtyToRemove = isNaN(quantity) ? itemInCart.quantity : quantity;
      userCart = cartService.removeItem(userCart, productId, qtyToRemove);
      cartService.displayCart(userCart);

    } else if (choice === '2') {
      if (!currentUser) {
        console.log("❗️ Faça login para finalizar a compra.");
        await handleLogin();
        if (!currentUser) return;
      }
      const success = await userService.processPurchase(currentUser, userCart);
      if (success) {
        userCart = []; // Limpa o carrinho após a compra
        // Atualiza o objeto currentUser com o novo saldo
        const users = await readJSON('users.json');
        currentUser = users.find(u => u.id === currentUser.id);
      }
      break;
    } else if (choice === '0') {
      break;
    } else {
      console.log("Opção inválida.");
    }
  }
}

async function handleWallet() {
    console.log(`\n--- Carteira ---`);
    console.log(`Saldo atual: R$ ${currentUser.balance.toFixed(2)}`);
    const amountStr = await rl.question("Digite o valor a adicionar: R$ ");
    const amount = parseFloat(amountStr);

    if (isNaN(amount)) {
        console.log("❌ Valor inválido.");
        return;
    }

    const updatedUser = await userService.addFunds(currentUser.email, amount);
    if (updatedUser) {
        currentUser = updatedUser; // Atualiza o estado do usuário logado
    }
}

mainMenu();
