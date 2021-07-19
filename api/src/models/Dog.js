const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false
  });
};
