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
  console.log("Hello");
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