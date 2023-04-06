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

    if (document.querySelector("html").style.overflow === '' ||
        document.querySelector("html").style.overflow === 'unset') {
        document.querySelector("html").style.overflow = 'hidden';
    } else {
        document.querySelector("html").style.overflow = 'unset';
    }
})

backgroundMenu.addEventListener('click', (click) => {
    if (click.target === backgroundMenu) {
        backgroundMenu.classList.remove('active');
        popUpMenu.classList.remove('active');
        burgerButton.style.transform = 'rotate(0deg)';
        document.querySelector("html").style.overflow = 'unset';
    }
})

const navLinks = document.querySelectorAll(".pop-up-background > div > ul > li");

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        backgroundMenu.classList.remove('active');
        popUpMenu.classList.remove('active');
        burgerButton.style.transform = 'rotate(0deg)';
        document.querySelector("html").style.overflow = 'unset';
    })
})

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let wholePetsArray = [];
let currentPetsArray = [];

function createWholePetsArray() {
    let cardNumber = 0
    function createCurrentPetsArray() {
        currentPetsArray =[]
        for(let i = 0; i < 8; i++) {
            cardNumber = getRandomNumber(0, 7)
            if (currentPetsArray.length === 0) {
                currentPetsArray.push(cardNumber)
            } else {
                if (currentPetsArray.includes(cardNumber)) {
                    while (currentPetsArray.includes(cardNumber)) {
                        cardNumber = getRandomNumber(0, 7)
                    }
                    currentPetsArray.push(cardNumber);
                } else {
                    currentPetsArray.push(cardNumber);
                }
            }
    }

    }
    createCurrentPetsArray();
    if (wholePetsArray.join('') !== currentPetsArray.join(',')){
        wholePetsArray.push(currentPetsArray);
    } else {
        while (wholePetsArray.join('') === currentPetsArray.join(',')) {
            createCurrentPetsArray()
        }
        wholePetsArray.push(currentPetsArray);
    }
}

for (let i = 0; i < 6; i++) {
    createWholePetsArray()
}

wholePetsArray = wholePetsArray.join();
wholePetsArray = wholePetsArray.split(',')

const petsList = document.querySelector('.pets-list')

function createCard(cardNumber) {
    let card = document.createElement('div');
    card.classList.add('pets-list__item');

    async function getPetsData(key) {
        const url = '../../pets.json';
        const res = await fetch (url);
        const data = await res.json();
        return data[cardNumber][key]
    }

    let photo = document.createElement('img');
    photo.classList.add('pets-photo')

    getPetsData('img').then(result => {
        photo.setAttribute('src', `../.${result}`);
    }).catch(error => {
        console.error(error)
    })

    getPetsData('name').then(result => {
        photo.setAttribute('alt', `${result}`);
    }).catch(error => {
        console.error(error)
    })

    let name = document.createElement('h2');
    name.classList.add('name');

    getPetsData('name').then(result => {
        name.innerHTML = result;
    }).catch(error => {
        console.error(error)
    })

    let button = document.createElement('button');
    button.classList.add('learn-more');
    button.setAttribute('value', cardNumber)
    button.innerHTML = 'Learn more';
    
    petsList.append(card);
    document.querySelectorAll('.pets-list__item')[document.querySelectorAll('.pets-list__item').length -1].append(photo);
    document.querySelectorAll('.pets-list__item')[document.querySelectorAll('.pets-list__item').length -1].append(name);
    document.querySelectorAll('.pets-list__item')[document.querySelectorAll('.pets-list__item').length -1].append(button);
}

function createFirstPage() {
    if (window.innerWidth > 991) {
        for (let i = 0; i < 8; i++){
            createCard(+wholePetsArray[i]);
        }
    } else if (window.innerWidth > 767 && window.innerWidth < 992) {
        for (let i = 0; i < 6; i++){
            createCard(+wholePetsArray[i]);
        }
    } else {
        for (let i = 0; i < 3; i++){
            createCard(+wholePetsArray[i]);
        }
    }
}

createFirstPage()

const nextPageBTN = document.querySelector("#our-friends > div > div.nav-panel > button:nth-child(4)");
const previousPageBTN = document.querySelector("#our-friends > div > div.nav-panel > button:nth-child(2)")
const currentPageNumber = document.querySelector("#our-friends > div > div.nav-panel > button:nth-child(3)")
const lastPageBTN = document.querySelector("#our-friends > div > div.nav-panel > button:nth-child(5)");
const firstPageBTN = document.querySelector("#our-friends > div > div.nav-panel > button:nth-child(1)");

let counter = 0
let visibleCards 
checkVisibleCards()
function checkVisibleCards() {
    if (window.innerWidth > 991) {
        visibleCards = 8
    } else if (window.innerWidth > 767 && window.innerWidth < 992) {
        visibleCards = 6
    } else {
        visibleCards = 3
    } 
}



let lastPage = wholePetsArray.length / visibleCards

