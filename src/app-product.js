const express = require('express');
const server = express();
const productsRouter = require('../routes/products')

server.use(express.json())
server.use('/api/products' , productsRouter);

const PUERTO = 8080;

server.listen(PUERTO, () => {
    console.log(`Servidor ejecutandose en el ${PUERTO}`)
});