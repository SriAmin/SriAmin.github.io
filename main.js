emailjs.init("user_r8pQgRMG3WsTjHjjUKCbr");

document.getElementById("contactButton").addEventListener("click", function (event) {
    event.preventDefault();
    var formData = $('form').serializeArray();
    console.log(formData);

    emailjs.send('service_1zcvmpn', 'template_hiub3al', {
        subject: formData[2].value,
        from_name: formData[1].value + "Job Portfolio",
        from_email: formData[0].value,
        message: formData[3].value,
    }, 'user_r8pQgRMG3WsTjHjjUKCbr').then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email Sent!\nI'll try my best to reply as soon as possible")
    }, function (error) {
        console.log('FAILED...', error);
        alert("Sorry!\nSome error occured, I'll see what I can do but in the meantime can you try again")
    }
    )
});

var scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};

var elementsToAnimate = document.querySelectorAll('.animate-on-scroll')

function checkViewport() {
    Array.prototype.forEach.call(elementsToAnimate, function(element){
        if (inViewport(element)) {
            element.classList.add('is-visable')
        }
    });

    scroll(checkViewport)
}

checkViewport();

function inViewport(element) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && element instanceof jQuery) {
      element = element[0];
    }
    var rect = element.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }