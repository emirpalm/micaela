'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto_area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      producto_area.belongsTo(models.producto,
        {
            as: 'producto',
            foreignKey: 'producto_id',
        }
    );
      producto_area.belongsTo(models.area,
        {
            as: 'area',
            foreignKey: 'area_id',
        }
    );
    }
  }
  producto_area.init({
    producto_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'producto_area',
  });
  return producto_area;
};