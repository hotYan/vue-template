<template>
  <div
    class="datav-editor"
    :style="{
      height: height + 'px'
    }"
  >
    <div class="datav-editor-actions">
      <i class="el-icon-document-copy" @click="copyData" />
      <i class="el-icon-full-screen" />
    </div>
    <div
      ref="MonacoEditorRef"
      class="monaco-editor"
      :style="{
        // height: height + 'px',
        height: '100%',
        width: '100%'
      }"
    />
  </div>
</template>

<script>
// import * as monaco from 'monaco-editor'
import { editor as MonacoEditor } from 'monaco-editor'
import { defaultOpts, handleInputCode, formatDocument, copyText } from '@/utils/zyeditor.js'
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
      const dom = this.$refs.MonacoEditorRef
      if (dom) {
        // 生成编辑器配置
        const opts = Object.assign(defaultOpts, {
          value: '',
          language: this.language,
          readOnly: this.readOnly
        })
        const ce = MonacoEditor.create(dom, opts) // 生成编辑器对象
        const inputCode = handleInputCode(this.language, this.code) // 根据不同语言，处理编辑器的值
        ce.setValue(inputCode)// 设置编辑器的值
        if (this.autoFormat) { // 根据不同语言，格式化编辑器的值
          formatDocument(ce, this.language)
        }
        this.monacoEditor = ce
      }
    },
    copyData() {
      const editor = this.monacoEditor
      if (editor) {
        copyText(editor.getValue()).then(() => {
          this.$message.success('复制成功')
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.datav-editor{
  height: 500px;
  width: 500px;
  background-color: aquamarine;
  position: relative;
  .datav-editor-actions{
    position: absolute;
    bottom: 5px;
    right: 10px;
    z-index: 999;
    i{
      color:#bfbfbf;
    }
    i:hover{
      color:#409EFF;
    }
    i+i{
      margin-left: 5px;
    }
  }
}
</style>
