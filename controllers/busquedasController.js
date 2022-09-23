const Sequelize = require('sequelize');
const unidad = require('../models').unidad;
const subarea = require('../models').subarea;
const area = require('../models').area;
const producto = require('../models').producto;
const Op            = Sequelize.Op;


module.exports = {

    async getTodo(req, res ) {
    
        const [ unidades, subareas, areas, productos ] = await Promise.all([
            unidad.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + req.params.busqueda + '%'
                    },
                    activo: true
              }
            }),
            subarea.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + req.params.busqueda + '%'
                    },
                    activo: true
              }
            }),
            area.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + req.params.busqueda + '%'
                    },
                    activo: true
              }
            }),
            producto.findAll({
                where: {
                    nombre: {
                        [Op.like]: '%' + req.params.busqueda + '%'
                    },
                    activo: true
              }
            })
        ]);
    
        res.json({
            ok: true,
            unidades,
            subareas,
            areas,
            productos
        })
    
    }

};