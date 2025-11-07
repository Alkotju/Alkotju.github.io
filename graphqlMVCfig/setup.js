// Этот скрипт предназначен для изначального заполнения базы данных тестовыми данными

//Импортируем модель Figure и экземпляр sequelize
const Figure = require('./models/figure');
const sequelize = require('./config/database');
const { description } = require('./graphql/schema');

//
const sampleFigures = [
    {
    name: 'Wooden Dog Figure',
    description: 'A cute wooden dog figurine that inspires creativity and storytelling.',
    price: 18.50,
    material: 'Wood',
    size: '10 x 6 x 8 cm',
    image: '/img/dog.jpg'
    },
    {
    name: 'Clay Cat Statue',
    description: 'A hand-crafted clay cat figure, perfect for decorating a cozy room.',
    price: 22.30,
    material: 'Clay',
    size: '9 x 5 x 7 cm',
    image: '/img/cat.jpg'
    },
    {
    name: 'Metal Elephant Figurine',
    description: 'A sturdy metallic elephant figure symbolizing strength and wisdom.',
    price: 27.99,
    material: 'Metal',
    size: '12 x 8 x 10 cm',
    image: '/img/elephant.jpg'
    },
    {
    name: 'Resin Dolphin Sculpture',
    description: 'A smooth resin dolphin figure that captures the elegance of the ocean.',
    price: 19.75,
    material: 'Resin',
    size: '11 x 5 x 7 cm',
    image: '/img/dolphin.jpg'
    },
    {
    name: 'Ceramic Bird Ornament',
    description: 'A colorful ceramic bird figure that brings charm to any space.',
    price: 16.40,
    material: 'Ceramic',
    size: '8 x 4 x 6 cm',
    image: '/img/bird.jpg'
    },
    {
    name: 'Stone Turtle Sculpture',
    description: 'A durable stone turtle figurine, a symbol of longevity and peace.',
    price: 24.60,
    material: 'Stone',
    size: '10 x 7 x 5 cm',
    image: '/img/turtle.jpg'
    }

];

//Функция для синхронизации базы данных и заполнения данными
const setupDatabase = async () => {
    try {
        //Синхронизируем все модели с базой данных.
        //{force:true} удалит существующие таблицы и создаст их заново.
        // это полезно для сброса данных во время разработки.
        await sequelize.sync({force:true});
        console.log('База данных и таблицы успешно созданы!');

        //Массово добавляем все игрушки из нашего массива в талицу Figure
        await Figure.bulkCreate(sampleFigures);
        console.log('Тестовые данные успешно загружены!')
    } catch (error) {
        console.error('Ошибка при настройке базы данных:', error);

    }finally {
        //Закрываем соединение с базой данных после завершения работы 
        await sequelize.close();
        console.log('Соединение с базой данных закрыто.');
    }
};

//Вызываем функцию для выполнения настройки
setupDatabase();