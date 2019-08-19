"use strict";

// Constant for navbar classes
const activeClass = "active";
const scrollableClasses = [".nav-link", ".navbar-brand"];

// Constants for bootstrap props
const bootstrapOffset = 40;
const bootstrapButtonTogglerId = "btn-navbar-toggler";
const bootstrapTogglerId = "toggler";

// Link variables
let links = document.querySelectorAll(scrollableClasses);
let currentLink = null;

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function() {
  setupLinkBehavior();
});

function setupLinkBehavior() {
  setupActiveLink();
  links.forEach(function(link) {
    link.onclick = setupAnchorBehavior;
  });
}

// Look at current route and set the current link to active
function setupActiveLink() {
  let parts = document.URL.split("#");
  let hash = parts.length > 1 ? parts[1] : "profile";

  let links = document.querySelectorAll("a[href='#" + hash + "']");
  links.forEach(link => {
    link.classList.add("active");
  });
}

// Setup all anchor behavior
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
  // Close mobile navbar if toggled
  let btnToggler = document.querySelector(
    "#" + bootstrapButtonTogglerId + "[aria-expanded=true]"
  );

  if (!btnToggler) return;

  let toggler = document.querySelector("#" + bootstrapTogglerId);
  let aria = document.createAttribute("aria-expanded");
  aria.value = "false";

  toggler.attributes.setNamedItem(aria);
  toggler.classList.remove("show");
  btnToggler.classList.add("collapsed");
}

/**
 * @param {} link Link for the onclick function
 * @param {} e Event of the scroll
 * @param {*} respond Link from which the page is loaded
 */
function scrollAnchors(link, e, respond = null) {
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

  // Setup current link for behavior
  currentLink = link;

  //Check the top wthout navbar offset
  const originalTop = distanceToTop(targetAnchor) - bootstrapOffset;
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
    if (currentLink !== link) {
      clearInterval(checkIfDone);
      return;
    }
    if (distanceToTop(targetAnchor) - bootstrapOffset === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}
