const express = require('express');
const session = require('express-session');
const passport = require('passport');



const app = express();
app.use(session({ secret: 'cats' } ));
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/', (request, response) => {
    response.send('<a href="/auth/google">Authenticate with Google</a>')
});*/

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (request, response) => {
    response.send('Algo salió mal...')
});
  
app.get('/protected', isLoggedIn, (request, response) => {
    response.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (request, response) => {
    request.logOut();
    request.send('Goodbye!');
})

app.listen(3000, ()   => console.log('Listening on : 3000'));