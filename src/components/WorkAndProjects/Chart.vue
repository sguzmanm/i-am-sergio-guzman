<template>
  <div class="chart">
    <div class="chart__item" v-for="(skillGroup,index) in skillGroups" :key="index">
        <h2>
            {{skillGroup.name}}
        </h2>
        <svg
            :height='height'
            :width='width'
        >
        <g v-for="c in calculateGraph(skillGroup.name, skillGroup.skills)"
            class="skill"
            :key="c.id">
            <circle
                :r="c.r"
                :cx="c.x"
                :cy="c.y"
                :fill="c.fill"
                :stroke="c.stroke"
            />
            <text
                :dx="c.x-c.r/2"
                :dy="c.y">
                {{c.title}}
            </text>
        </g>
        </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

const skillGroups = require('@/helpers/layout/skills.json');

export default {
  name: 'PackChart',
  data() {
    return {
      msg: '👋 from the Chart Component',
      height: 400,
      width: 450,
      skillGroups,
    };
  },
  created() {
    this.colourScale = d3
      .scaleOrdinal()
      .range(['#5EAFC6', '#FE9922', '#93c464', '#75739F']);
  },
  methods: {
    packData(name, skills) {
      const packableTweets = { id: name, values: skills };
      return d3
        .hierarchy(packableTweets, (d) => d.values)
        .sum((d) => (d.level ? d.level : 1));
    },
    calculateGraph(name, skills) {
      const packData = this.packData(name, skills);
      const packChart = d3.pack();
      packChart.size([this.width, this.height]);
      packChart.padding(10);
      const output = packChart(packData).descendants();
      return output.map((d, i) => {
        console.log('ITEM', d);
        const fill = this.colourScale(d.data.level);
        let response = { id: i + 1 };
        if (i !== 0) {
          response = {
            ...response,
            r: d.r,
            x: d.x,
            y: d.y,
            title: d.data.title,
            fill,
            stroke: 'grey',
          };
        }
        return response;
      });
    },
  },
};
</script>

<style scoped>
.chart{
    display:flex;
    flex-direction:row;

    overflow-x: scroll;
}

/* width */
.chart::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.chart::-webkit-scrollbar-track {
  background: var(--highlight-color-2);
}

/* Handle */
.chart::-webkit-scrollbar-thumb {
  background: var(--text-color);
}

/* Handle on hover */
.chart::-webkit-scrollbar-thumb:hover {
  background: var(--highlight-color);
}


.chart__item{
    flex:1;
}

.skill circle{
    cursor:pointer;
}

.skill circle:hover{
    opacity:0.6;
}

.skill text{
  fill: var(--text-color);
}
</style>
