const cors = require('cors');
const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

/* =============================================================== */
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
/* =============================================================== */
// Conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cliente',
});

/* =============================================================== */
// Conexión a MySQL
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

/* =============================================================== */
// Ruta para obtener la información del profesor según la asignatura
app.get('/profesor', (req, res) => {
  const query = 'SELECT * FROM profesor';
  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar los datos del profesor:', err);
      res.status(500).json({ error: 'Error al obtener la información del profesor' });
      return;
    }
    console.log(results)
    res.status(200).json(results);
  });
});

/* =============================================================== */
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

