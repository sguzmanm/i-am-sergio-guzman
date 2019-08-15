"use strict";

const activeClass = "active";
const scrollableClasses = [".nav-link", ".navbar-brand"];
let links = document.querySelectorAll(scrollableClasses);

document.addEventListener("DOMContentLoaded", function() {
  setupLinkBehavior();
});

function setupLinkBehavior() {
  links.forEach(function(link) {
    link.onclick = setupAnchorBehavior;
  });
}

function setupAnchorBehavior(e, respond = null) {
  setupActiveTab(this);
  scrollAnchors(this, e, respond);
}

/**
 * Setup the active tab link
 */
function setupActiveTab(link) {
  // Remove all active links
  links.forEach(el => el.classList.remove(activeClass));
  // Add current active link
  link.classList.add(activeClass);
}

/**
 * @param {} link Link for the onclick function
 * @param {} e Event of the scroll
 * @param {*} respond Link from which the page is loaded
 */
function scrollAnchors(link, e, respond = null) {
  console.log("Target", respond ? respond.href : link.getAttribute("href"));
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  // Get target
  var targetID = respond
    ? respond.getAttribute("href")
    : link.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  // Early return if no target anchor specified
  if (!targetAnchor) return;
  // Prevent default link anchoring
  e.preventDefault();

  const originalTop = distanceToTop(targetAnchor);
  // Smooth scroll
  window.scrollBy({
    top: originalTop,
    left: 0,
    behavior: "smooth"
  });
  // Check if done
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
