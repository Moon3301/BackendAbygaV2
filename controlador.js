const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
app.use('/api', router); // Prefijo 'api' para tus rutas

const configAzure = {
  server: 'database-sql.database.windows.net',
  database: 'database_SQLSERVER',
  user: 'admin-abyga',
  password: 'Paildramon12',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

// Conexión a la base de datos de Azure SQL
sql.connect(configAzure)
  .then(() => {
    console.log('Conexión exitosa a la base de datos de Azure');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos de Azure:', err);
  });

// Define tus rutas de API aquí
router.get('/GetDataUsuario', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Usuario`;
    console.log('Resultado de la consulta:', result.recordset);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});