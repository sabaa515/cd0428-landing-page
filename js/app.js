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

/**
* @description Add active class to a section and associated link
* @param {object} section - The section
* @param {object} toSection - The associated link
*/
const addActiveClass = (section, toSection) => {
    if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
    }

    toSection.classList.add('a__active');

}

/**
* @description Remove active class to a section and associated link
* @param {object} sections - All sections
* @param {object} toSections - Their associated links
*/
const removeActiveClass = (sections, toSections) => {
    for (let i = 0; i < toSections.length; i++) {
        if (sections[i].classList.contains("your-active-class")) {
            sections[i].classList.remove("your-active-class");
        }


        toSections[i].classList.remove('a__active');
    }
}

/**
* @description Add class 'active' to section when near top of viewport (while scrolling)
* @param {object} section - The section
* @param {object} toSection - The associated link
*/
function makeActive(section, toSection) {
    const box = section.getBoundingClientRect();
    box.top <= 150 && box.bottom >= 150 ? addActiveClass(section, toSection) : removeActiveClass([section], [toSection]);

}

// TODO: show the toUp button

const showToUpbtn = ()=>{
    window.scrollY > 300 ? goToTopBtn.classList.add("showToUpBtn") : goToTopBtn.classList.remove("showToUpBtn");

}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// TODO: make sections collapsable - Immediately Invoked Function Expression (IIFE)

const collapsable = (() =>{
    for (let i = 0; i < showContent.length; i++) {

        showContent[i].addEventListener('click', () => {
            content[i].classList.toggle("content");
        });
    
    }
})();

// TODO: build the navbar dynamically - (IIFE)
const addLinksToNavbar = (() => {
    for (let i = 0; i < sections.length; i++) {
        let li = document.createElement('li');
        li.classList.add("toSection");
        li.innerHTML =`<a href=" ">Section ${i + 1}</a>`;
        navbar__list.appendChild(li);

    }
})();

/**
 * End Main Functions
 * Begin Events
 *
*/


let toSections = document.querySelectorAll(".toSection");

for (let i = 0; i < toSections.length; i++) {
    // Scroll to section on link click
    toSections[i].addEventListener("click", (event) => {

        event.preventDefault();
        removeActiveClass(sections, toSections);

        // Scroll to anchor ID using scrollIntoView event
        window.scrollTo({
            left:0,
            top:document.getElementById(`section${i+1}`).offsetTop,
            behavior: "smooth"
        
        });

        // Set sections as active
        addActiveClass(sections[i], toSections[i]);


    });

    document.addEventListener('scroll', () => {
        // Set sections as active
        makeActive(sections[i], toSections[i]);

        // show the ToUp button
        showToUpbtn();

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