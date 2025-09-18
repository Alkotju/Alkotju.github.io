import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal'


window.addEventListener('DOMContentLoaded', function(){// когда загрузилась вся страница

    //tabs


    let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent( i = 0 ){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event){
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i ) =>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2025-12-25';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24))),
        seconds = Math.floor ((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor ((t/(1000*60*60)) % 24);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes, 
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = this.document.querySelectorAll('[data-modal]'),
    modal = this.document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.add('show');
        modal.classList.add('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) =>{
        if (e.target === modal || e.target.getAttribute('data-close') == ""){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimerId = this.setTimeout(openModal, 300000);
    //

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

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

    // Slider

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = this.document.querySelector('.offer__slider-inner');
    
    if (slides.lenght < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = this.document.createElement('ol'),
    dots = [];
    indicators.classList.add('carrousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    listt-style: none;
    `; //можно продублировать в стили, но не всегда есть доступ к стилям
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = ` 
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-colour: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0 ){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10 ){
            current.textContent = `0${slideIndex}`;

        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.oppacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;

        } else{
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;

        } else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[ slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10){
                current.textContent = `0${slideIndex}`;

            } else {
                current.textContent = slideIndex;
            }
            
            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });
    
    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    //calculator
    

});