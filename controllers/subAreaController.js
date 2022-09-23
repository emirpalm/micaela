const Sequelize = require('sequelize');
const subarea = require('../models').subarea;
const area = require('../models').area;
const Op            = Sequelize.Op;

module.exports = {
    Create: (req, res) => {
        return subarea
        .create({
            nombre: req.body.nombre,
            area_id: req.body.area_id
        })
        .then(subarea => res.status(201).send(subarea))
        .catch(error => res.status(400).send(error));
    },
    list(req, res){
        let limit = 5;
        let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
        return subarea.findAndCountAll({ 
            where: {
                activo: true
          },
            include: [{
              model: area,
              as: 'area'
           }],
           offset: offset,
           limit: limit,
           order: [
                ['createdAt', 'ASC']
             ]
    })
        .then(subarea => res.status(200).send(subarea))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return subarea
        .findAll({
            where: {
                nombre: {
                    [Op.like]: '%' + req.params.name + '%'
                },
                activo: true
          },
          include: [{
            model: area,
            as: 'area',
            where: {
                activo: true
            }
         }]
        })
        .then(subarea => res.status(200).json({
            ok: true,
            resultados: subarea
        }))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return subarea
        .update({
            nombre: req.body.nombre,
            area_id: req.body.area_id
        }, {
            where: {
                id: req.params.id,
                activo: true
          }
        })
        .then(subarea => res.status(200).json({
            ok: true,
            message: 'SubArea actualizada correctamente',
        }))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return subarea
        .update({
            activo: false
        }, {
            where: {
                id: req.params.id,
                activo: true
          }
        })
        .then(subarea => res.status(200).json({
            ok: true,
            message: 'SubArea eliminada correctamente',
        }))
        .catch(error => res.status(400).send(error));
    }
};