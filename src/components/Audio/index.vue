<template>
  <div>
    <el-card>
      <div class="audio-warp">
        <div id="timeline" ref="timeline" />
        <div id="waveform" ref="waveform" />
        <div class="button-warp" style="text-align:left;">
          <h2>{{ '0 - 00:' +currentTime }}</h2>
        </div>
        <div class="button-warp">
          <el-button-group>
            <el-button
              v-for="item in playArr"
              :key="item.type"
              :type="item.type"
              :icon="item.icon"
              @click="item.method"
            />
          </el-button-group>

        </div>
        <div
          v-for="(item,index) in sliderArr"
          :key="index"
          class="button-warp"
          style="margin:20px;"
        >
          <svg-icon :icon-class="item.left" />
          <el-slider v-model="item.model" @change="item.method" />
          <svg-icon :icon-class="item.right" />
        </div>
        <div class="button-warp" style="float:right">
          <el-radio-group v-model="ratePosition" @change="changeAudioRate">
            <el-radio-button
              v-for="item in rateArr"
              :key="item"
              :label="item"
            >{{ item }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <!-- <el-card style="margin:20px 0 0 0;">
      <pageloading
        :total="total"
        :currnt-page="tableMate.page"
        :page-size="tableMate.page_size"
        @page-change="pageChange"
      >
        <template v-slot:table>
          <el-table
            ref="multipleTable"
            v-loading="tableLoading"
            :data="tableData"
            border
            size="mini"
            style="width: 100%;"
            height="350"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" :index="1" label="序号" width="50" align="center" />
            <el-table-column prop="startTime" label="开始时间" align="center" />
            <el-table-column prop="endTime" label="结束时间" align="center" />
            <el-table-column label="标签" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tag" />
              </template>
            </el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <span>
                  <img title="删除" src="@/assets/icon/delete.png" width="15px" @click="deleteRegion(scope.row)">
                </span>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </pageloading>
    </el-card> -->
  </div>
</template>

<script>
import '@/assets/zy_icon/iconfont.css'
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline'
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions'
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor'
// import Pageloading from '@/components/Pageloading/index'
// import wavesurfer from 'wavesurfer.js/src/html-init.js'
export default {
  name: 'Dashboard',
  components: {
    // Pageloading
  },
  props: {
    url: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      tableData: [],
      total: 0,
      tableMate: {// 获取列表参数
        page_size: 8,
        page: 1
      },
      tableLoading: false,
      regionList: '',
      currentTime: '00:00.00',
      sliderArr: [
        { left: 'zoomDown1', method: this.changeZoom, model: 0, right: 'zoomUp1' },
        { left: 'volumeDown', method: this.changeRound, model: 50, right: 'volumeUp' }
      ],
      playArr: [
        { type: 'success', icon: 'zy-icon-play', method: this.play },
        { type: 'warning', icon: 'zy-icon-pause', method: this.pause },
        { type: 'primary', icon: 'zy-icon-replay', method: this.rePlay },
        { type: 'danger', icon: 'zy-icon-stop', method: this.stop }
      ],
      ratePosition: '1.0',
      rateArr: ['0.5', '1.0', '1.25', '1.5', '2.0'],
      currentRegion: '',
      wavesurfer: ''
    }
  },

  computed: {},
  watch: {
    // newSpeed: function() {
    //   return this.speed
    // }
  },
  created() {
    this.initAudio()
  },
  mounted() {},
  methods: {
    initAudio() {
      const _this = this
      _this.$nextTick(() => {
        _this.wavesurfer = WaveSurfer.create({
          container: _this.$refs.waveform,
          audioRate: 1,
          forceDecode: true,
          minPxPerSec: 10,
          barGap: 3,
          // container: document.querySelector('#waveform'),
          // container: '#waveform',
          waveColor: '#A8DBA8',
          progressColor: '#3B8686',
          backend: 'MediaElement',
          plugins: [
            Region.create({
              regions: [
                {
                  start: 1,
                  end: 3,
                  loop: false,
                  color: 'hsla(400, 100%, 30%, 0.5)'
                }, {
                  start: 5,
                  end: 7,
                  loop: false,
                  color: 'hsla(200, 50%, 70%, 0.4)'
                }
              ],
              dragSelection: {
                slop: 5
              }
            }),
            Timeline.create({
              // container: '#timeline',
              container: _this.$refs.timeline,
              secondaryColor: '#FF0000', // 红色
              secondaryFontColor: '#FF0000',
              secondaryLabelInterval: _this._secondaryLabelInterval,

              primaryColor: '#3498DB', // 蓝色
              primaryFontColor: '#D3498DB',
              primaryLabelInterval: _this._primaryLabelInterval,
              formatTimeCallback: _this._formatTimeCallback,
              timeInterval: _this._timeInterval,
              labelPadding: 2
            }),
            Cursor.create({
              showTime: true,
              height: '50px',
              opacity: 1,
              customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
              }
            })
          ]
        })
        // console.log(_this.wavesurfer)
        /** 加载音频 */
        _this.wavesurfer.load(_this.url)
        /**
         * 初次加载列表
         */
        _this.regionList = Object.values(_this.wavesurfer.regions.list)
        _this.getRegionList(_this.regionList)

        /**
         * audioprocess，获取当前时间
         */
        _this.wavesurfer.on('audioprocess', function(e) {
          _this.currentTime = _this.changeTime(_this.wavesurfer.getCurrentTime())
        })
        /** 点击区域*/
        _this.wavesurfer.on('region-click', function(region, mouseEvent) {
          _this.currentRegion = region
          region.play() // 播放当前区域，另一种播放方式： _this.wavesurfer.play(start, end)
        })
        /** 新增区域*/
        _this.wavesurfer.on('region-created', (region) => {
          _this.currentRegion = region
          // console.log('_this.regions', _this.regions)
        })
        /** 新增后*/
        _this.wavesurfer.on('region-update-end', (region) => {
          /** 播放区域的两种方式 */
          // _this.wavesurfer.play(_this.currentRegion.start, _this.currentRegion.end)//①
          region.play()// ②

          /** 新增区域列表 */
          _this.regionList = Object.values(_this.wavesurfer.regions.list)
          _this.getRegionList(_this.regionList)
        })
        /** 光标即将离开区域*/
        _this.wavesurfer.on('region-out', function(region) {
          // _this.pause()
          // console.log('region-out:', e)
        })
      })
    },
    /** 获取区域列表 */
    getRegionList(listArr) {
      const _this = this
      _this.tableData = []// 清除
      if (listArr.length !== 0) {
        for (let i = listArr.length - 1; i >= 0; i--) { // 最新的在最前面
          _this.tableData.push({ id: listArr[i].id, startTime: _this.changeTime(listArr[i].start), endTime: _this.changeTime(listArr[i].end) })
        }
        _this.total = listArr.length
      }

      // Object.keys(List).forEach((i, index) => {
      //   _this.tableData.push({ id: index, startTime: _this.changeTime(List[i].start), endTime: _this.changeTime(List[i].end) })
      // })
      // console.log('_this.tableData', _this.tableData)
    },
    deleteRegion(row) {
      Object.values(this.wavesurfer.regions.list).forEach((region, index) => {
        if (row.id === region.id) {
          region.remove()
        }
      })
      this.regionList.forEach((item, index) => {
        if (row.id === item.id) {
          this.regionList.splice(index, 1)
          this.getRegionList(this.regionList)
        }
      })
    },
    addRegions(e) {
      this.currentRegion = this.wavesurfer.addRegion(e)
    },
    /** 格式化时间格式 */
    changeTime(seconds) {
      seconds = Number(seconds)
      var minutes = Math.floor(seconds / 60)
      seconds = seconds % 60

      // fill up seconds with zeroes
      var secondsStr = Math.round(seconds).toString()
      secondsStr = seconds.toFixed(2)

      if (minutes > 0) {
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + secondsStr : secondsStr}`
      }
      return `00:${seconds < 10 ? '0' + secondsStr : secondsStr}`
    },
    /** 改变播放速度 */
    changeAudioRate(value) {
      this.wavesurfer.setPlaybackRate(Number(value))
    },
    /** 次要标签的数量 */
    _secondaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 20 && pxPerSec < 40) {
        return 12
      } else if (pxPerSec >= 0 && pxPerSec < 20) {
        return 10
      } else {
        return Math.floor(10 / this._timeInterval(pxPerSec))
      }
    },
    /** 主要标签的数量 */
    _primaryLabelInterval(pxPerSec) {
      var retval = 1
      if (pxPerSec >= 100) {
        retval = 2
      } else if (pxPerSec >= 80) {
        retval = 1
      } else if (pxPerSec >= 60) {
        retval = 1
      } else if (pxPerSec >= 40) {
        retval = 5
      } else if (pxPerSec >= 20) {
        retval = 2
      } else {
        // retval = Math.ceil(0.5 / pxPerSec) * 60
        retval = 1
      }
      return retval
    },
    /** @param pxPerSec  返回以分钟为单位的值 */
    _timeInterval(pxPerSec) {
      var retval = 1
      if (pxPerSec >= 100) { // 0.5,1,1.5,2,...,9.5,10
        retval = 0.5
      } else if (pxPerSec >= 80) { // 1,2,...,9,10
        retval = 1
      } else if (pxPerSec >= 60) { // 2,4,6,8,10
        retval = 2
      } else if (pxPerSec >= 40) { // 5,10
        retval = 1
      } else if (pxPerSec >= 20) {
        retval = 5
      } else {
        retval = Math.ceil(0.5 / pxPerSec) * 60
      }
      return retval
    },
    /** 返回的时间格式 */
    _formatTimeCallback(seconds, pxPerSec) {
      seconds = Number(seconds)
      var minutes = Math.floor(seconds / 60)
      seconds = seconds % 60

      // fill up seconds with zeroes
      var secondsStr = Math.round(seconds).toString()
      if (pxPerSec >= 25 * 10) {
        secondsStr = seconds.toFixed(2)
      } else if (pxPerSec >= 25 * 1) {
        secondsStr = seconds.toFixed(1)
      }

      if (minutes > 0) {
        if (seconds < 10) {
          secondsStr = '0' + secondsStr
        }
        return `${minutes}:${secondsStr}`
      }
      return secondsStr
    },
    play() {
      this.wavesurfer.play()
      // console.log('tag', this.wavesurfer.getCurrentTime())
    },
    rePlay() {
      this.wavesurfer.play(0)
    },
    pause() {
      this.wavesurfer.pause()
    },
    stop() {
      this.wavesurfer.stop()
    },
    /** 改变音量 */
    changeRound() {
      this.wavesurfer.setVolume(Number(this.sliderArr[1].model * 0.01))
      // console.log('tag', this.wavesurfer.getVolume())
    },
    /** 改变声波大小 */
    changeZoom() {
      this.wavesurfer.zoom(Number(this.sliderArr[0].model))

      // this.wavesurfer.on('zoom', (e) => {
      //   console.log('e', e)
      // })
    },
    /** 页码改变 */
    pageChange(page) {
      this.tableMate.page = page
      this.getRegionList(this.regionList)
    },
    /** 点击区域，对应的列表项高亮 */
    tableRowClassName({ row, rowIndex }) {
      if (this.currentRegion.id === row.id) {
        return 'success-row'
      }
      return ''
    }

  }
}
</script>

<style lang="scss" scoped>

#waveform{
  position: relative;
}
.audio-warp{
  // width:90%;
  // margin:0 auto;

  .button-warp{
    text-align:center;
    margin: 20px 0 20px 0;
    max-width:400px;
    min-width:200px;
    float:left;
    position: relative;
    .svg-icon{
      position: absolute;
      top:14px;
    }
    .el-button{
      padding:10px 18px;
    }
    // .span-style{
    //   display: inline-block;
    //   height:40px;
    //   width:50px;
    //   text-align: center;
    //   background-color: green;
    //   border-radius: 2px;
    // }
    .el-slider{
      width:100px;
      display: inline-block;
      margin:0  10px 0 25px ;

    }
  }
  .speed{

    // background-color: aquamarine;
    span{
      background-color: white;
      padding: 5px 10px;
      border: 1px solid blue;
    }
  }
}

// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
</style>
