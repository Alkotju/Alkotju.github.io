//Импортируем необходимые компоненты из библиотеки graphql
const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLNonNull} = require ('graphql');

// Импортируем нашу модель Figure
const Figure = require('../models/figure');
// const { describe } = require('node:test'); //неизвестное

// Определяем GraphQL тип для нащей модели Figure
// Это как бы "шаблон" для GraphQL, описывающий поля модели
const FigureType = new GraphQLObjectType({
    name: 'Figure',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        material: {type: GraphQLString},
        size: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        image: {type: GraphQLString}
    })
});


// Определяем корневые запросы(Queries)
// Это точки входа для получения данных
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        // Запрос для получения одной фигурки по ID
        figure: {
            type: FigureType,
            args: {id :{ type: new GraphQLNonNull(GraphQLID)}}, //Аргумент id обязателен
            resolve(parent, args){
                // Логика для получения данных из БД
                return Figure.findByPk(args.id);
            }
        },
        // Запрос для получения списка всех фигурок
        figures:{
            type: new GraphQLList(FigureType),
            resolve(parent, args){
                // Логика получения всех фигурок
                return Figure.findAll();
            }
        }
    }
});

//Определяем мутации(Mutations)
//Это точки входа для изменения данных (создание, обновление, удаление)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Мутация для добавления новой игрушки
        addFigure :{
            type: FigureType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                material: {type: new GraphQLNonNull(GraphQLString)},
                size:{type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: new GraphQLNonNull(GraphQLFloat)},
                image: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                // Создаем новую игрушку в базе данных
                const figure = new Figure({
                    name: args.name,
                    material: args.material,
                    size: args.size,
                    description: args.description,
                    price: args.price,
                    image: args.image
                });
                return figure.save();
            }
        },
        // Мутация для обновления игрушки 
        updateFigure: {
            type: FigureType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                material: {type: GraphQLString},
                size: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLFloat},
                image: { type: GraphQLString }
            },
            async resolve(parent, args){
                const figure = await Figure.findByPk(args.id);
                if (!figure){
                    throw new Error('Фигурка не найдена');
                }
                // Обновляем поля, если они были переданы в аргументах
                figure.name = args.name || figure.name;
                figure.material = args.material || figure.material;
                figure.size = args.size  || figure.size;
                figure.description = args.description || figure.description;
                figure.price = args.price || figure.price;
                figure.image = args.image || figure.image;
                return figure.save();
            }
        },
        //Мутация для удаления игрушки
        deleteFigure:{
            type: FigureType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                const figure = await Figure.findByPk(args.id);
                if (!figure){
                    throw new Error('Фигурка не найдена');
                }
                await figure.destroy();
                return figure;
            }
        }
    }
});

// Создаем и экспортируем схему GraphQL
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: Mutation
});