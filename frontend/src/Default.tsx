// frontend/src/Default.tsx
import '@syncfusion/ej2-data';
import React, { useEffect, useRef, useState } from 'react';
import {
  DocumentEditorContainerComponent,
  Toolbar
} from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import Sentiment from 'sentiment';
import './App.css';

// Inject toolbar module (guarded to avoid runtime errors in tests)
if (typeof DocumentEditorContainerComponent.Inject === 'function') {
  DocumentEditorContainerComponent.Inject(Toolbar);
}

export interface User {
  username: string;
  email: string;
}

interface DefaultProps {
  currentUser: User;
  onLogout: () => void;
}

const Default: React.FC<DefaultProps> = ({ currentUser, onLogout }) => {
  const containerRef = useRef<DocumentEditorContainerComponent>(null);
  const titleBarRef = useRef<TitleBar | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineWidth, setLineWidth] = useState(80);

  // Load TTS voices
  useEffect(() => {
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
      if (vs.length && !selectedVoice) setSelectedVoice(vs[0].name);
    };
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
  }, [selectedVoice]);

  // Update word & character counts
  const updateCounts = () => {
    const container = containerRef.current;
    if (!container) return;
    const editor = container.documentEditor;
    editor.selection.selectAll();
    const text = editor.selection.text || '';
    editor.selection.moveToDocumentEnd();
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    setWordCount(words.length);
    setCharCount(text.replace(/\s/g, '').length);
  };

  // Format text by fixed line width
  const handleFormat = () => {
    const container = containerRef.current;
    if (!container) return;
    const editor = container.documentEditor;
    editor.selection.selectAll();
    const raw = editor.selection.text || '';
    editor.selection.moveToDocumentEnd();
    const s = raw.replace(/\r?\n|\r/g, ' ');
    let out = '';
    for (let i = 0; i < s.length; i += lineWidth) {
      let chunk = s.substring(i, i + lineWidth);
      if (chunk.length < lineWidth) {
        chunk += ' '.repeat(lineWidth - chunk.length);
      }
      out += chunk + '\n';
    }
    editor.selection.selectAll();
    editor.editor.insertText(out);
    updateCounts();
  };

  // Editor created callback
  const onCreated = () => {
    const container = containerRef.current;
    if (!container) return;
    const editor = container.documentEditor;

    const titleEl = document.getElementById('default_title_bar');
    if (titleEl) {
      titleBarRef.current = new TitleBar(titleEl, editor, true);
      editor.documentName = 'Untitled';
      titleBarRef.current.updateDocumentTitle();
    }

    editor.contentChange = () => {
      titleBarRef.current?.updateDocumentTitle();
      updateCounts();
    };
    editor.keyUp = () => updateCounts();
    container.documentChange = editor.contentChange;

    updateCounts();
    resizeEditor();
  };

  // Resize logic
  const resizeEditor = () => {
    const container = containerRef.current;
    const tb = titleBarRef.current;
    if (!container || !tb) return;
    container.resize(window.innerWidth, window.innerHeight - tb.getHeight());
  };
  useEffect(() => {
    window.addEventListener('resize', resizeEditor);
    return () => window.removeEventListener('resize', resizeEditor);
  }, []);

  // Text-to-speech
  const handleSpeak = () => {
    const editor = containerRef.current?.documentEditor;
    if (!editor) return;
    const text = editor.selection.getText(true) || '';
    if (!text.trim()) return alert('Select some text first.');
    const utt = new SpeechSynthesisUtterance(text);
    const v = voices.find(v => v.name === selectedVoice);
    if (v) utt.voice = v;
    utt.rate = rate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  const handleStop = () => window.speechSynthesis.cancel();

  // Sentiment analysis
  const handleSentiment = () => {
    const container = containerRef.current;
    if (!container) return;
    const editor = container.documentEditor;
    editor.selection.selectAll();
    const text = editor.selection.text || '';
    editor.selection.moveToDocumentEnd();
    if (!text.trim()) return alert('Document is empty.');
    const result = new Sentiment().analyze(text);
    const label = result.score > 0 ? 'Positive' : result.score < 0 ? 'Negative' : 'Neutral';
    alert(`🧠 Sentiment: ${label}\nScore: ${result.score}`);
  };

  // Grammar check
  const handleGrammarCheck = () => {
    const editor = containerRef.current?.documentEditor;
    if (!editor) return;
    editor.search.clearSearchHighlight();
    ['teh', 'recieve', 'adress', 'wierd', 'occurence'].forEach(w =>
      editor.search.findAll(w, 'None'),
    );
    alert('🔍 Highlighted simple spelling errors.');
  };

  return (
    <div className="editor-root">
      <div id="default_title_bar" className="e-de-ctn-title" />
      <div className="editor-toolbar">
        <strong>👤 {currentUser.username}</strong>
        <span style={{ margin: '0 10px' }}>📝 Words: {wordCount} | 🔤 Chars: {charCount}</span>
        <button onClick={handleSpeak}>🔊 Read Aloud</button>
        <button onClick={handleStop}>😛 Stop</button>
        <button onClick={handleSentiment}>🧠 Sentiment</button>
        <button onClick={handleGrammarCheck}>📛 Grammar</button>
        <label style={{ marginLeft: 10 }}>Speed:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={e => setRate(parseFloat(e.target.value))}
        />
        <label>Voice:</label>
        <select
          value={selectedVoice}
          onChange={e => setSelectedVoice(e.target.value)}
          aria-label="Select a voice"
        >
          {voices.map((v, i) => (
            <option key={i} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
        <label style={{ marginLeft: 10 }}>Line Width:</label>
        <input
          type="number"
          min={1}
          max={132}
          value={lineWidth}
          onChange={e => setLineWidth(Math.min(132, Math.max(1, parseInt(e.target.value) || 1)))}
          style={{ width: '60px' }}
          aria-label="Line Width"
        />
        <button onClick={handleFormat}>🗘 Format</button>
        <button onClick={onLogout} data-testid="logout-button">🚪 Logout</button>
      </div>
      <div className="editor-container" data-testid="editor-container">
        <DocumentEditorContainerComponent
          id="container"
          ref={containerRef}
          height="100%"
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
          enableToolbar={true}
          enableSpellCheck={true}
          created={onCreated}
        />
      </div>
    </div>
  );
};

export default Default;
