import React from 'react';
import { Download } from 'lucide-react';
import type { Language } from '../types';
import './Controls.css';

interface ControlsProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    showWatermark: boolean;
    setShowWatermark: (show: boolean) => void;
    onDownload: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode,
    showWatermark,
    setShowWatermark,
    onDownload
}) => {
    return (
        <div className="controls-container">
            <div className="control-group">
                <label className="control-label">Syntax Highlighting</label>
                <div className="toggle-group">
                    <button
                        className={`toggle-btn ${language === 'python' ? 'active' : ''}`}
                        onClick={() => setLanguage('python')}
                    >
                        Python
                    </button>
                    <button
                        className={`toggle-btn ${language === 'cpp' ? 'active' : ''}`}
                        onClick={() => setLanguage('cpp')}
                    >
                        C++
                    </button>
                </div>
            </div>

            <div className="control-group">
                <label className="control-label">Mode</label>
                <div className="toggle-group">
                    <button
                        className={`toggle-btn ${!isDarkMode ? 'active' : ''}`}
                        onClick={() => setIsDarkMode(false)}
                    >
                        Light
                    </button>
                    <button
                        className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
                        onClick={() => setIsDarkMode(true)}
                    >
                        Dark
                    </button>
                </div>
            </div>

            <div className="control-group">
                <label className="control-label">Watermark</label>
                <div className="toggle-group">
                    <button
                        className={`toggle-btn ${showWatermark ? 'active' : ''}`}
                        onClick={() => setShowWatermark(true)}
                    >
                        On
                    </button>
                    <button
                        className={`toggle-btn ${!showWatermark ? 'active' : ''}`}
                        onClick={() => setShowWatermark(false)}
                    >
                        Off
                    </button>
                </div>
            </div>

            <button className="download-btn" onClick={onDownload}>
                <Download size={18} />
                Download PNG
            </button>
        </div>
    );
};
