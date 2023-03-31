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