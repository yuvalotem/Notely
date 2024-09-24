import Editor, { EditorProps } from '@monaco-editor/react'

export const CodeEditor = (props: EditorProps) => (
  <Editor
    defaultLanguage="html"
    defaultValue="// No Code Here Yet"
    theme="vs-dark"
    {...props}
  />
)
