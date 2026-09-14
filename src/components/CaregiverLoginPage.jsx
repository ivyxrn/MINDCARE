import React, { useState } from 'react';
import { LeafLogo, LockIcon, ArrowLeftIcon, LoginDoorIcon } from './Icons';
import './CaregiverLoginPage.css';

export function CaregiverLoginPage({ onBack, onLogin }) {
  const [email, setEmail] = useState('caregiver@example.com');
  const [password, setPassword] = useState('demo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="caregiver-login-page">
      {/* Brand Header */}
      <header className="caregiver-login-header">
        <LeafLogo size={36} />
        <span className="brand-name">MINDCARE</span>
      </header>

      {/* Main Form Container */}
      <main className="caregiver-login-container">
        {/* Back Link */}
        <button
          type="button"
          className="back-welcome-btn"
          onClick={onBack}
          aria-label="Back to welcome"
        >
          <ArrowLeftIcon size={16} />
          <span>Back to welcome</span>
        </button>

        {/* Login Card */}
        <div className="caregiver-login-card">
          {/* Demo Access Banner */}
          <div className="demo-access-box" role="status">
            <LockIcon size={16} color="#204C41" />
            <span>Demo access: caregiver@example.com / demo</span>
          </div>

          {/* Heading & Subtitle */}
          <div className="caregiver-title-group">
            <h1 className="caregiver-login-title">Welcome, caregiver.</h1>
            <p className="caregiver-login-subtitle">See how Anima is doing today.</p>
          </div>

          {/* Form */}
          <form className="caregiver-login-form" onSubmit={handleSubmit}>
            <div className="caregiver-input-group">
              <label htmlFor="caregiver-email" className="caregiver-label">
                Email
              </label>
              <input
                id="caregiver-email"
                type="email"
                className="caregiver-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="caregiver-input-group">
              <label htmlFor="caregiver-password" className="caregiver-label">
                Password
              </label>
              <input
                id="caregiver-password"
                type="password"
                className="caregiver-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="caregiver-submit-btn"
              id="open-dashboard-btn"
            >
              <LoginDoorIcon size={18} color="#FFFFFF" />
              <span>Open dashboard</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CaregiverLoginPage;
