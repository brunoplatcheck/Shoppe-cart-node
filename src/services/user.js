// src/services/user.js
import { readJSON, writeJSON } from '../utils/fileHelper.js';

async function registerUser(name, email, password) {
  const users = await readJSON('users.json');
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    console.log("❌ Erro: Este e-mail já está cadastrado.");
    return null;
  }

  const newUser = {
    id: Date.now(), // ID único simples
    name,
    email,
    password, // Em um projeto real, isso seria um hash!
    balance: 0,
  };

  users.push(newUser);
  await writeJSON('users.json', users);
  console.log(`✅ Usuário "${name}" cadastrado com sucesso!`);
  return newUser;
}

async function loginUser(email, password) {
  const users = await readJSON('users.json');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    console.log("❌ E-mail ou senha incorretos.");
    return null;
  }
  
  console.log(`👋 Olá, ${user.name}! Login efetuado com sucesso.`);
  return user;
}

async function addFunds(userEmail, amount) {
  if (amount <= 0) {
    console.log("❌ O valor deve ser positivo.");
    return null;
  }

  const users = await readJSON('users.json');
  let updatedUser = null;
  const updatedUsers = users.map(user => {
    if (user.email === userEmail) {
      user.balance += amount;
      updatedUser = user;
      return user;
    }
    return user;
  });

  if (updatedUser) {
    await writeJSON('users.json', updatedUsers);
    console.log(`💰 Saldo atualizado! Novo saldo: R$ ${updatedUser.balance.toFixed(2)}`);
    return updatedUser;
  }
  return null;
}

async function processPurchase(user, cart) {
    const total = cart.reduce((acc, item) => acc + item.subtotal(), 0);

    if (user.balance < total) {
        console.log("❌ Saldo insuficiente para completar a compra.");
        return false;
    }

    // Atualiza saldo do usuário
    const users = await readJSON('users.json');
    const updatedUsers = users.map(u => {
        if (u.id === user.id) {
            return { ...u, balance: u.balance - total };
        }
        return u;
    });
    await writeJSON('users.json', updatedUsers);

    // Registra a transação
    const transactions = await readJSON('transactions.json');
    const newTransaction = {
        transactionId: Date.now(),
        userId: user.id,
        userName: user.name,
        items: cart,
        total,
        date: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    await writeJSON('transactions.json', transactions);

    console.log("\n🎉 Compra efetuada com sucesso!");
    console.log("===================================");
    console.log("Resumo da Transação:");
    cart.forEach(item => {
        console.log(`- ${item.name} (Qtd: ${item.quantity})`);
    });
    console.log(`\nTotal da Compra: R$ ${total.toFixed(2)}`);
    console.log(`Saldo Remanescente: R$ ${(user.balance - total).toFixed(2)}`);
    console.log("===================================");

    return true;
}


export { registerUser, loginUser, addFunds, processPurchase };
