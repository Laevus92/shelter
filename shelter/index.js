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
    learnMoreBTN = document.querySelectorAll('.pets-item')
    learMore()
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

    getPetsData('name').then(result => {
        petsPhoto.setAttribute('alt', `${result}.jpg`);
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
    learnMoreButton.setAttribute('value', `${cardNumber}`)

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
    learnMoreBTN = document.querySelectorAll('.pets-item')
    learMore()
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
    learnMoreBTN = document.querySelectorAll('.pets-item')
    learMore()
})

breakPhone.addEventListener('change', () => {
    if (breakPhone.matches === true) {
        petsArray = []
        previousList.innerHTML = '';
        currentList.innerHTML = '';
        nextList.innerHTML ='';
        creatingCards(currentList, 'center')
    }
    learnMoreBTN = document.querySelectorAll('.pets-item')
    learMore()
})

let learnMoreBTN = document.querySelectorAll('.pets-item');
let popUpInfo = document.querySelector('.pets-info');
let closeBTN = document.querySelector('.close-button');
const modalWindow = document.querySelector('.modal-window');

function learMore() {
    learnMoreBTN.forEach(button => button.addEventListener('click', (target) => {
    document.getElementById('our-friends').scrollIntoView()
    popUpInfo.classList.add('active')
    document.querySelector('html').style.overflow = 'hidden'
    let cardNumber = target.target.closest('div').lastChild.getAttribute('value')
    async function getPetsData(key) {
        const url = './pets.json';
        const res = await fetch (url);
        const data = await res.json();
        return data[cardNumber][key]
    }

    let petsPhoto = document.createElement('img');
    getPetsData('img').then(result => {
        petsPhoto.setAttribute('src', `${result}`);
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
        inoculations.innerHTML = inoculations.innerHTML + result;
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(inoculations)

    let diseases = document.createElement('li');
    diseases.innerHTML = '<span>Diseases: </span>';

    getPetsData('diseases').then(result => {
        diseases.innerHTML = diseases.innerHTML + result;
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(diseases)

    let parasites = document.createElement('li');
    parasites.innerHTML = '<span>Parasites: </span>';

    getPetsData('parasites').then(result => {
        parasites.innerHTML = parasites.innerHTML + result;
    }).catch(error => {
        console.error(error);
    })

    petsFeaturesList.append(parasites)

}))
}

learMore();

closeBTN.addEventListener('click', () => {
    popUpInfo.classList.remove('active')
    document.querySelector('html').style.overflow = 'unset'
    modalWindow.innerHTML = ''
})