const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: 2000-00-00,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.TEXT,
      defaultValue: "https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg",
    },
    platforms:
    {
      type: DataTypes.JSONB,
      allowNull:false,
    },
    isDataBase: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "true",
    }
  },   { timestamps: false, freezeTableName: true } ) ;
};
