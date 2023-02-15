<template>
  <el-dialog
    :title="`全屏模式${readOnly?'(只读)':''}`"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <g-monaco-editor
      ref="editorRef"
      :language="language"
      :height="height"
      :code="code"
      :read-only="readOnly"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import GMonacoEditor from './components/MonacoEditor.vue'
export default {
  name: '',
  components: { GMonacoEditor },
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
      fullEditor: null,
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    cancle() {
      this.dialogVisible = false
    },
    sure() {
      const fullEditor = this.$refs['editorRef'].monacoEditor
      if (fullEditor) {
        this.$emit('sure', fullEditor.getValue())
      }
      this.cancle()
    }
  }
}
</script>

<style lang="scss" scoped></style>
