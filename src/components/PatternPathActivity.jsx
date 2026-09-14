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
  WavesPatternIcon,
} from './Icons';
import './PatternPathActivity.css';

const PATTERN_PATH_TRANSLATIONS = {
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
    activityTitle: 'Pattern path',
    levelPill: 'level: Gentle',
    questionCounter: (curr, total) => `Question ${curr} of ${total}`,
    feedback: {
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
        `You answered ${correct} of ${total} questions correctly today. You stayed focused and found the patterns.`,
    },
    questions: [
      {
        id: 1,
        prompt: 'What comes next in the sequence?',
        sequence: '2 → 4 → 6 → ?',
        choices: [7, 8, 10],
        correctAnswer: 8,
        correctExplanation: "That's right! The numbers increase by 2: 2, 4, 6, 8.",
        incorrectExplanation: 'Not quite — the numbers increase by 2: 2, 4, 6, 8.',
      },
      {
        id: 2,
        prompt: 'What number completes this pattern?',
        sequence: '10 → 12 → 14 → ?',
        choices: [12, 16, 18],
        correctAnswer: 16,
        correctExplanation: "That's right! Adding 2 to 14 gives 16.",
        incorrectExplanation: 'Not quite — adding 2 to 14 gives 16.',
      },
      {
        id: 3,
        prompt: 'Which number comes next?',
        sequence: '3 → 6 → 9 → ?',
        choices: [10, 12, 15],
        correctAnswer: 12,
        correctExplanation: "That's right! The numbers increase by 3: 3, 6, 9, 12.",
        incorrectExplanation: 'Not quite — the numbers increase by 3: 3, 6, 9, 12.',
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
    activityTitle: 'पैटर्न पाथ',
    levelPill: 'level: Gentle',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    feedback: {
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
        `आपने आज ${total} में से ${correct} प्रश्नों के सही उत्तर दिए। आपने पूरा ध्यान दिया और पैटर्न पहचाने।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'क्रम में अगला क्या आता है?',
        sequence: '2 → 4 → 6 → ?',
        choices: [7, 8, 10],
        correctAnswer: 8,
        correctExplanation: 'बिल्कुल सही! संख्याएँ 2 से बढ़ती हैं: 2, 4, 6, 8.',
        incorrectExplanation: 'कोई बात नहीं — संख्याएँ 2 से बढ़ती हैं: 2, 4, 6, 8.',
      },
      {
        id: 2,
        prompt: 'कौन सी संख्या इस पैटर्न को पूरा करती है?',
        sequence: '10 → 12 → 14 → ?',
        choices: [12, 16, 18],
        correctAnswer: 16,
        correctExplanation: 'बिल्कुल सही! 14 में 2 जोड़ने पर 16 मिलता है.',
        incorrectExplanation: 'कोई बात नहीं — 14 में 2 जोड़ने पर 16 मिलता है.',
      },
      {
        id: 3,
        prompt: 'अगली संख्या कौन सी आती है?',
        sequence: '3 → 6 → 9 → ?',
        choices: [10, 12, 15],
        correctAnswer: 12,
        correctExplanation: 'बिल्कुल सही! संख्याएँ 3 से बढ़ती हैं: 3, 6, 9, 12.',
        incorrectExplanation: 'कोई बात नहीं — संख्याएँ 3 से बढ़ती हैं: 3, 6, 9, 12.',
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
    activityTitle: 'প্যাটাৰ্ন পথ',
    levelPill: 'level: Gentle',
    questionCounter: (curr, total) => `প্ৰশ্ন ${curr} / ${total}`,
    feedback: {
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
        `আপুনি আজি ${total} টাৰ ভিতৰত ${correct} টা প্ৰশ্নৰ সঠিক উত্তৰ দিলে। আপুনি সঠিকভাৱে আৰ্হি চিনি পালে।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'ক্ৰমত পৰৱৰ্তী কি আহে?',
        sequence: '2 → 4 → 6 → ?',
        choices: [7, 8, 10],
        correctAnswer: 8,
        correctExplanation: 'একেবাৰে সঠিক! সংখ্যাবোৰ ২ কৈ বাঢ়িছে: ২, ৪, ৬, ৮।',
        incorrectExplanation: 'কোনো কথা নাই — সংখ্যাবোৰ ২ কৈ বাঢ়িছে: ২, ৪, ৬, ৮।',
      },
      {
        id: 2,
        prompt: 'কোনটো সংখ্যাই এই আৰ্হি সম্পূৰ্ণ কৰে?',
        sequence: '10 → 12 → 14 → ?',
        choices: [12, 16, 18],
        correctAnswer: 16,
        correctExplanation: 'একেবাৰে সঠিক! ১৪ ৰ সৈতে ২ যোগ কৰিলে ১৬ হয়।',
        incorrectExplanation: 'কোনো কথা নাই — ১৪ ৰ সৈতে ২ যোগ কৰিলে ১৬ হয়।',
      },
      {
        id: 3,
        prompt: 'পৰৱৰ্তী সংখ্যাটো কি?',
        sequence: '3 → 6 → 9 → ?',
        choices: [10, 12, 15],
        correctAnswer: 12,
        correctExplanation: 'একেবাৰে সঠিক! সংখ্যাবোৰ ৩ কৈ বাঢ়িছে: ৩, ৬, ৯, ১২।',
        incorrectExplanation: 'কোনো কথা নাই — সংখ্যাবোৰ ৩ কৈ বাঢ়িছে: ৩, ৬, ৯, ১২।',
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
    activityTitle: 'ढाँचा मार्ग',
    levelPill: 'level: Gentle',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    feedback: {
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
        `तपाईंले आज ${total} मध्ये ${correct} प्रश्नहरूको सही उत्तर दिनुभयो। तपाईं केन्द्रित रहनुभयो र ढाँचा चिन्नुभयो।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'अनुक्रममा अर्को के आउँछ?',
        sequence: '2 → 4 → 6 → ?',
        choices: [7, 8, 10],
        correctAnswer: 8,
        correctExplanation: 'एकदम सही! संख्याहरू २ ले बढ्छन्: २, ४, ६, ८।',
        incorrectExplanation: 'केही छैन — संख्याहरू २ ले बढ्छन्: २, ४, ६, ८।',
      },
      {
        id: 2,
        prompt: 'कुन संख्याले यो ढाँचा पूरा गर्छ?',
        sequence: '10 → 12 → 14 → ?',
        choices: [12, 16, 18],
        correctAnswer: 16,
        correctExplanation: 'एकदम सही! १४ मा २ जोड्दा १६ हुन्छ।',
        incorrectExplanation: 'केही छैन — १४ मा २ जोड्दा १६ हुन्छ।',
      },
      {
        id: 3,
        prompt: 'अर्को संख्या कुन आउँछ?',
        sequence: '3 → 6 → 9 → ?',
        choices: [10, 12, 15],
        correctAnswer: 12,
        correctExplanation: 'एकदम सही! संख्याहरू ३ ले बढ्छन्: ३, ६, ९, १२।',
        incorrectExplanation: 'केही छैन — संख्याहरू ३ ले बढ्छन्: ३, ६, ९, १२।',
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

export const PatternPathActivity = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onLeave,
  onFinish,
  onSignOut,
  onNavigate,
  onComplete,
}) => {
  const t = PATTERN_PATH_TRANSLATIONS[selectedLang] || PATTERN_PATH_TRANSLATIONS.en;
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

  // Randomize answer positions whenever question changes
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
      const responseTimeSec = Math.round((elapsedMs / 1000) * 10) / 10 || 2.4;

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
          : 3.5;
      const totalResponse =
        Math.round(
          completedResults.reduce((sum, r) => sum + r.responseTime, 0) * 10
        ) / 10;

      const finalActivityData = {
        activityName: 'Pattern Path',
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
      : 3.5;

  return (
    <div className="pattern-path-layout" aria-label="MINDCARE Pattern Path Activity">
      {/* ==========================================================================
          LEFT SIDEBAR (Consistent with MINDCARE Shell)
          ========================================================================== */}
      <aside className="pattern-path-sidebar" aria-label="Main Navigation">
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
      <div className="pattern-path-main-wrapper">
        {/* Top Status Bar */}
        <header className="pattern-path-top-bar">
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
        <main className="pattern-path-content-body">
          {!isFinished ? (
            /* ======================================================================
               ACTIVE QUESTION VIEW
               ====================================================================== */
            <div className="pattern-path-inner-container">
              {/* Back / Leave Activity Link */}
              <div className="pattern-path-header-top">
                <button
                  type="button"
                  className="pattern-path-back-link"
                  onClick={onLeave}
                  aria-label={t.leaveActivity}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{t.leaveActivity}</span>
                </button>
              </div>

              {/* Title Row with "level: Gentle" Pill */}
              <div className="pattern-path-title-row">
                <div className="pattern-path-title-left">
                  <p className="pattern-path-question-counter">
                    {t.questionCounter(currentQuestionIdx + 1, totalQuestions)}
                  </p>
                  <h1 className="pattern-path-main-title">{t.activityTitle}</h1>
                </div>

                <div className="pattern-path-level-pill" role="status" aria-label={t.levelPill}>
                  <span>{t.levelPill}</span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div
                className="pattern-path-progress-track"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="pattern-path-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Central Card Container */}
              <div className="pattern-path-card-container">
                {/* Pattern Path Icon in Pale Green Circular Area */}
                <div className="pattern-path-badge-circle" aria-hidden="true">
                  <WavesPatternIcon size={34} color="#183D36" />
                </div>

                {/* Question Heading */}
                <h2 className="pattern-path-question-text">{currentQ.prompt}</h2>

                {/* Prominent Sequence Box (Pale Yellow Rounded Rectangle) */}
                <div className="pattern-path-sequence-box" aria-label={`Sequence: ${currentQ.sequence}`}>
                  <span className="sequence-text">{currentQ.sequence}</span>
                </div>

                {/* Answer Choice Buttons (A, B, C) */}
                <div
                  className="pattern-path-choices-list"
                  role="radiogroup"
                  aria-label={currentQ.prompt}
                >
                  {randomizedChoices.map((choice, index) => {
                    const letterLabel = String.fromCharCode(65 + index); // A, B, C
                    const isSelected = selectedAnswer === choice;
                    const isCorrectAnswer = choice === currentQ.correctAnswer;

                    let choiceClass = 'pattern-path-choice-btn';
                    if (isSelected) {
                      choiceClass += isCorrectAnswer
                        ? ' selected-correct'
                        : ' selected-incorrect';
                    } else if (isAnswerLocked) {
                      choiceClass += ' locked-unselected';
                    }

                    return (
                      <button
                        key={choice}
                        type="button"
                        className={choiceClass}
                        onClick={() => handleSelectChoice(choice)}
                        disabled={isAnswerLocked}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Option ${letterLabel}: ${choice}`}
                      >
                        <span className="choice-badge">{letterLabel}</span>
                        <span className="choice-number">{choice}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel on Answer Submission */}
                {isAnswerLocked && (
                  <div
                    className={`pattern-path-feedback-panel ${
                      selectedAnswer === currentQ.correctAnswer ? 'feedback-correct' : 'feedback-incorrect'
                    }`}
                    role="alert"
                  >
                    <div className="feedback-content">
                      <span className="feedback-icon-wrap" aria-hidden="true">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m8 12 2.5 2.5L16 9" />
                        </svg>
                      </span>
                      <span className="feedback-text">
                        {selectedAnswer === currentQ.correctAnswer
                          ? currentQ.correctExplanation
                          : currentQ.incorrectExplanation}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-feedback-action"
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
            <div className="results-inner-container" aria-label="Pattern path results">
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
                <div className="pattern-path-stats-grid">
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
                      <span className="stat-big-value">{totalQuestions}/{totalQuestions}</span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <RoutineOrderIcon size={22} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-box-label">{t.results.questionsCompleted}</span>
                  </div>
                </div>

                {/* AI Reflection Reflection Box */}
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

export default PatternPathActivity;
