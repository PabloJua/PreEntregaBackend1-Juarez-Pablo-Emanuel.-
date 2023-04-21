const fs = require('fs')

class CartManager {
    constructor() {
        this.carts = [];
        this.id = 0;
        this.path = './data/carts.json';
    }


    async createCarrito() {
        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            const products = {id: carts.lenght + 1, products:[]};
            carts.push(products);
            fs.writeFile(this.path, JSON.stringify(this.carts));
            console.log("Se agrego un carrito")
        } else {
            const products = {id: this.carts.length + 1, products:[]}
            this.carts.push(products)
            fs.writeFile(this.path, JSON.stringify(this.carts));
            console.log("Se creó un carrito")
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



    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios 
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        const codeRepetido = this.carts.some(product => product.code === code) // some() comprueba si al menos un elemento del array cumple con la condición.Este método devuelve true/false.
        if (codeRepetido) {
            console.log(`Existe un producto con el codigo ${code}`);
        }

        const producto_nuevo = {
            id: ++this.id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        // Agregar un producto al arreglo de productos
        this.carts.push(producto_nuevo);
        console.log("Producto agregado correctamente");
        // Guardar el array de productos en el archivo
        fs.writeFile(this.path, JSON.stringify(this.carts), (err) => {
            if (err) throw err;
            console.log("Productos almacenados con exito en el archivo");
        });
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