import {getResource} from '../services/services';

function cards() {
    class CoursesCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.src = src;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 1;
            this.changeToEUR();
        }
        changeToEUR() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = "courses__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.src}>
                <h3 class="courses__item-subtitle">${this.title}</h3>
                <div class="courses__item-descr">${this.descr}</div>
                <div class="courses__item-divider"></div>
                <div class="courses__item-price">
                    <div class="courses__item-cost">Ценa: </div>
                    <div class="courses__item-total"><span>${this.price}</span> EUR</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3002/courses')  // Changed from 'menu' to 'courses'
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new CoursesCard(img, altimg, title, descr, price, ".courses .container").render();  // Changed from '.menu' to '.courses'
        });
    });    
}

export default cards;
