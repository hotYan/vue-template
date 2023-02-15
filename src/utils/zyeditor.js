
import { isObject, isArray, isString } from '@vue/shared'
/** 处理编辑器输入的文本
 * @param {String} languageId 语言
 * @param {String|Object|Array} code 编辑器文本
 * @returns {String} 处理后的文本
 */
export const handleInputCode = (languageId, code) => {
  let val = code
  if (isObject(val) || isArray(val)) {
    val = JSON.stringify(val, null, 2)
  }

  return isString(val) ? val : `${val}`
}
/** 格式化代码
 * @param {Object} editor 编辑器实例
 * @param {String} languageId 语言
 */
export const formatDocument = (editor, languageId) => {
  if (languageId === 'sql') {
    console.log('TODO:待完善')
  } else {
    editor.getAction('editor.action.formatDocument').run()
  }
}
// 定义编辑器的默认配置
export const defaultOpts = {
  automaticLayout: true,
  contextmenu: false,
  fixedOverflowWidgets: true,
  fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace',
  formatOnPaste: true,
  formatOnType: true,
  insertSpaces: true,
  lineDecorationsWidth: 7,
  lineHeight: 15,
  lineNumbersMinChars: 3,
  minimap: {
    enabled: false
  },
  quickSuggestions: false,
  readOnly: false,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
    alwaysConsumeMouseWheel: false,
    arrowSize: 0
  },
  snippetSuggestions: 'none',
  tabSize: 2,
  theme: 'vs-dark',
  wordBasedSuggestions: false,
  wordWrap: 'on',
  cursorStyle: 'line',
  selectOnLineNumbers: true,
  autoIndent: 'advanced',
  glyphMargin: false,
  renderIndentGuides: true,
  renderLineHighlight: 'line',
  renderWhitespace: 'none',
  scrollBeyondLastColumn: 2
}

/** 复制编辑器文本
 * @param {String|Object|Array} code 编辑器文本
 * @returns {Boolean} 是否成功
 */
export const copyText = async(text) => {
  try {
    if (navigator && 'clipboard' in navigator) {
      await navigator.clipboard.writeText(text)
    } else {
      const input = document.createElement('textarea')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    return true
  } catch (error) {
    return false
  }
}
