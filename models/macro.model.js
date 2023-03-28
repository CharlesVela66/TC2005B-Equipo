const db= require('../util/database');

module.exports = class Macro{
    constructor(nuevo_macro_dieta){
        this.id_macro= nuevo_macro_dieta.id_macro || 0;
        this.caloria= nuevo_macro_dieta.caloria || 0;
        this.proteinas= nuevo_macro_dieta.proteinas || 0;
        this.carbohidratos=nuevo_macro_dieta.carbohidratos|| 0;
        this.grasas=nuevo_macro_dieta.grasas || 0;
    }
    save(){

    }
    static fetchOne(id){
        return db.execute(
            `
            SELECT *
            FROM macronutrientes 
        `
        ,[id])

    }

}