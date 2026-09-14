import React, { useState } from 'react';
import {
  LeafLogo,
  HomeNavIcon,
  ActivitiesNavIcon,
  ProgressNavIcon,
  BellNavIcon,
  HelpNavIcon,
  GearNavIcon,
  SignOutNavIcon,
  CloudIcon,
  TargetFocusIcon,
  WavesPatternIcon,
  RoutineOrderIcon,
  LightbulbIcon,
  ConcentricTargetIcon,
} from './Icons';
import './ActivitiesPage.css';

const ACTIVITIES_TRANSLATIONS = {
  en: {
    sidebar: {
      home: 'Home',
      activities: 'Activities',
      progress: 'Progress',
      reminders: 'Reminders',
      help: 'Help & voice',
      settings: 'Settings',
      signOut: 'Sign out',
    },
    topBar: {
      connected: 'Connected',
      online: 'Online',
    },
    eyebrow: 'A little practice',
    heading: 'Activities',
    subheading: 'Each one is different. There is no wrong way to begin.',
    adaptiveLevel: 'Adaptive level: Steady',
    completed: 'completed',
    playNow: 'Play now',
    infoBanner:
      'Your activities gently adapt as you go. A little challenge is useful; a little rest is useful too.',
    memoryMatch: {
      title: 'Memory match',
      desc: 'Find the pairs, one at a time.',
    },
    fruitFocus: {
      title: 'Fruit focus',
      desc: 'Notice the fruit that belongs.',
    },
    patternPath: {
      title: 'Pattern path',
      desc: 'What comes next in the sequence?',
    },
    dayInOrder: {
      title: 'A day in order',
      desc: 'Put a familiar routine in order.',
    },
  },
  hi: {
    sidebar: {
      home: 'होम',
      activities: 'गतिविधियाँ',
      progress: 'प्रगति',
      reminders: 'रिमाइंडर',
      help: 'मदद और आवाज़',
      settings: 'सेटिंग्स',
      signOut: 'साइन आउट',
    },
    topBar: {
      connected: 'जुड़ा हुआ',
      online: 'ऑनलाइन',
    },
    eyebrow: 'एक छोटा सा अभ्यास',
    heading: 'गतिविधियाँ',
    subheading: 'प्रत्येक गतिविधि अलग है। शुरुआत करने का कोई गलत तरीका नहीं है।',
    adaptiveLevel: 'अनुकूली स्तर: स्थिर',
    completed: 'पूर्ण',
    playNow: 'शुरू करें',
    infoBanner:
      'जैसे-जैसे आप आगे बढ़ते हैं, आपकी गतिविधियाँ सहज रूप से अनुकूलित होती जाती हैं। थोड़ी सी चुनौती उपयोगी है; थोड़ा सा विश्राम भी उतना ही उपयोगी है।',
    memoryMatch: {
      title: 'मेमोरी मैच',
      desc: 'एक-एक करके जोड़े खोजें।',
    },
    fruitFocus: {
      title: 'फ्रूट फोकस',
      desc: 'उस फल को पहचानें जो मेल खाता है।',
    },
    patternPath: {
      title: 'पैटर्न पाथ',
      desc: 'क्रम में अगला क्या आता है?',
    },
    dayInOrder: {
      title: 'दिनचर्या का क्रम',
      desc: 'एक परिचित दिनचर्या को सही क्रम में रखें।',
    },
  },
  as: {
    sidebar: {
      home: 'গৃহপৃষ্ঠা',
      activities: 'কাৰ্যকলাপ',
      progress: 'প্ৰগতি',
      reminders: 'ৰিমাইণ্ডাৰ',
      help: 'সহায় আৰু ধ্বনি',
      settings: 'ছেটিংছ',
      signOut: 'ছাইন আউট',
    },
    topBar: {
      connected: 'সংযুক্ত',
      online: 'অনলাইন',
    },
    eyebrow: 'অলপ অভ্যাস',
    heading: 'কাৰ্যকলাপ',
    subheading: 'প্ৰতিটোৱেই বেলেগ। আৰম্ভণিৰ কোনো ভুল পথ নাই।',
    adaptiveLevel: 'অনুকূলন স্তৰ: স্থিৰ',
    completed: 'সম্পূৰ্ণ',
    playNow: 'আৰম্ভ কৰক',
    infoBanner:
      'আপুনি আগবঢ়াৰ লগে লগে আপোনাৰ কাৰ্যকলাপবোৰ মৃদুভাৱে মিলি যায়। অলপ প্ৰত্যাহ্বান উপযোগী; অলপ জিৰণিও সিমানেই উপযোগী।',
    memoryMatch: {
      title: 'স্মৃতি মিলন',
      desc: 'এটা এটাকৈ যোৰবোৰ বিচাৰি উলিওৱাক।',
    },
    fruitFocus: {
      title: 'ফলৰ মনোযোগ',
      desc: 'কোনটো ফল খাপ খায় মন কৰক।',
    },
    patternPath: {
      title: 'নক্সা পথ',
      desc: 'ধাৰাবাহিকতাত পৰৱৰ্তী কি আহে?',
    },
    dayInOrder: {
      title: 'নিয়মীয়া দিনলিপি',
      desc: 'পৰিচিত দিনচৰ্যা সঠিক ক্ৰমত সজাওক।',
    },
  },
  ne: {
    sidebar: {
      home: 'गृहपृष्ठ',
      activities: 'गतिविधिहरू',
      progress: 'प्रगति',
      reminders: 'रिमाइन्डरहरू',
      help: 'सहयोग र आवाज',
      settings: 'सेटिङहरू',
      signOut: 'साइन आउट',
    },
    topBar: {
      connected: 'जोडिएको',
      online: 'अनलाइन',
    },
    eyebrow: 'केही अभ्यास',
    heading: 'गतिविधिहरू',
    subheading: 'प्रत्येक गतिविधि फरक छ। सुरु गर्न कुनै गलत तरिका छैन।',
    adaptiveLevel: 'अनुकूलन स्तर: स्थिर',
    completed: 'पूरा',
    playNow: 'सुरु गर्नुहोस्',
    infoBanner:
      'तपाईं अघि बढ्दै जाँदा तपाईंका गतिविधिहरू बिस्तारै अनुकूलित हुँदै जान्छन्। थोरै चुनौती उपयोगी हुन्छ; थोरै आराम पनि उत्तिकै उपयोगी हुन्छ।',
    memoryMatch: {
      title: 'स्मृति मिलान',
      desc: 'एक पटकमा एउटा जोडी पत्ता लगाउनुहोस्।',
    },
    fruitFocus: {
      title: 'फलफूल ध्यान',
      desc: 'मिल्ने फलफूललाई ध्यान दिनुहोस्।',
    },
    patternPath: {
      title: 'ढाँचा मार्ग',
      desc: 'अनुक्रममा अर्को के आउँछ?',
    },
    dayInOrder: {
      title: 'दिनचर्याको क्रम',
      desc: 'एक परिचित दिनचर्यालाई क्रमबद्ध गर्नुहोस्।',
    },
  },
};

