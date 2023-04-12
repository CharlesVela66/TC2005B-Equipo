const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('../auth');


exports.authGoogle = (request, response, next) => {
    passport.authenticate('google', { scope: ['email', 'profile'] })
    response.render('/auth/google', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
}

exports.googleCallback = (request, response, next) => {
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
    response.render('/google/callback', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
};

exports.googleFailure = (request, response, next) => {
    response.send('Algo salió mal...')
    response.render('/auth/failure', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
};

exports.googleProtected = (request, response, next) => {
    response.send(`Hello ${req.user.displayName}`)
    response.render('/protected', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
};

exports.googleProtected = (request, response, next) => {
    request.logOut();
    request.send('Goodbye!');
    response.render('/logout', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
};
