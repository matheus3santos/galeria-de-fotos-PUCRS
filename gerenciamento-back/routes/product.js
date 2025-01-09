const express = require('express');
const productsModel = require('../models/products');

const router = express.Router();

// Listar produtos
router.get('/', (req, res) => {
    const products = productsModel.getProducts();
    res.json(products);
});

// Adicionar produto
router.post('/', (req, res) => {
    const { name, category, quantity, price } = req.body;
    if (!name || !category || !quantity || !price) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    const newProduct = productsModel.addProduct({ name, category, quantity, price });
    res.status(201).json(newProduct);
});

// Atualizar produto
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedProduct = productsModel.updateProduct(id, req.body);
    if (!updatedProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(updatedProduct);
});

// Excluir produto
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deletedProduct = productsModel.deleteProduct(id);
    if (!deletedProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(deletedProduct);
});

// Buscar produto
router.get('/search', (req, res) => {
    const { id, name } = req.query;
    const result = productsModel.findProduct({ id: parseInt(id, 10), name });
    if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(result);
});

module.exports = router;
