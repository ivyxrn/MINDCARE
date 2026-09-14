import React, { useState } from 'react';
import { LeafLogo, AaIcon, SpeakerIcon, ContrastIcon } from './Icons';
import './SettingsScreen.css';

const SETTINGS_CONTENT = {
  en: {
    intro: 'ONE LAST STEP',
    heading: 'Make it comfortable for you',
    textSize: 'Text size',
    voiceAssistance: 'Voice assistance',
    highContrast: 'Higher contrast',
    back: 'Back',
    finish: 'Finish setup',
    completed: 'Setup complete! Your preferences have been saved.',
  },
  hi: {
    intro: 'एक अंतिम चरण',
    heading: 'इसे अपने लिए आरामदायक बनाएं',
    textSize: 'अक्षर का आकार',
    voiceAssistance: 'आवाज़ सहायता',
    highContrast: 'अधिक स्पष्टता (कंट्रास्ट)',
    back: 'वापस',
    finish: 'सेटअप पूरा करें',
    completed: 'सेटअप पूरा हुआ! आपकी प्राथमिकताएं सहेज ली गई हैं।',
  },
  as: {
    intro: 'অন্তিমটো পদক্ষেপ',
    heading: 'আপোনাৰ বাবে সুবিধাজনক কৰি তোলক',
    textSize: 'আখৰৰ আকাৰ',
    voiceAssistance: 'ধ্বনি সহায়',
    highContrast: 'অধিক স্পষ্টতা',
    back: 'পিছলৈ',
    finish: 'ছেটআপ সম্পূৰ্ণ কৰক',
    completed: 'ছেটআপ সম্পূৰ্ণ হ\'ল! আপোনাৰ পছন্দসমূহ সংৰক্ষণ কৰা হৈছে।',
  },
  ne: {
    intro: 'अन्तिम चरण',
    heading: 'आफ्नो लागि सहज बनाउनुहोस्',
    textSize: 'अक्षरको आकार',
    voiceAssistance: 'आवाज सहायता',
    highContrast: 'उच्च कन्ट्रास्ट',
    back: 'पछाडि',
    finish: 'सेटअप पूरा गर्नुहोस्',
    completed: 'सेटअप पूरा भयो! तपाईंका प्राथमिकताहरू सुरक्षित गरिएका छन्।',
  },
};

const TEXT_SIZES = ['A', 'A+', 'A++'];

export const SettingsScreen = ({
  selectedLang = 'en',
  textSize = 'A',
  onChangeTextSize,
  voiceAssistance = false,
  onToggleVoiceAssistance,
  highContrast = false,
  onToggleHighContrast,
  onBack,
  onFinish,
  onBackToLanding,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const currentContent = SETTINGS_CONTENT[selectedLang] || SETTINGS_CONTENT.en;

  const handleFinishClick = () => {
    setIsCompleted(true);
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <main className="settings-screen" aria-label="Accessibility and comfort settings">
      {/* Top Header */}
      <header className="settings-header">
        <button
          type="button"
          className="settings-brand-btn"
          onClick={onBackToLanding}
          aria-label="Return to MINDCARE home screen"
          title="Return to MINDCARE home screen"
        >
          <LeafLogo size={36} />
          <span className="settings-brand-title">MINDCARE</span>
        </button>

        <div className="settings-step-counter" aria-label="Step 3 of 3">
          3 / 3
        </div>
      </header>

      {/* Horizontal Progress Bar (100% for Step 3 of 3) */}
      <div
        className="settings-progress-wrapper"
        role="progressbar"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Onboarding step 3 of 3"
      >
        <div className="settings-progress-track">
          <div className="settings-progress-fill" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Main Content Area */}
      <section className="settings-content-container">
        {/* Coral Intro Tagline */}
        <p className="settings-intro-label">{currentContent.intro}</p>

        {/* Display Heading */}
        <h1 className="settings-main-heading">{currentContent.heading}</h1>

        {/* Three Accessibility Settings Cards */}
        <div className="settings-cards-stack">
          {/* Card 1: Text Size Control */}
          <div className="settings-card">
            <div className="settings-card-label">
              <span className="settings-card-icon" aria-hidden="true">
                <AaIcon size={20} color="#183D36" />
              </span>
              <span>{currentContent.textSize}</span>
            </div>

            <div
              className="text-size-pill"
              role="radiogroup"
              aria-label={currentContent.textSize}
            >
              {TEXT_SIZES.map((size) => {
                const isActive = textSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    className={`text-size-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onChangeTextSize && onChangeTextSize(size)}
                    aria-label={`Text size ${size}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Voice Assistance Toggle */}
          <div className="settings-card">
            <div className="settings-card-label">
              <span className="settings-card-icon" aria-hidden="true">
                <SpeakerIcon size={21} color="#183D36" />
              </span>
              <span>{currentContent.voiceAssistance}</span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={voiceAssistance}
              className={`toggle-switch ${voiceAssistance ? 'active' : ''}`}
              onClick={onToggleVoiceAssistance}
              aria-label={`${currentContent.voiceAssistance}: ${voiceAssistance ? 'On' : 'Off'}`}
            >
              <span className="toggle-thumb" aria-hidden="true" />
            </button>
          </div>

          {/* Card 3: Higher Contrast Toggle */}
          <div className="settings-card">
            <div className="settings-card-label">
              <span className="settings-card-icon" aria-hidden="true">
                <ContrastIcon size={21} color="#183D36" />
              </span>
              <span>{currentContent.highContrast}</span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={highContrast}
              className={`toggle-switch ${highContrast ? 'active' : ''}`}
              onClick={onToggleHighContrast}
              aria-label={`${currentContent.highContrast}: ${highContrast ? 'On' : 'Off'}`}
            >
              <span className="toggle-thumb" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Optional Success Feedback Banner when Setup is Finished */}
        {isCompleted && (
          <div className="settings-completion-banner" role="status">
            <span aria-hidden="true">✓</span>
            <span>{currentContent.completed}</span>
          </div>
        )}

        {/* Bottom Navigation Section: Back & Finish Setup */}
        <div className="settings-bottom-section">
          <button
            type="button"
            className="btn-settings-back"
            onClick={onBack}
            aria-label={currentContent.back}
          >
            <span aria-hidden="true">←</span>
            <span>{currentContent.back}</span>
          </button>

          <button
            type="button"
            className="btn-settings-finish"
            onClick={handleFinishClick}
            aria-label={`${currentContent.finish}`}
          >
            <span>{currentContent.finish}</span>
            <span className="btn-settings-check" aria-hidden="true">
              ✓
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default SettingsScreen;
