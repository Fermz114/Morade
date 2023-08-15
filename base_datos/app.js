const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/morade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

app.use(bodyParser.json());
app.use(cors());

// Método para verificar las credenciales y autenticar al usuario
async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }

  return false;
}

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ success: true, message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).send('Error en el registro');
  }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Usuario y/o contraseña incorrecta' });
    }
  } catch (error) {
    res.status(500).send('Error en el inicio de sesión');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
