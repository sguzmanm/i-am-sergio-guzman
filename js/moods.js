"use strict";

window.onload = loadMoodsData;

let moodsData = [];
let specialHoverSelectors = ["hover"];

function loadMoodsData() {
  console.log("Loading moods");
  let request = new XMLHttpRequest();
  request.open("GET", "../json/moods.json", true);

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      moodsData = JSON.parse(request.responseText);
      console.log(moodsData);
      for (let key in moodsData) {
        console.log(key);
        let startTime = moodsData[key].startTime.split(":");
        let endTime = moodsData[key].endTime.split(":");

        console.log(isDateBetween(startTime, endTime));
        if (isDateBetween(startTime, endTime)) {
          let image = document.querySelector("#profile-pic");
          let src = document.createAttribute("src");
          src.value = moodsData[key].profilePic;
          image.attributes.setNamedItem(src);
          changeColors(moodsData[key].css);
          break;
        }
      }
    } else {
      // Although unlinely, we reached an answer different from 200
      handleError();
    }
  };

  request.onerror = function() {
    // Although unlinely, we reached an answer different from 200
    handleError();
  };

  // Start the request
  request.send();
}

function changeColors(currentMoodCss) {
  Object.keys(currentMoodCss).forEach(attributeKey => {
    console.log(attributeKey);
    let att = currentMoodCss[attributeKey];

    Object.keys(att).forEach(selector => {
      console.log(selector);
      if (specialNamedSelectorAction(selector, att[selector], attributeKey))
        return;
      document.querySelectorAll(selector).forEach(el => {
        console.log("Change", selector, attributeKey, att[selector]);
        if (selector === "body") {
          document.body.style[attributeKey] = att[selector];
          console.log("Body changed?");
        } else {
          el.style[attributeKey] = att[selector];
        }
      });
    });
  });
}

function specialNamedSelectorAction(selector, colors, attributeKey) {
  let continues = false;
  for (let i = 0; i < specialHoverSelectors.length; i++) {
    if (selector.includes(specialHoverSelectors)) {
      continues = true;
      break;
    }
  }
  if (!continues) return false;
  let values = colors.split(",");
  if (values.length == 1) values[1] = values[0];

  document.querySelectorAll(selector.split(":")[0]).forEach(el => {
    el.style[attributeKey] = values[0];
    el.onmousemove = function() {
      this.style[attributeKey] = values[1];
    };
    el.onmouseout = function() {
      this.style[attributeKey] = values[0];
    };
  });
}

function isDateBetween(startTime, endTime) {
  let date = new Date();
  let min = date.getMinutes();
  let hour = date.getHours();

  console.log(startTime);
  console.log(endTime);
  console.log(min, hour);
  if (min < parseInt(startTime[1], 10) || min > parseInt(endTime[1], 10))
    return false;

  if (hour < parseInt(startTime[0], 10) || hour > parseInt(endTime[0], 10))
    return false;

  return true;
}

/**
 * Handle a failed attempt at getting the JSON object
 */
function handleError() {
  console.log("Error");
}
