const Sequelize = require('sequelize');
const area = require('../models').area;


module.exports = {
    Create(req, res) {
        return area
        .create({
            nombre: req.body.nombre
        })
        .then(area => res.status(201).send(area))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
            return area
            .findAll({})
            .then(area => res.status(200).send(area))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
            return area
            .findOne({
                nombre: req.params.name
            })
            .then(area => res.status(200).send(area))
            .catch(error => res.status(400).send(error));
        },
};