<template>
  <div>
    <el-dialog title="创建学校" :visible.sync="dialogVisible" width="60%" :before-close="handleClose" center class="school">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
        <!-- 省 -->
        <el-form-item prop="school_province" label="学校省份">
          <el-select
            v-model="addForm.school_province"
            placeholder="请选择学校省份"
            clearable
          >
            <el-option
              v-for="(item,index) in provinceArray"
              :key="index"
              :value="item.region_id"
              :label="item.region_name"
            />
          </el-select>
        </el-form-item>
        <!-- 市 -->
        <el-form-item prop="school_city" label="学校市区">
          <el-select
            v-model="addForm.school_city"
            placeholder="请选择学校市区"
            clearable
          >
            <el-option
              v-for="(item,index) in cityArray"
              :key="index"
              :value="item.region_id"
              :label="item.region_name"
            />
          </el-select>
        </el-form-item>
        <!-- 区 -->
        <el-form-item prop="school_district" label="学校区县">
          <el-select
            v-model="addForm.school_district"
            placeholder="请选择学校区县"
            clearable
          >
            <el-option
              v-for="(item,index) in districtArray"
              :key="index"
              :value="item.region_id"
              :label="item.region_name"
            />
          </el-select>
        </el-form-item>
        <!-- 学校名称 -->
        <el-form-item prop="school_name" label="学校名称">
          <el-select
            v-model="addForm.school_name"
            placeholder="请选择学校名称"
            clearable
          >
            <el-option
              v-for="(item,index) in schoolArray"
              :key="index"
              :value="item.region_id"
              :label="item.region_name"
            />
          </el-select>
        </el-form-item>
        <!-- 学校电话 -->
        <el-form-item prop="school_phone" label="学校电话">
          <el-input
            v-model="addForm.school_phone"
            size="medium"
            placeholder="请输入学校电话"
            clearable
          />
        </el-form-item>
        <!-- 校长姓名 -->
        <el-form-item prop="principal_name" label="校长姓名">
          <el-input
            v-model="addForm.principal_name"
            size="medium"
            placeholder="请输入校长姓名"
            clearable
          />
        </el-form-item>
        <!-- 校长电话 -->
        <el-form-item prop="principal_tell" label="校长电话">
          <el-input
            v-model="addForm.principal_tell"
            size="medium"
            placeholder="请输入校长电话"
            clearable
          />
        </el-form-item>
        <!-- 学校地址 -->
        <el-form-item prop="school_address" label="学校地址">
          <el-input
            v-model="addForm.school_address"
            size="medium"
            placeholder="请输入学校地址"
            clearable
          />
        </el-form-item>
        <!-- 考勤规则 -->
        <Attendance
          :rule="addForm.rule"
          @addContions="addContions"
          @deleteContions="deleteContions"
        />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { add } from '@/api/restfulApi'
import Attendance from './attendance'
export default {
  components: {
    Attendance
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      addForm: {
        rule: [
          {
            attendance_name: '',
            attendance_rule: [new Date(2020, 4, 10, 7, 30), new Date(2020, 4, 10, 18, 40)]
          }
        ]
      },
      provinceArray: [
        { region_id: '1', region_name: '四川省' }
      ],
      cityArray: [
        { region_id: '2', region_name: '成都市' }
      ],
      districtArray: [
        { region_id: '3', region_name: '武侯区' }
      ],
      schoolArray: [
        { region_id: '4', region_name: '希望小学' }
      ],
      rules: {
        school_province: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        school_city: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        school_district: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        school_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        school_phone: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        principal_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        principal_tell: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        school_address: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        rule: [{
          required: true
        }]
      }
    }
  },
  methods: {
    // 删除规则
    deleteContions(index) {
      this.addForm.rule.splice(index, 1)
    },
    // 添加规则
    addContions() {
      this.addForm.rule.push(
        {
          attendance_name: '',
          attendance_rule: ''
        }
      )
    },
    handleClose(done) {
      done()
    },
    cancel() {
      this.dialogVisible = false
    },
    sure() {
      console.log('xxxxx', this.addForm)

      // this.$refs['addForm'].validate((valid) => {
      //   if (!valid) return
      //   this.loading = true
      // add('',params).then((res) => {
      //   this.loading = false
      //   this.dialogVisible = !this.dialogVisible
      //   this.$emit('success')
      // })
      //   .catch(() => {

      //   })
      //   .finally(() => {

      //   })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
// .add-school {
//   .el-dialog {
//     .el-form {
//       background-color: aquamarine;
//       width: 500px;
//       margin: 0 auto;
//       .el-input__inner {
//         width: 350px;
//         background-color: aqua;
//       }
//     }
//   }
// }

</style>

