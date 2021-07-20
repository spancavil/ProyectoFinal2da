const Producto = require('../Producto/filesystem');
const ModeloCarrito = require('../../models/CarritoFileSystem');
const carritodb = new ModeloCarrito;
const productos = new Producto;
const productosExistentes= productos.getProductos();

class Carrito {
    constructor (){
        this.carrito = this.getCarrito();
        this.id = this.getId();
    }

    //Obtengo el carrito desde mi modelo.
    getCarrito(){
        try{
            let carrito = carritodb.readFile();
            if (carrito !== ''){
                return (JSON.parse(carrito))
            } else {
                let vacio = [];
                return vacio;
            }
        }
        //En caso de no existir se crea el archivo
        catch(e) {
            const productos = [];
            carritodb.writeEmptyArray(productos);
            return productos;
        }
    }

    //Obtenemos el último id de los productos en carrito precargados, en caso de no existir se retorna 1.
    getId() {
        let ultimoIndice = this.carrito.length - 1;
        if (ultimoIndice === -1) {
            return 1;
        }
        else {
            return this.carrito[ultimoIndice].id + 1;
        }
    }
    listar(){
        if (this.carrito.length === 0){
            return {error: "No hay productos en el carrito!"};
        }
        else{
            return this.carrito;
        }
    }
    
    listarId(productoId){
        let producto = this.carrito.find(element => element.producto.id === parseInt(productoId));
        if (producto){
            return(producto);
        } else {
            return {error: "Producto no encontrado en el carrito."};
        }
    }

    guardar(productoId){
        const producto = productosExistentes.find(element => element.id === parseInt(productoId));
        if (producto){
            let objeto = {producto: producto, 
                        id: this.id++,
                        timeStamp: (new Date()).toLocaleString()};
            this.carrito.push(objeto);
            carritodb.writeFile(this.carrito);
            return objeto;
        } else {
            return {error: "Producto no existente en la base de datos"}
        }
    }

    borrar(productoId){
        let producto = this.carrito.find(element => element.producto.id === parseInt(productoId));
        if (producto){
            const indiceABorrar = this.carrito.indexOf(producto);
            this.carrito.splice(indiceABorrar, 1);
            carritodb.writeFile(this.carrito);
            return producto;
        } else {
            return {error: "Producto a borrar no encontrado."};
        }
    }

}

module.exports = Carrito;