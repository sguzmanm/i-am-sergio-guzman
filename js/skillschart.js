"use strict";
/**
 * Constants for bar designation
 */
const LEVEL_LOW = "#82B0D9";
const LEVEL_MID = "#3B5E8C";
const LEVEL_HIGH = "#0D0C09";
const NUM_LEVELS = 3;

/**
 * On load event
 */
window.onload = () => {
  loadSkillChartData();
};

/**
 * Load local data from JSON
 */
function loadSkillChartData() {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://sguzmanm.github.io/i-am-sergio-guzman/json/data.json",
    true
  );

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      var skillData = JSON.parse(request.responseText);
      for (let key in skillData) {
        let skillChart = document.getElementById(skillData[key].id);
        skillData[key].data.forEach(element => {
          let skillBar = newSkill(element);
          skillChart.appendChild(skillBar);
        });
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

/**
 * Return a new skill progress bar using the skill information given as param.
 * @param {*} skill
 */
function newSkill(skill) {
  let level;
  let range = 100 / NUM_LEVELS;

  // Decide the skill level color
  if (skill.level < range) {
    level = LEVEL_LOW;
  } else if (skill.level < range * (NUM_LEVELS - 1)) {
    level = LEVEL_MID;
  } else {
    level = LEVEL_HIGH;
  }

  // Skill bar config
  let skillBar = document.createElement("div");
  skillBar.classList.add("progress-bar", "progress-bar-striped");

  skillBar.style.backgroundColor = level;
  skillBar.style.width = skill.level + "%";
  skillBar.style.margin = "5pt";
  skillBar.innerHTML = skill.skill;

  return skillBar;
}

/**
 * Handle a failed attempt at getting the JSON object
 */
function handleError() {
  let skillChart = document.getElementById("skill-chart");
  skillChart.innerHTML =
    "My skills are not available right now, please forgive me";
}
