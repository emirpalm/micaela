const Sequelize = require('sequelize');
const subarea = require('../models').subarea;
const area = require('../models').area;

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
    list(_, res){
        return subarea.findAll({ 
            where: {
                activo: true
          },
            include: [{
              model: area,
              as: 'area'
           }]
    })
        .then(subarea => res.status(200).send(subarea))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return subarea
        .findOne({
            where: {
                nombre: req.params.name,
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
        .then(subarea => res.status(200).send(subarea))
        .catch(error => res.status(400).send(error));
    },
};