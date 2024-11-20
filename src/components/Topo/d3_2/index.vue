<template>
  <div class="" style="border: 1px solid #ccc;margin:2px;">
    <svg id="topo" class="dagre" width="1800" height="1000">
      <!-- <g /> -->
    </svg>
    <!-- <div ref="tooltip" class="tipsy">
      <p class="name">{{ currentNode.name }}</p>
      <p class="description">{{ currentNode.description }}</p>
    </div> -->
  </div>
</template>

<script>
// const symbolSize = 40
// const padding = 10
// const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const Line = {
  '4A': { x1: 100, y1: 500, x2: 1300, y2: 500, textOffsetX: 25, stroke: 'blue', 'stroke-width': 2 },
  INNER: { x1: 140, y1: 540, x2: 1340, y2: 540, textOffsetX: 50, stroke: 'green', 'stroke-width': 2 }
}

const leftX = 100
const defaultNodeY = 300
const step = 100
// const fontSize = 10
import options from './data'
// import Topo from './topo'
import * as d3 from 'd3'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      container: '',
      lineGroup: null
    }
  },
  computed: {
  },
  watch: {},
  created() { },
  mounted() {
    this.container = d3.select('#topo')
    this.initDefineSymbol()
    this.initPosition()
    this.drawLine(Line)
    this.drawLinkLine()// 划线
    this.drawNode()
    const path = this.container.append('path').attr('d', 'M 100 210 L 1200 210').attr('stroke', 'red').attr('stroke-width', 2).attr('class', 'path')
    const len = path.node().getTotalLength()
    path.attr('stroke-dasharray', `${len * 0.005} 10`)
      .attr('stroke-dashoffset', -400)
    path.transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke', 'green')
      .attr('stroke-dashoffset', 0)

    console.log('path2', d3.select('.path'))
    console.log('path1', path.node())
    console.log('path1', d3.select('.path').node())
    console.log('path.getBBox()', d3.select('.path').node().getBBox())

    const arr = [1, 2, 3, 4]
    arr.forEach((item) => {
      this.container.append('text').text('segmentfault.com')
        .attr('x', 100).attr('y', 100)
        .attr('class', 'text text-' + item)
    })
    arr.forEach((item) => {
      this.container.append('path')
        .attr('d', 'M 100 200 L 1200 200')
        .attr('class', 'text text-' + item).attr('stroke-dasharray', '30 120')
    })
  },
  methods: {
    drawLine(data) {
      Object.keys(data).forEach(key => {
        const { x1, y1, x2, y2, stroke, textOffsetX, 'stroke-width': strokeWidth } = data[key]
        this.container.append('text')
          .attr('width', 50).attr('height', 50)
          .attr('font-weight', 'blod')
          .attr('fill', stroke).text(key)
          .attr('x', x1 - textOffsetX).attr('y', y1 + 4)
          .attr('text-align', 'center')
        this.container.append('text')
          .attr('width', 50).attr('height', 50)
          .attr('font-weight', 'blod')
          .attr('fill', stroke).text(key)
          .attr('x', x2 + 5).attr('y', y2 + 4)
          .attr('text-align', 'center')
        this.container.append('line')
          .attr('x1', x1).attr('y1', y1)
          .attr('x2', x2).attr('y2', y2)
          .attr('stroke', stroke)
          .attr('stroke-width', strokeWidth)
      })
    },
    drawLinkLine() {
      if (this.lineGroup) {
        this.lineGroup.selectAll('.link').attr('d', d => genLinkPath(d))
      } else {
        this.lineGroup = this.container.append('g')
        this.lineGroup.selectAll('.link')
          .data(options.data)
          .enter()
          .append('path')
          .attr('class', 'link')
          .attr('id', (link, i) => 'link-' + i)
          .attr('stroke', (d) => {
            const { type } = d
            return Line[type].stroke
          })
          .attr('stroke-width', 1)
          .attr('marker-end', (link, i) => 'url(#' + 'marker-' + i + ')')
          .attr('d', d => genLinkPath(d))
      }
      // 确认连接线的路径
      function genLinkPath(d) {
        const { x, y, rx, ry } = d
        // if(x<)Line[d.type].x1
        return 'M' + rx + ',' + ry + ' L' + x + ',' + y
      }
    },
    drawCloud() {
      this.container.append('g').selectAll('.node')
        .data(options.data).enter()
        .append('use')
        .attr('xlink:href', '#cloud')
        .attr('class', (d, i) => {
          d.id = i
          return `node-${d.name}-${i}`
        })
        .attr('transform', (d) => `translate(${d.x - 20}, ${d.y - 50})`)
        .call(d3.drag().on('drag', (event, d) => {
          console.log(d)
          d.x = event.x
          d.y = event.y
          d.rx = event.x
          d3.select(`.node-${d.name}-${d.id}`).attr('transform', `translate(${event.x - 20} ,${event.y > 500 ? event.y + 10 : event.y - 50})`)
          this.drawLinkLine()
          // this.drawLinkText()
        }))
        .on('click', (d) => {
          console.log('当前被点击的节点是：', d)
        })
    },
    drawNode() {
      const rectW = 90
      const rectH = 50
      const nodes = this.container.selectAll('.node')
        .data(options.data).enter().append('g')
        .attr('class', (d, i) => {
          d.id = i
          return `node-${d.name}-${i}`
        })
        .attr('cursor', 'pointer')
        .attr('transform', (d) => `translate(${d.x - rectW / 2}, ${d.y - rectH - 11})`)
        .call(d3.drag().on('drag', (event, d) => {
          console.log(d)
          d.x = event.x
          d.y = event.y
          d.rx = event.x
          if (event.x > Line[d.type].x1 && event.x < Line[d.type].x2) {
            d3.select(`.node-${d.name}-${d.id}`)
              .attr('transform', `translate(${event.x - rectW / 2} ,${event.y > 500 ? event.y + 10 : event.y - rectH - 11})`)
          }
          this.drawLinkLine()
          // this.drawLinkText()
        }))
      // 节点背景默认背景层
      nodes.append('rect')
        .attr('width', rectW).attr('height', rectH)
        .attr('fill', 'white')
        .attr('class', 'node-bg').attr('opacity', '1')

      nodes.append('rect')
        .attr('width', rectW).attr('height', rectH)
        // .attr('fill', 'LightSkyBlue')
        .attr('fill', 'none')
        .attr('stroke', 'LightSkyBlue')
        .attr('stroke-width', 1)
      // .attr('opacity', '1')

      nodes.append('text')
        .attr('width', rectW).attr('height', rectH)
        .attr('font-weight', 'blod')
        .attr('text-anchor', 'middle')
        .attr('class', (d, i) => {
          d.id = i
          console.log(11, d)
          return `text-${d.name}-${i}`
        })
        .attr('transform', (d) => `translate(${rectW / 2}, ${rectH / 2 + 5})`)
        // .attr('x', d => d.x).attr('y', d => d.y)
        .attr('fill', 'red').text(d => d.name)
        .on('click', (event, d) => {
          console.log(event, d)
          const className = `.text-${d.name}-${d.id}`
          console.log('当前被点击的文本是：', d, d3.select(className).node().getBBox())
        })
      // this.container.append('g').selectAll('.text')
      //   .data(options.data).enter()
      //   .append('text')
      //   .attr('width', 50).attr('height', 50)
      //   .attr('font-weight', 'blod')
      //   .attr('class', (d, i) => {
      //     d.id = i
      //     return `text-${d.name}-${i}`
      //   })
      //   .attr('cursor', 'pointer')
      //   .attr('x', d => d.x - 25).attr('y', d => d.y - 25)
      //   .attr('fill', 'red').text(d => d.name)
      //   .attr('text-anchor', 'middle')
      //   .on('click', (event, d) => {
      //     console.log(event, d)
      //     const className = `.text-${d.name}-${d.id}`
      //     console.log('当前被点击的文本是：', d, d3.select(className).node().getBBox())
      //   })
    },
    initPosition() {
      // const len = options.data.length
      options.data.forEach((item, i) => {
        const { type } = item
        item.x = Line[type].x1 + step * i
        item.y = defaultNodeY
        item.rx = item.x
        item.ry = Line[type].y2
      })
    },
    initDefineSymbol() {
      // defs用于预定义一个元素使其能够在SVG图像中重复使用，我们defs标签中的g元素必须在<g>元素上设置一个ID，通过ID来引用它。
      const defs = this.container.append('g').append('svg:defs')
      // 向defs中添加箭头元素
      defs.selectAll('marker')
        .data(options.data)
        .enter()
        .append('svg:marker')
        .attr('id', (link, i) => 'marker-' + i)
        .attr('markerUnits', 'userSpaceOnUse')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 2)
        .attr('refY', 0)
        .attr('markerWidth', 14)
        .attr('markerHeight', 14)
        .attr('orient', 'auto')
        .attr('stroke-width', 2)
        .append('svg:path')
        .attr('d', 'M2,0 L0,-3 L9,0 L0,3 M2,0 L0,-3')
        .attr('class', 'arrow')

      // 向defs中添加数据库
      defs.append('g').attr('id', 'database')
        .attr('transform', 'scale(0.042)')
        .append('path').attr('style', 'fill:#297aff')
        .attr('d', 'M512 800c-247.42 0-448-71.63-448-160v160c0 88.37 200.58 160 448 160s448-71.63 448-160V640c0 88.37-200.58 160-448 160z M512 608c-247.42 0-448-71.63-448-160v160c0 88.37 200.58 160 448 160s448-71.63 448-160V448c0 88.37-200.58 160-448 160z M512 416c-247.42 0-448-71.63-448-160v160c0 88.37 200.58 160 448 160s448-71.63 448-160V256c0 88.37-200.58 160-448 160z M64 224a448 160 0 1 0 896 0 448 160 0 1 0-896 0Z')

      // 向defs中添加云
      defs.append('g').attr('id', 'cloud').attr('transform', 'scale(0.042)').append('path')
        .attr('d', 'M709.3 285.8C668.3 202.7 583 145.4 484 145.4c-132.6 0-241 102.8-250.4 233-97.5 27.8-168.5 113-168.5 213.8 0 118.9 98.8 216.6 223.4 223.4h418.9c138.7 0 251.3-118.8 251.3-265.3 0-141.2-110.3-256.2-249.4-264.5z')

      // 向defs中添加应用
      defs.append('g').attr('id', 'myapp').attr('transform', 'scale(0.042)').append('path')
        .attr('d', 'M544 552.325V800a32 32 0 0 1-32 32 31.375 31.375 0 0 1-32-32V552.325L256 423.037a32 32 0 0 1-11.525-43.512A31.363 31.363 0 0 1 288 368l224 128 222.075-128a31.363 31.363 0 0 1 43.525 11.525 31.988 31.988 0 0 1-11.525 43.513L544 551.038z m0 0,M64 256v512l448 256 448-256V256L512 0z m832 480L512 960 128 736V288L512 64l384 224z m0 0')

      // 向defs中添加地球
      const earth = defs.append('g').attr('id', 'earth').attr('transform', 'scale(0.042)')
      earth.append('path').attr('d', 'm 973.70505,457.95556 c -9.82626,-86.10909 -43.70101,-167.56364 -97.74545,-235.57172 -12.54142,6.07677 -24.69495,12.15353 -36.7192,17.71313 3.23233,14.48081 6.46465,29.34949 9.30909,45.12323 10.73132,58.69899 18.61819,131.7495 17.71314,218.76364 36.71919,-13.83434 72.53333,-28.70303 107.44242,-46.02828 z M 224.32323,247.59596 c -2.84444,8.40404 -6.07677,17.19596 -8.79192,26.50505 -17.71313,59.08687 -30.25454,134.46465 -26.50505,227.55556 39.04647,15.38585 84.29899,30.25454 134.98182,41.8909 57.66465,13.05859 126.57778,22.75556 204.8,22.36768 V 310.9495 h -8.40404 c -101.49495,0 -202.47273,-21.46263 -296.08081,-63.35354 z M 550.14141,48.355556 V 289.87475 c 80.03233,-3.23233 168.98586,-20.94546 264.40405,-61.41414 -7.88687,-31.67677 -17.71314,-62.3192 -28.83233,-92.57374 C 716.41212,85.20404 635.34546,54.949495 550.14141,48.355556 Z M 52.622222,432.87273 c 21.850505,13.96363 61.414138,37.23636 115.846468,59.99192 -2.84445,-92.18586 10.21414,-167.04647 27.92727,-226.26263 2.84444,-9.82626 6.07677,-19.13535 9.30909,-27.92727 -20.42828,-9.82627 -37.23636,-19.52324 -49.77778,-27.02223 C 102.4,275.13535 66.973738,351.41818 52.622222,432.87273 Z')
      earth.append('path').attr('d', 'm 845.31717,511.09495 c 1.42222,-104.72727 -9.82626,-192.25859 -25.6,-262.46465 -96.8404,40.98586 -187.60404,58.69899 -269.05858,61.93132 v 255.09495 c 100.07272,-2.97374 199.2404,-21.59192 294.65858,-54.56162 z')
      earth.append('path').attr('d', 'M 845.70505,727.53131 C 882.94142,708.00808 918.75556,685.6404 952.7596,660.0404 969.0505,612.07273 976.93737,562.29495 976.93737,512 c 0,-10.73131 -0.51717,-21.46263 -1.42222,-32.06465 -37.23636,18.10101 -73.95555,33.09899 -110.28687,46.02829 -1.8101,67.49091 -8.27474,134.98181 -19.52323,201.56767 z M 169.50303,516.13737 C 128.12929,499.32929 88.048485,478.90101 49.389899,455.62828 41.890909,516.65455 46.545455,578.45657 62.836364,637.67273 107.05455,667.4101 153.08283,694.04444 201.56768,716.8 182.9495,642.84444 172.73535,576.25859 169.50303,516.13737 Z m 360.2101,283.5394 V 586.47273 h -3.23232 c -114.55354,0 -228.5899,-20.94546 -335.64445,-61.93132 4.13738,60.50909 14.86869,128.51718 35.42627,202.9899 35.81414,15.77374 74.9899,30.25455 117.26868,42.40808 60.50909,17.58384 122.82829,27.41011 186.18182,29.73738 z M 208.93737,742.4 C 162.00404,720.93737 116.88081,696.7596 73.050505,668.83232 108.86465,768.38788 177.26061,852.68687 267.11919,908.02424 244.36364,854.10909 224.8404,798.77172 208.93737,742.4 Z m 320.77576,76.8 c -65.16364,-1.8101 -129.8101,-11.63636 -192.25859,-29.73737 -35.42626,-10.21415 -69.81818,-22.36768 -103.30505,-36.33132 15.77374,53.52728 36.7192,111.19192 63.35354,171.70101 65.68081,34.90909 139.63636,52.62222 214.10909,52.62222 6.07677,0 12.15354,-0.51717 18.10101,-0.51717 z M 213.20404,219.28081 c 15.77374,-40.46869 34.39192,-74.9899 52.62222,-102.91717 -35.42626,21.8505 -67.49091,48.87272 -95.93535,79.12727 11.24848,6.98182 25.6,15.38586 43.31313,23.7899 z m 628.36364,532.94545 c -6.46465,35.42627 -13.96364,71.62829 -23.27273,109.89899 52.10505,-46.02828 93.60808,-102.91717 121.01818,-166.65858 -30.77172,20.81616 -63.35353,39.95151 -97.74545,56.75959 z')
      earth.append('path').attr('d', 'm 550.14141,585.95556 v 213.59191 c 95.41819,0 186.69899,-20.42828 272.80809,-61.02626 13.05858,-74.47272 19.52323,-142.86869 21.46262,-205.70505 -95.0303,32.71111 -194.19798,50.42424 -294.27071,53.1394 z')
      earth.append('path').attr('d', 'm 818.81212,762.82828 c -84.81616,37.23637 -175.96768,56.88889 -268.67071,56.88889 v 155.92727 c 87.53132,-6.98181 171.31314,-39.04646 241.5192,-92.18585 10.73131,-41.50303 20.0404,-81.97172 27.15151,-120.63031 z m 15.25657,-543.15959 c 9.30909,-4.13738 18.61818,-8.79192 27.92727,-13.44647 -13.96364,-16.29091 -29.34949,-31.15959 -45.12323,-45.12323 6.07677,17.58384 11.63636,37.23636 17.19596,58.5697 z m -602.24647,8.40404 c 93.60808,42.40808 194.97374,63.35353 297.37374,62.31919 V 47.062626 C 453.30101,43.830303 377.40606,59.60404 309.0101,92.70303 c -25.08283,31.54748 -53.91515,76.67071 -77.18788,135.3697 z')
      earth.selectAll('path').attr('style', 'fill:#297aff')

      // docker
      const docker = defs.append('g').attr('id', 'docker').attr('transform', 'scale(0.042)')
      docker.append('path').attr('style', 'fill:#039bc5').attr('d', 'M 1006.7627,438.61333 A 163.24267,163.24267 0 0 0 885.84533,427.648 a 160.85333,160.85333 0 0 0 -65.408,-102.4 L 807.552,315.09333 796.58667,327.46667 a 135.12533,135.12533 0 0 0 -25.6,97.45066 c 1.70666,23.63734 10.15466,46.37867 24.448,65.49334 -11.22134,6.272 -22.99734,11.52 -35.2,15.40266 a 233.38667,233.38667 0 0 1 -72.448,11.69067 H 3.754667 L 2.304,532.82133 a 285.48267,285.48267 0 0 0 24.106667,148.992 l 9.386666,18.51734 1.024,1.70666 c 64.213337,106.19734 192.554667,161.152 315.519997,161.152 238.16534,0 419.328,-113.70666 509.61067,-332.20266 60.33067,3.072 121.94133,-14.29334 151.552,-70.31467 l 7.5093,-14.29333 -14.2506,-7.97867 z m -803.66937,276.352 A 53.546667,53.546667 0 0 1 205.14133,608 53.333333,53.333333 0 0 1 258.048,661.504 54.229333,54.229333 0 0 1 203.09333,714.96533 Z')
      docker.append('path').attr('style', 'fill:#38504f').attr('d', 'm 203.09333,633.25867 a 28.16,28.16 0 1 0 28.928,28.24533 28.501333,28.501333 0 0 0 -8.704,-20.13867 27.946667,27.946667 0 0 0 -20.224,-8.10666 z')
      docker.append('path').attr('style', 'fill:#2bb558').attr('d', 'm 54.869333,387.88267 h 97.109337 v 97.152 H 54.912 V 387.84 m 129.49333,0 h 97.10934 v 97.152 h -97.152 V 387.84 m 0,-129.49333 H 281.472 v 97.152 h -97.10933 v -97.10934 m 129.57866,0 h 97.152 v 97.152 h -97.152 v -97.152 m 0,129.49334 h 97.152 v 97.152 h -97.152 V 387.84 m 129.49334,0 h 97.152 v 97.152 h -97.152 V 387.84 m 129.57866,0 h 97.152 v 97.152 h -97.152 V 387.84 M 443.43467,258.34667 h 97.152 v 97.152 h -97.152 v -97.10934 m 0,-129.57866 h 97.152 v 97.152 h -97.152 v -97.152')
    }
  }
}
</script>

<style lang="scss">
.text {
  font-size: 64px;
  font-weight: bold;
  text-transform: uppercase;
  fill: none;
  stroke-width: 2px;
  stroke-dasharray: 30 120;
  animation: stroke 6s infinite linear;
}

.text-1 {
  stroke: #3498db;
  text-shadow: 0 0 5px #3498db;
  animation-delay: -1.5s;
}

.text-2 {
  stroke: #f39c12;
  text-shadow: 0 0 5px #f39c12;
  animation-delay: -3s;
}

.text-3 {
  stroke: #e74c3c;
  text-shadow: 0 0 5px #e74c3c;
  animation-delay: -4.5s;
}

.text-4 {
  stroke: #9b59b6;
  text-shadow: 0 0 5px #9b59b6;
  animation-delay: -6s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
</style>
