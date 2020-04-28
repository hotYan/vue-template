<template>
  <div>
    <el-dialog title="编辑管理员信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" center>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px">
        <!-- <el-form-item label="管理员ID:" prop="admin_id">
          <el-input
            v-model="editForm.admin_id"
            clearable
            disabled
          />
        </el-form-item> -->
        <el-form-item label="手机号:" prop="admin_phone">
          <el-input
            v-model="editForm.admin_phone"
            clearable
            disabled
          />
        </el-form-item>
        <el-form-item label="姓名:" prop="admin_name">
          <el-input
            v-model="editForm.admin_name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态:" prop="admin_status">
          <el-radio-group v-model="editForm.admin_status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { edit } from '@/api/restfulApi'
import { validateRule } from '@/utils/check-mixin'

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      editForm: {
        admin_name: '',
        admin_phone: '',
        admin_id: '',
        admin_status: '1'
      },
      rules: {
        admin_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateRule, trigger: 'change' },
          { type: 'string', max: 32, message: '用户名不能超过32个字符', trigger: 'change' }
        ],
        admin_phone: [
          { required: true }
        ],
        admin_status: [
          { required: true }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      done()
    },
    cancel() {
      this.dialogVisible = false
    },
    sure() {
      this.$refs['editForm'].validate(valid => {
        if (!valid) return
        this.loading = true
        edit('web/admin/update', this.editForm).then(res => {
          this.loading = false
          this.dialogVisible = false
          this.$message.success('修改成功')
          this.$emit('success')
        })
          .catch(() => {
            this.loading = false
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    initInfo(data) {
      this.editForm = JSON.parse(JSON.stringify(data))
      // const { admin_id, admin_name, admin_phone, admin_status } = data
      // this.editForm = {
      //   admin_id,
      //   admin_phone,
      //   admin_name,
      //   admin_status
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

