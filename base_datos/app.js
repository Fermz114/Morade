
//Importación de modulos
const express = require('express'); //Framework web que facilita la creación de API y rutas.
const mongoose = require('mongoose'); //Biblioteca de MongoDB para la base de datos.
const bodyParser = require('body-parser'); //Middleware para analizar las solicitudes entrantes.
const bcrypt = require('bcrypt'); // Biblioteca para el cifrado de contraseñas.
const cors = require('cors'); // Middleware para habilitar el manejo de solicitudes cruzadas

//Configuración inicial del servidor
const app = express(); //Se crea una instancia de la aplicación Express
const port = 3000; //Se establece el número de puerto en el que el servidor escuchará

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/morade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  residencia: String,
});


//middleware
app.use(bodyParser.json());
app.use(cors());

// Método para verificar las credenciales y autenticar al usuario
async function authenticateUser(email, password) {
  const user = await User.findOne({ email }); //se busca en la base de datos un documento de usuario 
  //que coincida con el correo electrónico proporcionado. 
//La función User.findOne busca en la colección de usuarios (User) un documento que tenga el campo 
  //email igual al valor de email pasado como argumento. Debido a que User.findOne devuelve una 
  //promesa, se utiliza await para esperar hasta que la búsqueda se complete antes de continuar.
  if (user && (await bcrypt.compare(password, user.password))) {
    //se utiliza await para esperar hasta que la búsqueda se complete antes de continuar.
    return true;
  }

  return false;
  //se verifica si la búsqueda de usuario arrojó un resultado válido. Si no se encontró 
  //un usuario con el correo electrónico proporcionado, la verificación falla y la función devuelve false.
}

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
  const { name, email, password, residencia } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    residencia,
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

app.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Obtener solo los campos de nombre y correo
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error al obtener la lista de usuarios');
  }
});

// Ruta para la solicitud de recuperación de contraseña
app.post('/olvido', async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).send('Error al actualizar la contraseña');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});