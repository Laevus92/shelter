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
    learnMore();
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
    learnMore()
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
    learnMore()
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
    learnMore()
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
    learnMore()
}

nextPageBTN.addEventListener('click', nextPage)
lastPageBTN.addEventListener('click', moveTolastPage)

const breakLaptop = window.matchMedia('(max-width: 1279px) and (min-width: 992px)');
const breakTablet = window.matchMedia('(max-width:991px) and (min-width: 768px)');
const breakPhone = window.matchMedia('(max-width:767px) and (min-width: 300px)');


breakLaptop.addEventListener('change', () => {
    popUpInfo.classList.remove('active')
    document.querySelector('html').style.overflow = 'unset'
    modalWindow.innerHTML = ''
    petsList.innerHTML = ''
    checkVisibleCards()
    moveTofirstPage()
    learnMore()
})

breakTablet.addEventListener('change', () => {
    popUpInfo.classList.remove('active')
    document.querySelector('html').style.overflow = 'unset'
    modalWindow.innerHTML = ''
    petsList.innerHTML = ''
    checkVisibleCards()
    moveTofirstPage()
    learnMore()
})

breakPhone.addEventListener('change', () => {
    popUpInfo.classList.remove('active')
    document.querySelector('html').style.overflow = 'unset'
    modalWindow.innerHTML = ''
    petsList.innerHTML = ''
    checkVisibleCards()
    moveTofirstPage()
    learnMore()
})

let popUpInfo = document.querySelector('.pets-info');
let closeBTN = document.querySelector('.close-button');
const modalWindow = document.querySelector('.modal-window');

function learnMore() {
    let learnMoreBTN = document.querySelectorAll('.pets-list__item')
    learnMoreBTN.forEach(button => button.addEventListener('click', (target) => {
    document.getElementById('our-friends').scrollIntoView()
    popUpInfo.classList.add('active')
    modalWindow.innerHTML = ''
    document.querySelector('html').style.overflow = 'hidden'
    let cardNumber = target.target.closest('div').lastChild.getAttribute('value')
    async function getPetsData(key) {
        const url = '../../pets.json';
        const res = await fetch (url);
        const data = await res.json();
        return data[cardNumber][key]
    }

    let petsPhoto = document.createElement('img');
    getPetsData('img').then(result => {
        petsPhoto.setAttribute('src', `../.${result}`);
    }).catch(error => {
        console.error(error);
    })

    getPetsData('name').then(result => {
        petsPhoto.setAttribute('alt', `${result}.jpg`);
    }).catch(error => {
        console.error(error);
    })
    modalWindow.append(petsPhoto)

    let petsInfo = document.createElement('div');
    petsInfo.classList.add('description');
    modalWindow.append(petsInfo);

    petsInfo = document.querySelector('.description')

    let petsName = document.createElement('h2');
    petsName.classList.add('pets-name');

    getPetsData('name').then(result => {
        petsName.innerHTML = result;
    }).catch(error => {
        console.error(error);
    })

    petsInfo.append(petsName);

    let animal = document.createElement('p');
    animal.classList.add('animal');

    getPetsData('type').then(result => {
        animal.innerHTML = `${result}-`;
    }).catch(error => {
        console.error(error);
    })

    getPetsData('breed').then(result => {
        animal.innerHTML = animal.innerHTML + result;
    }).catch(error => {
        console.error(error);
    })

    petsInfo.append(animal);

    let animalStory = document.createElement('p');
    animalStory.classList.add('animal-story');

    getPetsData('description').then(result => {
        animalStory.innerHTML = result;
    }).catch(error => {
        console.error(error);
    })

    petsInfo.append(animalStory);

    let petsFeaturesList = document.createElement('ul');
    petsFeaturesList.classList.add('animal-features-list');
    petsInfo.append(petsFeaturesList);

    petsFeaturesList = document.querySelector('.animal-features-list');

    let age = document.createElement('li');
    age.innerHTML = '<span>Age: </span>';

    getPetsData('age').then(result => {
        age.innerHTML = age.innerHTML + result;
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(age)

    let inoculations = document.createElement('li');
    inoculations.innerHTML = '<span>Inoculations: </span>';

    getPetsData('inoculations').then(result => {
        inoculations.innerHTML = inoculations.innerHTML + result.join(', ');
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(inoculations)

    let diseases = document.createElement('li');
    diseases.innerHTML = '<span>Diseases: </span>';

    getPetsData('diseases').then(result => {
        diseases.innerHTML = diseases.innerHTML + result.join(', ');
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(diseases)

    let parasites = document.createElement('li');
    parasites.innerHTML = '<span>Parasites: </span>';

    getPetsData('parasites').then(result => {
        parasites.innerHTML = parasites.innerHTML + result.join(', ');
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(parasites)

}))
}

closeBTN.addEventListener('click', () => {
    popUpInfo.classList.remove('active')
    document.querySelector('html').style.overflow = 'unset'
    modalWindow.innerHTML = ''
})

const popUpInfoBackground = document.querySelector('.pets-info')
popUpInfoBackground.addEventListener('click', (click) => {
    if(click.target === popUpInfoBackground) {
        popUpInfo.classList.remove('active')
        document.querySelector('html').style.overflow = 'unset'
        modalWindow.innerHTML = ''
    }
})