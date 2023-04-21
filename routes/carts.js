
// Agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO.
// quantity: número de ejemplares del producto. 
// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
const express = require('express');
import ProductManager from '../productManager.js';
import routerProduct from './products.js'
import CartManager from '../cartManager.js';

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


