import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal'

window.addEventListener('DOMContentLoaded', function(){// когда загрузилась вся страница
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2025-12-25');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer_slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prewArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});


    //tabs
    // let tabs = document.querySelectorAll('.tabheader__item'),
    // tabsContent = document.querySelectorAll('.tabcontent'),
    // tabsParent = document.querySelector('.tabheader__items');

    //timer
    // const deadline = '2025-12-25';
    
    //Modal
    //ispolzuem klass6 dlja sozdanija menu
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.' + 
    //     ' Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container"
    // ).render();
