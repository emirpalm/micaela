/* Controllers */
const productoController = require('../controllers/productoController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   
    app.get('/api/productos/list', productoController.list);
    app.get('/api/productos/find/producto/:name', productoController.find);
    app.post('/api/productos', productoController.Create);
}