import React, { useState } from 'react';
import { LeafLogo, TranslateIcon } from './Icons';
import './LanguageSelection.css';

const LANGUAGE_CONTENT = {
  en: {
    tagline: 'FIRST, A FAMILIAR LANGUAGE',
    heading: 'Choose your language',
    continueText: 'Continue',
    comingSoonPill: 'Coming soon',
  },
  hi: {
    tagline: 'पहले, अपनी परिचित भाषा चुनें',
    heading: 'अपनी भाषा चुनें',
    continueText: 'जारी रखें',
    comingSoonPill: 'जल्द आ रहा है',
  },
  as: {
    tagline: 'প্ৰথমে, আপোনাৰ পৰিচিত ভাষা বাছক',
    heading: 'আপোনাৰ ভাষা বাছক',
    continueText: 'আগবাঢ়ক',
    comingSoonPill: 'সোনকালেই আহিব',
  },
  ne: {
    tagline: 'पहिले, आफ्नो परिचित भाषा रोज्नुहोस्',
    heading: 'आफ्नो भाषा रोज्नुहोस्',
    continueText: 'अगाडि बढ्नुहोस्',
    comingSoonPill: 'चाँडै आउँदैछ',
  },
};

const LANGUAGES = [
  { id: 'en', name: 'English', row: 'top' },
  { id: 'hi', name: 'हिन्दी', row: 'top' },
  { id: 'as', name: 'অসমীয়া', row: 'top' },
  { id: 'ne', name: 'नेपाली', row: 'bottom' },
];

export const LanguageSelection = ({
  onBackToLanding,
  onContinue,
  selectedLang: externalLang,
  onSelectLang,
}) => {
  const [internalLang, setInternalLang] = useState('en');
  const selectedLang = externalLang || internalLang;

  const currentContent = LANGUAGE_CONTENT[selectedLang] || LANGUAGE_CONTENT.en;

  const handleSelectLanguage = (langId) => {
    if (onSelectLang) {
      onSelectLang(langId);
    } else {
      setInternalLang(langId);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <main className="language-screen" aria-label="Language selection screen">
      {/* Top Header */}
      <header className="lang-header">
        <button
          type="button"
          className="lang-brand-btn"
          onClick={onBackToLanding}
          aria-label="Return to MINDCARE home screen"
          title="Return to MINDCARE home screen"
        >
          <LeafLogo size={36} />
          <span className="lang-brand-title">MINDCARE</span>
        </button>

        <div className="lang-step-counter" aria-label="Step 1 of 3">
          1 / 3
        </div>
      </header>

      {/* Horizontal Progress Bar (Step 1 of 3: ~33.3%) */}
      <div
        className="lang-progress-wrapper"
        role="progressbar"
        aria-valuenow={33}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Onboarding step 1 of 3"
      >
        <div className="lang-progress-track">
          <div className="lang-progress-fill" style={{ width: '33.3%' }} />
        </div>
      </div>

      {/* Main Content Area */}
      <section className="lang-content-container">
        {/* Coral Intro Label */}
        <p className="lang-intro-label">{currentContent.tagline}</p>

        {/* Dynamic Display Heading */}
        <h1 className="lang-main-heading">{currentContent.heading}</h1>

        {/* Selectable Language Cards */}
        <div
          className="lang-cards-grid"
          role="radiogroup"
          aria-label="Select your preferred language"
        >
          {/* Row 1: English, Hindi, Assamese */}
          <div className="lang-row-top">
            {LANGUAGES.filter((l) => l.row === 'top').map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`lang-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectLanguage(lang.id)}
                >
                  <div className="lang-card-icon" aria-hidden="true">
                    <TranslateIcon size={20} color="#183D36" />
                  </div>
                  <span className="lang-card-name">{lang.name}</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Nepali (centered underneath the first three) */}
          <div className="lang-row-bottom">
            {LANGUAGES.filter((l) => l.row === 'bottom').map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`lang-card lang-card-center ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectLanguage(lang.id)}
                >
                  <div className="lang-card-icon" aria-hidden="true">
                    <TranslateIcon size={20} color="#183D36" />
                  </div>
                  <span className="lang-card-name">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coming Soon Languages */}
        <div className="lang-coming-soon-row">
          <span className="coming-soon-text">Bengali · Mizo · Meitei</span>
          <span className="coming-soon-pill">{currentContent.comingSoonPill}</span>
        </div>

        {/* Bottom Section: Divider & Continue Button */}
        <div className="lang-bottom-section">
          <button
            type="button"
            className="btn-lang-continue"
            onClick={handleContinue}
            aria-label={`${currentContent.continueText} to next step`}
          >
            <span>{currentContent.continueText}</span>
            <span className="btn-lang-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default LanguageSelection;
