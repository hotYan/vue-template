// 个人资料，设置
<template>
  <div class="app-container">
    <div class="personal_info">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item label="姓名:" prop="admin_name">
          <el-input
            v-model="addForm.admin_name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="手机号:" prop="admin_phone">
          <el-input
            v-model="addForm.admin_phone"
            placeholder="请输入手机号"
            clearable
            disabled
          />
        </el-form-item>
      </el-form>
      <p class="personal_button">
        <el-button @click="changePassword">修改密码</el-button>
        <el-button style="margin: 0 0 0 40px;" :loading="loading" type="primary" @click="changeInfo">保  存</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validateRule } from '@/utils/check-mixin'
import { getInfo } from '@/api/user'
import { edit } from '@/api/restfulApi'

export default {
  name: 'Personal',
  components: {},
  data() {
    return {
      loading: false,
      addForm: {
        admin_name: '张三',
        admin_phone: '15823566422'
      },
      rules: {
        admin_name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateRule, trigger: 'change' },
          { type: 'string', max: 32, message: '用户名不能超过32个字符', trigger: 'change' }
        ],
        admin_phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
    // admin_name: {
    //   get() {
    //     return this.name
    //   },
    //   set(value) {
    //     this.$store.commit('user/SET_NAME', value)
    //   }
    // }
  },
  created() {
    this.initInfo()
  },
  methods: {
    initInfo() {
      getInfo('admin-token').then(res => {
        this.addForm = JSON.parse(JSON.stringify(res.data))
      })
    },
    changePassword() {
      this.$router.push('password')
    },
    changeInfo() {
      this.$refs['addForm'].validate(valid => {
        if (!valid) return
        this.loading = true
        edit('web/admin/update', this.addForm).then(res => {
          this.loading = false
          this.$message.success('修改成功')
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
.personal_info{
  // background-color: blanchedalmond;
  width:400px;
  margin: 50px auto;
}
.personal_button{
  // background-color: blue;
  width: 250px;
  margin: 50px auto;
}
</style>
