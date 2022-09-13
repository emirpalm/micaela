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
    list(req, res) {
        let limit = 5;
        let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
            return unidad
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
            .then(unidad => res.status(200).json({
                ok: true,
                resultados: unidad
            }))
            .catch(error => res.status(400).send(error));
        },
    update(req, res) {
            return unidad
            .update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(unidad => res.status(200).json({
                ok: true,
                message: 'Unidad actualizada correctamente',
            }))
            .catch(error => res.status(400).send(error));
        },
        delete(req, res) {
            return unidad
            .update({
                activo: false
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(unidad => res.status(200).json({
                ok: true,
                message: 'Unidad eliminada correctamente',
            }))
            .catch(error => res.status(400).send(error));
        }
};