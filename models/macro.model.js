const db = require('../util/database');

module.exports = class Macro {
    constructor(nuevo_macro_dieta) {
        this.id_macro = nuevo_macro_dieta.id_macro || 0;
        this.calorias = nuevo_macro_dieta.calorias || 0;
        this.proteinas = nuevo_macro_dieta.proteinas || 0;
        this.carbohidratos = nuevo_macro_dieta.carbohidratos || 0;
        this.grasas = nuevo_macro_dieta.grasas || 0;
    }
    save() {
        return db.execute(`
            INSERT INTO macronutrientes(calorias, proteinas, carbohidratos, grasas)
            VALUES (?, ?, ?, ?)
        `, [this.calorias, this.proteinas, this.carbohidratos, this.grasas])
    }
    static fetchOne(id) {
        return db.execute(
            `
            SELECT * from macronutrientes where id_macro = (SELECT id_macro
                FROM dieta
                WHERE id_dieta=?)
        `, [id])

    }

}