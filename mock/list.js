import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    // 音频
    // id: '@id',
    // 'subJobName|+1': 1,
    // inputUrl: 'https://mindflowai-open.oss-cn-hangzhou.aliyuncs.com/505/6mariyokwzjuqjql.wav',

    //   User
    admin_id: '@id',
    admin_phone: '158XXXX6422',
    admin_name: '张三',
    admin_status: 1,
    updated_at: '@datetime',
    // 设备
    device_id: '@id',
    device_imei: '123456',
    device_student: '小邹',
    device_status: 1,
    device_online: 1,
    device_power: 80,
    device_record: 1,
    created_at: '@datetime',
    // 学校
    school_id: '@id',
    school_name: '希望小学',
    school_address: '新希望大厦',
    school_phone: '158XXXX6422'
  }]
})

export default [
  {
    url: '/web/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        current_page: 1,
        total: items.length,
        data: items
      }
    }
  }
]
