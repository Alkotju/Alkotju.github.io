//Ожидаем пока вся HTML-страница будет загружена
document.addEventListener('DOMContentLoaded', () => {

    //Находим ключевые элементы на странице
    const figureList = document.getElementById('figure-list');
    const addFigureForm  = document.getElementById('add-figure-form');
    const editModal = document.getElementById('edit-modal');
    const editFigureForm = document.getElementById('edit-figure-form');
    const closeModalButton = document.querySelector('.close-button');

    //----Функция для выполнения GraphQL запросов----------
    const graphqlQuery = async (query, variables = {}) => {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables}),
        });
        return await response.json();
    };

    // --- Функция для отображения фигурок
    const displayFigures = (figures) => {
        figureList.innerHTML = ''; // очищаем текущий список
        figures.forEach(figure=>{
            const figureCard = `
            <div class = "figure-card" data-id="${figure.id}">
                <img src ="${figure.image}" alt="${figure.name}">
                <div class ="figure-card-content">
                    <h3>${figure.name}</h3>
                    <p>${figure.material}</p>
                    <p>${figure.size}</p>
                    <p>${figure.description}</p>
                    <div class="price">${figure.price.toFixed(2)}</div>
                </div>
                <div class="figure-card-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
            `;
            figureList.innerHTML += figureCard;
        });
    };

    //-----Функция для загрузки фигурок с сервера ---//
    const fetchFigures = async () =>{
        const query = `
        query{
            figures{
                id
                name
                material
                size
                description
                price
                image
            }   
        }`;
        const data = await graphqlQuery(query);
        if (data.data && data.data.figures){
            displayFigures(data.data.figures);
        }
    };

    //--- Обработчик отправки формы добавления фигурки
    addFigureForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        //Собираем данные из формы
        const name = document.getElementById('name').value;
        const material = document.getElementById('material').value;
        const size = document.getElementById('size').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const image = '/img/pic.jpg'; // Используем тестовое изображение

        //Формируем GraphQL мутацию для добавления фигурки
        const mutation = `
        mutation AddFigure($name: String!, $material: String!, $size: String!, $description: String!, $price: Float!, $image: String!) {
        
            addFigure(name: $name, material: $material, size:$size, description: $description, price: $price, image: $image){
            id
            name
            }
        }`;

        const variables = {name, material, size, description, price, image};

        //Отправляем мутацию на сервер
        const data = await graphqlQuery(mutation, variables);

        if(data.data && data.data.addFigure) {
            console.log('Фигурка успешно добавлена:', data.data.addFigure);
            fetchFigures(); //Обновляем список фигурок на странице
            addFigureForm.reset();//Очищаем форму
        } else {
            console.error('Ошибка добавления фигурки:', data.errors);
        }
    });

    //--- Обработчик кнопок редактирования и удаления
    figureList.addEventListener('click', (e) => {
        const target = e.target;
        const figureCard = target.closest('.figure-card');
        const figureId = figureCard.dataset.id;
        
        if (target.classList.contains('edit-btn')) {
            openEditModal(figureId);
        } else if (target.classList.contains('delete-btn')) {
            deleteFigure(figureId);
        }
    });

    //--- Функции модального окна редактирования ---//
    const openEditModal = async (figureId) => {
        const query = `
        query GetFigure($id: ID!) {
        figure(id: $id){
            name
            material
            size
            description
            price
        }
            }`;
        const variables = {id: figureId};
        const data = await graphqlQuery(query, variables);

        if (data.data && data.data.figure){
            const figure = data.data.figure;
            document.getElementById('edit-figure-id').value = figureId;
            document.getElementById('edit-name').value = figure.name;
            document.getElementById('edit-material').value = figure.material;
            document.getElementById('edit-size').value = figure.size;
            document.getElementById('edit-description').value = figure.description;
            document.getElementById('edit-price').value = figure.price;
            editModal.style.display = 'block';
        }
    };

    const closeEditModal = ()=> {
        editModal.style.display = 'none';
    };

    closeModalButton.addEventListener('click', closeEditModal);
    window.addEventListener('click', (e) => {
        if (e.target == editModal) {
            closeEditModal();
        }
    });

    //--- Обработчик отправки формы редактирования
    editFigureForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('edit-figure-id').value;
        const name = document.getElementById('edit-name').value;
        const material = document.getElementById('edit-material').value;
        const size = document.getElementById('edit-size').value;
        const description = document.getElementById('edit-description').value;
        const price = parseFloat(document.getElementById('edit-price').value);
        const image = document.getElementById('edit-image').value;
        
        const mutation = `
            mutation UpdateFigure($id: ID!, $name: String, $material: String, $size: String, $description: String, $price: Float, $image: String){
                updateFigure(id: $id, name: $name, material: $material, size:$size, description: $description, price:$price, image:$image){
                id
            }}
        `;

        const variables = {id, name,material, size, description, price, image};
        const data = await graphqlQuery(mutation, variables);

        if(data.data && data.data.updateFigure) {
            console.log('Фигурка успешно обновлена');
            closeEditModal();
            fetchFigures();
        } else {
            console.error('Ошибка обновления фигурки:', data.errors);
        }
    });

    //--- Функция удаления фигруки ---//
    const deleteFigure = async (figureId)=> {
        if (!confirm('Вы уверены, что хотите удалить эту фигурку?')) {
            return;
        }

        const mutation = `
            mutation DeleteFigure($id: ID!) {
            deleteFigure(id:$id){
                id
            }
        }
        `;

        const variables = {id: figureId};

        const data = await graphqlQuery(mutation, variables);

        if (data.data && data.data.deleteFigure){
            console.log('Фигурка успешно удалена');
            fetchFigures();
        } else{
            console.error('Ошибка удаления фигурки:', data.errors);
        }
    };

    //---Изначальная загрузка данных ---//
    // Загружаем фигурки при первом открытии страницы
    fetchFigures();
});
