<template>
  <div>
    <el-form-item label="考勤规则" prop="rule">
      <div v-for="(attendance,index) in rule" :key="index" class="terms isTerms">
        <el-form-item
          id="attendance_name"
          :prop="`rule.${index}.attendance_name`"
          :rules="formRules.attendance_name"
        >
          <el-input
            v-model="attendance.attendance_name"
            placeholder="请输入规则名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          :prop="`rule.${index}.attendance_rule`"
          :rules="formRules.attendance_rule"
          @change="check"
        >
          <el-time-picker
            v-model="attendance.attendance_rule"
            style="width:200px;margin:0 0 0 10px"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          />
        </el-form-item>
        <div class="add-minus">
          <i class="el-icon-plus" @click="addContions(index)" />
          <i v-if="index!=0" class="el-icon-close" @click="deleteContions(index)" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    rule: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      start: '',
      end: '',
      // attendance_rule: [new Date(2020, 4, 10, 7, 30), new Date(2020, 4, 10, 18, 40)],
      formRules: {
        rule: [{ required: true }],
        attendance_name: [{ required: true, message: '请输入规则名称', trigger: 'change' }]
        // attendance_rule:
      }
    }
  },
  created() {
  },
  methods: {
    check() {
      console.log(this.attendance_rule)
    },
    // 添加条件
    addContions() {
      const Index = this.rule.length
      if (Index < 6) {
        this.$emit('addContions')
      } else {
        this.$message.warning('最多6条')
      }
    },
    // 减去条件
    deleteContions(index) {
      this.$emit('deleteContions', index)
    }
  }
}
</script>
<style lang="scss" >
    .isTerms:nth-last-child(1) {
        margin: 0 0 0px 0;
    }
    .isTerms {
        margin: 0 0 18px 0;
    }

    .terms {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        position: relative;
        .add-minus {
            position: absolute;
            right: -15px;
            display: flex;
            align-items: center;
            height: 40px;
            width: 60px;

            i {
                font-size: 20px;
                font-weight: 700;
                cursor: pointer;
            }

            .el-icon-plus {
                color: #67c23a;
                margin-right: 5px;
            }

            .el-icon-close {
                color: #f56c6c;
            }
        }
    }

    .next {
        margin-left: -120px;
    }
</style>
