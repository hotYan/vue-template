
import { isObject, isArray, isString } from '@vue/shared'
export const handleInputCode = (languageId, code) => {
  let val = code
  if (isObject(val) || isArray(val)) {
    val = JSON.stringify(val, null, 2)
  }

  return isString(val) ? val : `${val}`
}
export const formatDocument = (editor, languageId) => {
  if (languageId === 'sql') {
    console.log('TODO:待完善')
  } else {
    editor.getAction('editor.action.formatDocument').run()
  }
}

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
