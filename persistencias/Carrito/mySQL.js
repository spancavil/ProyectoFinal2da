const Persistencia = require("../persistenciaCarritoInterface");
const knexMySQL = require('../../databases/knex');

class MySQL extends Persistencia {
    constructor(){
        super();
        knexMySQL.schema.hasTable('carrito')
        .then(res=>{
            if (res){
                console.log("No sea crea table");
                return null
            } else {
                console.log("Se creo table");
                knexMySQL.schema.createTable('carrito', table => {
                    table.increments('id');
                    table.string('timestamp');
                    table.integer('productoId').unsigned();
                    //Aquí hacemos referencia al id de la tabla productos
                    //en caso que queramos agregar un id que no exista en la tabla, no lo permitirá.
                    table.foreign('productoId')
                    .references('id')
                    .inTable('productos')
                }).then(() => null);
            }
        })
    }

    async listar(){
        try {
            let carrito = await knexMySQL('carrito').select('*');
            let carritoArray = [];
            if (carrito.length !== 0) {
                for (const producto of carrito) {
                    carritoArray.push({
                        id: producto.id,
                        timestamp: producto.timestamp,
                        productoId: producto.productoId
                    })
                }
                return carritoArray;
            } else {
                return {error: "No hay productos cargados"};
            }
        } catch (error) {
            console.log('Error!: ', error);
        }
    }

    async listarId(productoId){
        try {
            let rows = await knexMySQL('carrito')
            .where({productoId: productoId});
            if (rows.length !== 0) {
                let producto;
                for (const row of rows) {
                    producto = {
                        id: row.id,
                        timestamp: row.timestamp,
                        productoId: row.productoId
                    }
                }
                return producto;
            } else {
                return {error: "Producto no encontrado."}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async guardar(productoId){
        try {
            let response = await knexMySQL('carrito').insert({
                timestamp: (new Date()).toLocaleString(),
                productoId: parseInt(productoId)
            });
            return response;
        } catch (e) {
            console.log('Error!: ', e);
        }    
    }

    async borrar(productoId){
        try {
            let response = await knexMySQL('carrito')
            .where({
                productoId: productoId
            })
            .del();
            return response === 1 ? 
            {msj: "Producto borrado!"} :
            {msj: "Producto no encontrado!"}; 
        } catch (error) {
            console.log("Error en borrar: ", error);
        }
    }
}

module.exports = MySQL;