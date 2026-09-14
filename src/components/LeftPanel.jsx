import React from 'react';
import { LeafLogo, ShieldIcon } from './Icons';

export const LeftPanel = ({ onGetStarted, onCaregiverClick }) => {
  return (
    <section className="left-panel" aria-label="Welcome and Introduction">
      {/* Subtle background decorative geometric arcs */}
      <div className="bg-deco-arc-top" aria-hidden="true" />
      <div className="bg-deco-arc-bottom" aria-hidden="true" />

      <div className="left-panel-content">
        {/* Brand Header */}
        <header className="brand-header">
          <LeafLogo size={36} />
          <span className="brand-name">MINDCARE</span>
        </header>

        {/* Tagline Section */}
        <div className="tagline-container">
          <span className="tagline-bar" aria-hidden="true" />
          <span className="tagline-text">A gentle space for every day</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="main-headline">
          <span>A little help for</span>
          <span>remembering the</span>
          <span>moments that</span>
          <span>matter.</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="supporting-text">
          Warm, simple activities and gentle routines — made
          <br className="desktop-break" />
          {' '}for families in Northeast India.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="action-buttons">
          <button
            type="button"
            className="btn-primary"
            onClick={onGetStarted}
            aria-label="Get started with MINDCARE"
          >
            <span>Get started</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onCaregiverClick}
            aria-label="Caregiver resources and access"
          >
            I&apos;m a caregiver
          </button>
        </div>

        {/* Privacy & Information Statement */}
        <footer className="privacy-footer">
          <ShieldIcon size={17} color="#8BA79E" />
          <p className="privacy-text">
            Your information stays on this device. This prototype uses local storage only. MINDCARE
            supports engagement and caregiver assistance. It does not diagnose or replace professional
            care.
          </p>
        </footer>
      </div>
    </section>
  );
};
