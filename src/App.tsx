import { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { SnippetCard } from './components/SnippetCard';
import { Controls } from './components/Controls';
import type { Language, Theme } from './types';
import './App.css';

const DEFAULT_CODE = `def hello_world():
    print("Hello, World!")

# Write your code here...`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [title, setTitle] = useState('Snippet.exe');
  const [language, setLanguage] = useState<Language>('python');
  const theme: Theme = 'retro';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);

  const handleDownload = useCallback(async () => {
    const element = document.getElementById('snippet-card');
    if (!element) return;

    try {
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${title || 'snippet'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    }
  }, [title]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="title-bar">
          <span>RetroSnippet.exe</span>
          <div className="window-controls">
            <div className="window-button">_</div>
            <div className="window-button">□</div>
            <div className="window-button">×</div>
          </div>
        </div>
        <div className="content">
          <h1>RetroSnippet</h1>
          <p>Share code snippets the old fashioned way.</p>
        </div>
      </header>

      <main>
        <div id="snippet-card" className="snippet-wrapper">
          <SnippetCard
            code={code}
            onCodeChange={setCode}
            title={title}
            onTitleChange={setTitle}
            language={language}
            theme={theme}
            isDarkMode={isDarkMode}
          />
          {showWatermark && (
            <div className="watermark">RetroSnippet</div>
          )}
        </div>

        <Controls
          language={language}
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          showWatermark={showWatermark}
          setShowWatermark={setShowWatermark}
          onDownload={handleDownload}
        />
      </main>
    </div>
  );
}

export default App;
