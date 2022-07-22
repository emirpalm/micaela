const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// Esta será nuestra entrada de aplicación. Configuracion de nuestro servidor aquí.
const http = require('http');
// Configurar la aplicación express
const app = express();
// Registro de solicitudes en la consola.
app.use(logger('dev'));
// Analizar los datos de las solicitudes entrantes (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Configuracion una ruta general predeterminada que envíe un mensaje de bienvenida en formato JSON.
app.get('*', (req, res) => res.status(200).send({
     message: 'Bienvenido a MICAELA',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;