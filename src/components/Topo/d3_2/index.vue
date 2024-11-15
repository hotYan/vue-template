<template>
  <div class="" style="border: 1px solid #ccc;margin:2px;">
    <svg id="topo" class="dagre" width="1000" height="1000">
      <!-- <g /> -->
    </svg>
    <!-- <div ref="tooltip" class="tipsy">
      <p class="name">{{ currentNode.name }}</p>
      <p class="description">{{ currentNode.description }}</p>
    </div> -->
  </div>
</template>

<script>
import options from './data'
import Topo from './topo'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {},
  created() { },
  mounted() {
    new Topo('#topo', options).render()
  },
  methods: {}
}
</script>

<style lang="scss">
#topo {
  // border: 1px solid #ccc;
  user-select: none;
}

#topo text {
  font-size: 10px;
  /*和js里保持一致*/
  fill: #1a2c3f;
  text-anchor: middle;
}

#topo .node-other {
  text-anchor: start;
}

#topo .health1 {
  stroke: #92e1a2;
}

#topo .health2 {
  stroke: orange;
}

#topo .health3 {
  stroke: red;
}

#topo #cloud,
#topo #database {
  fill: #ccc;
}

#topo .link {
  stroke: black;
}

#topo .node-title {
  font-size: 14px;
}

#topo .node-code circle {
  fill: green;
}

#topo .node-code text {
  fill: #fff;
}

#topo .node-bg {
  fill: #fff;
}

#topo .arrow {
  fill: black;
}
</style>
