/* Controllers */
const productoController = require('../controllers/productoController');
const areaController = require('../controllers/areaController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   
    app.get('/api/productos/list', productoController.list);
    app.get('/api/productos/find/producto/:name', productoController.find);
    app.post('/api/productos', productoController.Create);

    app.get('/api/areas/list', areaController.list);
    app.get('/api/areas/find/area/:name', areaController.find);
    app.post('/api/areas', areaController.Create);
}