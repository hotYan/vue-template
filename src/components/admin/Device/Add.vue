<template>
  <div>
    <el-dialog title="添加设备" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center>
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <el-form-item label="设备IEMI码:" prop="device_imei">
          <el-input v-model="addForm.device_imei" placeholder="请输入设备imei码" clearable />
        </el-form-item>
        <el-form-item label="软件版本:" prop="device_soft_version">
          <el-input v-model="addForm.device_soft_version" placeholder="请输入软件版本" clearable />
        </el-form-item>
        <el-form-item label="硬件版本:" prop="device_hardware_version">
          <el-input v-model="addForm.device_hardware_version" placeholder="请输入硬件版本" clearable />
        </el-form-item>
        <el-form-item label="SDK版本:" prop="device_sdk_version">
          <el-input v-model="addForm.device_sdk_version" placeholder="请输入SDK版本" clearable />
        </el-form-item>
        <el-form-item label="really_id:" prop="device_really_id">
          <el-input v-model="addForm.device_really_id" placeholder="请输入really_id" clearable />
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
        device_imei: '',
        device_soft_version: '',
        device_hardware_version: '',
        device_sdk_version: '',
        device_really_id: ''
      },
      rules: {
        device_imei: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        device_soft_version: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        device_hardware_version: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        device_sdk_version: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        device_really_id: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
        add('web/device/create', this.addForm).then((res) => {
          this.loading = false
          this.dialogVisible = false
          this.$message.success('添加成功')
          this.$emit('success')
        })
          .catch(() => {
            this.loading = true
          })
          .finally(() => {
            this.loading = true
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

