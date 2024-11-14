<template>
  <div class="">
    <svg class="dagre" width="800" height="100vh" style="border: 1px solid #ccc;margin:2px;">
      <!-- <g /> -->
    </svg>
    <div ref="tooltip" class="tipsy">
      <p class="name">{{ currentNode.name }}</p>
      <p class="description">{{ currentNode.description }}</p>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'
const states = {
  CLOSED: {
    description: 'represents no connection state at all.',
    style: 'fill: #f77'
  },

  LISTEN: {
    description: 'represents waiting for a connection request from any ' +
      'remote TCP and port.'
  },

  'SYN SENT': {
    description: 'represents waiting for a matching connection ' +
      'request after having sent a connection request.'
  },

  'SYN RCVD': {
    description: 'represents waiting for a confirming connection ' +
      'request acknowledgment after having both received and sent a ' +
      'connection request.'
  },

  ESTAB: {
    description: 'represents an open connection, data received ' +
      'can be delivered to the user.  The normal state for the data ' +
      'transfer phase of the connection.',
    style: 'fill: #7f7'
  },

  'FINWAIT-1': {
    description: 'represents waiting for a connection termination ' +
      'request from the remote TCP, or an acknowledgment of the ' +
      'connection termination request previously sent.'

  },

  'FINWAIT-2': {
    description: 'represents waiting for a connection termination ' +
      'request from the remote TCP.'
  },

  'CLOSE WAIT': {
    description: 'represents waiting for a connection termination ' +
      'request from the local user.'
  },

  CLOSING: {
    description: 'represents waiting for a connection termination ' +
      'request acknowledgment from the remote TCP.'
  },

  'LAST-ACK': {
    description: 'represents waiting for an acknowledgment of the ' +
      'connection termination request previously sent to the remote ' +
      'TCP (which includes an acknowledgment of its connection ' +
      'termination request).'
  },

  'TIME WAIT': {
    description: 'represents waiting for enough time to pass to be ' +
      'sure the remote TCP received the acknowledgment of its ' +
      'connection termination request.'
  }
}
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      currentName: 'CLOSED',
      currentNode: {
        name: '',
        description: ''
      },
      states
    }
  },
  computed: {
    // currentNode() {
    //   return { name: this.currentName, description: this.states[this.currentName].description }
    // }
  },
  watch: {},
  created() { },
  mounted() {
    const g = new dagreD3.graphlib.Graph().setGraph({
      rankdir: 'LR'
    })
    g.setNode('4A_left', { label: '4A', x: 10, y: 0, style: 'stroke-opacity:1' })
    g.setNode('4A_right', { label: '4A', x: 800, y: 0, style: 'stroke-opacity:1' })

    g.setEdge('4A_left', '4A_right', { label: '4A', arrowhead: 'undirected' })
    // g.setEdge('LISTEN', 'SYN RCVD', { label: 'rcv SYN' })
    // g.setEdge('LISTEN', 'SYN SENT', { label: 'send' })
    // g.setEdge('LISTEN', 'CLOSED', { label: 'close' })
    // g.setEdge('SYN RCVD', 'FINWAIT-1', { label: 'close' })
    // g.setEdge('SYN RCVD', 'ESTAB', { label: 'rcv ACK of SYN' })
    // g.setEdge('SYN SENT', 'SYN RCVD', { label: 'rcv SYN' })
    // g.setEdge('SYN SENT', 'ESTAB', { label: 'rcv SYN, ACK' })
    // g.setEdge('SYN SENT', 'CLOSED', { label: 'close' })
    // g.setEdge('ESTAB', 'FINWAIT-1', { label: 'close' })
    // g.setEdge('ESTAB', 'CLOSE WAIT', { label: 'rcv FIN' })
    // g.setEdge('FINWAIT-1', 'FINWAIT-2', { label: 'rcv ACK of FIN' })
    // g.setEdge('FINWAIT-1', 'CLOSING', { label: 'rcv FIN' })
    // g.setEdge('CLOSE WAIT', 'LAST-ACK', { label: 'close' })
    // g.setEdge('FINWAIT-2', 'TIME WAIT', { label: 'rcv FIN' })
    // g.setEdge('CLOSING', 'TIME WAIT', { label: 'rcv ACK of FIN' })
    // g.setEdge('LAST-ACK', 'CLOSED', { label: 'rcv ACK of FIN' })
    // g.setEdge('TIME WAIT', 'CLOSED', { label: 'timeout=2MSL', arrowhead: 'undirected' })// arrowhead:normal,vee,undirected

    var render = new dagreD3.render()
    var svg = d3.select('svg.dagre')
    var inner = svg.append('g')

    // 拖拽缩放
    // var zoom = d3.zoom().on('zoom', function (current) {
    //   inner.attr('transform', current.transform)
    // })
    // svg.call(zoom)

    render(inner, g)// Run the renderer. This is what draws the final graph.

    // tooltip
    const tooltip = this.$refs.tooltip
    const that = this
    inner.on('mouseover', function (e) {
      console.log(e, 11)
      that.currentName = e.target.__data__
      that.currentNode = { name: that.currentName, description: that.states[that.currentName] && that.states[that.currentName].description }
      tooltip.style.display = 'block'
      tooltip.style.left = e.clientX - 20 + 'px'
      tooltip.style.top = e.clientY - 100 + 'px'
    }).on('mouseout', function () {
      tooltip.style.display = 'none'
    })

    // 居中
    // var initialScale = 0.75
    // svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr('width') - g.graph().width * initialScale) / 2, 20).scale(initialScale))

    // svg.attr('height', g.graph().height * initialScale + 40)
  },
  methods: {}
}
</script>

<style lang="scss">
text {
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
  font-size: 14px;
}

.node rect {
  stroke: #333;
  fill: #fff;
}

.edgePath path {
  stroke: #333;
  fill: #333;
  stroke-width: 1.5px;
}

.node text {
  pointer-events: none;
}

.tipsy {
  position: absolute;
  font-size: 12px;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  cursor: pointer;
  display: none;
  padding: 10px;
  text-align: center;
  max-width: 200px;
}

/* This styles the title of the tooltip */
.tipsy .name {
  font-size: 1.5em;
  font-weight: bold;
  color: #60b1fc;
  margin: 0;
}

/* This styles the body of the tooltip */
.tipsy .description {
  font-size: 1.2em;
}
</style>
