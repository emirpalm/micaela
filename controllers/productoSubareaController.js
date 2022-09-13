const Sequelize     = require('sequelize');
const Op            = Sequelize.Op;
const participacion = require('../models').participacion;
const usuario       = require('../models').usuario;
const juego         = require('../models').juego;
module.exports = {
  create(req, res) {
          // Usuario
          const responseUsuario = usuario.findOne({
               where: {
                   [Op.or]: [{
                        username: req.body.usuario
                   },{
                        id: req.body.usuario
                   }]
               }
          });
          // Juego
          const responseJuego = juego.findOne({
               where: {
                   [Op.or]: [{
                        name: req.body.juego
                   },{
                        id: req.body.juego
                   }]
               }
          });
          Promise
          .all ([responseUsuario, responseJuego])
          .then(responses => {
               return participacion
                   .create ({
                        usuario_id: responses[0].id,
                        juego_id: responses[1].id,
                        status: req.body.status, 
                   })
                   .then(participacion => res.status(200).send(participacion))
           })
           .catch(error => res.status(400).send(error));
     },
  list(req, res) {
     let limit = 5;
     let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
     return participacion.findAndCountAll({
           include: [{
                model: usuario,
                as: 'usuario'
           },{
                model: juego,
                as: 'juego'
           }],
           offset: offset,
           limit: limit,
           order: [
                ['createdAt', 'ASC']
             ]
     })
     .then(participacion => res.status(200).send(participacion))
     .catch(error => res.status(400).send(error))
  },

  find (req, res) {
     return participacion.findAll({
          where: {
                id: req.params.id,
          },
          include: [{
                model: usuario,
                as: 'usuario'
           },{
                model: juego,
                as: 'juego'
           }]
     })
     .then(participacion => res.status(200).send(participacion))
     .catch(error => res.status(400).send(error))
  },
};