"use strict";

let scrollableClasses = [".nav-link", ".navbar-brand"];

document.addEventListener("DOMContentLoaded", function() {
  scrollTo();
});

function scrollTo() {
  let links = document.querySelectorAll(scrollableClasses);
  links.forEach(function(link) {
    link.onclick = scrollAnchors;
  });
}

function scrollAnchors(e, respond = null) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  // Prevent default link anchoring
  e.preventDefault();
  // Get target
  var targetID = respond
    ? respond.getAttribute("href")
    : this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  // Early return if no target anchor specified
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  // Smooth scroll
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  // CHeck if done
  const checkIfDone = setInterval(function() {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}
