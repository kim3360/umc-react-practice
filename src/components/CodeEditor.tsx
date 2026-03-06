import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function CodeEditor({ value, onChange, placeholder, minHeight = '160px' }: CodeEditorProps) {
  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.jsx, 'jsx');

  return (
    <Editor
      value={value}
      onValueChange={onChange}
      highlight={highlight}
      padding={16}
      placeholder={placeholder}
      style={{
        fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        minHeight,
        backgroundColor: '#1e1e1e',
      }}
      textareaClassName="code-editor-textarea"
      preClassName="code-editor-pre"
    />
  );
}
