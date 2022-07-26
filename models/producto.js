'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      producto.belongsTo(models.unidad,
        {
            as: 'unidads',
            foreignKey: 'unidad_id',
        }
    );
    }
  }
  producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    unidad_id: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'producto',
  });
  return producto;
};