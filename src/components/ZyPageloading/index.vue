
<template>
  <div>
    <!-- 搜索 -->
    <div class="search_warp">
      <div v-for="search in searchData" :key="search.name" class="search_item">
        <!-- 输入筛选 -->
        <el-input
          v-if="search.type === 'input'"
          v-model="searchParams[search.model]"
          :placeholder="search.placeholder||'请输入'"
          clearable
          @blur="handleSearch"
          @clear="handleSearch"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch" />
        </el-input>
        <!-- 选择筛选 -->
        <el-select
          v-if="search.type === 'select'"
          v-model="searchParams[search.model]"
          :placeholder="search.placeholder||'请选择'"
          clearable
          @change="handleSearch"
        >
          <el-option
            v-for="(item,index) in search.options"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <!-- 时间范围 -->
        <el-date-picker
          v-if="search.type === 'dateRange'"
          v-model="dateRangeArr"
          type="datetimerange"
          clearable
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleChange(search.model)"
        />
      </div>
      <div class="search_item">
        <slot name="searchItem" />
      </div>
      <div class="button_warp">
        <el-button
          v-for="button in buttonData"
          :key="button.name"
          :type="button.type || 'primary'"
          :plain="button.plain || false"
          @click="button.handleClick()"
        >{{ button.name }}</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table_warp">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <slot name="tableColumn" />
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pageination_warp">
      <el-pagination
        ref="page"
        class="right_float"
        background
        layout="total, prev, pager, next, jumper,sizes"
        :page-sizes="page.pageSizes"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {
    // 获取列表接口，必填
    getList: {
      type: Function,
      default: function() {
        /* 接收一个Promise */
        return Promise.reject(new Error('引入正确的接口方法'))
      }
    },
    // 自定义筛选框，可选，如输入框、选择框、时间选择器
    searchData: {
      type: Array,
      default: () => {
        /** 定义筛选框：默认一个输入框
         * type：必填，string，筛选框类型(input,select)
         * model：必填，string，v-model的值
         * placeholder：非不填，string ，placeholder的值
         * option：当 type 是 select 时必填，Array，options 的值
         *
         * 输入框：{ type: 'input', model: 'search', placeholder: '请输入' },
         * 选择框：{ type: 'select', model: 'type', placeholder: '请选择', options: [
         *   { type: 2, label: '物体检测', url: 'object', value: 'OBJECT' },
         *   { type: 1, label: '图像分类', url: 'images', value: 'IMAGE' }
         * ]},
         * 时间选择器：{ type: 'dateRange', model: ['beginTime', 'endTime'] }
         */
        return []
      }
    },
    // 自定义操作按钮，可选，如新增，删除
    buttonData: {
      type: Array,
      default: () => {
        /**
         * name：选填，string，自定义按钮描述
         * plain：选题，string，自定义按钮为朴素样式，默认 false
         * type：选题，string，自定义按钮类型：primary/success/warning/danger/info/text，默认值 primary
         * handleClick：选填，function， 自定义点击事件
         * 例子：{ name: '新增', plain: true, type:'primary', handleClick: () => { alert('添加点击事件') } }
         */
        return []
      }
    },
    // 自定义分页入参，可选，默认 pageNumber 和 pageSize
    paginationData: {
      type: Object,
      default: () => {
        /**
         * currentPage：选填，string，自定义接口的入参key
         * pageSize：选填，string，自定义接口的入参key
         */
        return { currentPage: 'pageNumber', pageSize: 'pageSize' }
      }
    }
  },
  data() {
    return {
      dateRangeArr: [],
      searchParams: {},
      tableData: [],
      tableLoading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40]
      }

    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /** 筛选框触发的方法  */
    handleSearch() {
      this.getTableList(1)
    },
    /** 获取表格数据 */
    getTableList(firstPage = 0) {
      if (typeof this.getList !== 'function') return
      this.tableLoading = true
      const { currentPage, pageSize } = this.page
      const search = Object.assign({}, this.searchParams)
      const page = {}
      for (const key in this.paginationData) {
        key === 'currentPage' ? page[this.paginationData[key]] = (firstPage || currentPage) : page[this.paginationData[key]] = pageSize
      }
      this.getList({ ...page, ...search }).then((res) => {
        // if (res.code === 20000) { // 接口正常
        this.page.currentPage = res.currentPage
        this.page.total = res.total
        this.tableData = res.data
        // } else {
        //   this.page.currentPage = 1
        //   this.page.total = 0
        //   this.tableData = []
        // }
      }).catch(e => {
        console.log('ERROR:', e)
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * 切换时间选择器触发的方法
     * @param { array } model [startTime，endTime] 接口调用时的入参
     */
    handleChange(model) {
      if (this.dateRangeArr && this.dateRangeArr.length) {
        this.searchParams[model[0]] = this.dateRangeArr[0]
        this.searchParams[model[1]] = this.dateRangeArr[1]
      } else {
        this.searchParams[model[0]] = ''
        this.searchParams[model[1]] = ''
      }
      this.getTableList(1)
    },
    /**
     * 切换 currentPage 触发的方法
     * @param { number } currentPage 当前页
     */
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.getTableList()
    },
    /**
     * 切换 pageSize 触发的方法
     * @param { number } pageSize 当前页条数
     */
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.getTableList()
    }
  }
}

</script>

<style lang="scss" scoped>
.search_warp{
  height:40px;
  margin-bottom: 10px;
  .search_item{
    width:200px;
    float:left;
    .el-select{
      width:200px;
    }
  }
  .search_item+.search_item{
    margin-left:10px;
  }
  .button_warp{
    float:right;
  }
}
.pageination_warp {
    margin-top: 20px;
    overflow: hidden;
  .right_float {
    float: right;
  }
}

</style>
