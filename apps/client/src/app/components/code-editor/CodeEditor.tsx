import Editor, { EditorProps } from '@monaco-editor/react'

export function CodeEditor(props: EditorProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-ios-dark/50 backdrop-blur-sm">
      <Editor
        defaultLanguage="html"
        defaultValue="// No Code Here Yet"
        theme="vs-dark"
        {...props}
      />
    </div>
  )
}
