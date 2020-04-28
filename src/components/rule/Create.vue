<template>
  <div>
    <el-form
      ref="createForm"
      v-loading="loading"
      :model="createForm"
      :rules="formRules"
      label-position="right"
      label-width="150px"
      class="rule-form"
    >
      <el-form-item prop="alarm_name" :label="$t('lang.alarm-name')">
        <el-input
          v-model="createForm.alarm_name"
          size="medium"
          :placeholder="$t('lang.hint-Aname')"
          clearable
          onkeyup="this.value=this.value.replace(/\s+/g,'')"
        />
      </el-form-item>
      <el-form-item prop="device_type" :label="$t('lang.rule-type')">
        <el-select
          v-model="createForm.device_type"
          :placeholder="$t('lang.hint-Dtype')"
          clearable
          @change="getAlarmDevices()"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="alarm_device" :label="$t('lang.alarm-device')">
        <el-select
          v-model="createForm.alarm_device"
          :placeholder="$t('lang.hint-Adevice')"
          clearable
        >
          <el-option
            v-for="item in deviceOptions"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <rule-set
        :rule="createForm.rule"
        @addContions="addContions"
        @deleteContions="deleteContions"
        @changeCondition="changeCondition"
      />
      <el-form-item prop="alarm_level" :label="$t('lang.alarm-level')">
        <el-select v-model="createForm.alarm_level" :placeholder="$t('lang.hint-Alevel')" clearable>
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="alarm_way" :label="$t('lang.alarm-way')">
        <el-checkbox-group v-model="createForm.alarm_way">
          <el-checkbox
            v-for="item in wayOptions"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('lang.enable-alarm')" prop="alarm_enable">
        <el-switch v-model="createForm.alarm_enable" active-value="1" inactive-value="0" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer goright">
      <el-button
        class="white-btn"
        size="medium"
        :disabled="loading?true:false"
        @click="close"
      >{{ $t('lang.cancel') }}
      </el-button>
      <el-button
        class="blue-btn"
        size="medium"
        type="primary"
        :disabled="loading?true:false"
        @click="createRule()"
      >{{ $t('lang.submit') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import RuleSet from './conditions'

export default {
  components: {
    'rule-set': RuleSet
  },
  props: {
    getList: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      createForm: {
        alarm_name: '',
        device_type: '',
        alarm_device: '',
        rule: [
          {
            param: '',
            operator: '=',
            value: '',
            condition: ''
          }
        ],
        alarm_level: '',
        alarm_way: [],
        alarm_enable: '1'
      },
      wayOptions: [
        { value: '1', label: this.$t('lang.SMS') },
        { value: '2', label: this.$t('lang.send-email') }
      ],
      typeOptions: [
        { value: '1', label: this.$t('lang.multi-split') },
        { value: '2', label: this.$t('lang.water-machine') }
      ],
      deviceOptions: [],
      paramOptions: [],

      levelOptions: [
        { value: '0', label: this.$t('lang.serious') },
        { value: '1', label: this.$t('lang.matter') },
        { value: '2', label: this.$t('lang.common') },
        { value: '3', label: this.$t('lang.lesser') }
      ],
      conditionsNum: 1, // 条件数
      formRules: {
        alarm_name: [
          { required: true, message: this.$t('lang.hint-Aname'), trigger: 'blur' },
          { max: 20, message: this.$t('lang.long-alarmName'), trigger: 'change' }
        //   { validator: validateRule, trigger: 'change' }
        ],
        device_type: [
          {
            type: 'number',
            required: true,
            message: this.$t('lang.hint-Dtype'),
            trigger: 'blur'
          }
        //    { validator: validateRule, trigger: 'blur' }
        ],
        alarm_device: [
          {
            required: true,
            message: this.$t('lang.hint-Adevice'),
            trigger: 'blur'
          }
        //   { validator: validateRule, trigger: 'blur' }
        ],
        alarm_level: [
          {
            required: true,
            message: this.$t('lang.hint-Alevel'),
            trigger: 'blur'
          }
        //    { validator: validateRule, trigger: 'blur' }
        ],
        alarm_way: [
          {
            required: true,
            message: this.$t('lang.hint-Away'),
            trigger: 'blur'
          }
        ],
        rule: [{
          required: true
        }]
      }
    }
  },

  created() {
    this.getDeviceTypeList()
  },
  methods: {
    // 删除某条告警规则
    deleteContions(index) {
      this.createForm.rule.splice(index, 1)
    },
    // 添加一条告警规则
    addContions() {
      this.createForm.rule.push({})
    },
    // 获取设备类型列表(1:水机，2：多联机)
    getDeviceTypeList() {
      this.typeOptions = []
      this.$api.restfulApi.list('devicetype').then(res => {
        const arr = res.data
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].prodtype === 0) {
            const name = { value: arr[i].id, label: this.$t('lang.multi-split') }
            this.typeOptions.push(name)
          } else {
            const name = {
              value: arr[i].id,
              label: this.$t('lang.water-machine')
            }
            this.typeOptions.push(name)
          }
        }
      })
    },
    // 获取告警设备序列号
    getAlarmDevices() {
      this.deviceOptions = []
      this.$api.restfulApi.list('device', { deviceType: this.createForm.device_type }).then(res => {
        const arr = res.data
        for (let i = 0; i < arr.length; i++) {
          const name = { id: arr[i].id, name: arr[i].serialno }
          this.deviceOptions.push(name)
        }
      })
    },
    // 创建规则
    createRule() {
      console.log(this.createForm)
      /* 传入的参数*/
      const createParams = {
        name: this.createForm.alarm_name,
        level: this.createForm.alarm_level,
        dt_id: this.createForm.device_type,
        device_id: this.createForm.alarm_device,
        rule_query: this.createForm.rule,
        way: this.createForm.alarm_way,
        status: this.createForm.alarm_enable
      }
      this.$refs['createForm'].validate(valid => {
        if (!valid) return
        this.loading = true
        this.$api.restfulApi
          .create('alarmRule', createParams)
          .then(res => {
            this.loading = false
            this.$message.success(this.$t('lang.add-success'))
            this.close()
            this.getList()
          })
          .catch(() => {
          })
          .finally(() => (this.loading = false))
      })
    },

    // ------------------
    // 重写方法如下
    // 触发关闭弹窗
    close() {
      this.$emit('close', 'dialogCreateRule')
    }
  }
}
</script>

<style lang="scss">
    .rule-form {
        padding-left: 60px !important;
        margin-bottom: 20px;

        .el-input {
            width: 360px;
        }
    }

    .goright {
        border-top: #8c8c8c solid 1px;
        height: 70px;
        padding: 20px;
        text-align: right;
    }
</style>
