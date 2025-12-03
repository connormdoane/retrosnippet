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
          <div className="title-group">
            <span>RetroSnippet.exe</span>
            <a
              href="https://github.com/connormdoane/retrosnippet"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              title="View on GitHub"
            >
              <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
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
