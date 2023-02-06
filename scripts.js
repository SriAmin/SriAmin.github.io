if (window.outerWidth <= 600) {
  document.getElementById("cover").src = "assets/SriPortfolioShort.png"
}

function openSkill(evt, skillName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("active-skill");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[i].className = x[i].className.replace(" openSkill", "");
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected", "");
  }
  document.getElementById(skillName).style.display = "block";
  document.getElementById(skillName).className += " openSkill";
  evt.currentTarget.className += " selected";
}

var modal;

var btn = document.getElementById("myBtn");

var spans = document.getElementsByClassName("close");

function openModal(projectId) {
  modal = document.getElementById(projectId)
  modal.style.display = "block";
}

for (i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    modal.className += " modal-fadeOut";
    setTimeout(function () {
      modal.className = modal.className.replace(" modal-fadeOut", "");
      modal.style.display = "none";
    }, 230)
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.className += " modal-fadeOut";
    setTimeout(function () {
      modal.className = modal.className.replace(" modal-fadeOut", "");
      modal.style.display = "none";
    }, 230)
  }
}

let timer = 0;
window.addEventListener("load", (event) => {
  let intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (entry.target.classList.contains('spacer')) {
            entry.target.classList.add('shrink');
          } else {
            entry.target.classList.add('fadeIn')
          }
        }, timer);
        timer += 50;
        intersectionObserver.unobserve(entry.target);
        setTimeout(() => {timer = 0;}, 1000)
      }
    })
  });
  
  document.querySelectorAll('.animate').forEach(obj => {
    intersectionObserver.observe(obj);
  });
});

var projectCover = document.getElementsByClassName("project-cover");


for (var i = 0; i < projectCover.length; i++) {
  var element = projectCover[i];

  element.onclick = function (event) {
    event.target.style.opacity = (event.target.style.opacity == 1.0) ? 0.0 : 1.0;
  }
}

var links = document.getElementsByClassName("nav-link");
var topBtn = document.getElementById("top-btn");

topBtn.addEventListener("click", function(ev) {
  ev.preventDefault();
  document.getElementById("navigator").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
  
  topBtn.style.animation = "fadeOut";
  topBtn.style.animationDuration = "0.25s";
  topBtn.style.display = "none";
})

Array.prototype.forEach.call(links, function(elem, index) {
  var elemAttr = elem.getAttribute("href");
  if(elemAttr && elemAttr.includes("#")) {
    elem.addEventListener("click", function(ev) {
      ev.preventDefault();

      topBtn.style.animation = "fadeIn";
      topBtn.style.animationDuration = "0.25s";
      topBtn.style.display = "block"

      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
          });
    });
  }
});