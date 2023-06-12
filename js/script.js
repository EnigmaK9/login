const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;

// Configuración de Passport.js
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Aquí puedes implementar la lógica de autenticación
    // y verificar las credenciales del usuario en tu base de datos
    if (username === 'admin' && password === 'password') {
      return done(null, { username: 'admin' });
    } else {
      return done(null, false, { message: 'Credenciales inválidas' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, { username: username });
});

// Configuración de Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('express-session')({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })
);

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
