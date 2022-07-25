'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subarea.belongsTo(models.area,
        {
            as: 'area',
            foreignKey: 'area_id',
        }
    );
    }
  }
  subarea.init({
    nombre: DataTypes.STRING,
    area_id: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'subarea',
  });
  return subarea;
};