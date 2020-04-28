// 用户管理
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-input
          v-model="tableMate.searchKey"
          placeholder="请输入姓名"
          suffix-icon="el-icon-search"
          clearable
          @change="getList"
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="addUser()">添加管理员</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <Pageloading
      :total="tableMate.total"
      :page-num="tableMate.pageNumber"
      @page-change="pageChange"
    >
      <template v-slot:table>
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          border
          size="medium"
          style="width: 100%;min-height:200px;"
          stripe
        >
          <el-table-column type="index" :index="1" label="序号" fixed width="60" align="center" />
          <el-table-column prop="admin_phone" label="账号" align="center" />
          <el-table-column prop="admin_name" label="姓名" align="center" />
          <el-table-column
            label="状态"
            align="center"
            :filters="[{text:'禁用',value:'0'},{text:'启用',value:'1'}]"
            :filter-method="statusFilter"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.admin_status === 0">禁用</div>
              <div v-if="scope.row.admin_status === 1">启用</div>
            </template>
          </el-table-column>
          <el-table-column label="最近登录" align="center">
            <template slot-scope="scope">{{ scope.row.updated_at }}</template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">

              <!-- 编辑 -->
              <img
                src="@/assets/icon/edit.png"
                title="编辑"
                @click="editUser(scope.row)"
              >
              <!-- 删除 -->
              <img
                src="@/assets/icon/delete.png"
                title="删除"
                @click="deleteUser(scope.row.admin_id)"
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Pageloading>

    <Add ref="addModel" @success="success" />
    <Edit ref="editModel" @success="success" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { list, handleDelete } from '@/api/restfulApi'
import Pageloading from '@/components/Pageloading/index'
import Edit from './Edit'
import Add from './Add'
export default {
  name: 'User',
  components: {
    Pageloading,
    Edit,
    Add
  },
  data() {
    return {
      addVisible: false,
      editVisible: false,
      tableData: [],
      tableMate: {
        searchKey: '',
        total: 0,
        pageNumber: 1, // 当前页码
        pageSize: 10
      },
      tableLoading: false

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    success() {
      this.getList()
    },

    addUser() {
      this.$refs.addModel.dialogVisible = true// 显示弹窗
      this.$refs.addModel.$refs.addForm && this.$refs.addModel.$refs.addForm.resetFields()// 清空表单
    },
    editUser(data) {
      this.$refs.editModel.dialogVisible = true
      this.$refs.editModel.initInfo(data)
    },
    getList() {
      const params = {
        search_name: this.tableMate.searchKey,
        page: this.tableMate.pageNumber,
        page_size: this.tableMate.pageSize
      }
      list('web/list', params).then(res => {
        this.tableData = res.data
        this.tableMate.pageNumber = res.current_page
        this.tableMate.total = res.total
      })
        .catch(() => {})
        .finally(() => {})
    },

    deleteUser(id) {
      const delete_array = []
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        debugger
        delete_array.push(id)
        handleDelete('web/admin/delete', delete_array).then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
          .catch(() => {})
          .finally(() => {})
      })
    },
    // 页码改变
    pageChange(page) {
      this.tableMate.pageNumber = page
      this.getList()
    },
    // 根据设备筛选
    statusFilter(value, row, column) {
      return row.admin_status === value
    }
  }
}
</script>

<style lang="scss"  scoped>
.app-container{
  .el-row{
    .el-col{
      margin: 0 20px 20px 0;
    }

  }
  img{
    width: 18px;
    height: 18px;
    margin: 5px 3px 0;
  }
}

</style>
