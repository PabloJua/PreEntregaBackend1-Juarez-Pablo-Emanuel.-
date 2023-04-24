const express = require('express');
const ProductManager = require ('../productManager.js');
const routerProduct = require('./products.js');
const CartManager = require('../cartManager.js'); 

const productManager = new ProductManager();
const cartManager = new CartManager();
const routerCart = express.Router();


// Listar los productos que pertenezcan al carrito con el cid proporcionado.

routerCart.get('/carts', (req, res) => {
    cartManager.createCarrito();
    res.status(200).send({estado:'ok', mensaje:'Carrito creado correctamente'})
})

routerCart.get('/carts/:cid', (req, res) => {
  const cartId = req.params.cid;
    try {
        let cartById = cartManager.getCartId(cartId);
        res.status(200).send(cartById);
    } catch (error) {
        return res.status(404).send(error);
    }

})


module.exports = routerCart;