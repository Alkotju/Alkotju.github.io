document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы курсов
    const courseItems = document.querySelectorAll('.calculating__choose-item');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Обработчик клика по каждому курсу
    courseItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Получаем цену выбранного курса
            const price = parseFloat(item.getAttribute('data-price'));

            // Если курс еще не выбран (нет класса 'selected')
            if (!item.classList.contains('selected')) {
                item.classList.add('selected');  // Добавляем класс 'selected'
                totalPrice += price;  // Добавляем цену к общей
            } else {
                item.classList.remove('selected');  // Убираем класс 'selected'
                totalPrice -= price;  // Вычитаем цену из общей
            }

            // Обновляем итоговую сумму
            totalPriceElement.textContent = totalPrice.toFixed(2);
        });
    });
});
