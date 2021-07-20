// Se importa el tipo de persistencia desde este archivo.
const {prodOCarrito, type} = require('../cfg/persistenceTypes.js')

class PersistenciaFactoryProductos {
    constructor(){
        this.prodOCarrito = prodOCarrito;
        this.type = type;
    }

    getPersist (){
        try {
            let modulo = require(`../persistencias/${this.prodOCarrito}/${this.type}`);
            return new modulo();
        } catch (e) {
            console.log("No se encontró el tipo de persistencia: ", e);
        }
    }
}

module.exports = PersistenciaFactoryProductos;