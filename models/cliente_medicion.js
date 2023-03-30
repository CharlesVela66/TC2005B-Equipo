const db = require('../util/database');

module.exports = class RegistroMedida {
    constructor(nueva_medida){
        this.id_cliente = nueva_medida.id_cliente;
        this.id_medicion = nueva_medida.id_medicion;
        this.medida = nueva_medida.medida;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO clientemedicion (id_cliente, id_medicion, medida)
            VALUES (?, ?, ?)
        `, [this.id_cliente, this.id_medicion, this.medida]);
    }



}