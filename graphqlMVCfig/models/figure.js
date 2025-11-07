// Импортируем необходимые типы данных из Sequelize
const {DataTypes} = require('sequelize');
// Импортируем экземпляр Sequelize из файла конфигурации
const sequelize  = require('../config/database');


// Определяем модель 'Figure'
const Figure = sequelize.define('Figure', {
    // Поле id будет создано автоматически как первичный ключ

    //Название фигурки
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Описание фигурки
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Цена фигурки
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Материал фигурки
    material: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Размеры фигурки 
    size:{
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    //Путь к изображению фигурки
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Экспортируем модель Figure
module.exports = Figure;