'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pedido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_cliente: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Cliente',
        key: 'id'
      }
    },
    id_trabajador: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Trabajador',
        key: 'id'
      }
    },
    monto: {type: Sequelize.DOUBLE, allowNull: false, validate: {min: 0}},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pedido');
  }
};