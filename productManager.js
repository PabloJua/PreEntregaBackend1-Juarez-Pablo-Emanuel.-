const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0,
        this.path = './data/products.json';
    }

    addProduct(data) {
        // Validar que todos los campos sean obligatorios 
        if (!data.title || !data.description || !data.code || !data.price || !data.stock || !data.thumbnail) {
            console.log(data);
            return;
        }

        // Validar que no se repita el campo "code"
        const codeRepetido = this.products.some(product => product.code === code) // some() comprueba si al menos un elemento del array cumple con la condición.Este método devuelve true/false.
        if (codeRepetido) {
            console.log(`Existe un producto con el codigo ${code}`);
        }

        const producto_nuevo = {
            id: parseInt(Math.random() * 10),
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            thumbnail: data.thumbnail
        }
        
        if(fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(data);
            products.push(producto_nuevo)
            fs.writeFileSync(this.path, JSON.stringify(products), (err) => {
                if (err) throw err;
                console.log("Productos almacenados con exito en el archivo");
            });
            }        
    }


    async getProducts() {
        // Leer el archivo de productos y devolver todos los productos en formato arreglo
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivos de productos
            const products = JSON.parse(data); // Devolver todos los productos en formato arreglo      
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }


    async getProductId(productId) {
        // Leer el archivo, buscar el producto con el id especificado y devolverlo en formato objeto
        const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivo
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId) // find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
        if (product) { // Devolverlo en formato objeto
            console.log(product);
            return product;
        } else {
            console.log("Producto no existe")
        }
    }


    async updateProduct(productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data)
        const index = products.findIndex (product => product.id === productId); // findIndex() devuelve el índice del primer elemento de un array que cumpla la condicion. En caso contrario devuelve -1.
        if (index === -1 ){
            console.log("Producto no encontrado");
            return;
        } 
        products[index][field] = updateData[field]; 
         // Actualizar el valor del campo en el objeto con el índice en el arreglo products al nuevo valor asignado".
        // products es el nombre del arreglo que contiene los objetos.
        // index es el índice del objeto en el arreglo que quieres actualizar.
        // field es el nombre del campo específico en el objeto que quieres actualizar.
        // updateData es el nuevo valor que deseas asignar al campo.

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if(err) throw err;
            console.log("Producto actualizado correctamente")
        });
    }


    async deleteProduct(productIdToDelete) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const productoEliminado = products.findIndex(product => product.id === productIdToDelete)
        if(productoEliminado === -1) {
            console.log(`No se encontró producto con ID ${productIdToDelete}`);
            return;
        }

        products.splice(productoEliminado, 1);
        fs.writeFile(this.path, JSON.stringify(products), err => {
            if(err) throw err;
            console.log("Producto eliminado correctamente")
        });
    }
}

module.exports = ProductManager;

//C A S O S    D E    U S O 
// const manager = new ProductManager();
// manager.addProduct("Computadora", "Computadora Dell", 1500, "imagen1.jpg", "COMP01", 1);
// manager.addProduct("Celular", "Celular Samsung", 12000, "imagen2.jpg", "CEL01", 1);
// manager.addProduct("Tablet", "Tablet Lenovo", 75000, "imagen3.jpg", "TAB01", 1);
// console.log(manager.getProducts());
// manager.getProductId(3);
// console.log(manager.getProductId(2).description);
// manager.updateProduct(2,'description', 'Tablet Samsung');
// manager.deleteProduct(2);