<template>
  <div>
    <el-dialog title="编辑考勤" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" center>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px">
        <el-form-item label="应用名称:" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="应用分类:" prop="phone">
          <el-input v-model="editForm.phone" placeholder="请输入电话" />
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
export default {

  data() {
    return {
      dialogVisible: false,
      loading: false,
      editForm: {
        name: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '应用名称不能为空', trigger: 'blur' },
          { validator: this.verificatAppName, trigger: 'blur' },
          {
            type: 'string',
            max: 32,
            message: '应用名称不能超过32个字符',
            trigger: 'blur'
          }
        ],
        typeId: [
          {
            required: true,
            type: 'number',
            message: '请选择应用类型',
            trigger: 'change'
          }
        ],
        description: [
          {
            type: 'string',
            max: 255,
            message: '应用描述不能超过255个字符',
            trigger: 'blur'
          }
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
        edit('', this.editForm.id, this.editForm).then(res => {
          this.loading = false
          this.dialogVisible = false
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

