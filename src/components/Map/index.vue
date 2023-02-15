<template>
  <div>
    地图
    <div id="map" style="width:100%;height:400px;" />
  </div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
export default {
  data() {
    return {
      zyMap: ''

    }
  },
  created() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.zyMap = new Map({
        layers: [
          new TileLayer({ source: new OSM() })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        }),
        target: 'map'
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
