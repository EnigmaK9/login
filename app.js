const express = require('express');
const app = express();
const port = 3000;

// Configuración de Express
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
  // Aquí puedes agregar la lógica de autenticación
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'admin' && password === 'password') {
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

