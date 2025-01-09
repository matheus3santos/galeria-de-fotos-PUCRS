const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

// Função auxiliar para ler o arquivo JSON
const readData = () => {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// Função auxiliar para salvar no arquivo JSON
const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Adicionar produto
exports.addProduct = ({ name, category, quantity, price }) => {
    const products = readData();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, name, category, quantity, price };
    products.push(newProduct);
    saveData(products);
    return newProduct;
};

// Listar produtos
exports.getProducts = () => readData();

// Atualizar produto
exports.updateProduct = (id, updatedFields) => {
    const products = readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedFields };
    saveData(products);
    return products[index];
};

// Excluir produto
exports.deleteProduct = (id) => {
    const products = readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deletedProduct = products.splice(index, 1);
    saveData(products);
    return deletedProduct;
};

// Buscar produto
exports.findProduct = (query) => {
    const products = readData();
    if (query.id) {
        return products.find((p) => p.id === query.id) || null;
    }
    if (query.name) {
        return products.filter((p) =>
            p.name.toLowerCase().includes(query.name.toLowerCase())
        );
    }
    return [];
};
