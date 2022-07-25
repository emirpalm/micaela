'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto_subarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      producto_subarea.belongsTo(models.producto,
        {
            as: 'producto',
            foreignKey: 'producto_id',
        }
    );
    producto_subarea.belongsTo(models.subarea,
        {
            as: 'subarea',
            foreignKey: 'subarea_id',
        }
    );
    }
  }
  producto_subarea.init({
    producto_id: DataTypes.INTEGER,
    subarea_id: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'producto_subarea',
  });
  return producto_subarea;
};