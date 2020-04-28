// 列表，分页
<template>
  <div>
    <div class="tableData">
      <slot name="table" />
    </div>
    <div class="pageination-box">
      <el-pagination class="pageination-class" background layout="total,prev, pager, next,jumper" :total="total" :current-page="pageNum" @current-change="currentChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      default: 1
    }
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
