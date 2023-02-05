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

// Get the modal
var modal;

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
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

// When the user clicks anywhere outside of the modal, close it
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

//Get all the hyperlink elements
var links = document.getElementsByClassName("nav-link");

//Browse the previously created array
Array.prototype.forEach.call(links, function(elem, index) {
  //Get the hyperlink target and if it refers to an id go inside condition
  var elemAttr = elem.getAttribute("href");
  if(elemAttr && elemAttr.includes("#")) {
    //Replace the regular action with a scrolling to target on click
    elem.addEventListener("click", function(ev) {
      ev.preventDefault();
      //Scroll to the target element using replace() and regex to find the href's target id
      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
          });
    });
  }
});