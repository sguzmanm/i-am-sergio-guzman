"use strict";
// Constant for mood
const myMood = "moodOfChecho";
const profilePic = "#profile-pic";

// Mood selection variables
let moodsData = [];
let specialHoverSelectors = ["hover"];

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
  document.body.style.setProperty("background-color", "#FF00000");
  loadMoodsData();
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
  console.log("HASH", hash);
  links.forEach(link => {
    link.classList.add("active");
    console.log(link);
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

  // Setup toggler attributes
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

//--------------
// MOODS
//--------------

// Load mood data
function loadMoodsData() {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://sguzmanm.github.io/i-am-sergio-guzman/json/moods.json",
    true
  );

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      moodsData = JSON.parse(request.responseText);
      // If there is already an user selected mood, load it
      let moodVal = localStorage.getItem(myMood);
      checkMood(moodVal);
    }
  };

  // Start the request
  request.send();
}

// Check the selected mood
function checkMood(mood) {
  // If no mood provided check against the current date
  if (mood === undefined || mood === "" || isNaN(parseInt(mood, 10))) {
    for (let key in moodsData) {
      let startTime = moodsData[key].startTime.split(":");
      let endTime = moodsData[key].endTime.split(":");

      if (isDateBetween(startTime, endTime)) {
        mood = key;
        break;
      }
    }
  }

  // Check if mood is correct
  if (mood < 0 || mood >= moodsData.length) return;

  // Set in local storage
  localStorage.setItem(myMood, mood);

  // Change profile pic
  let image = document.querySelector(profilePic);
  let src = document.createAttribute("src");
  src.value = moodsData[mood].profilePic;
  image.attributes.setNamedItem(src);

  // Change the page colors
  changeColors(moodsData[mood].css);
}

function changeColors(currentMoodCss) {
  // Search in each attribute key of the css
  Object.keys(currentMoodCss).forEach(attributeKey => {
    let att = currentMoodCss[attributeKey];

    // Search in each selector of the attribute
    Object.keys(att).forEach(selector => {
      // Check if :hover classes are in the selector
      if (specialHoverSelectorAction(selector, att[selector], attributeKey))
        return;
      // Check each prop of the selector
      document.querySelectorAll(selector).forEach(el => {
        if (selector === "body") {
          document.body.style[attributeKey] = att[selector];
        } else {
          el.style[attributeKey] = att[selector];
        }
      });
    });
  });
}

function specialHoverSelectorAction(selector, colors, attributeKey) {
  let continues = false;
  for (let i = 0; i < specialHoverSelectors.length; i++) {
    if (selector.includes(specialHoverSelectors)) {
      continues = true;
      break;
    }
  }
  // If it is not a hover class return
  if (!continues) return false;
  // Get the before and after values
  let values = colors.split(",");
  if (values.length == 1) values[1] = values[0];

  // Setup callback for hover
  document.querySelectorAll(selector.split(":")[0]).forEach(el => {
    // Before val
    el.style[attributeKey] = values[0];
    //On hover
    el.onmousemove = function() {
      this.style[attributeKey] = values[1];
    };
    // After val
    el.onmouseout = function() {
      this.style[attributeKey] = values[0];
    };
  });
}

// Check if current date is between two vals
function isDateBetween(startTime, endTime) {
  let date = new Date();
  let min = date.getMinutes();
  let hour = date.getHours();

  if (min < parseInt(startTime[1], 10) || min > parseInt(endTime[1], 10))
    return false;

  if (hour < parseInt(startTime[0], 10) || hour > parseInt(endTime[0], 10))
    return false;

  return true;
}
