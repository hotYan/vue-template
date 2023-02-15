<template>
  <div class="datav-editor">
    <div
      ref="MonacoEditor"
      class="monaco-editor"
      :style="{
        height: height + 'px',
        width: '90%'
      }"
    />
  </div>
</template>

<script>
// import * as monaco from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { defaultOpts, handleInputCode, formatDocument } from '@/utils/zyeditor.js'
export default {
  components: {},
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
    height: {
      type: Number,
      default: 240
    },

    opts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      autoFormat: true,
      // // 主要配置
      // defaultOpts: {
      //   value: '', // 编辑器的值
      //   theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
      //   roundedSelection: true, // 右侧不显示编辑器预览框
      //   autoIndent: true, // 自动缩进
      //   readOnly: false, // 是否只读
      //   language: 'json', // 语言类型java,c,php更多选择详见官网
      //   foldingStrategy: 'indentation', // 代码可分小段折叠
      //   fontSize: 14, // 字体大小
      //   tabSize: 2, // tab缩进长度
      //   minimap: { // 关闭小地图
      //     enabled: false
      //   }
      // },
      // 编辑器对象
      monacoEditor: {}
    }
  },

  computed: {

  },
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
  created() { },
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
      const dom = this.$refs.MonacoEditor
      if (dom) {
        // 初始化container的内容，销毁之前生成的编辑器
        // this.$refs.MonacoEditor.innerHTML = ''

        // 生成编辑器配置
        const opts = Object.assign(defaultOpts, {
          value: '',
          language: this.language,
          readOnly: this.readOnly
        })
        // 生成编辑器对象
        const ce = monaco.editor.create(dom, opts)
        const inputCode = handleInputCode(this.language, this.code)
        ce.setValue(inputCode)
        if (this.autoFormat) {
          formatDocument(ce, this.language)
        }
        // if (this.height > 0) {
        //   console.log('height', this.height)
        //   console.log('dom', dom)
        //   dom.style.height = `${this.height}px`
        // }

        // 编辑器内容发生改变时触发
        // this.monacoEditor.onDidChangeModelContent(() => {
        //   this.$emit('change', this.monacoEditor.getValue())
        // })
        this.monacoEditor = ce
      }
    },
    // 手动编辑器中的内容
    getValue() {
      this.$message.info(this.$refs.monaco.getVal())
    }
  }

}
</script>

<style lang="scss" scoped>
.datav-editor{
  height: 500px;
  width: 500px;
  background-color: aquamarine;
}
</style>
