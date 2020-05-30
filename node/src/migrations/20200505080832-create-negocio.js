'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Negocio', {
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
    id_estado: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Estado',
        key: 'id'
      }
    },
    id_rubro: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Rubro',
        key: 'id'
      }
    },
    nombre: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    delivery: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Negocio');
  }
};