// Helper: Generate Avatar Initials
const getInitials = (fullName) => {
  if (!fullName || !fullName.trim()) return 'AD';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const ActivitiesPage = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onSignOut,
  onNavigate,
  onPlayActivity,
}) => {
  const [activeToast, setActiveToast] = useState(null);
  const t = ACTIVITIES_TRANSLATIONS[selectedLang] || ACTIVITIES_TRANSLATIONS.en;
  const userInitials = getInitials(userName);

  const handleNavClick = (navId) => {
    if (navId === 'signOut') {
      if (onSignOut) onSignOut();
      return;
    }
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  const handlePlay = (activityId, activityTitle) => {
    if (onPlayActivity) {
      onPlayActivity(activityId);
    }
    if (onNavigate) {
      onNavigate(activityId);
    }
    // Only display fallback notice if no handler handled the activity and it is an unbuilt future activity
    if (!onPlayActivity && !onNavigate) {
      if (
        activityId !== 'memory-match' &&
        activityId !== 'fruit-focus' &&
        activityId !== 'pattern-path' &&
        activityId !== 'day-in-order'
      ) {
        setActiveToast(`${activityTitle} will open here.`);
        setTimeout(() => setActiveToast(null), 3000);
      }
    }
  };

  return (
    <div className="activities-layout" aria-label="MINDCARE Activities Dashboard">
      {/* ==========================================================================
          LEFT SIDEBAR
          ========================================================================== */}
      <aside className="activities-sidebar" aria-label="Main Navigation">
        <div className="sidebar-top">
          {/* Logo & Brand */}
          <div className="sidebar-brand">
            <LeafLogo size={38} bgColor="#F5E8D8" />
            <span className="sidebar-brand-title">MINDCARE</span>
          </div>

          {/* Main Navigation Links */}
          <nav>
            <ul className="sidebar-nav-list">
              <li>
                <button
                  type="button"
                  className="sidebar-nav-btn"
                  onClick={() => handleNavClick('home')}
                >
                  <span className="sidebar-nav-icon">
                    <HomeNavIcon size={23} />
                  </span>
                  <span>{t.sidebar.home}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-nav-btn active"
                  onClick={() => handleNavClick('activities')}
                  aria-current="page"
                >
                  <span className="sidebar-nav-icon">
                    <ActivitiesNavIcon size={23} />
                  </span>
                  <span>{t.sidebar.activities}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-nav-btn"
                  onClick={() => handleNavClick('progress')}
                >
                  <span className="sidebar-nav-icon">
                    <ProgressNavIcon size={23} />
                  </span>
                  <span>{t.sidebar.progress}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-nav-btn"
                  onClick={() => handleNavClick('reminders')}
                >
                  <span className="sidebar-nav-icon">
                    <BellNavIcon size={23} />
                  </span>
                  <span>{t.sidebar.reminders}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sidebar-nav-btn"
                  onClick={() => handleNavClick('help')}
                >
                  <span className="sidebar-nav-icon">
                    <HelpNavIcon size={23} />
                  </span>
                  <span>{t.sidebar.help}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-nav-btn"
            onClick={() => handleNavClick('settings')}
          >
            <span className="sidebar-nav-icon">
              <GearNavIcon size={23} />
            </span>
            <span>{t.sidebar.settings}</span>
          </button>
          <button
            type="button"
            className="sidebar-nav-btn"
            onClick={() => handleNavClick('signOut')}
          >
            <span className="sidebar-nav-icon">
              <SignOutNavIcon size={23} />
            </span>
            <span>{t.sidebar.signOut}</span>
          </button>
        </div>
      </aside>

      {/* ==========================================================================
          MAIN DASHBOARD AREA
          ========================================================================== */}
      <div className="activities-main-wrapper">
        {/* Top Bar */}
        <header className="activities-top-bar">
          <div className="top-bar-left">
            <div className="connected-indicator" aria-label="System status connected">
              <CloudIcon size={19} color="#557267" />
              <span>{t.topBar.connected}</span>
            </div>
          </div>

          <div className="top-bar-right">
            <span className="online-pill">{t.topBar.online}</span>
            <button
              type="button"
              className="settings-icon-btn"
              onClick={() => handleNavClick('settings')}
              aria-label="Open settings"
              title="Settings"
            >
              <GearNavIcon size={21} color="#446358" />
            </button>
            <div
              className="user-avatar-circle"
              aria-label={`User avatar for ${userName}`}
              title={userName}
            >
              {userInitials}
            </div>
          </div>
        </header>

        {/* Dashboard Content Body */}
        <main className="activities-content-body">
          {/* Header Row: Title and Adaptive Level Pill */}
          <section className="activities-header-row" aria-label="Activities header">
            <div className="activities-header-text">
              <p className="activities-coral-eyebrow">{t.eyebrow}</p>
              <h1 className="activities-main-heading">{t.heading}</h1>
              <p className="activities-subtitle">{t.subheading}</p>
            </div>

            <div className="adaptive-level-pill" role="status" aria-label={t.adaptiveLevel}>
              <ConcentricTargetIcon size={18} color="#385C50" />
              <span>{t.adaptiveLevel}</span>
            </div>
          </section>

          {/* Activity Cards 2-Column Grid */}
          <section className="activities-grid" aria-label="Available activities">
            {/* Card 1: Memory match (Peach) */}
            <article className="activity-card card-peach" aria-labelledby="act-title-memory">
              <div className="activity-card-top">
                <div className="activity-icon-box" aria-hidden="true">
                  <ActivitiesNavIcon size={24} color="#183D36" />
                </div>
                <span className="activity-status-badge">
                  <span className="status-check" aria-hidden="true">✓</span>
                  <span>{t.completed}</span>
                </span>
              </div>

              <div className="activity-card-center">
                <h2 id="act-title-memory" className="activity-card-title">
                  {t.memoryMatch.title}
                </h2>
                <p className="activity-card-desc">{t.memoryMatch.desc}</p>
              </div>

              <div className="activity-card-bottom">
                <button
                  type="button"
                  id="memory-match-play-btn"
                  className="activity-play-btn"
                  onClick={() => handlePlay('memory-match', t.memoryMatch.title)}
                  aria-label={`Play ${t.memoryMatch.title}`}
                >
                  <span>{t.playNow}</span>
                  <span className="play-arrow" aria-hidden="true">→</span>
                </button>
              </div>

              {/* Decorative Corner Ring */}
              <div className="activity-deco-ring" aria-hidden="true" />
            </article>

            {/* Card 2: Fruit focus (Pale Green) */}
            <article className="activity-card card-green" aria-labelledby="act-title-fruit">
              <div className="activity-card-top">
                <div className="activity-icon-box" aria-hidden="true">
                  <TargetFocusIcon size={24} color="#183D36" />
                </div>
              </div>

              <div className="activity-card-center">
                <h2 id="act-title-fruit" className="activity-card-title">
                  {t.fruitFocus.title}
                </h2>
                <p className="activity-card-desc">{t.fruitFocus.desc}</p>
              </div>

              <div className="activity-card-bottom">
                <button
                  type="button"
                  id="fruit-focus-play-btn"
                  className="activity-play-btn"
                  onClick={() => handlePlay('fruit-focus', t.fruitFocus.title)}
                  aria-label={`Play ${t.fruitFocus.title}`}
                >
                  <span>{t.playNow}</span>
                  <span className="play-arrow" aria-hidden="true">→</span>
                </button>
              </div>

              {/* Decorative Corner Ring */}
              <div className="activity-deco-ring" aria-hidden="true" />
            </article>

            {/* Card 3: Pattern path (Pale Yellow) */}
            <article className="activity-card card-yellow" aria-labelledby="act-title-pattern">
              <div className="activity-card-top">
                <div className="activity-icon-box" aria-hidden="true">
                  <WavesPatternIcon size={24} color="#183D36" />
                </div>
              </div>

              <div className="activity-card-center">
                <h2 id="act-title-pattern" className="activity-card-title">
                  {t.patternPath.title}
                </h2>
                <p className="activity-card-desc">{t.patternPath.desc}</p>
              </div>

              <div className="activity-card-bottom">
                <button
                  type="button"
                  id="pattern-path-play-btn"
                  className="activity-play-btn"
                  onClick={() => handlePlay('pattern-path', t.patternPath.title)}
                  aria-label={`Play ${t.patternPath.title}`}
                >
                  <span>{t.playNow}</span>
                  <span className="play-arrow" aria-hidden="true">→</span>
                </button>
              </div>

              {/* Decorative Corner Ring */}
              <div className="activity-deco-ring" aria-hidden="true" />
            </article>

            {/* Card 4: A day in order (Pale Lavender) */}
            <article className="activity-card card-lavender" aria-labelledby="act-title-order">
              <div className="activity-card-top">
                <div className="activity-icon-box" aria-hidden="true">
                  <RoutineOrderIcon size={24} color="#183D36" />
                </div>
              </div>

              <div className="activity-card-center">
                <h2 id="act-title-order" className="activity-card-title">
                  {t.dayInOrder.title}
                </h2>
                <p className="activity-card-desc">{t.dayInOrder.desc}</p>
              </div>

              <div className="activity-card-bottom">
                <button
                  type="button"
                  id="day-in-order-play-btn"
                  className="activity-play-btn"
                  onClick={() => handlePlay('day-in-order', t.dayInOrder.title)}
                  aria-label={`Play ${t.dayInOrder.title}`}
                >
                  <span>{t.playNow}</span>
                  <span className="play-arrow" aria-hidden="true">→</span>
                </button>
              </div>

              {/* Decorative Corner Ring */}
              <div className="activity-deco-ring" aria-hidden="true" />
            </article>
          </section>

          {/* Bottom Information Banner */}
          <section className="activities-info-banner" role="note" aria-label="Activity adaptation notice">
            <div className="info-banner-icon" aria-hidden="true">
              <LightbulbIcon size={22} color="#D48D75" />
            </div>
            <p className="info-banner-text">{t.infoBanner}</p>
          </section>

          {/* Subtle toast notice when Play now is clicked */}
          {activeToast && (
            <div className="activities-toast" role="status">
              <span>💡 {activeToast}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ActivitiesPage;
