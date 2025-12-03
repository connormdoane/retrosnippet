import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import './SnippetCard.css';
import type { Theme, Language } from '../types';

interface SnippetCardProps {
    code: string;
    onCodeChange: (code: string) => void;
    title: string;
    onTitleChange: (title: string) => void;
    language: Language;
    theme: Theme;
    isDarkMode?: boolean;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
    code,
    onCodeChange,
    title,
    onTitleChange,
    language,
    theme,
    isDarkMode = false
}) => {
    return (
        <div className={`snippet-card-container theme-${theme} ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="window-title-bar">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="window-title-input"
                />
                <div className="window-controls">
                    <div className="window-button">_</div>
                    <div className="window-button">□</div>
                    <div className="window-button">×</div>
                </div>
            </div>
            <div className="editor-wrapper">
                <Editor
                    value={code}
                    onValueChange={onCodeChange}
                    highlight={code => highlight(code, languages[language === 'cpp' ? 'cpp' : 'python'], language)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                        fontSize: 14,
                    }}
                    textareaClassName="code-editor-textarea"
                />
            </div>
        </div>
    );
};
