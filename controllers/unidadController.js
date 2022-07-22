const Sequelize = require('sequelize');
const unidad = require('../models').unidad;


module.exports = {
    Create(req, res) {
        return unidad
        .create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        })
        .then(unidad => res.status(201).send(unidad))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
            return unidad
            .findAll({})
            .then(unidad => res.status(200).send(unidad))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
            return unidad
            .findOne({
                where: {
                    nombre: req.params.name,
                    activo: true
              }
            })
            .then(unidad => res.status(200).send(unidad))
            .catch(error => res.status(400).send(error));
        },
};