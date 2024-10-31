import Editor, { EditorProps } from '@monaco-editor/react'

export function CodeEditor(props: EditorProps) {
  return <Editor
    defaultLanguage="html"
    defaultValue="// No Code Here Yet"
    theme="vs-dark"
    {...props}
  />
}
