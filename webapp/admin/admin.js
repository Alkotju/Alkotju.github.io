document.addEventListener('DOMContentLoaded', () => {
    const addCourseItemForm = document.getElementById('add-course-item-form');
    const logoutBtn = document.getElementById('logout-btn');
    const coursesItemsContainer = document.querySelector('#courses-items-container');
    const editItemIdInput = document.getElementById('edit-item-id');
    const addBtn = document.getElementById('add-btn');
    const updateBtn = document.getElementById('update-btn');

    const fetchCoursesItems = async () => {
        try {
            const response = await fetch('/courses');
            const coursesItems = await response.json();
            renderCoursesItems(coursesItems);
        } catch (error) {
            console.error('Error fetching courses items:', error);
        }
    };

    const renderCoursesItems = (coursesItems) => {
        coursesItemsContainer.innerHTML = '';
        coursesItems.forEach(item => {
            const courseItemElement = document.createElement('div');
            courseItemElement.classList.add('course__item');
            courseItemElement.innerHTML = `
            <img src="../${item.img}" alt="${item.altimg}">
            <div class="course__item-content">
                <h3 class="course__item-subtitle">${item.title}</h3>
                <div class="course__item-descr">${item.descr}</div>
                <div class="course__item-price">
                    <div class="course__item-cost">Цена:</div>
                    <div class="course__item-total"><span>${item.price}</span> евро/день</div>
                </div>
            </div>
            <div class="course__item-actions">
                <button class="btn btn-primary btn-sm edit-btn" data-id="${item._id}">Редактировать</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item._id}">Удалить</button>
            </div>
            `;
            coursesItemsContainer.appendChild(courseItemElement);
        });
    };

    addCourseItemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addCourseItemForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Курс добавлен успешно!');
                addCourseItemForm.reset();
                fetchCoursesItems();
            } else {
                alert('Не удалось добавить курс. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
    });

    updateBtn.addEventListener('click', async () => {
        const itemId = editItemIdInput.value;
        const formData = new FormData(addCourseItemForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/courses/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Курс обновлен успешно!');
                addCourseItemForm.reset();
                fetchCoursesItems();
                addBtn.style.display = 'block';
                updateBtn.style.display = 'none';
            } else {
                alert('Не удалось обновить курс. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
    });

    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Не удалось выйти. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
    });

    coursesItemsContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemId = e.target.dataset.id;
            if (confirm('Вы уверены, что хотите удалить этот курс?')) {
                try {
                    const response = await fetch(`/courses/${itemId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert('Курс удален успешно!');
                        fetchCoursesItems();
                    } else {
                        alert('Не удалось удалить курс. Попробуйте снова.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
                }
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const itemId = e.target.dataset.id;
            const response = await fetch('/courses');
            const coursesItems = await response.json();
            const selectedItem = coursesItems.find(item => item._id === itemId);

            if (selectedItem) {
                document.getElementById('img').value = selectedItem.img;
                document.getElementById('altimg').value = selectedItem.altimg;
                document.getElementById('title').value = selectedItem.title;
                document.getElementById('descr').value = selectedItem.descr;
                document.getElementById('price').value = selectedItem.price;
                editItemIdInput.value = selectedItem._id;

                addBtn.style.display = 'none';
                updateBtn.style.display = 'block';
            }
        }

    });

    fetchCoursesItems();
});
