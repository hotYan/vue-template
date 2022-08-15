// 学生卡管理
<template>
  <div class="app-container">
    <Pageloading
      ref="tableList"
      :get-list="getList"
      :search-data="searchProps"
      :button-data="buttonProps"
    >
      <template v-slot:tableColumn>
        <el-table-column type="index" :index="1" label="序号" fixed width="60" align="center" />
        <el-table-column prop="device_id" label="设备号" align="center" />
        <el-table-column prop="device_imei" label="IEMI号" align="center" />
        <el-table-column prop="device_student" label="持卡人" align="center" />
        <!-- 0 ：未绑定 1 ：以绑定 2 ：挂失 3 ：注销 -->
        <!-- <el-table-column prop="device_status" label="设备状态" align="center" /> -->
        <el-table-column
          width="90"
          label="设备状态"
          align="center"
          :filters="[{text:'未绑定',value:'0'},{text:'正常',value:'1'},{text:'挂失',value:'2'},{text:'已注销',value:'3'}]"
          :filter-method="statusFilter"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.device_status === 0">未绑定</div>
            <div v-if="scope.row.device_status === 1">正常</div>
            <div v-if="scope.row.device_status === 2">挂失</div>
            <div v-if="scope.row.device_status === 3">已注销</div>
          </template>
        </el-table-column>
        <!-- （1:在线，0:离线） -->
        <el-table-column
          width="90"
          label="连接状态"
          align="center"
          :filters="[{text:'离线',value:'0'},{text:'在线',value:'1'}]"
          :filter-method="onlineFilter"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.device_online === 0">离线</div>
            <div v-if="scope.row.device_online === 1">在线</div>
          </template>
        </el-table-column>
        <el-table-column prop="device_power" label="电池电量" width="90" align="center">
          <template slot-scope="scope">{{ scope.row.device_power }}%</template>
        </el-table-column>
        <!-- (0:禁止，1：开启) -->
        <el-table-column
          label="录音状态"
          width="90"
          align="center"
          :filters="[{text:'禁止',value:'0'},{text:'开启',value:'1'}]"
          :filter-method="recordFilter"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.device_record === 0">禁止</div>
            <div v-if="scope.row.device_record === 1">开启</div>
          </template>
        </el-table-column>
        <el-table-column label="激活时间" align="center">
          <template slot-scope="scope">{{ scope.row.created_at }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <!-- 详情 -->
            <img
              title="详情"
              src="@/assets/icon/detail.png"
              @click="detail(scope.row)"
            >
            <!-- 编辑 -->
            <img
              src="@/assets/icon/edit.png"
              @click="editDevice(scope.row)"
            >
            <!-- 删除 -->
            <!-- <img
                src="@/assets/icon/delete.png"
                @click="deleteDevice(scope.row.id)"
              > -->
          </template>
        </el-table-column>
      </template>
    </Pageloading>
    <Add ref="addModel" @success="success(1)" />
    <Edit ref="editModel" @success="success" />
    <Detail ref="detailModel" />

  </div>
</template>

<script>
import { list, handleDelete } from '@/api/restfulApi'
import Pageloading from '@/components/ZyPageloading/index'
import Edit from './Edit'
import Add from './Add'
import Detail from './detail'
export default {
  name: 'StudentCard',
  components: {
    Pageloading,
    Edit,
    Add,
    Detail
  },
  data() {
    return {
      searchProps: [{ type: 'input', model: 'searchKey', placeholder: '请输入IEMI号' }],
      buttonProps: [{ name: '新增设备', plain: true, handleClick: this.addDevice }]
    }
  },
  methods: {
    // 刷新列表
    success(currentPage = 0) {
      this.$refs.tableList.getTableList(currentPage)
    },
    getList(data) {
      return new Promise((resolve, reject) => {
        list('web/list', data).then(res => {
          if (res.code === 20000) {
            resolve({
              code: res.code,
              data: res.data && res.data,
              total: res.data && res.total,
              currentPage: res.data && res.current_page
            })
          } else {
            reject('接口请求失败！')
          }
        })
      })
      // const params = {
      //   search_device_imei: this.tableMate.searchKey,
      //   page: this.tableMate.pageNumber,
      //   page_size: this.tableMate.pageSize
      // }
      // list('web/list', params).then(res => {
      //   this.tableData = res.data
      //   this.tableMate.pageNumber = res.current_page
      //   this.tableMate.total = res.total
      // }).catch(() => {}).finally(() => {})
    },
    detail(data) {
      this.$refs.detailModel.dialogVisible = true
      this.$refs.detailModel.initInfo(data)
    },
    addDevice() {
      this.$refs.addModel.dialogVisible = true// 显示弹窗
      this.$refs.addModel.$refs.addForm && this.$refs.addModel.$refs.addForm.resetFields()// 清空表单
    },
    editDevice(data) {
      this.$refs.editModel.dialogVisible = true
      this.$refs.editModel.initInfo(data)
    },

    deleteDevice(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleDelete('', id).then(res => {
          this.$message.success('企业已删除')
          this.success()
        }).catch(() => {})
          .finally(() => {})
      })
    },
    // 根据连接状态筛选
    onlineFilter(value, row, column) {
      return row.device_online === value
    },
    // 根据设备筛选
    statusFilter(value, row, column) {
      return row.device_status === value
    },
    recordFilter(value, row, column) {
      return row.device_power === value
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
