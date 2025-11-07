// Импортируем необходимые типы данных из Sequelize
const {DataTypes} = require('sequelize');
// Импортируем экземпляр Sequelize из файла конфигурации
const sequelize  = require('../config/database');
const { description } = require('../graphql/schema');

// Определяем модель 'Toy'
const Toy = sequelize.define('Toy', {
    // Поле id будет создано автоматически как первичный ключ

    //Название игрушки
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Описание игрушки
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Цена игрушки
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    //Путь к изображению игрушки
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Экспортируем модель Toy
module.exports = Toy;