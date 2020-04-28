<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb
      :crumb-array="[{name:this.$t('lang.alarm-fault')}, {name:$t('lang.alarm-rule')}]"
    />

    <main-content>
      <!-- 搜索、按钮行 -->
      <el-row class="search-row">
        <el-col :span="24">
          <div class="search-row">
            <div class="search-input-group">
              <el-input
                v-model="search_key"
                size="medium"
                :placeholder="$t('lang.hint-Aname')"
                clearable
                onkeyup="this.value=this.value.replace(/\s+/g,'')"
                @change="getList()"
              >
                <i slot="suffix" class="el-input__icon el-icon-search" />
              </el-input>
            </div>
            <!--添加-->
            <div class="search-btn-group">
              <el-button
                type="primary"
                size="medium"
                class="add-btn"
                @click="dialogCreateRule = true"
              >
                <img src="@/assets/images/icon/add.png">
                {{ $t('lang.rule-add') }}
              </el-button>
            </div>

          </div>
        </el-col>
      </el-row>

      <!-- table -->
      <el-row v-loading="tableLoading" class="table-row">
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" :label="$t('lang.index')" align="center" />
            <el-table-column prop="name" :label="$t('lang.alarm-name')" width="160" align="center" />
            <el-table-column :label="$t('lang.device-type')" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.dt_id == '1'">{{ $t("lang.multi-split") }}</div>
                <div v-if="scope.row.dt_id == '2'">{{ $t("lang.water-machine") }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="device_serialno" :label="$t('lang.alarm-device')" width="150" align="center" />
            <el-table-column prop="comment" :label="$t('lang.rule-condition')" width="500" align="center" />
            <el-table-column
              align="center"
              :label="$t('lang.grade')"
              :filters="[{text:$t('lang.serious'),value:'0'},{text:$t('lang.matter'),value:'1'},{text:$t('lang.common'),value:'2'},{text:$t('lang.lesser'),value:'3'}]"
              :filter-method="levelFilter"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.level == '0'">{{ $t('lang.serious') }}</div>
                <div v-if="scope.row.level == '1'">{{ $t('lang.matter') }}</div>
                <div v-if="scope.row.level == '2'">{{ $t('lang.common') }}</div>
                <div v-if="scope.row.level == '3'">{{ $t('lang.lesser') }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('lang.alarm-way')" align="center">
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.way" :key="index">
                  <div v-if="item == '1'">{{ $t('lang.SMS') }}</div>
                  <div v-if="item == '2'">{{ $t('lang.send-email') }}</div>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('lang.status')"
              :filters="[{text:$t('lang.enable'),value:'1'},{text:$t('lang.disable'),value:'0'}]"
              :filter-method="statusFilter"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.status == '1'"
                  class="color-green"
                >{{ $t('lang.enable') }}
                </div>
                <div v-else class="color-danger">{{ $t('lang.disable') }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('lang.operate')" width="120" align="center">
              <template slot-scope="scope">
                <div class="table-icon-group">
                  <img
                    v-if="scope.row.status==1"
                    src="@/assets/images/icon/enabled.png"
                    :title="$t('lang.disable')"
                    @click="changeDisable(scope.row)"
                  >
                  <img
                    v-if="scope.row.status==0"
                    src="@/assets/images/icon/disabled.png"
                    :title="$t('lang.enable')"
                    @click="changeDisable(scope.row)"
                  >
                  <img
                    src="@/assets/images/icon/edit.png"
                    :title="$t('lang.edit')"
                    @click="openEdit(scope.row.id)"
                  >
                  <img
                    v-if="loginType!=userType.AirConUser"
                    src="@/assets/images/icon/delete.png"
                    :title="$t('lang.delete')"
                    @click="deleteRule(scope.row.id)"
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--  分页 -->
      <el-row class="paginate-row">
        <el-col :span="24">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>

      <!--  重写弹窗          -->
      <!-- 添加-->
      <el-dialog
        v-if="dialogCreateRule"
        :visible.sync="dialogCreateRule"
        class="dialog-form"
        :title="$t('lang.rule-add')"
      >
        <create :get-list="getList" @close="close" />
      </el-dialog>

      <!--编辑-->
      <el-dialog
        v-if="dialogEditRule"
        :visible.sync="dialogEditRule"
        class="dialog-form"
        :title="$t('lang.rule-edit')"
      >
        <edit :rule_id="rule_id" :get-list="getList" @close="close" />
      </el-dialog>

    </main-content>
  </div>
</template>

<script>
import Create from './Create'
import Edit from './Edit'

export default {
  components: {
    create: Create,
    edit: Edit
  },
  data() {
    return {
      dialogCreateRule: false,
      dialogEditRule: false,
      rule_id: '',
      search_key: '',
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      totalNum: 0,
      pageSize: 20
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 重写方法如下
    // 关闭弹窗
    close(val) {
      this[val] = false
    },

    // ------------------
    // 获取规则列表
    getList(params) {
      const baseParams = {
        searchKey: this.search_key,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      console.log('搜索：', baseParams)
      this.tableLoading = true
      this.$api.restfulApi
        .list('alarmRule', Object.assign(baseParams, params))
        .then(res => {
          this.tableData = res.data
          console.log('数据列表：', this.tableData)
          this.totalNum = res.meta.pagination.total
          this.currentPage = res.meta.pagination.current_page
          this.tableLoading = false
        })
    },
    /* 删除*/
    deleteRule(id) {
      this.$confirm(this.$t('lang.affirm-delete'), this.$t('lang.tip'), {
        confirmButtonText: this.$t('lang.submit'),
        cancelButtonText: this.$t('lang.cancel'),
        type: 'warning'
      }).then(() => {
        this.$api.restfulApi.delete('alarmRule', id).then(res => {
          this.$message.success(this.$t('lang.delete-success'))
          this.getList()
        })
      })
    },
    // 停用启用
    changeDisable(item) {
      console.log(item)
      this.$confirm(
        item.status === 1 ? this.$t('lang.affirm-disabled') : this.$t('lang.affirm-enabled'),
        this.$t('lang.tip'),
        {
          confirmButtonText: this.$t('lang.submit'),
          cancelButtonText: this.$t('lang.cancel'),
          type: 'warning'
        }
      ).then(() => {
        item.status = item.status === 1 ? item.status = 0 : item.status = 1
        this.$api.restfulApi.edit('alarmRule', item.id, item).then(res => {
          this.$message.success(
            item.status === 1 ? this.$t('lang.enabled-success') : this.$t('lang.disabled-success')
          )
        }).catch(() => {}).finally(() => {})
      })
    },
    // 根据状态查询
    statusFilter(value, row, column) {
      return row.status === value
    },
    // 根据等级查询
    levelFilter(value, row, column) {
      return row.level === value
    },

    // 打开编辑企业信息弹窗
    openEdit(id) {
      this.rule_id = id
      this.dialogEditRule = true
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
    .add-btn {
        position: relative;
        padding-left: 30px;

        img {
            position: absolute;
            left: 5px;
            height: 20px;
            width: 20px;
            top: 8px;
        }
    }
</style>
