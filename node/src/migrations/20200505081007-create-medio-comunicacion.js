'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedioComunicacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    id_tipo: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'TipoMedioComunicacion',
        key: 'id'
      }
    },
    id_cliente: {type: Sequelize.INTEGER, allowNull: false
      ,references:{
        model: 'Cliente',
        key: 'id'
      }
    },
    dato: {type: Sequelize.STRING(200), allowNull: true, validate: {notEmpty: true, len: [1,200]}},
    estado: {type: Sequelize.CHAR(1), allowNull: false, defaultValue: 'A',
      validate: {notEmpty: true, len: [1,1], isIn: [['A', 'I']], isAlpha: true}
    },
    createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Date.now},
    updatedAt: {type: Sequelize.DATE, allowNull: true}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MedioComunicacion');
  }
};