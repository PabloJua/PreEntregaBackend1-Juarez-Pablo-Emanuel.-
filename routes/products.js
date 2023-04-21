const express = require('express');
const ProductManager = require('../productManager.js');
const routerProduct = express.RouterProduct();
const productManager = new ProductManager();



// Listar todos los productos 

routerProduct.get('/', (req , res) => {   
    const limite = req.query.limite;
    try {
        let products = productManager.getProducts();
        // if(limite) {
        //     limiteProductos = products.slice(0, limite);
        //     res.status(200).send(limiteProductos);
        //    } else {
        //     res.status(200).send(products);
        //    }
        const limiteProductos = products.slice(0, limite);
        limite ? res.status(200).send(limiteProductos) : res.status(200).send(products);
    } catch (error) {
        return res.status(404).send(error);   
    }
});


// Trae el producto con el id proporcionado

routerProduct.get('/:pid' , (req, res) => {
    const productId = req.params.pid;
    try {
        let productsById = productManager.getProductId(productId);
        res.status(200).send(productsById);
    } catch (error) {
        return res.status(404).send(error);
    }
});


// Agregar un nuevo producto

routerProduct.post('/ProductsA', (req, res) => {
    const product_new = req.body;
    try {
        productManager.addProduct(product_new);  
        res.status(200).send({estado: 'ok', mensaje: 'Producto Agregado Correctamente'}); 
    } catch (error) {
        return res.status(404).send(error)
    }
});



// Toma un producto y actualiza los campos enviados desde body. 

routerProduct.put('/ProductsU/:pid', (req, res) => {
    const productId = req.params.pid;
    const field = req.body;
    try {
        productManager.updateProduct(productId, field)
        res.status(200).send({estado: 'ok', mensaje: 'Producto Modificado Correctamente'})
    } catch (error) {
        return res.status(404).send(error)
    }
});



// Elimina el producto con el pid indicado.

routerProduct.delete('/ProductsD/:pid', (req, res) => {
    const productoIdToDelete = req.params.pid;
    try {
        productManager.deleteProduct(productoIdToDelete);
        res.status(200).send({estado: 'ok', mensaje:'Producto Eliminado Correctamente'});
    } catch (error) {
        return res.status(404).send(error);
    }

});



module.exports = routerProduct;