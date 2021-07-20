const Persistencia = require('../persistenciaProductosInterface');
const knexMySQL = require('../../databases/knex');

class MySQL extends Persistencia {
    constructor () {
        super();
        knexMySQL.schema.hasTable('productos')
        .then(res=>{
            if (res){
                null
            } else {
                knexMySQL.schema.createTable('productos', table=>{
                    table.increments('id');
                    table.string('nombre');
                    table.string('codigo');
                    table.integer('precio');
                    table.integer('stock');
                    table.string('descripcion');
                    table.string('imagen');
                }).then(()=> null);
            }
        })
    }

    async listarId(productoId){
        try {
            let rows = await knexMySQL('productos')
            .where({id: productoId});
            if (rows.length !== 0) {
                let producto;
                for (const row of rows) {
                    producto = {
                        id: row.id,
                        nombre: row.nombre,
                        precio: row.precio,
                        descripcion: row.descripcion,
                        codigo: row.codigo,
                        stock: row.stock,
                        imagen: row.imagen
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

    async listar(){
        try {
            let productos = await knexMySQL('productos').select('*');
            let productosArray = [];
            if (productos.length !== 0) {
                for (const producto of productos) {
                    productosArray.push({
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        stock: producto.stock,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        imagen: producto.imagen
                    });
                }
                return productosArray;
            } else {
                return {error: "No hay productos cargados"};
            }
        } catch (error) {
            console.log('Error!: ', error);
        }
    }

    async guardar(producto){
        try {
            let response = await knexMySQL('productos').insert({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                stock: producto.stock,
                codigo: producto.codigo,
                imagen: producto.imagen
            });
            return response;
        } catch (e) {
            console.log('Error!: ', e);
        }
    }

    async actualizar(productoId, producto){
        try {
            delete producto.admin; //Borramos la propiedad admin;
            let response = await knexMySQL('productos')
            .where({
                id: productoId
            })
            .update(producto);
            return response;
        } catch (error) {
            console.log("Error en update: ", error);
        }
    }

    async borrar(productoId){
        try {
            let response = await knexMySQL('productos')
            .where({
                id: productoId
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