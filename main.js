var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(x) {
    showSlides(slideIndex = x);
}

function showSlides(x) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot_button");
    if (x > slides.length) {slideIndex = 1}
    if (x < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex-1].className += " active";
}