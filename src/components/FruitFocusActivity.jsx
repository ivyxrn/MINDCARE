import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  ConcentricTargetIcon,
  ClockOutlineIcon,
  ArrowLeftIcon,
  CheckmarkLargeIcon,
  RoutineOrderIcon,
  TargetFocusIcon,
} from './Icons';
import './FruitFocusActivity.css';

const FRUIT_FOCUS_TRANSLATIONS = {
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
    leaveActivity: 'Leave activity',
    backToActivities: 'Back to activities',
    activityTitle: 'Fruit focus',
    questionCounter: (curr, total) => `Question ${curr} of ${total}`,
    feedback: {
      correctPrefix: "That's right!",
      incorrectPrefix: 'Not quite.',
      nextQuestion: 'Next question',
      finishActivity: 'Finish activity',
    },
    results: {
      eyebrow: 'NICE WORK',
      heading: 'You stayed with it.',
      subheading: 'Every small practice helps build a familiar rhythm.',
      accuracy: 'Accuracy',
      responseTime: 'response time',
      questionsCompleted: 'Questions completed',
      doneBtn: 'Done ✓',
      syncStatus: 'Sync completed.',
      aiSummaryTitle: 'Activity reflection',
      aiSummary: (correct, total) =>
        `You answered ${correct} of ${total} questions correctly today. You stayed focused and took your time.`,
    },
    questions: [
      {
        id: 1,
        prompt: 'Which fruit is usually yellow when ripe?',
        choices: ['Banana', 'Apple', 'Blueberry'],
        correctAnswer: 'Banana',
        correctExplanation: "That's right! A banana is typically yellow when ripe.",
        incorrectExplanation: 'Not quite. A banana is usually yellow when ripe, while apples are typically red or green and blueberries are blue.',
      },
      {
        id: 2,
        prompt: 'Which fruit is usually small and grows in bunches?',
        choices: ['Grapes', 'Mango', 'Watermelon'],
        correctAnswer: 'Grapes',
        correctExplanation: "That's right! Grapes are small and grow together in bunches.",
        incorrectExplanation: 'Not quite. Grapes grow in clusters and bunches, while mangoes and watermelons grow individually.',
      },
      {
        id: 3,
        prompt: 'Which fruit has a thick rind and is usually cut into slices?',
        choices: ['Watermelon', 'Orange', 'Strawberry'],
        correctAnswer: 'Watermelon',
        correctExplanation: "That's right! A watermelon has a thick outer rind and is traditionally cut into slices.",
        incorrectExplanation: 'Not quite. A watermelon has a large thick rind and is usually sliced, unlike strawberries which have no rind.',
      },
    ],
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
    leaveActivity: 'गतिविधि छोड़ें',
    backToActivities: 'गतिविधियों पर वापस जाएं',
    activityTitle: 'फ्रूट फोकस',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    feedback: {
      correctPrefix: 'बिल्कुल सही!',
      incorrectPrefix: 'कोई बात नहीं।',
      nextQuestion: 'अगला प्रश्न',
      finishActivity: 'गतिविधि समाप्त करें',
    },
    results: {
      eyebrow: 'बहुत बढ़िया',
      heading: 'आपने पूरा ध्यान दिया।',
      subheading: 'हर छोटा अभ्यास एक सहज लय बनाने में मदद करता है।',
      accuracy: 'सटीकता',
      responseTime: 'प्रतिक्रिया समय',
      questionsCompleted: 'पूर्ण किए गए प्रश्न',
      doneBtn: 'पूर्ण ✓',
      syncStatus: 'सिंक पूर्ण हुआ।',
      aiSummaryTitle: 'सत्र सारांश',
      aiSummary: (correct, total) =>
        `आपने आज ${total} में से ${correct} प्रश्नों के सही उत्तर दिए। आपने पूरा ध्यान दिया।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'पकने पर कौन सा फल आमतौर पर पीला होता है?',
        choices: ['केला', 'सेब', 'ब्लूबेरी'],
        correctAnswer: 'केला',
        correctExplanation: 'बिल्कुल सही! केला पकने पर आमतौर पर पीला होता है।',
        incorrectExplanation: 'कोई बात नहीं। केला पकने पर पीला होता है, जबकि सेब लाल या हरे और ब्लूबेरी नीले होते हैं।',
      },
      {
        id: 2,
        prompt: 'कौन सा फल आमतौर पर छोटा होता है और गुच्छों में उगता है?',
        choices: ['अंगूर', 'आम', 'तरबूज'],
        correctAnswer: 'अंगूर',
        correctExplanation: 'बिल्कुल सही! अंगूर छोटे होते हैं और गुच्छों में उगते हैं।',
        incorrectExplanation: 'कोई बात नहीं। अंगूर गुच्छों में उगते हैं, जबकि आम और तरबूज अलग-अलग उगते हैं।',
      },
      {
        id: 3,
        prompt: 'किस फल का छिलका मोटा होता है और उसे आमतौर पर फांकों में काटा जाता है?',
        choices: ['तरबूज', 'संतरा', 'स्ट्रॉबेरी'],
        correctAnswer: 'तरबूज',
        correctExplanation: 'बिल्कुल सही! तरबूज का छिलका मोटा होता है और उसे फांकों में काटा जाता है।',
        incorrectExplanation: 'कोई बात नहीं। तरबूज का छिलका बहुत मोटा होता है और उसे टुकड़ों में काटा जाता है।',
      },
    ],
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
    leaveActivity: 'কাৰ্যকলাপ ত্যাগ কৰক',
    backToActivities: 'কাৰ্যকলাপলৈ উভতি যাওক',
    activityTitle: 'ফলৰ মনোযোগ',
    questionCounter: (curr, total) => `প্ৰশ্ন ${curr} / ${total}`,
    feedback: {
      correctPrefix: 'একেবাৰে সঠিক!',
      incorrectPrefix: 'কোনো কথা নাই।',
      nextQuestion: 'পৰৱৰ্তী প্ৰশ্ন',
      finishActivity: 'কাৰ্যকলাপ সমাপ্ত কৰক',
    },
    results: {
      eyebrow: 'বঢ়িয়া কাম',
      heading: 'আপুনি মনোযোগেৰে সম্পূৰ্ণ কৰিলে।',
      subheading: 'প্ৰতিটো সৰু অভ্যাসে এক সহজ ছন্দ গঢ়াত সহায় কৰে।',
      accuracy: 'সঠিকতা',
      responseTime: 'প্ৰতিক্ৰিয়াৰ সময়',
      questionsCompleted: 'সম্পূৰ্ণ প্ৰশ্ন',
      doneBtn: 'সম্পূৰ্ণ ✓',
      syncStatus: 'সংমিশ্ৰণ সম্পূৰ্ণ।',
      aiSummaryTitle: 'সত্ৰৰ পৰ্যবেক্ষণ',
      aiSummary: (correct, total) =>
        `আপুনি আজি ${total} টাৰ ভিতৰত ${correct} টা প্ৰশ্নৰ সঠিক উত্তৰ দিলে। আপুনি মনোযোগেৰে সময় ললে।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'পকিলে সাধাৰণতে কোনটো ফল হালধীয়া হয়?',
        choices: ['কল', 'আপেল', 'ব্লুবেৰী'],
        correctAnswer: 'কল',
        correctExplanation: 'একেবাৰে সঠিক! কল পকিলে সাধাৰণতে হালধীয়া ৰঙৰ হয়।',
        incorrectExplanation: 'কোনো কথা নাই। কল সাধাৰণতে পকিলে হালধীয়া হয়।',
      },
      {
        id: 2,
        prompt: 'কোনটো ফল সাধাৰণতে সৰু আৰু থোপাত লাগে?',
        choices: ['আঙুৰ', 'আম', 'তৰমুজ'],
        correctAnswer: 'আঙুৰ',
        correctExplanation: 'একেবাৰে সঠিক! আঙুৰ সৰু আৰু থোপাত লাগে।',
        incorrectExplanation: 'কোনো কথা নাই। আঙুৰহে থোপাত লাগে।',
      },
      {
        id: 3,
        prompt: 'কোনটো ফলৰ বাকলি ডাঠ আৰু সাধাৰণতে ফালি টুকুৰা কৰি খোৱা হয়?',
        choices: ['তৰমুজ', 'কমলা', 'ষ্ট্ৰবেৰী'],
        correctAnswer: 'তৰমুজ',
        correctExplanation: 'একেবাৰে সঠিক! তৰমুজৰ বাকলি ডাঠ আৰু ইয়াক ফালি খোৱা হয়।',
        incorrectExplanation: 'কোনো কথা নাই। তৰমুজৰ ডাঠ বাকলি থাকে আৰু ইয়াক কাটি খোৱা হয়।',
      },
    ],
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
    leaveActivity: 'गतिविधि छोड्नुहोस्',
    backToActivities: 'गतिविधिहरूमा फर्कनुहोस्',
    activityTitle: 'फलफूल ध्यान',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    feedback: {
      correctPrefix: 'एकदम सही!',
      incorrectPrefix: 'केही छैन।',
      nextQuestion: 'अर्को प्रश्न',
      finishActivity: 'गतिविधि समाप्त गर्नुहोस्',
    },
    results: {
      eyebrow: 'उत्कृष्ट कार्य',
      heading: 'तपाईंले पूरा ध्यान दिनुभयो।',
      subheading: 'प्रत्येक सानो अभ्यासले एक सहज लय निर्माण गर्न मद्दत गर्दछ।',
      accuracy: 'सटीकता',
      responseTime: 'प्रतिक्रिया समय',
      questionsCompleted: 'पूरा भएका प्रश्नहरू',
      doneBtn: 'सम्पन्न ✓',
      syncStatus: 'सिङ्क सम्पन्न भयो।',
      aiSummaryTitle: 'सत्र सारांश',
      aiSummary: (correct, total) =>
        `तपाईंले आज ${total} मध्ये ${correct} प्रश्नहरूको सही उत्तर दिनुभयो। तपाईं केन्द्रित रहनुभयो।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'पाकेपछि सामान्यतया कुन फल पहेँलो हुन्छ?',
        choices: ['केरा', 'स्याउ', 'ब्लुबेरी'],
        correctAnswer: 'केरा',
        correctExplanation: 'एकदम सही! केरा पाकेपछि सामान्यतया पहेँलो हुन्छ।',
        incorrectExplanation: 'केही छैन। केरा पाकेपछि पहेँलो हुन्छ।',
      },
      {
        id: 2,
        prompt: 'कुन फल सामान्यतया सानो हुन्छ र झुप्पामा फल्छ?',
        choices: ['अङ्गुर', 'आँप', 'खर्बुजा'],
        correctAnswer: 'अङ्गुर',
        correctExplanation: 'एकदम सही! अङ्गुर सानो हुन्छ र झुप्पामा फल्छ।',
        incorrectExplanation: 'केही छैन। अङ्गुर झुप्पामा फल्ने सानो फल हो।',
      },
      {
        id: 3,
        prompt: 'कुन फलको बोक्रा बाक्लो हुन्छ र सामान्यतया टुक्रा पारेर खाइन्छ?',
        choices: ['खर्बुजा', 'सुन्तला', 'स्ट्रबेरी'],
        correctAnswer: 'खर्बुजा',
        correctExplanation: 'एकदम सही! खर्बुजाको बोक्रा बाक्लो हुन्छ र टुक्रा पारेर खाइन्छ।',
        incorrectExplanation: 'केही छैन। खर्बुजाको बाक्लो बोक्रा हुन्छ र यसलाई चिरेर खाइन्छ।',
      },
    ],
  },
};

// Helper: Generate Avatar Initials
const getInitials = (fullName) => {
  if (!fullName || !fullName.trim()) return 'AD';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper: Shuffle choices randomly
const shuffleChoices = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const FruitFocusActivity = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onLeave,
  onFinish,
  onSignOut,
  onNavigate,
  onComplete,
}) => {
  const t = FRUIT_FOCUS_TRANSLATIONS[selectedLang] || FRUIT_FOCUS_TRANSLATIONS.en;
  const userInitials = getInitials(userName);
  const totalQuestions = t.questions.length;

  // Activity progression states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Response time and telemetry tracking
  const [questionResults, setQuestionResults] = useState([]);
  const questionStartTimeRef = useRef(null);

  const currentQ = t.questions[currentQuestionIdx];

  // Start question timer whenever question index changes
  useEffect(() => {
    if (isFinished) return;
    questionStartTimeRef.current = typeof performance !== 'undefined' ? performance.now() : 0;
  }, [currentQuestionIdx, isFinished]);

  // Randomize answer positions whenever question choices change
  const randomizedChoices = useMemo(() => {
    if (!currentQ || !currentQ.choices) return [];
    return shuffleChoices(currentQ.choices);
  }, [currentQ]);

  // Option Selection Handler
  const handleSelectChoice = useCallback(
    (choice) => {
      if (isAnswerLocked) return;

      const answerTime = typeof performance !== 'undefined' ? performance.now() : 0;
      const startTime = questionStartTimeRef.current || answerTime;
      const elapsedMs = Math.max(0, answerTime - startTime);
      const responseTimeSec = Math.round((elapsedMs / 1000) * 10) / 10 || 2.5;

      const isCorrect = choice === currentQ.correctAnswer;
      setSelectedAnswer(choice);
      setIsAnswerLocked(true);

      const resultItem = {
        questionNumber: currentQuestionIdx + 1,
        selectedAnswer: choice,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        responseTime: responseTimeSec,
      };

      setQuestionResults((prev) => [...prev, resultItem]);
    },
    [isAnswerLocked, currentQ, currentQuestionIdx]
  );

  // Next Question or Finish Action
  const handleProceed = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
    } else {
      // Finalize Activity
      const completedResults = questionResults;
      const correctCount = completedResults.filter((r) => r.isCorrect).length;
      const accuracyPct = Math.round((correctCount / totalQuestions) * 100);
      const avgResponse =
        completedResults.length > 0
          ? Math.round(
              (completedResults.reduce((sum, r) => sum + r.responseTime, 0) /
                completedResults.length) *
                10
            ) / 10
          : 4.0;
      const totalResponse =
        Math.round(
          completedResults.reduce((sum, r) => sum + r.responseTime, 0) * 10
        ) / 10;

      const finalActivityData = {
        activityName: 'Fruit Focus',
        completionDateTime: new Date().toISOString(),
        questionsCompleted: totalQuestions,
        correctAnswers: correctCount,
        accuracy: accuracyPct,
        averageResponseTime: avgResponse,
        totalResponseTime: totalResponse,
        questionResults: completedResults,
      };

      if (onComplete) {
        onComplete(finalActivityData);
      }

      setIsFinished(true);
    }
  };

  // Sidebar navigation handler
  const handleNavClick = (navId) => {
    if (navId === 'signOut') {
      if (onSignOut) onSignOut();
      return;
    }
    if (navId === 'activities') {
      if (onLeave) onLeave();
      return;
    }
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  // Progress percentage (33%, 67%, 100%)
  const progressPercent = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  // Final summary statistics
  const totalCorrect = questionResults.filter((r) => r.isCorrect).length;
  const accuracy = Math.round((totalCorrect / totalQuestions) * 100) || 0;
  const avgResponseTime =
    questionResults.length > 0
      ? Math.round(
          (questionResults.reduce((acc, r) => acc + r.responseTime, 0) /
            questionResults.length) *
            10
        ) / 10
      : 4;

  return (
    <div className="fruit-focus-layout" aria-label="MINDCARE Fruit Focus Activity">
      {/* ==========================================================================
          LEFT SIDEBAR (Consistent with MINDCARE Shell)
          ========================================================================== */}
      <aside className="fruit-focus-sidebar" aria-label="Main Navigation">
        <div className="sidebar-top">
          {/* Logo & Brand */}
          <div className="sidebar-brand">
            <LeafLogo size={38} bgColor="#F5E8D8" />
            <span className="sidebar-brand-title">MINDCARE</span>
          </div>

          {/* Navigation Links */}
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
          MAIN ACTIVITY CONTENT AREA
          ========================================================================== */}
      <div className="fruit-focus-main-wrapper">
        {/* Top Status Bar */}
        <header className="fruit-focus-top-bar">
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

        {/* Activity Content Body */}
        <main className="fruit-focus-content-body">
          {!isFinished ? (
            /* ======================================================================
               ACTIVE QUESTION VIEW
               ====================================================================== */
            <div className="fruit-focus-inner-container">
              {/* Back / Leave Activity Link */}
              <div className="fruit-focus-header-top">
                <button
                  type="button"
                  className="fruit-focus-back-link"
                  onClick={onLeave}
                  aria-label={t.leaveActivity}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{t.leaveActivity}</span>
                </button>
              </div>

              {/* Title Row (NO Level Pill) */}
              <div className="fruit-focus-title-row">
                <p className="fruit-focus-question-counter">
                  {t.questionCounter(currentQuestionIdx + 1, totalQuestions)}
                </p>
                <h1 className="fruit-focus-main-title">{t.activityTitle}</h1>
              </div>

              {/* Horizontal Progress Bar */}
              <div
                className="fruit-focus-progress-track"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="fruit-focus-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Central Card Container */}
              <div className="fruit-focus-card-container">
                {/* Central Concentric Focus Target Badge */}
                <div className="fruit-focus-target-badge" aria-hidden="true">
                  <TargetFocusIcon size={38} color="#183D36" />
                </div>

                {/* Question Heading */}
                <h2 className="fruit-focus-question-text">{currentQ.prompt}</h2>

                {/* Answer Choice Cards (A, B, C) */}
                <div
                  className="answer-choices-list"
                  role="radiogroup"
                  aria-label={currentQ.prompt}
                >
                  {randomizedChoices.map((choice, index) => {
                    const letterLabel = String.fromCharCode(65 + index); // A, B, C
                    const isSelected = selectedAnswer === choice;
                    const isCorrectAnswer = choice === currentQ.correctAnswer;

                    let choiceClass = 'answer-choice-card';
                    if (isSelected) {
                      choiceClass += isCorrectAnswer
                        ? ' selected-correct'
                        : ' selected-incorrect';
                    } else if (isAnswerLocked) {
                      choiceClass += ' locked-unselected';
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        className={choiceClass}
                        onClick={() => handleSelectChoice(choice)}
                        disabled={isAnswerLocked}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Option ${letterLabel}: ${choice}`}
                      >
                        <span className="choice-letter-badge">{letterLabel}</span>
                        <span className="choice-text">{choice}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Banner on Answer Submission */}
                {isAnswerLocked && (
                  <div
                    className={`feedback-panel ${
                      selectedAnswer === currentQ.correctAnswer ? 'correct' : 'incorrect'
                    }`}
                    role="alert"
                  >
                    <div className="feedback-message">
                      <span className="feedback-icon" aria-hidden="true">
                        ✓
                      </span>
                      <span>
                        {selectedAnswer === currentQ.correctAnswer
                          ? currentQ.correctExplanation
                          : currentQ.incorrectExplanation}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-next-question"
                      onClick={handleProceed}
                    >
                      <span>
                        {currentQuestionIdx < totalQuestions - 1
                          ? t.feedback.nextQuestion
                          : t.feedback.finishActivity}
                      </span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ======================================================================
               FINAL RESULTS VIEW (Matching MINDCARE Activity Results Design)
               ====================================================================== */
            <div className="results-inner-container" aria-label="Fruit focus results">
              {/* Back to activities breadcrumb */}
              <div className="results-header-top">
                <button
                  type="button"
                  className="activity-back-link"
                  onClick={onFinish || onLeave}
                  aria-label={t.backToActivities}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{t.backToActivities}</span>
                </button>
              </div>

              {/* Main Green Results Card */}
              <div className="results-main-card">
                {/* Top Success Badge */}
                <div className="results-badge-circle" aria-hidden="true">
                  <CheckmarkLargeIcon size={34} color="#183D36" />
                </div>

                {/* Eyebrow & Headline */}
                <p className="results-eyebrow">{t.results.eyebrow}</p>
                <h1 className="results-headline">{t.results.heading}</h1>
                <p className="results-subheading">{t.results.subheading}</p>

                {/* 3 Statistics Cards (NO Level Card) */}
                <div className="fruit-focus-stats-grid">
                  {/* Stat 1: Accuracy */}
                  <div className="results-stat-box">
                    <div className="stat-box-row">
                      <span className="stat-big-value">{accuracy}%</span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <ConcentricTargetIcon size={22} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-box-label">{t.results.accuracy}</span>
                  </div>

                  {/* Stat 2: Response Time */}
                  <div className="results-stat-box">
                    <div className="stat-box-row">
                      <span className="stat-big-value">{avgResponseTime}s</span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <ClockOutlineIcon size={22} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-box-label">{t.results.responseTime}</span>
                  </div>

                  {/* Stat 3: Questions Completed */}
                  <div className="results-stat-box">
                    <div className="stat-box-row">
                      <span className="stat-big-value">
                        {totalQuestions}/{totalQuestions}
                      </span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <RoutineOrderIcon size={22} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-box-label">{t.results.questionsCompleted}</span>
                  </div>
                </div>

                {/* Future AI Summary Reflection Placeholder Box */}
                <div className="results-ai-reflection-box" role="note">
                  <p className="ai-reflection-text">
                    💡 {t.results.aiSummary(totalCorrect, totalQuestions)}
                  </p>
                </div>

                {/* Primary Done Action Button */}
                <button
                  type="button"
                  className="results-done-btn"
                  onClick={onFinish || onLeave}
                >
                  <span>{t.results.doneBtn}</span>
                </button>

                {/* Sync status footer */}
                <div className="results-sync-status" aria-label="Session sync status">
                  <CloudIcon size={16} color="#4D645C" />
                  <span>{t.results.syncStatus}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FruitFocusActivity;
