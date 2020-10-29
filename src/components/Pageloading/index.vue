<template>
  <div>
    <div>
      <slot name="table" />
    </div>
    <div class="pageination-box">
      <el-pagination class="pageination-class" background layout="total, prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="currentChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: null
    },
    pageNum: {
      type: Number,
      default: null
    },
    pageSize: {
      type: Number,
      default: null
    }
  },
  watch: {
    pageNum(val) {
      // console.log(val)
    }
  },
  mounted() {
  },
  methods: {
    currentChange(page) {
      this.$emit('page-change', page)
    }
  }
}

</script>

<style lang="scss" scoped>
.pageination-box {
    margin-top: 20px;
    overflow: hidden;

  .pageination-class {
    float: right;
  }
}
</style>
