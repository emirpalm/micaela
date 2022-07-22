const Sequelize = require('sequelize');
const producto = require('../models').producto;


module.exports = {
    Create(req, res) {
        return producto
        .create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            bid_unidad: req.body.bid_unidad
        })
        .then(producto => res.status(201).send(producto))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
            return producto
            .findAll({  
                where: {
                    activo: true
              }
            })
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
            return producto
            .findOne({
                where: {
                    nombre: req.params.name,
                    activo: true
              }
            })
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error));
        },
};