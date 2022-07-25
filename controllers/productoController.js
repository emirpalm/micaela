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