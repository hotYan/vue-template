<template>
  <div
    class="datav-editor"
    :style="{ height: height + 'px' }"
  >
    <div class="datav-editor-actions">
      <i class="el-icon-document-copy" @click="copyData" />
      <i v-if="isFullScreen" class="el-icon-quanpingsuoxiao" />
      <!-- <i v-else class="el-icon-fullscreen1" @click="switchFullScreen" /> -->
      <i v-else class="el-icon-full-screen" @click="switchFullScreen" />
    </div>
    <g-monaco-editor
      ref="editorRef"
      :language="language"
      :height="height"
      :code="code"
      :read-only="readOnly"
    />
    <FullScreenEditor
      ref="FullScreenEditorRef"
      :language="language"
      :height="500"
      :code="code"
      :read-only="readOnly"
      @close="closeFullScreen"
      @sure="saveFullScreen"
    />
  </div>
</template>

<script>
import './assets/font_editor/iconfont.css'
import { copyText } from './utils'
import GMonacoEditor from './components/MonacoEditor.vue'
import FullScreenEditor from './FullScreenEditor.vue'
export default {
  components: { GMonacoEditor, FullScreenEditor },
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
    }
  },
  data() {
    return {
      isFullScreen: false
    }
  },
  methods: {
    copyData() {
      const editor = this.$refs['editorRef'].monacoEditor
      if (editor) {
        copyText(editor.getValue()).then(() => {
          this.$message.success('复制成功')
        })
      }
    },
    switchFullScreen() {
      this.$refs['FullScreenEditorRef'].dialogVisible = true
      this.isFullScreen = !this.isFullScreen
    },
    saveFullScreen(value) {
      const editor = this.$refs['editorRef'].monacoEditor
      if (editor && !editor._configuration._rawOptions.readOnly) {
        editor.setValue(value)
        editor.focus()
      }
    },
    closeFullScreen() {
      this.isFullScreen = !this.isFullScreen
    }
  }
}
</script>

<style lang="scss" scoped>
.datav-editor{
  width: 100%;
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
