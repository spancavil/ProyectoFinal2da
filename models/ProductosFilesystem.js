const fs = require('fs');
const path = require('path');

class ModeloProducto {
    constructor(){
        this.path = path.resolve(__dirname, './productos.JSON');
    }

    readFile(){
        let content = fs.readFileSync (this.path, 'utf-8');
        return content;
    }

    writeEmptyArray(emptyArray){
        fs.appendFileSync(this.path, JSON.stringify(emptyArray, null, '\t'));
    }

    writeFile(productos){
        fs.writeFileSync(this.path, JSON.stringify(productos, null, '\t'));
    }

}

module.exports = ModeloProducto;