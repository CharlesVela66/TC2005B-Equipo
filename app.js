const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasHome = require('./routes/home.routes');

app.use('/', rutasHome);

const rutasBitacora = require('./routes/bitacora.routes');

app.use('/home', rutasBitacora);

const rutasDieta = require('./routes/dietas.routes');

app.use('/dietas', rutasDieta);

const rutasRutinas = require('./routes/rutinas.routes');

app.use('/rutinas', rutasRutinas);

const rutasProgreso = require('./routes/progreso.routes');

app.use('/progreso', rutasProgreso);

const rutasMedidas = require('./routes/medidas.routes');

app.use('/medidas', rutasMedidas);

const rutasPerfil = require('./routes/perfil.routes');

app.use('/perfil', rutasPerfil);

const rutasAdmin = require('./routes/admin.routes');

app.use('/admin', rutasAdmin);

app.use((request, response, next) => {
    console.log("Page not found!")
    response.status(404);
    
    //Envía la respuesta al cliente
    response.send('Lo sentimos, esta ruta no existe');
});

app.listen(3000);
