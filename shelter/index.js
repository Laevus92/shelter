/*create pop-up menu*/
const burgerButton = document.querySelector('.burger');
const backgroundMenu = document.querySelector('.pop-up-background');
const popUpMenu = document.querySelector('.pop-up-menu');

burgerButton.addEventListener('click', () => {
    if (backgroundMenu.classList.contains('active')){
        backgroundMenu.classList.remove('active');
    } else {
        backgroundMenu.classList.add('active');
    }

    if (popUpMenu.classList.contains('active')){
        popUpMenu.classList.remove('active');
    } else {
        popUpMenu.classList.add('active');
    }
    
    if (burgerButton.style.transform === '' || burgerButton.style.transform === 'rotate(0deg)'){
        burgerButton.style.transform = 'rotate(90deg)'
    } else {
        burgerButton.style.transform = 'rotate(0deg)'
    }

    if (document.querySelector("body").style.overflow === '' ||
        document.querySelector("body").style.overflow === 'unset') {
        document.querySelector("body").style.overflow = 'hidden';
    } else {
        document.querySelector("body").style.overflow = 'unset';
    }
})

backgroundMenu.addEventListener('click', (click) => {
    if (click.target === backgroundMenu) {
        backgroundMenu.classList.remove('active');
        popUpMenu.classList.remove('active');
        burgerButton.style.transform = 'rotate(0deg)';
        document.querySelector("body").style.overflow = 'unset';
    }
})

const navLinks = document.querySelectorAll(".pop-up-background > div > ul > li");

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        backgroundMenu.classList.remove('active');
        popUpMenu.classList.remove('active');
        burgerButton.style.transform = 'rotate(0deg)';
        document.querySelector("body").style.overflow = 'unset';
    })
})

/*create slider*/

const previousButton = document.querySelector('.slider__previous');
const nextButton = document.querySelector('.slider__next');
const visibleCards = document.querySelector('.slider__window');

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let petsArray = [];

function creatingCards() {
    let cardNumber = getRandomNumber(0, 7);

    if (!petsArray.includes(cardNumber)) {
        petsArray.push(cardNumber);
    }else {
        do {
            cardNumber = getRandomNumber(0, 7);
        } while (petsArray.includes(cardNumber))
        petsArray.push(cardNumber)
    }


    async function getPetsData(key) {
        const url = './pets.json';
        const res = await fetch (url);
        const data = await res.json();
        return data[cardNumber][key]
    }

    let div = document.createElement('div');
    div.classList.add('slider-item');
    visibleCards.append(div);

    let petsPhoto = document.createElement('img');
    petsPhoto.classList.add('pets-photo');
    getPetsData('img').then(result => {
        petsPhoto.setAttribute('src', `${result}`);
    }).catch(error => {
        console.error(error);
    })
    document.querySelectorAll('.slider-item')[petsArray.length-1].append(petsPhoto);

    let petsName = document.createElement('h2');
    petsName.classList.add('name');
    getPetsData('name').then(result => {
        petsName.innerHTML = `${result}`;
    }).catch(error => {
        console.error(error);
    })
    document.querySelectorAll('.slider-item')[petsArray.length-1].append(petsName);

    let learnMoreButton = document.createElement('button');
    learnMoreButton.classList.add('learn-more');
    learnMoreButton.innerHTML = 'Learn more';
    document.querySelectorAll('.slider-item')[petsArray.length-1].append(learnMoreButton);    
}

if (window.innerWidth > 991) {
    for (let i = 0; i < 3; i++){
        creatingCards();
    }
} else if (window.innerWidth > 767 && window.innerWidth < 992) {
    for (let i = 0; i < 2; i++){
        creatingCards();
    }
} else {
    creatingCards()
}



console.log(petsArray)

