const sequelize = require('sequelize');
const producto = require('../models').producto;
const productoSubarea = require('../models').producto_subarea;


module.exports = {


   async Create (req, res){
    
        try {
            const result = await producto.sequelize.transaction(async (t) => {
            const createdProducto = await producto
                .create({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    unidad_id: req.body.unidad_id
                });

                for (const subarea_id of req.body.subareas_ids) {
                    await productoSubarea.create({
                        producto_id: createdProducto.id,
                        subarea_id: subarea_id,
                    });
                  }
         });

         return res.status(201).send(`Data successfully saved`);
          
        } catch (error) {
            console.log("error: ", error);
            res.status(400).send(error)
            
          
          }
    },
    async createProd (req, res){
    
        try {
        await producto.sequelize.transaction(async (t) => {
           await producto
                .create({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    unidad_id: req.body.unidad_id
                });
         });

         return res.status(201).json({
            ok: true,
            message: 'Producto creado correctamente',
            data: producto
        });
          
        } catch (error) {
            res.status(400).send(error)
          
          }
    },
    list(req, res) {
        let limit = 5;
        let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
            return producto
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
        update(req, res) {
            return producto
            .update({
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    unidad_id: req.body.unidad_id
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(producto => res.status(200).json({
                ok: true,
                message: 'Producto actualizado correctamente'
            }))
            .catch(error => res.status(400).send(error));
        },
        delete(req, res) {
            return producto
            .update({
                activo: false
            }, {
                where: {
                    id: req.params.id,
                    activo: true
              }
            })
            .then(producto => res.status(200).json({
                ok: true,
                message: 'Producto eliminado correctamente',
                data: producto
            }))
            .catch(error => res.status(400).send(error));
        }
};