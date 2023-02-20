<template>
  <div class="">编辑器
    <!--
      编辑器配置项:
      支持自定义配置属性 language readOnly code height
        - language：支持语言，默认 'json' ，可选值 'html'|'javascript'|'json'|'sql' 等；
        - readOnly：是否只读，默认 false，可选值 true | false ；
        - code：编辑器的值，默认 '',可选类型 String | Array | Object；
        - height：编辑器高度，默认 240 ,可选类型 Number；
      支持自定义配置事件 change blur
        - change：编辑器内容改变时触发，返回编辑器最新的值；
        - blur：编辑器失去焦点时触发，返回编辑器最新的值（默认自动格式化数据）；
    -->
    <DefaultEditor
      language="json"
      :height="200"
      :code="value"
    />
  </div>
</template>

<script>
import DefaultEditor from './DefaultEditor.vue'
export default {
  name: 'EditorTest',
  components: { DefaultEditor },
  props: {
  },
  data() {
    return {
      value: [{ 'name': 1, 'value': 2 }, { 'name': 1, 'value': 2 }]
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  }

}
</script>

<style lang="scss" scoped></style>