function nextPage() {
    counter += 1
    if (counter < lastPage) {
        currentPageNumber.innerHTML = `${counter + 1}`
        previousPageBTN.classList.remove('unactive')
        previousPageBTN.classList.add('active')
        firstPageBTN.classList.remove('unactive')
        firstPageBTN.classList.add('active')
        previousPageBTN.addEventListener('click', previousPage);
        firstPageBTN.addEventListener('click', moveTofirstPage)
        petsList.innerHTML = ''
        if (window.innerWidth > 991) {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        } else {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        }
    } 
    if (counter === lastPage-1) {
        nextPageBTN.removeEventListener('click', nextPage)
        lastPageBTN.removeEventListener('click', moveTolastPage)
        nextPageBTN.classList.remove('active');
        nextPageBTN.classList.add('unactive');
        lastPageBTN.classList.remove('active');
        lastPageBTN.classList.add('unactive');
    }
}

function previousPage() {
    counter -= 1
    if (counter >= 0) {
        currentPageNumber.innerHTML = `${counter + 1}`
        nextPageBTN.classList.remove('unactive')
        nextPageBTN.classList.add('active')
        lastPageBTN.classList.remove('unactive')
        lastPageBTN.classList.add('active')
        nextPageBTN.addEventListener('click', nextPage)
        lastPageBTN.addEventListener('click', moveTolastPage)
        petsList.innerHTML = ''
        if (window.innerWidth > 991) {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        } else if (window.innerWidth > 767 && window.innerWidth < 992) {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        } else {
            for (let i = 0; i < visibleCards; i++){
                createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
            }
        } 
    }
    if (counter === 0) {
        previousPageBTN.removeEventListener('click', previousPage)
        firstPageBTN.removeEventListener('click', moveTofirstPage)
        previousPageBTN.classList.remove('active');
        previousPageBTN.classList.add('unactive');
        firstPageBTN.classList.remove('active');
        firstPageBTN.classList.add('unactive');
    }
    console.log(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards)), counter)
}

function moveTofirstPage() {
    counter = 0
    currentPageNumber.innerHTML = `${counter + 1}`
    nextPageBTN.addEventListener('click',  nextPage)
    lastPageBTN.addEventListener('click', moveTolastPage)
    nextPageBTN.classList.add('active')
    nextPageBTN.classList.remove('unactive')
    lastPageBTN.classList.add('active')
    lastPageBTN.classList.remove('unactive')
    previousPageBTN.classList.remove('active')
    previousPageBTN.classList.add('unactive')
    firstPageBTN.classList.remove('active')
    firstPageBTN.classList.add('unactive')
    previousPageBTN.removeEventListener('click', previousPage)
    firstPageBTN.removeEventListener('click', moveTofirstPage)
    petsList.innerHTML = '';
    if (window.innerWidth > 991) {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    } else if (window.innerWidth > 767 && window.innerWidth < 992) {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    } else {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    }
}

function moveTolastPage() {
    counter = lastPage - 1
    currentPageNumber.innerHTML = `${counter + 1}`
    nextPageBTN.removeEventListener('click',  nextPage)
    lastPageBTN.removeEventListener('click', moveTolastPage)
    nextPageBTN.classList.remove('active')
    nextPageBTN.classList.add('unactive')
    lastPageBTN.classList.remove('active')
    lastPageBTN.classList.add('unactive')
    previousPageBTN.classList.remove('unactive')
    previousPageBTN.classList.add('active')
    firstPageBTN.classList.remove('unactive')
    firstPageBTN.classList.add('active')
    previousPageBTN.addEventListener('click', previousPage)
    firstPageBTN.addEventListener('click', moveTofirstPage)
    petsList.innerHTML = '';
    if (window.innerWidth > 991) {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    } else if (window.innerWidth > 767 && window.innerWidth < 992) {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    } else {
        for (let i = 0; i < visibleCards; i++){
            createCard(wholePetsArray.slice(visibleCards * counter, ((visibleCards * counter)+ visibleCards))[i]);
        }
    }
}

nextPageBTN.addEventListener('click', nextPage)
lastPageBTN.addEventListener('click', moveTolastPage)

const breakLaptop = window.matchMedia('(max-width: 1279px) and (min-width: 992px)');
const breakTablet = window.matchMedia('(max-width:991px) and (min-width: 768px)');
const breakPhone = window.matchMedia('(max-width:767px) and (min-width: 300px)');


breakLaptop.addEventListener('change', () => {
    if (breakLaptop.matches === true) {
        checkVisibleCards()
        moveTofirstPage()
    }
})

breakTablet.addEventListener('change', () => {
    if ( breakTablet.matches === true) {
        checkVisibleCards()
        moveTofirstPage()
    }
})

breakPhone.addEventListener('change', () => {
    if (breakPhone.matches === true) {
        checkVisibleCards()
        moveTofirstPage()
    }
})
