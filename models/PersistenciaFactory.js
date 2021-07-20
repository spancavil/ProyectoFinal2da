const {prodOCarrito, type} = require('../cfg/persistenceTypes.js')

class PersistenciaFactoryProductos {
    constructor(){
        this.prodOCarrito = prodOCarrito;
        this.type = type;
    }

    //O => memoria
    //1 => mySQL/MariaDB
    //2 => MongoDB (local)
    //3 => MongoDB (atlas)

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