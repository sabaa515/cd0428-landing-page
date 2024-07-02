/* eslint quotes: ["error", "double"] */
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navbar__list = document.querySelector("#navbar__list");
let page__header = document.querySelector(".page__header");

let sections = document.querySelectorAll(".section");
let content = document.querySelectorAll(".content");
const showContent = document.querySelectorAll(".showContent");

let goToTopBtn = document.querySelector("#goToTopBtn");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// add active class

const addActiveClass = (section, toSection) => {
    if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
    }
    toSection.classList.add('bold');
    toSection.style.borderBottom = "3px solid #cc1";
}
// remove active class

const removeActiveClass = (sections, toSections) => {
    for (let i = 0; i < toSections.length; i++) {
        if (sections[i].classList.contains("your-active-class")) {
            sections[i].classList.remove("your-active-class");
        }
        toSections[i].classList.remove('bold');
        toSections[i].style.borderBottom = "0px ";
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// collapsable sections
for (let i = 0; i < showContent.length; i++) {

    showContent[i].addEventListener('click', () => {
        content[i].classList.toggle("content");
    });

}

// build the nav
const addLinksToNavbar = () => {
    for (let i = 0; i < sections.length; i++) {
        let li = document.createElement('li');
        li.classList.add("toSection");
        li.innerHTML =`<a href=" ">Section ${i + 1}</a>`;
        navbar__list.appendChild(li);

    }
}

// Add class 'active' to section when near top of viewport
function makeActive(section, toSection) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
        addActiveClass(section, toSection);
    } else {
        removeActiveClass([section], [toSection]);
    }
}


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
addLinksToNavbar();

let toSections = document.querySelectorAll(".toSection");

for (let i = 0; i < toSections.length; i++) {
    // Scroll to section on link click
    toSections[i].addEventListener("click", (event) => {

        event.preventDefault();
        removeActiveClass(sections, toSections);
        window.scrollTo(0, sections[i].offsetTop - 40);
        // Set sections as active
        addActiveClass(sections[i], toSections[i]);


    });

    document.addEventListener('scroll', () => {
        page__header.style.display = "fixed";
        // Set sections as active
        makeActive(sections[i], toSections[i]);

        // show the ToUp button
        if (window.scrollY > 300) {
            goToTopBtn.classList.add("showToUpBtn");
        } else {
            goToTopBtn.classList.remove("showToUpBtn");

        }


    });

}

// onscrollEnd hide the nav 
document.onscrollend = () => {
    setTimeout(() => {
        page__header.style.display = "none";

    }, 6 * 1000);

}

// onload display the nav 
window.onload = () => {
    page__header.style.display = "fixed";

}










