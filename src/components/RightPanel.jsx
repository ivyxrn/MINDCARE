import React from 'react';
import { SunIcon, FlowerBotanical, SimpleHeartOutline } from './Icons';

export const RightPanel = () => {
  return (
    <section className="right-panel-wrapper" aria-label="Visual preview and daily moments">
      {/* Warm Cream Dotted Background Section */}
      <div className="right-panel-dotted">
        <div className="right-content-container">
          {/* Card Stage Area */}
          <div className="card-stage">
            {/* Coral circular geometric accent peeking out behind top-right of the card */}
            <div className="deco-coral-circle" aria-hidden="true" />

            {/* Main White/Cream Card */}
            <div className="moment-card" role="region" aria-label="Daily gentle moment card">
              {/* Card Header: 9:41 pill + Sun icon */}
              <div className="card-top-bar">
                <div className="time-pill">9:41</div>
                <div className="sun-icon-wrap" aria-hidden="true">
                  <SunIcon size={19} color="#C48D6F" />
                </div>
              </div>

              {/* Sage Illustration Area with Larger Botanical Flower */}
              <div className="illustration-container">
                <FlowerBotanical width={74} height={114} color="#183D36" />
              </div>

              {/* Card Quote / Display Typography */}
              <div className="card-message">
                <p className="card-headline">
                  Small moments<br />
                  can grow into<br />
                  <span className="card-italic">good</span> days.
                </p>
              </div>

              {/* Card Progress Bar */}
              <div
                className="progress-container"
                role="progressbar"
                aria-valuenow={68}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Daily routine progress"
              >
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Feature Badge: Centered horizontally underneath the white quote card */}
            <div className="feature-connection-badge">
              <span className="badge-text">
                Made for connection <SimpleHeartOutline size={15} color="#FAF6F0" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Far-Right Dark Green Accent Border */}
      <div className="right-accent-strip" aria-hidden="true" />
    </section>
  );
};
