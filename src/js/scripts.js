//copy text
let button = document.getElementById("promocode-btn");
button.addEventListener("click", copyText);

function showCopyAlert() {
    let promoAlert = document.getElementById("promo-alert");
    promoAlert.classList.add("show");

    setTimeout(() => {
        promoAlert.classList.remove("show");
    }, 2000);
}

function copyText() {
    let copyText = document.getElementById("promocode-input");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

    showCopyAlert();
}

//animations
let sparksBack = document.querySelector(".promo__text");
//let sparksFront = document.querySelector('.promo__image-sparks-front');

window.addEventListener("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    sparksBack.style.transform =
        "translate(-" + x * 20 + "px, -" + y * 20 + "px)";
    //sparksFront.style.transform = 'translate(' + x * 25 + 'px, ' + y * 25 + 'px)';
});

//man parallax
const scroller = document.querySelector("html");
window.addEventListener("scroll", function (e) {
    let scrolled = scroller.scrollTop;
    let man = document.querySelector(".promo__image-man");
    man.style.transform = "translateY(" + scrolled * 0.2 + "px)";
});
