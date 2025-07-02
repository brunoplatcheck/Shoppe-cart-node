// src/utils/fileHelper.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url'; // Importa a função necessária

// __dirname não existe em Módulos ES, então criamos um equivalente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constrói o caminho para a pasta 'data' subindo um nível a partir de 'utils'
const dataDir = path.join(__dirname, '..', '..', 'data');

async function readJSON(filename) {
  const filePath = path.join(dataDir, filename);
  try {
    // Adiciona um log para depuração, para ver qual caminho está sendo tentado
    // console.log(`Tentando ler: ${filePath}`); 
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Erro ao ler o arquivo ${filename}. Verifique se o caminho está correto e o arquivo existe.`);
    console.error(`Caminho completo tentado: ${filePath}`);
    // Retorna um array vazio para que a aplicação não quebre
    return [];
  }
}

async function writeJSON(filename, data) {
  const filePath = path.join(dataDir, filename);
  try {
    // Garante que o diretório exista antes de tentar escrever
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`❌ Erro ao escrever no arquivo ${filename}:`, error);
  }
}

export { readJSON, writeJSON };
