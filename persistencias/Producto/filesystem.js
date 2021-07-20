const ModeloProducto = require ('../../models/ProductosFilesystem');
const Persistencia = require('../persistenciaProductosInterface');
const db = new ModeloProducto;

class Producto extends Persistencia{
    constructor (){
        super()
        //this.pathFile = path.resolve(__dirname, '../models/productos.txt'); //Necesitamos resolver un path válido
        this.productos = this.getProductos();
        this.id = this.getId();
    }
    //FUNCIONES AUXILIARES DE PERSISTENCIA

    //Obtengo los productos desde el archivo productos.txt
    getProductos(){
        try{
            let productos = db.readFile();
            if (productos !== ''){
                return (JSON.parse(productos))
            //Archivo productos.txt vacío
            } else {
                let vacio = [];
                return vacio;
            }
        }
        //En caso de no existir se crea el archivo
        catch(e) {
            const productos = [];
            db.writeEmptyArray(productos);
           // fs.appendFileSync(this.pathFile, JSON.stringify(productos, null, '\t'));
            return productos;
        }
    }

    //Obtenemos el último id de los productos precargados, en caso de no existir se retorna 1.
    getId() {
        let ultimoIndice = this.productos.length - 1;
        if (ultimoIndice === -1) {
            return 1;
        }
        else {
            return this.productos[ultimoIndice].id + 1;
        }
    }

    //Comienzo de la lógica de productos
    listar(){
        if (this.productos.length === 0){
            return {error: "No hay productos cargados"};
        }
        else{
            return this.productos;
        }
    }
    
    listarId(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            return(producto);
        } else {
            return {error: "Producto no encontrado."};
        }
    }

    guardar(producto){
        console.log("Entro a guardar");
        if (producto.admin !== true){
            return {error: -1, descripcion: "Ruta 'productos' método 'agregar' no autorizado"}
        }
        if (producto.nombre && producto.descripcion && producto.codigo && producto.imagen && producto.precio && producto.stock){
            let objeto =    {nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            codigo: producto.codigo,
                            imagen: producto.foto,
                            precio: producto.precio, 
                            stock: producto.stock, 
                            id: this.id++, timeStamp: (new Date()).toLocaleString()}
            this.productos.push(objeto);
            db.writeFile(this.productos);
            //fs.writeFileSync(this.pathFile, JSON.stringify(this.productos, null, '\t'));
            return objeto;
        } else{
            return {error: "Producto inválido."}
        }
    }

    actualizar(productoId, producto){
        
        let indexUpdate = this.productos.findIndex(element => element.id === parseInt(productoId));
        console.log(indexUpdate);
        if (indexUpdate !== -1){
            this.productos[indexUpdate] = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                imagen: producto.foto,
                precio: producto.precio, 
                stock: producto.stock, 
                timeStamp: (new Date()).toLocaleString(),
                id: parseInt(productoId)};
            db.writeFile(this.productos);
            //fs.writeFileSync(this.pathFile, JSON.stringify(this.productos, null, '\t'));
            return this.productos[indexUpdate];
        } else {
            return {error: "Producto a actualizar no encontrado."};
        } 
    }

    borrar(productoId){
        let producto = this.productos.find(element => element.id === parseInt(productoId));
        if (producto){
            this.productos = this.productos.filter(element => element !== producto);
            db.writeFile(this.productos);
            //fs.writeFileSync(this.pathFile, JSON.stringify(this.productos, null, '\t'));
            return producto;
        } else {
            return {error: "Producto a borrar no encontrado."};
        }
    }

}

module.exports = Producto;