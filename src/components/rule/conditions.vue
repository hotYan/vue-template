<template>
  <div>

    <el-form-item :label="$t('lang.rule-set')" prop="rule">
      <div v-for="(ruleItem,index) in rule" :key="index" class="terms isTerms">
        <!--  条件AND OR-->
        <el-form-item
          v-if="index!==0"
          :prop="`rule.${index}.condition`"
          :rules="formRules.condition"
          :class="{next:index!==0}"
        >
          <el-select
            v-model="ruleItem.condition"
            :placeholder="$t('lang.condition-r')"
            clearable
            @change="changeCondition(ruleItem.condition)"
          >
            <el-option
              v-for="item in conditionsArr"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :prop="`rule.${index}.param`"
          :rules="formRules.param"
        >
          <!-- 告警参数列表 -->
          <el-select
            v-model="ruleItem.param"
            :placeholder="$t('lang.alarm-param')"
            clearable
            @change="changeParam(index)"
          >
            <el-option
              v-for="item in paramOptions"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :prop="`rule.${index}.operator`"
          :rules="formRules.operator"
        >

          <!-- 膨胀阀开关状态，操作符默认等号 -->
          <el-select
            v-if="(ruleItem.param == 'external_expansion1')||(ruleItem.param == 'external_expansion2')"
            v-model="ruleItem.operator"
            :placeholder="$t('lang.condition')"
            disabled
          >
            <el-option
              v-for="item in operator"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
          <!-- 操作符 -->
          <el-select v-else v-model="ruleItem.operator" :placeholder="$t('lang.condition')">
            <el-option
              v-for="item in operators"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :prop="`rule.${index}.value`"
          :rules="formRules.value"
        >
          <!-- 膨胀阀开关状态，选择开或关 -->
          <el-select
            v-if="(ruleItem.param == 'external_expansion1')||(ruleItem.param == 'external_expansion2')"
            v-model="ruleItem.value"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in switchOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
          <!-- value -->
          <el-input
            v-else
            v-model="ruleItem.value"
            :placeholder="$t('lang.hint-value')"
            clearable
            onkeyup="this.value=this.value.replace(/\s+/g,'')"
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
    const validateOperator = (rule, value, callback) => {
      const reg = /[><]=?|=/ // 匹配>,<,=,>=,<=
      if (!reg.test(value.replace('"', ''))) {
        callback(new Error(this.$t('lang.not-operator')))
      } else {
        callback()
      }
    }
    return {
      switchOptions: [
        { value: '0', label: '关' },
        { value: '1', label: '开' }
      ],
      paramOptions: [
        { key: 'external_currentA', value: '外机A机电流' }
      ],
      operators: [
        { value: '=', label: '=' },
        { value: '>=', label: '≥' },
        { value: '<=', label: '≤' },
        { value: '>', label: '>' },
        { value: '<', label: '<' }
      ],
      operator: [
        { value: '=', label: '=' }
      ],
      conditionsArr: [
        { value: 'AND', label: 'AND', disabled: false },
        { value: 'OR', label: 'OR', disabled: false }
      ],
      formRules: {
        rule: [{ required: true }],
        condition: [{ required: true, message: this.$t('lang.tip-condition'), trigger: 'change' }],
        param: [{ required: true, message: this.$t('lang.hint-param'), trigger: 'change' }],
        operator: [{ required: true, message: this.$t('lang.hit-operator'), trigger: 'blur' }, { validator: validateOperator, trigger: 'change' }],
        value: [{ required: true, message: this.$t('lang.tip-value'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRuleParams()
  },
  methods: {
    changeParam(index) {
      this.rule[index].operator = '='
      this.rule[index].value = ''
    },
    getRuleParams() {
      this.$api.restfulApi.ruleList('alarmRule/ruleParams').then(res => {
        this.paramOptions = res
      })
    },
    changeCondition(param) {
      this.$emit('changeCondition', param)
    },
    // 添加条件
    addContions() {
      const Index = this.rule.length
      if (Index < 6) {
        this.$emit('addContions')
      } else {
        this.$message.warning(this.$t('lang.alarm-addMessage'))
      }
    },
    // 减去条件
    deleteContions(index) {
      this.$emit('deleteContions', index)
    }
  }
}
</script>
<style lang="scss">
    .isTerms:nth-last-child(1) {
        margin: 0 0 0px 0;
    }

    .isTerms {
        margin: 0 0 18px 0;
    }

    .terms {
        display: flex;
        flex-wrap: nowrap;
        width: 360px;
        position: relative;

        .el-input {
            width: 120px !important;
        }

        .add-minus {
            position: absolute;
            right: -65px;
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
