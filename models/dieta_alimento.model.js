const db= require('../util/database');

module.exports = class Dieta_Alimento{
    constructor(nuevo_dietaAlimento){
        this.id_dieta = nuevo_dietaAlimento.id_dieta || '';
        this.id_alimento= nuevo_dietaAlimento.id_alimento || '';
        this.cantidad = nuevo_dietaAlimento.cantidad || '';
    }
    save(){

    }
    static fetchOne(id){
        return db.execute(
            `
            SELECT a.nombre, a.medida, da.cantidad
            FROM dietasalimentos da, alimento a
            Where da.id_dieta= ? AND da.id_alimento=a.id_alimento 
        `
        ,[id])

    }

}