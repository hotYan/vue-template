<template>
  <div>
    <el-dialog title="创建管理员" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" center>
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="手机号:" prop="admin_phone">
          <el-input
            v-model="addForm.admin_phone"
            placeholder="请输入手机号"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码:" prop="admin_password">
          <el-input
            v-model="addForm.admin_password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名:" prop="admin_name">
          <el-input
            v-model="addForm.admin_name"
            placeholder="请输入姓名"
            clearable
          />
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
import { add } from '@/api/restfulApi'
import { validateRule, validatePhone, validatePassword } from '@/utils/check-mixin'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      addForm: {
        admin_name: '',
        admin_phone: '',
        admin_password: ''
      },
      rules: {
        admin_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateRule, trigger: 'change' },
          { type: 'string', max: 32, message: '用户名不能超过32个字符', trigger: 'change' }
        ],
        admin_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: 'change' }
        ],
        admin_password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    cancel() {
      this.dialogVisible = false
    },
    sure() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return
        this.loading = true
        add('web/admin/create', this.addForm).then((res) => {
          this.loading = false
          this.dialogVisible = false
          this.$message.success('添加成功')
          this.$emit('success')
        })
          .catch(() => {
            this.loading = false
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

