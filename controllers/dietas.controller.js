const Dieta = require('../models/dietas.model');
const DietaAlimento = require('../models/dieta_alimento.model');
const Macro = require('../models/macro.model');
const Micro = require('../models/micronutrientes.model');
const Cliente = require('../models/clientes.model');

exports.get_buscar = (request, response, next) => {
    Dieta.find(request.params.valor, request.session.nombre_usuario)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json({ dietas: rows });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Internal Server Enrror" });
        });
}

exports.explorar_dietas = (request, response, next) => {
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje = '';
    }
    Dieta.fetchAll(request.session.nombre_usuario)
        .then(([dietas, fieldData]) => {
            Dieta.fetchAllFavoritas(request.session.nombre_usuario)
                .then(([dietasFav, fieldData]) => {
                    response.render('dietas/dietas', {
                        dietasFav: dietasFav,
                        mensaje: mensaje,
                        dietas: dietas,
                        isLoggedIn: request.session.isLoggedIn || false,
                        nombre: request.session.nombre_usuario || '',
                        rol: request.session.rol,
                    });
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

exports.dieta_detalles = (request, response, next) => {
    request.session.id_dieta = request.params.id;
    Dieta.fetchOne(request.params.id)
        .then(([dieta, fieldData]) => {
            //   console.log(dieta),
            DietaAlimento.fetchOne(request.params.id)
                .then(([dieta_alimento, fieldData]) => {
                    //  console.log(dieta_alimento),
                    Macro.fetchOne(request.params.id)
                        .then(([macro, fieldData]) => {
                            //   console.log(macro),
                            Micro.fetchOne(request.params.id)
                                .then(([micro, fieldData]) => {
                                    //  console.log(micro),
                                    response.render('dietas/dieta_detalles', {
                                        dietas: dieta,
                                        dieta_alimentos: dieta_alimento,
                                        macronutriente: macro,
                                        micronutriente: micro,
                                        isLoggedIn: request.session.isLoggedIn || false,
                                        nombre: request.session.nombre_usuario || '',
                                        rol: request.session.rol,
                                    })
                                })
                                .catch(error => console.log(error));
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}



exports.seleccionar_dieta = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
        .then(([cliente, fieldData]) => {
            Dieta.fetchOne(request.session.id_dieta)
                .then(([dieta, fieldData]) => {
                    if (cliente[0].id_dieta == dieta[0].id_dieta) {
                        request.session.mensaje = "Esta dieta ya la tienes seleccionada";
                    }
                    else {
                        Cliente.saveDieta(dieta[0].id_dieta, cliente[0].id_cliente);
                    }
                    response.redirect('/dietas');
                })
                .catch(error => console.log(error))
                .catch(error => console.log(error));
        })

}

exports.eliminar_dieta = (request, response, next) => {
    const id_dieta = request.session.id_dieta;
    console.log(id_dieta);
    Dieta.delete(id_dieta)
        .then(([dieta, fieldData]) => {
            Dieta.fetchAll(request.session.nombre_usuario)
                .then(([dietas, fieldData]) => {
                    let mensaje = "Dieta eliminada exitosamente"
                    response.render('dietas/dietas', {
                        dieta: dieta,
                        dietas: dietas,
                        isLoggedIn: request.session.isLoggedIn || false,
                        nombre: request.session.nombre_usuario || '',
                        rol: request.session.rol,
                        mensaje: mensaje
                    });

                })
        })
        .catch(error => console.log(error));
}

exports.registrar_dieta_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
        .then(([cliente, fieldData]) => {
            console.log("HOLA SOY EL CLIENTE")
            console.log(cliente);
            Dieta.saveFavorita(cliente[0].id_cliente, request.body.id_dieta)
                .then(([rows, fieldData]) => {
                    response.redirect('/dietas');
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

exports.eliminar_dieta_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
        .then(([cliente, fieldData]) => {
            Dieta.deleteFavorita(cliente[0].id_cliente, request.body.id_dieta_fav)
                .then(([rows, fieldData]) => {
                    response.redirect('/dietas');
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

exports.get_editar = (request, response, next) => {
    Macro.fetchOne(request.params.id)
        .then(([macroData, fieldData]) => {
            if (macroData.length == 1) {
                const macro = new Macro({
                    calorias: macroData[0].calorias,
                    proteinas: macroData[0].proteinas,
                    carbohidratos: macroData[0].carbohidratos,
                    grasas: macroData[0].grasas
                });

                Micro.fetchOne(request.params.id)
                    .then(([microData, fieldData]) => {
                        if (microData.length >= 0) {

                            const micro = new Micro({
                                ceniza: microData[0].ceniza,
                                fibra_total: microData[0].fibra_total,
                                calcio: microData[0].calcio,
                                fosforo: microData[0].fosforo,
                                hierro: microData[0].hierro,
                                tiamina: microData[0].tiamina,
                                riboflavina: microData[0].riboflavina,
                                niacina: microData[0].niacina,
                                vit_c: microData[0].vit_c,
                                vit_a: microData[0].vit_a,
                                acgrasosmin: microData[0].acgrasosmin,
                                acgrasospoli: microData[0].acgrasospoli,
                                acgrasossat: microData[0].acgrasossat,
                                colesterol: microData[0].colesterol,
                                potasio: microData[0].potasio,
                                sodio: microData[0].sodio,
                                zinc: microData[0].zinc,
                                magnesio: microData[0].magnesio,
                                vit_b6: microData[0].vit_b6,
                                vit_b12: microData[0].vit_b12,
                                acfolico: microData[0].acfolico,
                                folatoeq: microData[0].folatoeq
                            });

                            Dieta.fetchOne(request.params.id)
                                .then(([dietaData, fieldData]) => {
                                    if (dietaData.length >= 0) {
                                        const dieta = new Dieta({
                                            nombre: dietaData[0].nombre_dieta,
                                            id_macro: dietaData[0].id_macro,
                                            id_micro: dietaData[0].id_micro,
                                            Url_image: dietaData[0].Url_image,
                                        });

                                        DietaAlimento.fetchOne(request.params.id)
                                            .then(([dietaAlimentoData, fieldData]) => {
                                                if (dietaAlimentoData.length >= 0) {
                                                    const dietaAlimento = new DietaAlimento({
                                                        id_dieta: dietaAlimentoData[0].id_dieta,
                                                        nombre: dietaAlimentoData[0].nombre,
                                                        medida: dietaAlimentoData[0].medida,
                                                        cantidad: dietaAlimentoData[0].cantidad
                                                    });

                                                    Dieta.fetchAll(request.session.nombre_usuario)
                                                        .then(([rows, fieldData]) => {
                                                            DietaAlimento.fetchAll(request.params.id)
                                                                .then(([dietaAlimentoData, fieldData]) => {
                                                                    Micro.fetchAll(request.params.id)
                                                                        .then(([microData, fieldData]) => {
                                                                            Macro.fetchAll(request.params.id)
                                                                                .then(([macroData, fieldData]) => {
                                                                                    response.render('dietas/editar_d', {
                                                                                        dietas: rows,
                                                                                        dietaAlimento: dietaAlimentoData,
                                                                                        macro: macroData,
                                                                                        micro: microData,
                                                                                        isLoggedIn: request.session.isLoggedIn || false,
                                                                                        nombre: request.session.nombre_usuario || '',
                                                                                        rol: request.session.rol,
                                                                                        dieta: dieta,
                                                                                        dietaAlimento: dietaAlimento,
                                                                                        micro: micro,
                                                                                        macro: macro,
                                                                                    });
                                                                                })
                                                                                .catch(error => console.log(error));
                                                                        })
                                                                        .catch(error => console.log(error));
                                                                })
                                                                .catch(error => console.log(error));
                                                        })
                                                        .catch(error => console.log(error));
                                                } else {
                                                    response.redirect('/dietas/editar_d');
                                                }
                                            })
                                            .catch(error => console.log(error));
                                    } else {
                                        response.redirect('/dietas/editar_d');
                                    }
                                })
                                .catch(error => console.log(error));
                        } else {
                            response.redirect('/dietas/editar_d');
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                response.redirect('/dietas/editar_d');
            }
        })
        .catch(error => console.log(error));
};



exports.post_editar = (request, response, next) => {
    const macroId = request.params.id_macro;
    const calorias = request.body.calorias;
    const proteinas = request.body.proteinas;
    const carbohidratos = request.body.carbohidratos;
    const grasas = request.body.grasas;
    Macro.fetchOne(macroId)
        .then(([macroData, fieldData]) => {
            if (macroData.length == 1) {
                const updatedMacro = new Macro({
                    id_macro: macroId,
                    calorias: calorias,
                    proteinas: proteinas,
                    carbohidratos: carbohidratos,
                    grasas: grasas,
                });
                updatedMacro.update()
                    .then(([rows, fieldData]) => {
                        request.session.mensaje = "Los macros fueron actualizados exitosamente.";

                    })
                    .catch((error) => {
                        console.log(error);
                        request.session.mensaje = "Error al actualizar los macros.";
                        response.redirect('/dietas');
                    });
                const microId = request.params.id_micro;
                const ceniza = request.body.ceniza;
                const fibra_total = request.body.fibra_total;
                const calcio = request.body.calcio;
                const fosforo = request.body.fosforo;
                const hierro = request.body.hierro;
                const tiamina = request.body.tiamina;
                const riboflavina = request.body.riboflavina;
                const niacina = request.body.niacina;
                const vit_c = request.body.vit_c;
                const vit_a = request.body.vit_a;
                const acgrasosmin = request.body.acgrasosmin;
                const acgrasospoli = request.body.acgrasospoli;
                const acgrasossat = request.body.acgrasossat;
                const colesterol = request.body.colesterol;
                const potasio = request.body.potasio;
                const sodio = request.body.sodio;
                const zinc = request.body.zinc;
                const magnesio = request.body.magnesio;
                const vit_b6 = request.body.vit_b6;
                const vit_b12 = request.body.vit_b12;
                const acfolico = request.body.acfolico;
                const folatoeq = request.body.folatoeq;
                Micro.fetchOne(microId)
                    .then(([microData, fieldData]) => {
                        if (microData.length >= 0) {
                            const updatedMicro = new Micro({
                                id_micro: microId,
                                ceniza: ceniza,
                                fibra_total: fibra_total,
                                calcio: calcio,
                                fosforo: fosforo,
                                hierro: hierro,
                                tiamina: tiamina,
                                riboflavina: riboflavina,
                                niacina: niacina,
                                vit_c: vit_c,
                                vit_a: vit_a,
                                acgrasosmin: acgrasosmin,
                                acgrasospoli: acgrasospoli,
                                acgrasossat: acgrasossat,
                                colesterol: colesterol,
                                potasio: potasio,
                                sodio: sodio,
                                zinc: zinc,
                                magnesio: magnesio,
                                vit_b6: vit_b6,
                                vit_b12: vit_b12,
                                acfolico: acfolico,
                                folatoeq: folatoeq,
                            });
                            updatedMicro.update()
                                .then(([rows, fieldData]) => {
                                    request.session.mensaje = "Los micros fueron actualizados exitosamente.";
                                })
                                .catch((error) => {
                                    console.log(error);
                                    request.session.mensaje = "Error al actualizar los micros.";
                                    response.redirect('/dietas');
                                });
                            const dietaId = request.params.id;
                            const nombre = request.body.nombre_dieta;
                            const id_macro = macroId;
                            const id_micro = microId;
                            const Url_image = request.body.id_macro;

                            Dieta.fetchOne(dietaId)
                                .then(([dietaData, fieldData]) => {
                                    if (dietaData.length == 1) {
                                        const updatedDieta = new Dieta({
                                            id_dieta: dietaId,
                                            nombre: nombre,
                                            id_macro: id_macro,
                                            id_micro: id_micro,
                                            Url_image: Url_image,
                                        });
                                        updatedDieta.update()
                                            .then(([rows, fieldData]) => {
                                                request.session.mensaje = "La dieta fue actualizada exitosamente.";
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                request.session.mensaje = "Error al actualizar la dieta.";
                                                response.redirect('/dietas');
                                            });
                                            const alimentos = request.body.alimentos;
                            
                                        const nombreali = request.body.nombre_alimento;
                                        const medida = request.body.medida;
                                        const cantidad = request.body.medida;
                                        DietaAlimento.fetchOne(dietaId)
                                        
                                            .then(([dietaAlimentoData, fieldData]) => {
                                                if (dietaAlimentoData.length >= 0) {
                                                    const updatedDietaAlimento = new DietaAlimento({
                                                        id_dieta: dietaId,
                                                        nombre: nombreali,
                                                        medida: medida,
                                                        cantidad: cantidad,
                                                    });
                                                    updatedDietaAlimento.update()
                                                        .then(([rows, fieldData]) => {
                                                            request.session.mensaje = "Los alimentos fueron actualizados exitosamente.";
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                            request.session.mensaje = "Error al actualizar los alimentos.";
                                                            response.redirect('/dietas');
                                                        });
                                                }
                                            })

                                        
                                            .then(() => {
                                                response.redirect('/dietas/dietas');
                                            })
                                            .catch(error => console.log(error));
                                    }
                                })
                        }
                    })
            }
        })
};




exports.get_nueva = (request, response, next) => {
    Dieta.fetchAll(request.session.nombre_usuario)
        .then(([dietas, fieldData]) => {
            Dieta.fetchAllFavoritas(request.session.nombre_usuario)
                .then(([dietasFavs, fieldData]) => {
                    response.render('dietas/agregar_dietas', {
                        dietas: dietas,
                        dietasFavs: dietasFavs,
                        isLoggedIn: request.session.isLoggedIn || false,
                        nombre: request.session.nombre_usuario || '',
                        rol: request.session.rol,
                    });
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}



exports.post_nueva = (request, response, next) => {
    const newMacro = new Macro({
        calorias: request.body.calorias,
        proteinas: request.body.proteinas,
        carbohidratos: request.body.carbohidratos,
        grasas: request.body.grasas
    });

    newMacro.save()
        .then(([macro, fieldData]) => {
            const id_macro = macro.insertId;

            const newMicro = new Micro({
                ceniza: request.body.ceniza,
                fibra_total: request.body.fibra_total,
                calcio: request.body.calcio,
                fosforo: request.body.fosforo,
                hierro: request.body.hierro,
                tiamina: request.body.tiamina,
                riboflavina: request.body.riboflavina,
                niacina: request.body.niacina,
                vit_c: request.body.vit_c,
                vit_a: request.body.vit_a,
                acgrasosmin: request.body.acgrasosmin,
                acgrasospoli: request.body.acgrasospoli,
                acgrasossat: request.body.acgrasossat,
                colesterol: request.body.colesterol,
                potasio: request.body.potasio,
                sodio: request.body.sodio,
                zinc: request.body.zinc,
                magnesio: request.body.magnesio,
                vit_b6: request.body.vit_b6,
                vit_b12: request.body.vit_b12,
                acfolico: request.body.acfolico,
                folatoeq: request.body.folatoeq
            });

            newMicro.save()
                .then(([micro, fieldData]) => {
                    const id_micro = micro.insertId;
                    const newDieta = new Dieta({
                        nombre: request.body.nombre_dieta,
                        id_macro: id_macro,
                        id_micro: id_micro,
                        Url_image: request.files && request.files.imagen ? request.files.imagen[0].filename : '',
                    });
                    console.log(newDieta);
                    newDieta.save()
                        .then(([dieta, fieldData]) => {
                            const id_dieta = dieta.insertId;

                            // Recorre los alimentos enviados en el formulario
                            const alimentos = request.body.alimentos;
                            const promises = alimentos.map(alimento => {
                                // Guarda cada alimento en la tabla 'dietasalimentos'
                                const newDietaAlimento = new DietaAlimento({
                                    id_dieta: id_dieta,
                                    nombre: alimento.nombre_alimento,
                                    medida: alimento.medida_alimento,
                                    cantidad: alimento.cantidad_alimento
                                });
                                return newDietaAlimento.save();
                            });

                            // Espera a que todos los ejercicios se guarden en la base de datos
                            return Promise.all(promises);
                        })
                        .then(() => {
                            // Redirige a la página de éxito o a donde desees después de guardar la rutina y los ejercicios
                            response.redirect('/home');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};

