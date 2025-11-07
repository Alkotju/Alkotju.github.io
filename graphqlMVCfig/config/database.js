//Импортируем Sequelize
const {Sequelize} = require('sequelize')

//Создаем новый экземпляр Sequelize для подключения к базе данных
// 'figure_store', 'root' и '' 
//имя вашей базы даных, имя пользователя и пароль для MySQL
const sequelize = new Sequelize('figure_store', 'root', '',{
    host: 'localhost',// Хост, на котором запущен ваш сервер MySQL ( обычно 'localhost')
    dialect: 'mysql' // Указываем, что мы используем MySQL
});


// Экспортируем созданный экземпляр sequelizeб чтобы использовать его в других частях приложения
module.exports = sequelize;