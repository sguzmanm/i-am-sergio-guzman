<template>
  <div class="chart" ref="chartContainer">
    <div
      class="chart__item"
      v-for="(skillGroup, index) in skillGroups"
      :key="index"
    >
      <h2>
        {{ skillGroup.name }}
      </h2>
      <svg :height="height" :width="width">
        <g
          v-for="c in calculateGraph(skillGroup.name, skillGroup.skills)"
          ref="skillChart"
          class="skill"
          :key="c.id"
        >
          <circle
            :r="c.r"
            :cx="c.x"
            :cy="c.y"
            :fill="c.fill"
            :stroke="c.stroke"
            @click="selectTag(c.title)"
          />
          <text
            v-if="c.r"
            :dx="calculateTextPositionX(c.title, c.x, c.r)"
            :dy="c.y"
          >
            {{ c.title }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

const skillGroups = require("@/helpers/layout/skills.json");

export default {
  name: "PackChart",
  props: {
    addTag: Function,
  },
  data() {
    return {
      height: 400,
      width: 400,
      skillGroups,
    };
  },
  created() {
    this.colourScale = d3
      .scaleOrdinal()
      .range(["#5EAFC6", "#FE9922", "#93c464", "#75739F"]);

    window.onresize = () => {
      if (
        !this.$refs.chartContainer ||
        !this.$refs.chartContainer.clientWidth
      ) {
        return;
      }

      const targetWidth = this.$refs.chartContainer.clientWidth;
      const chartsPerScreen = this.calculateCharts(targetWidth);
      const aspect = this.width / this.height;

      this.width = targetWidth / chartsPerScreen;
      this.height = Math.round(targetWidth / (aspect * chartsPerScreen));
    };
  },
  methods: {
    calculateCharts(width) {
      if (width < 360) {
        return 1.5;
      }

      if (width < 700) {
        return 2.5;
      }

      return 3.5;
    },
    selectTag(tag) {
      this.addTag(tag);
    },
    packData(name, skills) {
      const packableSkills = { id: name, values: skills };
      return d3
        .hierarchy(packableSkills, (d) => d.values)
        .sum((d) => (d.level ? d.level : 1));
    },
    calculateGraph(name, skills) {
      // Create data for d3 graph
      const packData = this.packData(name, skills);
      const packChart = d3.pack();
      packChart.size([this.width, this.height]);
      packChart.padding(5);

      const output = packChart(packData).descendants();
      return output.map((d, i) => {
        const fill = this.colourScale(d.data.level);
        let response = { id: i + 1 };
        if (i === 0) {
          return response;
        }

        return {
          ...response,
          r: d.r,
          x: d.x,
          y: d.y,
          title: d.data.title ? d.data.title.replaceAll(" ", "\n") : "Unknown",
          fill,
          stroke: "grey",
        };
      });
    },
    calculateTextPositionX(title, x, r) {
      if (title.length > 15) {
        return x - (3 * r) / 4;
      }

      return x - r / 2;
    },
  },
};
</script>

<style scoped>
.chart {
  display: flex;
  flex-direction: row;

  overflow-x: scroll;
  scrollbar-color: var(--text-color) var(--highlight-color-2);
}

.chart__item {
  flex: 1;
}

.skill circle {
  cursor: pointer;
}

.skill circle:hover {
  opacity: 0.6;
}

.skill text {
  fill: var(--text-color);
}
</style>
