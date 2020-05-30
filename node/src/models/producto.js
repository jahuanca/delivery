'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id_categoria: {type: DataTypes.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}},
    id_estado: {type: DataTypes.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}},
    id_negocio: {type: DataTypes.INTEGER, allowNull: false, validatE: {isInt: true, min: 1}},
    nombre: {type: DataTypes.STRING(100), allowNull: false, validate: {notEmpty: true, len: [1,100]}},
    descripcion: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    precio: {type: DataTypes.DOUBLE, allowNull: false, validate: {isDecimal: true, min: 0}},
    cantidad: {type: DataTypes.INTEGER, allowNull: false, validate: {isInt: true, min:1}},
    foto_1: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_2: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    foto_3: {type: DataTypes.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: DataTypes.DATE, allowNull: true},

    accion: {type: DataTypes.VIRTUAL},
    usuario: {type: DataTypes.VIRTUAL},
    ip: {type: DataTypes.VIRTUAL},
    accion_usuario: {type: DataTypes.VIRTUAL}
  }, {
    freezeTableName: true,
    tableName: 'Producto'
  });
  Producto.associate = function(models) {
    Producto.belongsTo(models.Categoria, {foreignKey: 'id_categoria'});
    Producto.belongsTo(models.Estado, {foreignKey: 'id_estado'});
    Producto.belongsTo(models.Negocio, {foreignKey: 'id_negocio'});
  };
  return Producto;
};