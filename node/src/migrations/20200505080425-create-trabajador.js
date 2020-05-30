'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trabajador', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_persona: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
      ,references:{
        model: 'Persona',
        key: 'id'
      }
    },
    id_delivery: {type: Sequelize.INTEGER, allowNull: false, validate: {isInt: true, min: 1}
      ,references:{
        model: 'Delivery',
        key: 'id'
      }
    },
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },

    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trabajador');
  }
};