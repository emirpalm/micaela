const Sequelize = require('sequelize');
const area = require('../models').area;
const subarea = require('../models').subarea;

module.exports = {
    Create(req, res) {
        return area
        .create({
            nombre: req.body.nombre
        })
        .then(area => res.status(201).send(area))
        .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        let limit = 5;
        let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
            return area
            .findAndCountAll({
                where: {
                    activo: true
              },
              offset: offset,
              limit: limit,
              order: [
                   ['createdAt', 'ASC']
                ]
            })
            .then(area => res.status(200).send(area))
            .catch(error => res.status(400).send(error));
    },
    find(req, res) {
            return area
            .findOne({
                where: {
                    nombre: req.params.name,
                    activo: true
              },
              include: [{
                model: subarea,
                as: 'subarea',
                where: {
                    activo: true
              },
             }]
            })
            .then(area => res.status(200).send(area))
            .catch(error => res.status(400).send(error));
        },
    update(req, res) {
            return area
            .update({
                nombre: req.body.nombre
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(area => res.status(200).json({
                ok: true,
                message: 'Area actualizada correctamente',
            }))
            .catch(error => res.status(400).send(error));
        },
    delete(req, res) {
            return area
            .update({
                activo: false
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(area => res.status(200).json({
                ok: true,
                message: 'Area eliminada correctamente',
            }))
            .catch(error => res.status(400).send(error));
        }
};