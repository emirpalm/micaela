const sequelize = require('sequelize');
const producto = require('../models').producto;
const productoArea = require('../models').producto_area;


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

                for (const trainee of req.body.areas_ids) {
                    await productoArea.create({
                        producto_id: createdProducto.id,
                        area_id: trainee,
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