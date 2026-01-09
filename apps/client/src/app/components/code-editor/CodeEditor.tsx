import Editor, { EditorProps } from '@monaco-editor/react'

export function CodeEditor({ height, ...props }: EditorProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-ios-dark/50 backdrop-blur-sm w-full"
      style={{ height: height || '400px' }}
    >
      <Editor
        defaultLanguage="html"
        defaultValue="// No Code Here Yet"
        height="100%"
        theme="vs-dark"
        {...props}
      />
    </div>
  )
}
