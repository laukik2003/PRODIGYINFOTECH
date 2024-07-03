const menuBtn = document.getElementById("menu_btn");
const navLinks = document.getElementById("nav_links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click",(e)=> {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen? "ri-close-line":"ri-menu-line"); 
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption ={
    distance: "50px",
    origin:"bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header_container h1", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".header_container h2", {
    ...scrollRevealOption,
    delay: 500,
});

ScrollReveal().reveal(".header_container p", {
    ...scrollRevealOption,
    delay: 1000,
});

ScrollReveal().reveal(".header_container .header_btn", {
    ...scrollRevealOption,
    delay: 1500,
});


ScrollReveal().reveal(".about_card", {
   duration:1000,
   interval:500,
});


ScrollReveal().reveal(".trainer_card", {
    ...scrollRevealOption,
    interval:500,
 });


 ScrollReveal().reveal(".blog_card", {
    ...scrollRevealOption,
    interval:500,
 });

