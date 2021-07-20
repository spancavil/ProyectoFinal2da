const {mysql} = require('../cfg/dbMySQLConfg');
const knexMySQL = require('knex')(mysql)

// exporto el objeto para usarlo en otros modulos
module.exports = knexMySQL;