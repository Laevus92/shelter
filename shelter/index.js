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
const petsLists = document.querySelectorAll('.pets-list');
const currentList = document.querySelector('.pets-list.current');
const previousList = document.querySelector('.pets-list.previous');
const nextList = document.querySelector('.pets-list.next');

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function moveLeft() {
    if (previousList.innerHTML === '' && nextList.innerHTML === '') {
        petsLists.forEach(list => list.classList.add('transition-left'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
        if (window.innerWidth > 991) {
            for (let i = 0; i < 3; i++){
                creatingCards(previousList, 'left');
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            for (let i = 0; i < 2; i++){
                creatingCards(previousList, 'left');
            }
        } else {
            creatingCards(previousList, 'left');
        }
    } else if (previousList.innerHTML === '' && nextList.innerHTML !== '') {
        petsLists.forEach(list => list.classList.add('transition-left'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
        if (window.innerWidth > 991) {
            petsArray = petsArray.slice(0, 3)
            for (let i = 0; i < 3; i++){
                creatingCards(previousList, 'left');
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            petsArray = petsArray.slice(0, 2)
            for (let i = 0; i < 2; i++){
                creatingCards(previousList, 'left');
            }
        } else {
            petsArray = petsArray.slice(0, 1)
            creatingCards(previousList, 'left');
        }
    } else if (previousList.innerHTML !== '' && nextList.innerHTML === '') {
        petsLists.forEach(list => list.classList.add('transition-left'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
    }

}

function moveRight() {
    if (previousList .innerHTML === '' && nextList.innerHTML === '') {
        petsLists.forEach(list => list.classList.add('transition-right'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
        if (window.innerWidth > 991) {
            for (let i = 0; i < 3; i++){
                creatingCards(nextList, 'right');
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            for (let i = 0; i < 2; i++){
                creatingCards(nextList, 'right');
            }
        } else {
            creatingCards(nextList, 'right');
        }
    } else if (previousList.innerHTML !== '' && nextList.innerHTML === '') {
        petsLists.forEach(list => list.classList.add('transition-right'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
        if (window.innerWidth > 991) {
            petsArray = petsArray.slice(3)
            for (let i = 0; i < 3; i++){
                creatingCards(nextList, 'right');
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            petsArray = petsArray.slice(2)
            for (let i = 0; i < 2; i++){
                creatingCards(nextList, 'right');
            }
        } else {
            petsArray = petsArray.slice(1)
            creatingCards(nextList, 'right');
        }
    } else if (previousList.innerHTML === '' && nextList.innerHTML !== '') {
        petsLists.forEach(list => list.classList.add('transition-right'));
        previousButton.removeEventListener('click', moveLeft);
        nextButton.removeEventListener('click', moveRight);
    }
}

previousButton.addEventListener('click', moveLeft);

nextButton.addEventListener('click', moveRight)

petsLists[0].addEventListener('animationend', (animation) => {
    if (animation.animationName === 'move-left' || 
    animation.animationName === 'move-left-laptop' ||
    animation.animationName === 'move-left-tablet' ||
    animation.animationName === 'move-left-phone') {
        petsLists[0].classList.remove('transition-left');
        petsLists[1].classList.remove('transition-left');
        petsLists[2].classList.remove('transition-left');
        nextList.innerHTML = currentList.innerHTML;
        currentList.innerHTML = ''
        currentList.innerHTML = previousList.innerHTML
        previousList.innerHTML = ''
        
    } else {
        petsLists[0].classList.remove('transition-right');
        petsLists[1].classList.remove('transition-right');
        petsLists[2].classList.remove('transition-right');
        previousList.innerHTML = currentList.innerHTML;
        currentList.innerHTML = '';
        currentList.innerHTML = nextList.innerHTML;
        nextList.innerHTML = '';

    }

    previousButton.addEventListener('click', moveLeft);
    nextButton.addEventListener('click', moveRight);
})

let petsArray = [];

function creatingCards(list, direction) {
    let cardNumber = getRandomNumber(0, 7);

    if (!petsArray.includes(cardNumber)) {
        if (direction === 'right') {
            petsArray.push(cardNumber);
        } else {
            petsArray.unshift(cardNumber);
        }
    }else {
        do {
            cardNumber = getRandomNumber(0, 7);
        } while (petsArray.includes(cardNumber))
        if (direction === 'right') {
            petsArray.push(cardNumber);
        } else {
            petsArray.unshift(cardNumber);
        }
    }


    async function getPetsData(key) {
        const url = './pets.json';
        const res = await fetch (url);
        const data = await res.json();
        return data[cardNumber][key]
    }

    let div = document.createElement('div');
    div.classList.add('pets-item');
    list.append(div);

    let petsPhoto = document.createElement('img');
    petsPhoto.classList.add('pets-photo');
    getPetsData('img').then(result => {
        petsPhoto.setAttribute('src', `${result}`);
    }).catch(error => {
        console.error(error);
    })

    if (direction === 'left') {
        document.querySelectorAll('.pets-list.previous > .pets-item')[document.querySelectorAll('.pets-list.previous > .pets-item').length-1].append(petsPhoto);
    } else if (direction === 'center') {
        document.querySelectorAll('.pets-list.current > .pets-item')[document.querySelectorAll('.pets-list.current > .pets-item').length-1].append(petsPhoto);
    } else if (direction === 'right') {
        document.querySelectorAll('.pets-list.next > .pets-item')[document.querySelectorAll('.pets-list.next > .pets-item').length-1].append(petsPhoto);
    }
    

    let petsName = document.createElement('h2');
    petsName.classList.add('name');
    getPetsData('name').then(result => {
        petsName.innerHTML = `${result}`;
    }).catch(error => {
        console.error(error);
    })

    if (direction === 'left') {
        document.querySelectorAll('.pets-list.previous > .pets-item')[document.querySelectorAll('.pets-list.previous > .pets-item').length-1].append(petsName);
    } else if (direction === 'center') {
        document.querySelectorAll('.pets-list.current > .pets-item')[document.querySelectorAll('.pets-list.current > .pets-item').length-1].append(petsName);
    } else if (direction === 'right') {
        document.querySelectorAll('.pets-list.next > .pets-item')[document.querySelectorAll('.pets-list.next > .pets-item').length-1].append(petsName);
    }

    let learnMoreButton = document.createElement('button');
    learnMoreButton.classList.add('learn-more');
    learnMoreButton.innerHTML = 'Learn more';

    if (direction === 'left') {
        document.querySelectorAll('.pets-list.previous > .pets-item')[document.querySelectorAll('.pets-list.previous > .pets-item').length-1].append(learnMoreButton);
    } else if (direction === 'center') {
        document.querySelectorAll('.pets-list.current > .pets-item')[document.querySelectorAll('.pets-list.current > .pets-item').length-1].append(learnMoreButton);
    } else if (direction === 'right') {
        document.querySelectorAll('.pets-list.next > .pets-item')[document.querySelectorAll('.pets-list.next > .pets-item').length-1].append(learnMoreButton);
    } 
}

if (window.innerWidth > 991) {
    for (let i = 0; i < 3; i++){
        creatingCards(currentList, 'center');
    }
} else if (window.innerWidth > 767 && window.innerWidth < 992) {
    for (let i = 0; i < 2; i++){
        creatingCards(currentList, 'center');
    }
} else {
    creatingCards(currentList, 'center')
}

const breakDesktop = window.matchMedia('(min-width: 1280px)');
const breakLaptop = window.matchMedia('(max-width: 1279px) and (min-width: 992px)');
const breakTablet = window.matchMedia('(max-width:991px) and (min-width: 768px)');
const breakPhone = window.matchMedia('(max-width:767px) and (min-width: 300px)');


breakLaptop.addEventListener('change', () => {
    if (breakLaptop.matches === true) {
        petsArray = []
        previousList.innerHTML = '';
        currentList.innerHTML = '';
        nextList.innerHTML ='';
        for (let i = 0; i < 3; i++){
            creatingCards(currentList, 'center');
        }
    }
})

breakTablet.addEventListener('change', () => {
    if ( breakTablet.matches === true) {
        petsArray = []
        previousList.innerHTML = '';
        currentList.innerHTML = '';
        nextList.innerHTML ='';
        for (let i = 0; i < 2; i++){
            creatingCards(currentList, 'center');
        }
    }
})

breakPhone.addEventListener('change', () => {
    if (breakPhone.matches === true) {
        petsArray = []
        previousList.innerHTML = '';
        currentList.innerHTML = '';
        nextList.innerHTML ='';
        creatingCards(currentList, 'center')
    }
})