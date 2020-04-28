<template>
  <div class="app-container">
    <div class="tab">
      <el-button
        v-for="tab in tabArray"
        :key="tab.name"
        :type="activeName===tab.name ? 'primary':''"
        @click="tabClick(tab)"
      >{{ tab.label }}</el-button>
    </div>
    <router-view :key="key" />

  </div>
</template>

<script>
export default {
  name: 'SchoolDetails',
  data() {
    return {
      tabArray: [
        { label: '班级信息', name: 'ClassInfo', path: 'classinfo' },
        { label: '考勤设置', name: 'Attendance', path: 'attendance' }

      ]
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    activeName: {
      get() {
        const current = this.tabArray.filter((item) => {
          const path = '/school/1/' + item.path
          return path === this.$route.path
        })
        return current.length > 0 ? current[0].name : 'ClassInfo'
      },
      set() {}

    }
  },
  mounted() {
  },
  methods: {
    tabClick(e) {
      const { name } = e
      if (name) {
        const tab = this.tabArray.filter((item) => {
          return item.name === name
        })
        // tab切换的同时切换页面
        // console.log('xxxxx', tab[0].path)
        this.$router.push(tab[0].path)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.el-button{
  border:none;
  margin: 0;
  font-size: 16px;
  padding: 10px 25px;
  border-radius: 0;
  box-sizing: content-box;
  height: 25px;
}
.el-button:hover{
  background-color: white;
  color:#409EFF;
}
.el-button--primary{
  background-color: white;
  color:#409EFF;
  border-bottom:2px solid #409EFF ;

}

.tab{
  margin: 0 32px;
  height: 45px;
  border-bottom:2px solid lightgray ;
  box-sizing: content-box;
}
</style>
