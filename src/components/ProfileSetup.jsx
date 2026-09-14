import React, { useRef, useEffect } from 'react';
import { LeafLogo } from './Icons';
import './ProfileSetup.css';

const PROFILE_CONTENT = {
  en: {
    intro: 'MAKE IT YOURS',
    heading: 'What should we call you?',
    joyHeading: 'What brings you joy?',
    options: {
      gardening: 'Gardening',
      stories: 'Stories',
      cooking: 'Cooking',
      nature: 'Nature',
      family: 'Family',
    },
    back: 'Back',
    continue: 'Continue',
  },
  hi: {
    intro: 'इसे अपना बनाएं',
    heading: 'हम आपको क्या कहकर बुलाएं?',
    joyHeading: 'आपको किस चीज़ से खुशी मिलती है?',
    options: {
      gardening: 'बागवानी',
      stories: 'कहानियां',
      cooking: 'खाना पकाना',
      nature: 'प्रकृति',
      family: 'परिवार',
    },
    back: 'वापस',
    continue: 'जारी रखें',
  },
  as: {
    intro: 'নিজৰ কৰি তোলক',
    heading: 'আমি আপোনাক কি বুলি মাতিম?',
    joyHeading: 'কিহে আপোনাক আনন্দ দিয়ে?',
    options: {
      gardening: 'বাগান কৰা',
      stories: 'সাধুকথা',
      cooking: 'ৰন্ধা-বঢ়া',
      nature: 'প্ৰকৃতি',
      family: 'পৰিয়াল',
    },
    back: 'পিছলৈ',
    continue: 'আগবাঢ়ক',
  },
  ne: {
    intro: 'यसलाई आफ्नै बनाउनुहोस्',
    heading: 'हामी तपाईंलाई के भनेर बोलाऔं?',
    joyHeading: 'तपाईंलाई के कुराले खुसी दिन्छ?',
    options: {
      gardening: 'बगैंचाको काम',
      stories: 'कथा',
      cooking: 'खाना पकाउने',
      nature: 'प्रकृति',
      family: 'परिवार',
    },
    back: 'पछाडि',
    continue: 'अगाडि बढ्नुहोस्',
  },
};

const JOY_OPTIONS = [
  { id: 'gardening' },
  { id: 'stories' },
  { id: 'cooking' },
  { id: 'nature' },
  { id: 'family' },
];

export const ProfileSetup = ({
  name = '',
  onChangeName,
  selectedPreferences = [],
  onTogglePreference,
  onBack,
  onContinue,
  onBackToLanding,
  selectedLang = 'en',
}) => {
  const inputRef = useRef(null);

  const currentContent = PROFILE_CONTENT[selectedLang] || PROFILE_CONTENT.en;

  // Automatically focus the name input when this screen opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChipClick = (optionId) => {
    if (onTogglePreference) {
      onTogglePreference(optionId);
    }
  };

  return (
    <main className="profile-screen" aria-label="Profile and preferences screen">
      {/* Top Header */}
      <header className="profile-header">
        <button
          type="button"
          className="profile-brand-btn"
          onClick={onBackToLanding}
          aria-label="Return to MINDCARE home screen"
          title="Return to MINDCARE home screen"
        >
          <LeafLogo size={36} />
          <span className="profile-brand-title">MINDCARE</span>
        </button>

        <div className="profile-step-counter" aria-label="Step 2 of 3">
          2 / 3
        </div>
      </header>

      {/* Horizontal Progress Bar (~66.7% for Step 2 of 3) */}
      <div
        className="profile-progress-wrapper"
        role="progressbar"
        aria-valuenow={67}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Onboarding step 2 of 3"
      >
        <div className="profile-progress-track">
          <div className="profile-progress-fill" style={{ width: '66.7%' }} />
        </div>
      </div>

      {/* Main Content Area */}
      <section className="profile-content-container">
        {/* Coral Intro Label */}
        <p className="profile-intro-label">{currentContent.intro}</p>

        {/* Display Heading */}
        <h1 className="profile-main-heading">{currentContent.heading}</h1>

        {/* Large Name Text Input (empty by default, automatically focused) */}
        <div className="name-input-group">
          <input
            ref={inputRef}
            type="text"
            className="profile-name-input"
            value={name}
            onChange={(e) => onChangeName && onChangeName(e.target.value)}
            placeholder=""
            autoFocus
            aria-label={currentContent.heading}
          />
        </div>

        {/* What Brings You Joy? Preferences Section */}
        <div className="joy-section">
          <h2 className="joy-heading">{currentContent.joyHeading}</h2>

          <div
            className="joy-chips-container"
            role="group"
            aria-label={currentContent.joyHeading}
          >
            {JOY_OPTIONS.map((option) => {
              const isSelected = selectedPreferences.some(
                (p) => p.toLowerCase() === option.id.toLowerCase()
              );
              const label = currentContent.options[option.id];
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  className={`joy-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleChipClick(option.id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Section: Back & Continue */}
        <div className="profile-bottom-section">
          <button
            type="button"
            className="btn-profile-back"
            onClick={onBack}
            aria-label={currentContent.back}
          >
            <span aria-hidden="true">←</span>
            <span>{currentContent.back}</span>
          </button>

          <button
            type="button"
            className="btn-profile-continue"
            onClick={onContinue}
            aria-label={currentContent.continue}
          >
            <span>{currentContent.continue}</span>
            <span className="btn-profile-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProfileSetup;
