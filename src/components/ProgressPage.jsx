import React, { useMemo } from 'react';
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
  ClockOutlineIcon,
  LightbulbIcon,
  TargetFocusIcon,
  WavesPatternIcon,
  RoutineOrderIcon,
  SparkleIcon,
} from './Icons';
import './ProgressPage.css';

const PROGRESS_TRANSLATIONS = {
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
    eyebrow: 'Your rhythm',
    title: 'Progress',
    subtitle: 'A simple reflection of your practice, never a diagnosis. Notice what feels comfortable.',
    summaryCards: {
      sessionsThisWeek: 'Sessions this week',
      accuracy: 'Accuracy',
      responseTime: 'Response time',
    },
    recentSessions: {
      title: 'Recent sessions',
      today: 'Today',
      yesterday: 'Yesterday',
      responseTimeSuffix: 'response time',
      emptyTitle: 'No sessions yet.',
      emptySub: 'Your completed activities will appear here.',
    },
    thisWeek: {
      title: 'This week',
      chartLabel: 'Completed sessions',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      insightHigh: "You're building a steady rhythm. Keep going at your own pace.",
      insightLow: 'Every little bit counts. Keep choosing what feels good.',
      insightNone: "Come back whenever you're ready. There's no rush.",
    },
    breakdown: {
      eyebrow: 'Breakdown',
      title: 'Your activities',
      sessionSingular: 'session',
      sessionPlural: 'sessions',
      notPlayed: 'Not played yet',
      activities: {
        memoryMatch: 'Memory match',
        fruitFocus: 'Fruit focus',
        patternPath: 'Pattern path',
        dayInOrder: 'A day in order',
      },
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
    eyebrow: 'आपकी लय',
    title: 'प्रगति',
    subtitle: 'आपके अभ्यास का एक सहज प्रतिबिंब, कभी कोई निदान नहीं। जो सहज लगे उस पर ध्यान दें।',
    summaryCards: {
      sessionsThisWeek: 'इस सप्ताह के सत्र',
      accuracy: 'सटीकता',
      responseTime: 'प्रतिक्रिया समय',
    },
    recentSessions: {
      title: 'हाल के सत्र',
      today: 'आज',
      yesterday: 'कल',
      responseTimeSuffix: 'प्रतिक्रिया समय',
      emptyTitle: 'अभी तक कोई सत्र नहीं।',
      emptySub: 'आपकी पूरी की गई गतिविधियाँ यहाँ दिखाई देंगी।',
    },
    thisWeek: {
      title: 'इस सप्ताह',
      chartLabel: 'पूर्ण किए गए सत्र',
      days: ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'],
      insightHigh: 'आप एक स्थिर लय बना रहे हैं। अपनी गति से आगे बढ़ते रहें।',
      insightLow: 'हर छोटा प्रयास महत्वपूर्ण है। जो आपको अच्छा लगे वही चुनते रहें।',
      insightNone: 'जब भी आप तैयार हों, वापस आएं। कोई जल्दबाजी नहीं है।',
    },
    breakdown: {
      eyebrow: 'विवरण',
      title: 'आपकी गतिविधियाँ',
      sessionSingular: 'सत्र',
      sessionPlural: 'सत्र',
      notPlayed: 'अभी तक नहीं खेला गया',
      activities: {
        memoryMatch: 'मेमोरी मैच',
        fruitFocus: 'फ्रूट फोकस',
        patternPath: 'पैटर्न पाथ',
        dayInOrder: 'दिन का क्रम',
      },
    },
  },
  as: {
    sidebar: {
      home: 'ঘৰ',
      activities: 'কাৰ্য্যকলাপ',
      progress: 'প্ৰগতি',
      reminders: 'স্মাৰক',
      help: 'সহায় আৰু মাত',
      settings: 'ছেটিংছ',
      signOut: 'প্ৰস্থান কৰক',
    },
    topBar: {
      connected: 'সংযুক্ত',
      online: 'অনলাইন',
    },
    eyebrow: 'আপোনাৰ ছন্দ',
    title: 'প্ৰগতি',
    subtitle: 'আপোনাৰ অনুশীলনৰ এক সহজ প্ৰতিফলন, কেতিয়াও কোনো নিদান নহয়। যিটো আৰামদায়ক লাগে লক্ষ্য কৰক।',
    summaryCards: {
      sessionsThisWeek: 'এই সপ্তাহৰ অধিবেশন',
      accuracy: 'সঠিকতা',
      responseTime: 'প্ৰতিক্ৰিয়াৰ সময়',
    },
    recentSessions: {
      title: 'শেহতীয়া অধিবেশন',
      today: 'আজি',
      yesterday: 'কালি',
      responseTimeSuffix: 'প্ৰতিক্ৰিয়া সময়',
      emptyTitle: 'এতিয়ালৈকে কোনো অধিবেশন নাই।',
      emptySub: 'আপোনাৰ সম্পূৰ্ণ হোৱা কাৰ্য্যকলাপ ইয়াত দেখা যাব।',
    },
    thisWeek: {
      title: 'এই সপ্তাহত',
      chartLabel: 'সম্পূৰ্ণ অধিবেশন',
      days: ['সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্ৰ', 'শনি', 'দেও'],
      insightHigh: 'আপুনি এক সুস্থিৰ ছন্দ গঢ়ি তুলিছে। নিজৰ গতিৰে আগবাঢ়ক।',
      insightLow: 'প্ৰতিটো সৰু প্ৰচেষ্টাও মূল্যৱান। যিটো ভাল লাগে তাকেই বাছি লওক।',
      insightNone: 'আপুনি সাজু হ’লে ঘূৰি আহিব। কোনো খৰখেদা নাই।',
    },
    breakdown: {
      eyebrow: 'বিৱৰণ',
      title: 'আপোনাৰ কাৰ্য্যকলাপ',
      sessionSingular: 'অধিবেশন',
      sessionPlural: 'অধিবেশন',
      notPlayed: 'এতিয়ালৈকে খেলা নাই',
      activities: {
        memoryMatch: 'মেম’ৰি মেচ',
        fruitFocus: 'ফ্ৰুট ফ’কাচ',
        patternPath: 'পেটাৰ্ন পাথ',
        dayInOrder: 'দিনৰ ক্ৰম',
      },
    },
  },
  ne: {
    sidebar: {
      home: 'गृहपृष्ठ',
      activities: 'क्रियाकलापहरू',
      progress: 'प्रगति',
      reminders: 'सम्झौताहरू',
      help: 'मद्दत र आवाज',
      settings: 'सेटिङहरू',
      signOut: 'साइन आउट',
    },
    topBar: {
      connected: 'जोडिएको छ',
      online: 'अनलाइन',
    },
    eyebrow: 'तपाईंको लय',
    title: 'प्रगति',
    subtitle: 'तपाईंको अभ्यासको एक सहज प्रतिबिम्ब, कहिल्यै कुनै निदान होइन। के सहज लाग्छ ध्यान दिनुहोस्।',
    summaryCards: {
      sessionsThisWeek: 'यो हप्ताका सत्रहरू',
      accuracy: 'सटीकता',
      responseTime: 'प्रतिक्रिया समय',
    },
    recentSessions: {
      title: 'हालका सत्रहरू',
      today: 'आज',
      yesterday: 'हिजो',
      responseTimeSuffix: 'प्रतिक्रिया समय',
      emptyTitle: 'अहिलेसम्म कुनै सत्र छैन।',
      emptySub: 'तपाईंका पूरा भएका क्रियाकलापहरू यहाँ देखिनेछन्।',
    },
    thisWeek: {
      title: 'यो हप्ता',
      chartLabel: 'पूरा भएका सत्रहरू',
      days: ['सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि', 'आइत'],
      insightHigh: 'तपाईं एक स्थिर लय निर्माण गर्दै हुनुहुन्छ। आफ्नै गतिमा जारी राख्नुहोस्।',
      insightLow: 'हरेक सानो प्रयासले फरक पार्छ। जे राम्रो लाग्छ त्यही छनोट गर्नुहोस्।',
      insightNone: 'तयार भएपछि फर्किनुहोस्। कुनै हतार छैन।',
    },
    breakdown: {
      eyebrow: 'विवरण',
      title: 'तपाईंका क्रियाकलापहरू',
      sessionSingular: 'सत्र',
      sessionPlural: 'सत्रहरू',
      notPlayed: 'अहिलेसम्म खेलिएको छैन',
      activities: {
        memoryMatch: 'मेमोरी म्याच',
        fruitFocus: 'फ्रुट फोकस',
        patternPath: 'प्याटर्न पाथ',
        dayInOrder: 'दिनको क्रम',
      },
    },
  },
};

