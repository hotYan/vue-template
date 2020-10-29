<template>
  <div class="dashboard-container">
    <zyAudio
      v-for="(item,index) in arrs"
      :key="index"
      :url="item.url"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import zyAudio from '@/components/Audio/index'
export default {
  name: 'AudioIndex',
  components: {
    zyAudio
    // wavesurfer
  },
  data() {
    return {
      arrs: [
        { url: 'https://mindflowai-open.oss-cn-hangzhou.aliyuncs.com/505/6mariyokwzjuqjql.wav' },
        { url: 'https://mindflowai-open.oss-cn-hangzhou.aliyuncs.com/505/6mariyokwzjuqjql.wav' }
      ],
      url: 'https://mindflowai-open.oss-cn-hangzhou.aliyuncs.com/505/6mariyokwzjuqjql.wav'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
  },
  created() {
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
