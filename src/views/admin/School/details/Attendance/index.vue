// 考勤管理
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-input
          v-model="tableMate.searchKey"
          placeholder="请输入考勤名称"
          suffix-icon="el-icon-search"
          clearable
        />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="add()">添加考勤</el-button>
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
          <el-table-column prop="zhanghao" label="账号" width="80" align="center" />
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="time" label="日期" align="center">
            <template slot-scope="scope">{{ scope.row.time }}</template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <!-- 启用禁用 -->
              <!-- 编辑 -->
              <img
                src="@/assets/icon/edit.png"
                @click="edit()"
              >
              <!-- 删除 -->
              <img
                src="@/assets/icon/delete.png"
                @click="delete(scope.row.id)"
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
  name: 'Attendance',
  components: {
    Pageloading,
    Edit,
    Add
  },
  data() {
    return {
      addVisible: false,
      editVisible: false,
      tableData: [
        {
          gongDanHao: '11111',
          isHeGe: '合格',
          time: 'xxxxxx'

        }
      ],
      tableMate: {
        searchKey: '',
        total: 0,
        pageNumber: 1,
        pageSize: 6
      },
      tableLoading: false

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    success() {

    },
    add() {
      this.$refs.addModel.dialogVisible = true// 显示弹窗
      this.$refs.addModel.$refs.addForm && this.$refs.addModel.$refs.addForm.resetFields()// 清空表单
    },
    edit() {
      this.$refs.editModel.dialogVisible = true
    },
    getList() {
      const params = this.tableMate
      list(' ', params).then(res => {
      })
        .catch(() => {

        })
        .finally(() => {

        })
    },

    delete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.tableLoading = true
        handleDelete('', id).then(res => {
          this.$message.success('企业已删除')
          this.getList()
        })
          .catch(() => {

          })
          .finally(() => {

          })
      })
    },
    // 页码改变
    pageChange(page) {
      this.tableMate.pageNumber = page
      this.getList()
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
