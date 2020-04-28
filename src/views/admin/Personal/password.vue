// 修改密码
<template>
  <div class="app-container">
    <div class="personal_info">
      <el-form ref="changePassword" :model="changePassword" :rules="rules" label-width="100px">
        <el-form-item label="旧密码:" prop="old_password">
          <el-input
            v-model="changePassword.old_password"
            type="password"
            placeholder="请输入旧密码"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="新密码:" prop="new_password">
          <el-input
            v-model="changePassword.new_password"
            show-password
            clearable
            type="password"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认新密码:" prop="confirm_password">
          <el-input
            v-model="changePassword.confirm_password"
            type="password"
            placeholder="再次输入新密码"
            show-password
            clearable
          />
        </el-form-item>
      </el-form>
      <p class="personal_button">
        <el-button :loading="loading" type="primary" @click="changeInfo">保  存</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validatePassword } from '@/utils/check-mixin'

export default {
  name: 'Password',
  components: {
  },
  data() {
    var validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('再次输入密码'))
      } else if (value !== this.changePassword.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      changePassword: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { validator: validatePassword, trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'change' }
        ],
        confirm_password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

    // 调修改用户信息接口
    changeInfo() {
      this.$refs.changePassword.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/changePassword', this.changePassword).then(() => {
            this.$message.success('密码修改成功')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.personal_info{
  // background-color: blanchedalmond;
  width:400px;
  margin: 50px auto;
}
.personal_button{
  // background-color: blue;
  width: 80px;
  margin: 50px auto;
}

</style>
