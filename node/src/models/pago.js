'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    id_forma: {type: DataTypes.INTEGER, allowNull: false},
    id_pedido: {type: DataTypes.INTEGER, allowNull: false},
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
    tableName: 'Pago'
  });
  Pago.associate = function(models) {
    Pago.belongsTo(models.FormaPago, {foreignKey: 'id_pago'});
    Pago.belongsTo(models.Pedido, {foreignKey: 'id_pedido'});
  };
  return Pago;
};