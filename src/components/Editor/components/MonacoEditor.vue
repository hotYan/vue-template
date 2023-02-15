<template>
  <div
    ref="MonacoEditorRef"
    :style="{
      height: height + 'px',
      width: '100%'
    }"
  />
</template>

<script>
import { editor as MonacoEditor } from 'monaco-editor'// import * as monaco from 'monaco-editor'
import { defaultOpts, handleInputCode, formatDocument, registerDatavDarkTheme } from '../utils'
const DEFAULT_THEME_NAME = 'datav-dark-theme'
export default {
  components: { },
  props: {
    language: {// 语言，默认JSON
      type: String,
      default: 'json'
    },
    readOnly: {// 是否只读,默认可编辑
      type: Boolean,
      default: false
    },
    code: { // 编辑器内容
      type: [String, Array, Object],
      default: ''
    },
    autoFormat: {// 是否格式化,默认格式化
      type: Boolean,
      default: true
    },
    height: {// 编辑器高度
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      monacoEditor: {} // 编辑器对象
    }
  },
  computed: {},
  watch: {
    code: {
      handler(val, old) {
        const editor = this.monacoEditor
        if (editor) {
          const inputCode = handleInputCode(this.language, val)
          editor.setValue(inputCode)
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    const editor = this.monacoEditor
    if (editor) {
      editor.dispose()
    }
  },
  methods: {
    init() {
      registerDatavDarkTheme(MonacoEditor)
      const dom = this.$refs.MonacoEditorRef
      if (dom) {
        // 生成编辑器配置
        const opts = Object.assign(defaultOpts, {
          value: '',
          language: this.language,
          readOnly: this.readOnly,
          theme: DEFAULT_THEME_NAME
        })
        const ce = MonacoEditor.create(dom, opts) // 生成编辑器对象
        const inputCode = handleInputCode(this.language, this.code) // 根据不同语言，处理编辑器的值
        ce.setValue(inputCode)// 设置编辑器的值
        if (this.autoFormat) { // 根据不同语言，格式化编辑器的值
          formatDocument(ce, this.language)
        }
        this.monacoEditor = ce
      }
    }
  }
}
</script>
