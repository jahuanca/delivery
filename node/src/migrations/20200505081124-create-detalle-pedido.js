'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DetallePedido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_persona: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Persona',
        key: 'id'
      }
    },
    id_pedido: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Pedido',
        key: 'id'
      }
    },
    id_producto: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {type: Sequelize.INTEGER, allowNull: false},
    precio: {type: Sequelize.DOUBLE, allowNull: false},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DetallePedido');
  }
};