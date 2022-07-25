/* Controllers */
const productoController = require('../controllers/productoController');
const areaController = require('../controllers/areaController');
const unidadController = require('../controllers/unidadController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   
    app.get('/api/productos/list', productoController.list);
    app.get('/api/productos/find/producto/:name', productoController.find);
    app.post('/api/productos/create', productoController.Create);

    app.get('/api/areas/list', areaController.list);
    app.get('/api/areas/find/area/:name', areaController.find);
    app.post('/api/areas/create', areaController.Create);

    app.get('/api/unidades/list', unidadController.list);
    app.get('/api/unidades/find/unidad/:name', unidadController.find);
    app.post('/api/unidades/create', unidadController.Create);
}