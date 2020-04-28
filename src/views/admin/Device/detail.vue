<template>
  <div>
    <el-dialog title="设备详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center>
      <el-form ref="" :model="detailFrom" label-width="100px">
        <el-form-item label="设备ID:">
          <el-input v-model="detailFrom.device_id" placeholder="请输入设备ID" clearable disabled />
        </el-form-item>
        <el-form-item label="设备IEMI码:">
          <el-input v-model="detailFrom.device_imei" placeholder="请输入设备imei码" clearable disabled />
        </el-form-item>
        <el-form-item label="软件版本:">
          <el-input v-model="detailFrom.device_soft_version" placeholder="请输入" clearable disabled />
        </el-form-item>
        <el-form-item label="硬件版本:">
          <el-input v-model="detailFrom.device_hardware_version" placeholder="请输入" clearable disabled />
        </el-form-item>
        <el-form-item label="SDK版本:">
          <el-input v-model="detailFrom.device_sdk_version" placeholder="请输入" clearable disabled />
        </el-form-item>
        <el-form-item label="持卡人:">
          <el-input v-model="detailFrom.device_student" placeholder="请输入持卡人" clearable disabled />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {

  data() {
    return {
      dialogVisible: false,
      loading: false,
      detailFrom: {
        device_imei: '',
        device_soft_version: '',
        device_hardware_version: '',
        device_sdk_version: '',
        device_student: ''
      }
      // rules: {
      //   device_imei: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ],
      //   device_soft_version: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ],
      //   device_hardware_version: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ],
      //   device_sdk_version: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ],
      //   device_really_id: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    initInfo(data) {
      // const a = JSON.parse(JSON.stringify(data))
      const { device_id, device_imei, device_soft_version, device_hardware_version, device_sdk_version, device_student } = data
      this.detailFrom = {
        device_id,
        device_imei,
        device_soft_version,
        device_hardware_version,
        device_sdk_version,
        device_student
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

