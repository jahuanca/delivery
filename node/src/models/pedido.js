'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    id_cliente: {type: DataTypes.INTEGER, allowNull: false},
    id_trabajador: {type: DataTypes.INTEGER, allowNull: false},
    monto: {type: DataTypes.DOUBLE, allowNull: false, validate: {min: 0}},
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
    tableName: 'Pedido'
  });
  Pedido.associate = function(models) {
    Pedido.belongsTo(models.Cliente, {foreignKey: 'id_cliente'});
    Pedido.belongsTo(models.Trabajador, {foreignKey: 'id_trabajador'});
  };
  return Pedido;
};