/**
 * Returns Monday 00:00:00 of the week for a given date
 */
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Returns Sunday 23:59:59 of the week for a given date
 */
function getEndOfWeek(date) {
  const start = getStartOfWeek(date);
  const sunday = new Date(start);
  sunday.setDate(start.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

/**
 * Formats a completion timestamp to human-friendly relative or date format
 */
function formatCompletionTime(dateStr, t) {
  if (!dateStr) return '';
  const sessionDate = new Date(dateStr);
  if (isNaN(sessionDate.getTime())) return '';

  const now = new Date();
  const isToday =
    sessionDate.getDate() === now.getDate() &&
    sessionDate.getMonth() === now.getMonth() &&
    sessionDate.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    sessionDate.getDate() === yesterday.getDate() &&
    sessionDate.getMonth() === yesterday.getMonth() &&
    sessionDate.getFullYear() === yesterday.getFullYear();

  if (isToday) return t.recentSessions.today;
  if (isYesterday) return t.recentSessions.yesterday;

  // Otherwise readable format e.g. "14 Sep"
  return sessionDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Normalizes activity name for categorization
 */
function getActivityKey(name) {
  if (!name) return '';
  const lower = name.toLowerCase().replace(/[-_]/g, ' ');
  if (lower.includes('memory')) return 'memoryMatch';
  if (lower.includes('fruit')) return 'fruitFocus';
  if (lower.includes('pattern')) return 'patternPath';
  if (lower.includes('order') || lower.includes('day')) return 'dayInOrder';
  return '';
}

export function ProgressPage({
  userName = '',
  selectedLang = 'en',
  activityHistory = [],
  onNavigate,
  onSignOut,
}) {
  const t = PROGRESS_TRANSLATIONS[selectedLang] || PROGRESS_TRANSLATIONS.en;

  // Ensure activityHistory is parsed properly if passed or read from localStorage
  const sessions = useMemo(() => {
    let list = activityHistory;
    if (!list || !Array.isArray(list) || list.length === 0) {
      try {
        const stored = localStorage.getItem('mindcare_activity_history');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) list = parsed;
        }
      } catch (e) {
        console.warn('Could not read mindcare_activity_history from localStorage:', e);
      }
    }
    // Only completed sessions (having questionsCompleted > 0 or accuracy defined)
    return (list || []).filter(
      (s) => s && (s.questionsCompleted > 0 || typeof s.accuracy === 'number')
    );
  }, [activityHistory]);

  // Calculations for current week
  const {
    sessionsThisWeekCount,
    overallAccuracy,
    avgResponseTimeFormatted,
    dayCounts,
    todayIndex,
    sortedRecentSessions,
    activityBreakdown,
  } = useMemo(() => {
    const now = new Date();
    const weekStart = getStartOfWeek(now);
    const weekEnd = getEndOfWeek(now);

    // Current day index in Monday-based week (0=Mon, 6=Sun)
    const currentDaySundayBased = now.getDay();
    const currentDayMonBased = currentDaySundayBased === 0 ? 6 : currentDaySundayBased - 1;

    let thisWeekCount = 0;
    let totalQuestionsAll = 0;
    let totalCorrectAll = 0;
    let totalResponseTimeAll = 0;
    let totalResponseTimeQuestions = 0;

    // 7 days Mon..Sun
    const dailyCounts = [0, 0, 0, 0, 0, 0, 0];

    // Activity breakdown collectors
    const breakdownMap = {
      memoryMatch: { totalQuestions: 0, totalCorrect: 0, count: 0 },
      fruitFocus: { totalQuestions: 0, totalCorrect: 0, count: 0 },
      patternPath: { totalQuestions: 0, totalCorrect: 0, count: 0 },
      dayInOrder: { totalQuestions: 0, totalCorrect: 0, count: 0 },
    };

    sessions.forEach((session) => {
      const sessionDate = session.completionDateTime ? new Date(session.completionDateTime) : null;
      const isValidDate = sessionDate && !isNaN(sessionDate.getTime());

      // Check if in current week
      if (isValidDate && sessionDate >= weekStart && sessionDate <= weekEnd) {
        thisWeekCount++;
        const sDay = sessionDate.getDay();
        const monIdx = sDay === 0 ? 6 : sDay - 1;
        if (monIdx >= 0 && monIdx < 7) {
          dailyCounts[monIdx]++;
        }
      }

      // Aggregate accuracy
      const qCount = session.questionsCompleted || (session.questionResults ? session.questionResults.length : 0);
      const cCount = session.correctAnswers !== undefined
        ? session.correctAnswers
        : (session.questionResults ? session.questionResults.filter((q) => q.isCorrect).length : 0);

      if (qCount > 0) {
        totalQuestionsAll += qCount;
        totalCorrectAll += cCount;
      }

      // Aggregate response time
      if (typeof session.averageResponseTime === 'number' && session.averageResponseTime > 0) {
        const weight = qCount > 0 ? qCount : 1;
        totalResponseTimeAll += session.averageResponseTime * weight;
        totalResponseTimeQuestions += weight;
      } else if (typeof session.totalResponseTime === 'number' && session.totalResponseTime > 0) {
        totalResponseTimeAll += session.totalResponseTime;
        totalResponseTimeQuestions += qCount > 0 ? qCount : 1;
      }

      // Aggregate breakdown
      const actKey = getActivityKey(session.activityName);
      if (actKey && breakdownMap[actKey]) {
        breakdownMap[actKey].count++;
        if (qCount > 0) {
          breakdownMap[actKey].totalQuestions += qCount;
          breakdownMap[actKey].totalCorrect += cCount;
        }
      }
    });

    // Calculate overall accuracy percentage
    let accuracyStr = '—';
    if (totalQuestionsAll > 0) {
      const pct = Math.round((totalCorrectAll / totalQuestionsAll) * 100);
      accuracyStr = `${pct}%`;
    }

    // Calculate average response time
    let respTimeStr = '—';
    if (totalResponseTimeQuestions > 0 && totalResponseTimeAll > 0) {
      const avg = Math.round(totalResponseTimeAll / totalResponseTimeQuestions);
      respTimeStr = `${avg}s`;
    }

    // Sort recent sessions newest first
    const sorted = [...sessions].sort((a, b) => {
      const timeA = a.completionDateTime ? new Date(a.completionDateTime).getTime() : 0;
      const timeB = b.completionDateTime ? new Date(b.completionDateTime).getTime() : 0;
      return timeB - timeA;
    });

    // Process breakdown items
    const breakdown = [
      {
        key: 'memoryMatch',
        name: t.breakdown.activities.memoryMatch,
        icon: SparkleIcon,
        count: breakdownMap.memoryMatch.count,
        accuracy:
          breakdownMap.memoryMatch.totalQuestions > 0
            ? Math.round(
                (breakdownMap.memoryMatch.totalCorrect /
                  breakdownMap.memoryMatch.totalQuestions) *
                  100
              )
            : null,
      },
      {
        key: 'fruitFocus',
        name: t.breakdown.activities.fruitFocus,
        icon: TargetFocusIcon,
        count: breakdownMap.fruitFocus.count,
        accuracy:
          breakdownMap.fruitFocus.totalQuestions > 0
            ? Math.round(
                (breakdownMap.fruitFocus.totalCorrect /
                  breakdownMap.fruitFocus.totalQuestions) *
                  100
              )
            : null,
      },
      {
        key: 'patternPath',
        name: t.breakdown.activities.patternPath,
        icon: WavesPatternIcon,
        count: breakdownMap.patternPath.count,
        accuracy:
          breakdownMap.patternPath.totalQuestions > 0
            ? Math.round(
                (breakdownMap.patternPath.totalCorrect /
                  breakdownMap.patternPath.totalQuestions) *
                  100
              )
            : null,
      },
      {
        key: 'dayInOrder',
        name: t.breakdown.activities.dayInOrder,
        icon: RoutineOrderIcon,
        count: breakdownMap.dayInOrder.count,
        accuracy:
          breakdownMap.dayInOrder.totalQuestions > 0
            ? Math.round(
                (breakdownMap.dayInOrder.totalCorrect /
                  breakdownMap.dayInOrder.totalQuestions) *
                  100
              )
            : null,
      },
    ];

    return {
      sessionsThisWeekCount: thisWeekCount,
      overallAccuracy: accuracyStr,
      avgResponseTimeFormatted: respTimeStr,
      dayCounts: dailyCounts,
      todayIndex: currentDayMonBased,
      sortedRecentSessions: sorted,
      activityBreakdown: breakdown,
    };
  }, [sessions, t]);

  // Insight message based on completed sessions this week
  const gentleInsightMessage = useMemo(() => {
    if (sessionsThisWeekCount >= 3) {
      return t.thisWeek.insightHigh;
    }
    if (sessionsThisWeekCount >= 1) {
      return t.thisWeek.insightLow;
    }
    return t.thisWeek.insightNone;
  }, [sessionsThisWeekCount, t]);

  // Max count for weekly bar chart scaling
  const maxDayCount = Math.max(1, ...dayCounts);

  // User initials for avatar
  const userInitials = useMemo(() => {
    if (!userName || typeof userName !== 'string') return 'AD';
    const trimmed = userName.trim();
    if (!trimmed) return 'AD';
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [userName]);

  // Handle navigation
  const handleNavClick = (navId) => {
    if (navId === 'signOut') {
      if (onSignOut) onSignOut();
      return;
    }
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  return (
    <div className="progress-layout" aria-label="MINDCARE Progress Dashboard">
      {/* ==========================================================================
          LEFT SIDEBAR (Consistent with HomePage & ActivitiesPage)
          ========================================================================== */}
      <aside className="progress-sidebar" aria-label="Main Navigation">
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
                  className="sidebar-nav-btn"
                  onClick={() => handleNavClick('activities')}
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
                  className="sidebar-nav-btn active"
                  onClick={() => handleNavClick('progress')}
                  aria-current="page"
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
          MAIN DASHBOARD CONTENT
          ========================================================================== */}
      <main className="progress-main-wrapper" id="progress-content">
        {/* Top Status Bar */}
        <header className="progress-top-bar" aria-label="System status">
          <div className="top-bar-left">
            <span className="network-status" aria-label={t.topBar.connected}>
              <CloudIcon size={18} color="#2A5C4F" />
              <span>{t.topBar.connected}</span>
            </span>
          </div>

          <div className="top-bar-right">
            <span className="online-badge">{t.topBar.online}</span>
            <button
              type="button"
              className="status-icon-btn"
              onClick={() => handleNavClick('settings')}
              aria-label={t.sidebar.settings}
            >
              <GearNavIcon size={20} color="#2A5C4F" />
            </button>
            <button
              type="button"
              className="user-avatar-btn"
              onClick={() => handleNavClick('settings')}
              aria-label={`User profile ${userName || 'Avatar'}`}
            >
              <span className="avatar-initials">{userInitials}</span>
            </button>
          </div>
        </header>

        <div className="progress-content-container">
          {/* Header Banner */}
          <section className="progress-header-section">
            <span className="progress-eyebrow">{t.eyebrow}</span>
            <h1 className="progress-page-title">{t.title}</h1>
            <p className="progress-subtitle">{t.subtitle}</p>
          </section>

          {/* ==========================================================================
              THREE SUMMARY METRIC CARDS
              ========================================================================== */}
          <section className="progress-metrics-grid" aria-label="Progress summary metrics">
            {/* 1. Sessions this week */}
            <div className="progress-metric-card metric-card-sessions">
              <div className="metric-number">{sessionsThisWeekCount}</div>
              <div className="metric-label">{t.summaryCards.sessionsThisWeek}</div>
            </div>

            {/* 2. Accuracy */}
            <div className="progress-metric-card metric-card-accuracy">
              <div className="metric-number">{overallAccuracy}</div>
              <div className="metric-label">{t.summaryCards.accuracy}</div>
            </div>

            {/* 3. Response time */}
            <div className="progress-metric-card metric-card-response">
              <div className="metric-number">{avgResponseTimeFormatted}</div>
              <div className="metric-label">{t.summaryCards.responseTime}</div>
            </div>
          </section>

          {/* ==========================================================================
              MIDDLE SECTION: RECENT SESSIONS & THIS WEEK
              ========================================================================== */}
          <section className="progress-middle-grid">
            {/* LEFT: Recent Sessions Card */}
            <div className="progress-card recent-sessions-card">
              <div className="card-header">
                <h2 className="card-title">{t.recentSessions.title}</h2>
                <div className="card-header-icon" aria-hidden="true">
                  <ClockOutlineIcon size={22} color="#D97A5E" />
                </div>
              </div>

              <div className="recent-sessions-list">
                {sortedRecentSessions.length > 0 ? (
                  sortedRecentSessions.slice(0, 10).map((session, idx) => {
                    const relativeDate = formatCompletionTime(session.completionDateTime, t);
                    const respTimeVal =
                      typeof session.averageResponseTime === 'number'
                        ? `${Math.round(session.averageResponseTime)}s`
                        : session.totalResponseTime
                        ? `${Math.round(session.totalResponseTime)}s`
                        : '—';
                    const accuracyVal =
                      typeof session.accuracy === 'number'
                        ? `${Math.round(session.accuracy)}%`
                        : '—';

                    return (
                      <div key={session.completionDateTime || idx} className="recent-session-item">
                        <div className="session-info">
                          <h3 className="session-activity-name">{session.activityName}</h3>
                          <div className="session-meta">
                            {relativeDate && <span>{relativeDate}</span>}
                            {relativeDate && <span className="meta-dot">·</span>}
                            <span>
                              {respTimeVal} {t.recentSessions.responseTimeSuffix}
                            </span>
                          </div>
                        </div>
                        <div className="session-accuracy-badge">{accuracyVal}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-sessions-state">
                    <p className="empty-title">{t.recentSessions.emptyTitle}</p>
                    <p className="empty-subtitle">{t.recentSessions.emptySub}</p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: This Week Card with Bar Chart */}
            <div className="progress-card this-week-card">
              <div className="card-header">
                <div className="card-title-group">
                  <ProgressNavIcon size={24} color="#183D36" />
                  <h2 className="card-title">{t.thisWeek.title}</h2>
                </div>
                <span className="chart-sublabel">{t.thisWeek.chartLabel}</span>
              </div>

              {/* Bar Chart */}
              <div className="weekly-chart-container" role="img" aria-label="Completed sessions this week">
                <div className="weekly-chart-bars">
                  {dayCounts.map((count, index) => {
                    const isToday = index === todayIndex;
                    // Proportional height scaling:
                    // Max height is ~140px. If count is 0, minimal 8px baseline.
                    const barHeight =
                      count > 0 ? Math.max(16, Math.round((count / maxDayCount) * 140)) : 8;

                    let barColorClass = 'bar-muted';
                    if (count > 0) {
                      if (isToday) {
                        barColorClass = 'bar-today';
                      } else if (index === 2 || index === 4) {
                        barColorClass = 'bar-primary';
                      } else {
                        barColorClass = 'bar-accent';
                      }
                    }

                    return (
                      <div key={index} className="weekly-bar-column">
                        <div className="bar-track">
                          <div
                            className={`bar-fill ${barColorClass}`}
                            style={{ height: `${barHeight}px` }}
                            title={`${t.thisWeek.days[index]}: ${count} ${t.breakdown.sessionPlural}`}
                          />
                        </div>
                        <span className={`day-label ${isToday ? 'label-today' : ''}`}>
                          {t.thisWeek.days[index]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gentle Insight Callout Box */}
              <div className="gentle-insight-box">
                <div className="insight-icon" aria-hidden="true">
                  <LightbulbIcon size={20} color="#D97A5E" />
                </div>
                <p className="insight-text">{gentleInsightMessage}</p>
              </div>
            </div>
          </section>

          {/* ==========================================================================
              ACTIVITY BREAKDOWN: "Your activities"
              ========================================================================== */}
          <section className="activity-breakdown-section" aria-label="Activity Breakdown">
            <div className="breakdown-header">
              <span className="breakdown-eyebrow">{t.breakdown.eyebrow}</span>
              <h2 className="breakdown-title">{t.breakdown.title}</h2>
            </div>

            <div className="breakdown-cards-grid">
              {activityBreakdown.map((act) => {
                const IconComponent = act.icon;
                const hasPlayed = act.count > 0;
                const sessionLabel =
                  act.count === 1
                    ? `${act.count} ${t.breakdown.sessionSingular}`
                    : `${act.count} ${t.breakdown.sessionPlural}`;

                return (
                  <div key={act.key} className="breakdown-card">
                    <div className="breakdown-card-top">
                      <div className="breakdown-icon-box" aria-hidden="true">
                        <IconComponent size={24} color="#183D36" />
                      </div>
                      {hasPlayed && (
                        <div className="breakdown-accuracy-pill">{act.accuracy}%</div>
                      )}
                    </div>

                    <div className="breakdown-card-content">
                      <h3 className="breakdown-activity-name">{act.name}</h3>
                      <div className="breakdown-stat">
                        {hasPlayed ? (
                          <span className="stat-active">
                            {sessionLabel} · {act.accuracy}%
                          </span>
                        ) : (
                          <span className="stat-unplayed">{t.breakdown.notPlayed}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
