'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetallePedido = sequelize.define('DetallePedido', {
    id_persona: {type: DataTypes.INTEGER, allowNull: false},
    id_pedido: {type: DataTypes.INTEGER, allowNull: false},
    id_producto: {type: DataTypes.INTEGER, allowNull: false},
    cantidad: {type: DataTypes.INTEGER, allowNull: false},
    precio: {type: DataTypes.DOUBLE, allowNull: false},
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
    tableName: 'DetallePedido'
  });
  DetallePedido.associate = function(models) {
    DetallePedido.belongsTo(models.Persona, {foreignKey: 'id_persona'});
    DetallePedido.belongsTo(models.Pedido, {foreignKey: 'id_pedido'});
    DetallePedido.belongsTo(models.Producto, {foreignKey: 'id_producto'});
  };
  return DetallePedido;
};