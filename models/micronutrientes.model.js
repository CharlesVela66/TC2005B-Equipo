const db = require('../util/database');

module.exports = class Micronutrientes {
    constructor(nuevo_micronutrientes){
        this.ceniza = nuevo_micronutrientes.ceniza || 0;
        this.fibra_total = nuevo_micronutrientes.fibra_total || 0;
        this.calcio = nuevo_micronutrientes.calcio || 0;
        this.fosforo = nuevo_micronutrientes.fosforo || 0;
        this.hierro = nuevo_micronutrientes.hierro || 0;
        this.tiamina = nuevo_micronutrientes.tiamina || 0;
        this.riboflavina = nuevo_micronutrientes.riboflavina || 0;
        this.niacina = nuevo_micronutrientes.niacina || 0;
        this.vit_c = nuevo_micronutrientes.vit_c || 0;
        this.vit_a = nuevo_micronutrientes.vit_a || 0;
        this.acgrasosmin = nuevo_micronutrientes.acgrasosmin || 0;
        this.acgrasossat=  nuevo_micronutrientes.acgrasossat || 0;
        this.colesterol = nuevo_micronutrientes.colesterol || 0;
        this.potasio = nuevo_micronutrientes.potasio || 0;
        this.sodio = nuevo_micronutrientes.sodio || 0;
        this.zinc = nuevo_micronutrientes.zinc || 0;
        this.magnesio = nuevo_micronutrientes.magnesio || 0;
        this.vit_b6 = nuevo_micronutrientes.vit_b6 || 0;
        this.vit_b12 = nuevo_micronutrientes.vit_b12 || 0;
        this.acfolico = nuevo_micronutrientes.acfolico || 0;
        this.folatoeq = nuevo_micronutrientes.folatoeq || 0;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {

    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT * from micronutrientes where id_micro = (SELECT id_micro
            FROM dieta
            WHERE id_dieta=?)
        `);
    }
    static fetchOne(id) {
        return db.execute(
            `
            SELECT * from micronutrientes where id_micro = (SELECT id_micro
                FROM dieta
                WHERE id_dieta=?)
        `, [id])

    }
}