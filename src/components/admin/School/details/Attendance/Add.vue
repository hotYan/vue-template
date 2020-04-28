<template>
  <div>
    <el-dialog title="添加考勤" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" center>
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="姓名姓:" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入管理员名称" clearable />
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入电话" clearable />
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
export default {

  data() {
    return {
      dialogVisible: false,
      loading: false,
      addForm: {
        name: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '应用名称不能为空', trigger: 'blur' },
          { validator: this.verificatAppName, trigger: 'blur' },
          { type: 'string', max: 32, message: '应用名称不能超过32个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击右上角x，关闭dialog
    handleClose(done) {
      done()
    },
    // 点击取消，关闭dialog
    cancel() {
      this.dialogVisible = false
    },
    sure() {
      this.$refs['addForm'].validate((valid) => {
        if (!valid) return
        this.loading = true
        add().then((res) => {
          this.loading = false
          this.dialogVisible = !this.dialogVisible
          this.$emit('success')
        })
          .catch(() => {

          })
          .finally(() => {

          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operate-box{
  width:435px;
}
</style>

