const fs = require('fs');

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './data/carts.json';
        this.id = 0;
    }


    createCart = () => {
        if(fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data){
                const carts = JSON.parse(data);    
                const cartAgregate = {id: carts.length + 1, products:[]};
                carts.push(cartAgregate);
                fs.writeFileSync(this.path, JSON.stringify(carts));
                console.log("Se agrego un carrito");
            } else {
            const products = {id: this.carts.length + 1, products:[]};
            this.carts.push(products);
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            console.log("Se creó un carrito");
        } 
        } else{
            console.log("Archivo inexistente");
        }
    } 

    async getCartId(cartId) {
        // Leer el archivo, buscar el cart con el id especificado y devolverlo en formato objeto
        const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivo
        const cartsById = JSON.parse(data);
        const cart = cartsById.find(cart => cart.id === cartId) // find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
        if (cart) { // Devolverlo en formato objeto
            console.log(cart);
            return cart;
        } else {
            console.log("Carrito no existe")
        }
    }

    async addProductToCart(cartId, productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) {
            console.log('Cart no encontrado');
            return;
        } 
        const existProdInCart = carts[cartIndex].products.find(product => product.id === productId);
        if (existProdInCart) {
            existProdInCart.quantity++;
            console.log("Cantidad del producto actualizada en el carrito"); 
        } else {
            carts[cartIndex].products.push({id: productId, quantity:1});
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        console.log("Producto agregado correctamente al carrito"); 
        
        }
    }   
    

    module.exports = CartManager;

//C A S O S    D E    U S O 
// const manager = new CartManager();
// manager.addProduct("Computadora", "Computadora Dell", 1500, "imagen1.jpg", "COMP01", 1);
// manager.addProduct("Celular", "Celular Samsung", 12000, "imagen2.jpg", "CEL01", 1);
// manager.addProduct("Tablet", "Tablet Lenovo", 75000, "imagen3.jpg", "TAB01", 1);
// console.log(manager.getProducts());
// manager.getProductId(3);
// console.log(manager.getProductId(2).description);
// manager.updateProduct(2,'description', 'Tablet Samsung');
// manager.deleteProduct(2);