/* Controllers */
const productoController = require('../controllers/productoController');
const areaController = require('../controllers/areaController');
const unidadController = require('../controllers/unidadController');
const subareaController = require('../controllers/subAreaController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));
   
    app.get('/api/productos/list', productoController.list);
    app.get('/api/productos/find/:name', productoController.find);
    app.put('/api/productos/update/producto/:id', productoController.update);
    app.delete('/api/productos/delete/producto/:id', productoController.delete);
    app.post('/api/productos/create', productoController.Create);
    app.post('/api/productos/create/producto', productoController.createProd);

    app.get('/api/areas/list', areaController.list);
    app.get('/api/areas/find/:name', areaController.find);
    app.put('/api/areas/update/area/:id', areaController.update);
    app.delete('/api/areas/delete/area/:id', areaController.delete);
    app.post('/api/areas/create', areaController.Create);

    app.get('/api/unidades/list', unidadController.list);
    app.get('/api/unidades/find/:name', unidadController.find);
    app.put('/api/unidades/update/unidad/:id', unidadController.update);
    app.delete('/api/unidades/delete/unidad/:id', unidadController.delete);
    app.post('/api/unidades/create', unidadController.Create);

    app.get('/api/subareas/list', subareaController.list);
    app.get('/api/subareas/find/:name', subareaController.find);
    app.put('/api/subareas/update/subarea/:id', subareaController.update);
    app.delete('/api/subareas/delete/subarea/:id', subareaController.delete);
    app.post('/api/subareas/create', subareaController.Create);
}