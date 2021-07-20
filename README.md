# Backend Proyecto-Final (2da preentrega)

## Persistencias
Filesystem (Carrito y Producto)
Mongo (Local y Atlas)
mySQL (local)

## Body para Postman
A continuación, se adjuntan los bodies a utilizar en los distintos endpoints.

### Productos
POST /guardar
{
  "nombre": "un lindo producto",
  "descripcion": "Una linda descripción",
  "codigo": "iasjdijx8374hasdb",
  "precio": 200,
  "stock": 10,
  "id": 4,
  "timeStamp": "7/20/2021, 11:09:35 AM"
}

PUT /actualizar/:id
{
  "nombre": "un FEO producto",
  "descripcion": "Una FEA descripción",
  "codigo": "iasjdijx8374hasdb",
  "precio": 200,
  "stock": 2,
  "timeStamp": "7/20/2021, 11:10:33 AM",
  "id": 2
}

### Carrito
No requiere bodies

## Notas importantes
⋅⋅⋅ No se incopora ninguna vista, todas las consultas se deben hacer a través de POSTMAN o ThunderClient (extensión de VSC).

⋅⋅⋅ En mySQL se hizo una relación uno a muchos, utilizando una foreign key, de modo tal que si se quiere guardar un producto en el carrito con un id que no esté presente en la tabla de productos, no se puede guardar.

⋅⋅⋅ Para seleccionar las persistencias se optó por generar un archivo llamado persistenceTypes en la carpeta cfg. Se debe cambiar los valores desde ahí, para seleccionar la persistencia adecuada (se comentó como debería escribirse).

⋅⋅⋅ Se siguió un modelo de factory para obtener la persistencia adecuada. A su vez cada persistencia hereda de una interface común, para que todas tengan los mismos métodos.
