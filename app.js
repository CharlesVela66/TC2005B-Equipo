const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const isAuth = require('./util/is-auth');
const csrf = require('csurf');


const app = express();

// Middleware para actualizar la hora de última actividad de la sesión
app.use(function(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
      req.session.lastActive = Date.now();
    }
    next();
});
// Middleware para comprobar si la sesión ha expirado
app.use(function(req, res, next) {
    if (req.session && typeof req.session.lastActive !== 'undefined' && (Date.now() - req.session.lastActive) > 60000) {
      // La sesión ha expirado, redireccionar al usuario a la página de inicio de sesión
      res.redirect('/iniciar-sesion');
    } else {
      next();
    }
  });

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    cookie:{
        maxAge: 3600000 // Expira después de 1 hora de inactividad

    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

//CSRF Protection
const csrfProtection = csrf();
app.use(csrfProtection); 
app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

const rutasHome = require('./routes/home.routes');

app.use('/', rutasHome);

const rutasBitacora = require('./routes/bitacora.routes');

app.use('/home', isAuth, rutasBitacora);


const rutasDieta = require('./routes/dietas.routes');

app.use('/dietas', isAuth, rutasDieta);

const rutasRutinas = require('./routes/rutinas.routes');

app.use('/rutinas', isAuth, rutasRutinas);

const rutasEjercicios = require('./routes/ejercicios.routes');

app.use('/ejercicios', isAuth, rutasEjercicios);

const rutasAlimentos = require('./routes/alimentos.routes');

app.use('/alimentos', isAuth, rutasAlimentos);

const rutasProgreso = require('./routes/progreso.routes');

app.use('/progreso', isAuth, rutasProgreso);

const rutasMedidas = require('./routes/medidas.routes');

app.use('/medidas', isAuth, rutasMedidas);

const rutasPerfil = require('./routes/perfil.routes');

app.use('/perfil', isAuth, rutasPerfil);

const rutasAdmin = require('./routes/admin.routes');

app.use('/admin', isAuth, rutasAdmin);

app.use((request, response, next) => {
    console.log("Page not found!")
    response.status(404);
    
    //Envía la respuesta al cliente
    response.send('Lo sentimos, esta ruta no existe');
});

app.listen(3000);
