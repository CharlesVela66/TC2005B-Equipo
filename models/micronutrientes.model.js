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
        this.acgrasospoli = nuevo_micronutrientes.acgrasospoli || 0;
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
        return db.execute(`
            INSERT INTO micronutrientes(ceniza, fibra_total, calcio, fosforo, hierro, tiamina, riboflavina, niacina, vit_c, vit_a, acgrasosmin, acgrasospoli, acgrasossat, colesterol, potasio, sodio, zinc, magnesio, vit_b6, vit_b12, acfolico, folatoeq)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [this.ceniza, this.fibra_total, this.calcio, this.fosforo, this.hierro, this.tiamina, this.riboflavina, this.niacina, this.vit_c, this.vit_a, this.acgrasosmin, this.acgrasospoli, this.acgrasossat, this.colesterol, this.potasio, this.sodio, this.zinc,this.magnesio, this.vit_b6, this.vit_b12, this.acfolico, this.folatoeq]);
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