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
} from './Icons';
import './DayInOrderActivity.css';

const DAY_IN_ORDER_TRANSLATIONS = {
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
    activityTitle: 'A day in order',
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
        `You answered ${correct} of ${total} questions correctly today. You connected with familiar daily routines.`,
    },
    questions: [
      {
        id: 1,
        prompt: 'What would you usually do after waking up?',
        choices: ['Have breakfast', 'Go to bed', 'Have dinner'],
        correctAnswer: 'Have breakfast',
        correctExplanation: "That's right! Having breakfast is usually part of the morning after waking up.",
        incorrectExplanation: 'Not quite. Having breakfast is usually part of the morning after waking up.',
      },
      {
        id: 2,
        prompt: 'What would you usually do after getting dressed for the day?',
        choices: ['Go to sleep', 'Have breakfast', 'Have dinner'],
        correctAnswer: 'Have breakfast',
        correctExplanation: "That's right! After getting ready for the day, breakfast often comes next.",
        incorrectExplanation: 'Not quite. Breakfast usually comes after getting ready for the day.',
      },
      {
        id: 3,
        prompt: 'What usually comes after dinner?',
        choices: ['Wake up', 'Have breakfast', 'Get ready for bed'],
        correctAnswer: 'Get ready for bed',
        correctExplanation: "That's right! Getting ready for bed usually comes after dinner.",
        incorrectExplanation: 'Not quite. Getting ready for bed usually comes after dinner.',
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
    activityTitle: 'दिनचर्या का क्रम',
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
        `आपने आज ${total} में से ${correct} प्रश्नों के सही उत्तर दिए। आपने परिचित दिनचर्या को सही क्रम में रखा।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'सोकर उठने के बाद आप आमतौर पर क्या करेंगे?',
        choices: ['नाश्ता करना', 'सोने जाना', 'रात का खाना खाना'],
        correctAnswer: 'नाश्ता करना',
        correctExplanation: 'बिल्कुल सही! सोकर उठने के बाद नाश्ता करना आमतौर पर सुबह की दिनचर्या का हिस्सा होता है।',
        incorrectExplanation: 'कोई बात नहीं। सोकर उठने के बाद नाश्ता करना आमतौर पर सुबह की दिनचर्या का हिस्सा होता है।',
      },
      {
        id: 2,
        prompt: 'दिन के लिए तैयार होने के बाद आप आमतौर पर क्या करेंगे?',
        choices: ['सोने जाना', 'नाश्ता करना', 'रात का खाना खाना'],
        correctAnswer: 'नाश्ता करना',
        correctExplanation: 'बिल्कुल सही! दिन के लिए तैयार होने के बाद अक्सर अगला काम नाश्ता करना होता है।',
        incorrectExplanation: 'कोई बात नहीं। दिन के लिए तैयार होने के बाद आमतौर पर नाश्ता किया जाता है।',
      },
      {
        id: 3,
        prompt: 'रात के खाने के बाद आमतौर पर क्या आता है?',
        choices: ['जागना', 'नाश्ता करना', 'सोने की तैयारी करना'],
        correctAnswer: 'सोने की तैयारी करना',
        correctExplanation: 'बिल्कुल सही! रात के खाने के बाद आमतौर पर सोने की तैयारी की जाती है।',
        incorrectExplanation: 'कोई बात नहीं। रात के खाने के बाद आमतौर पर सोने की तैयारी की जाती है।',
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
    activityTitle: 'দিনটোৰ ক্ৰম',
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
        `আপুনি আজি ${total} টাৰ ভিতৰত ${correct} টা প্ৰশ্নৰ সঠিক উত্তৰ দিলে। আপুনি দৈনন্দিন অভ্যাস সঠিকভাৱে সজালে।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'টোপনিৰ পৰা উঠাৰ পিছত আপুনি সাধাৰণতে কি কৰিব?',
        choices: ['ৰাতিপুৱাৰ জলপান খোৱা', 'শুবলৈ যোৱা', 'ৰাতিৰ আহাৰ খোৱা'],
        correctAnswer: 'ৰাতিপুৱাৰ জলপান খোৱা',
        correctExplanation: 'একেবাৰে সঠিক! টোপনিৰ পৰা উঠাৰ পিছত জলপান খোৱাটো সাধাৰণতে ৰাতিপুৱাৰ ভাগৰ কাম।',
        incorrectExplanation: 'কোনো কথা নাই। টোপনিৰ পৰা উঠাৰ পিছত সাধাৰণতে জলপান খোৱা হয়।',
      },
      {
        id: 2,
        prompt: 'দিনটোৰ বাবে সাজু হোৱাৰ পিছত আপুনি সাধাৰণতে কি কৰিব?',
        choices: ['শুবলৈ যোৱা', 'ৰাতিপুৱাৰ জলপান খোৱা', 'ৰাতিৰ আহাৰ খোৱা'],
        correctAnswer: 'ৰাতিপুৱাৰ জলপান খোৱা',
        correctExplanation: 'একেবাৰে সঠিক! সাজু হোৱাৰ পিছত সাধাৰণতে জলপান খোৱাৰ সময় হয়।',
        incorrectExplanation: 'কোনো কথা নাই। সাজু হোৱাৰ পিছত সাধাৰণতে জলপান খোৱা হয়।',
      },
      {
        id: 3,
        prompt: 'ৰাতিৰ আহাৰৰ পিছত সাধাৰণতে কি আহে?',
        choices: ['সাৰ পোৱা', 'ৰাতিপুৱাৰ জলপান খোৱা', 'শুবলৈ সাজু হোৱা'],
        correctAnswer: 'শুবলৈ সাজু হোৱা',
        correctExplanation: 'একেবাৰে সঠিক! ৰাতিৰ আহাৰৰ পিছত সাধাৰণতে শুবলৈ সাজু হোৱা হয়।',
        incorrectExplanation: 'কোনো কথা নাই। ৰাতিৰ আহাৰৰ পিছত সাধাৰণতে শুবলৈ সাজু হোৱা হয়।',
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
    activityTitle: 'दिनचर्याको क्रम',
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
        `तपाईंले आज ${total} मध्ये ${correct} प्रश्नहरूको सही उत्तर दिनुभयो। तपाईंले परिचित दिनचर्यालाई सही क्रममा राख्नुभयो।`,
    },
    questions: [
      {
        id: 1,
        prompt: 'बिहान उठेपछि तपाईं सामान्यतया के गर्नुहुन्छ?',
        choices: ['बिहानको खाजा खाने', 'सुत्न जाने', 'रातिको खाना खाने'],
        correctAnswer: 'बिहानको खाजा खाने',
        correctExplanation: 'एकदम सही! बिहान उठेपछि खाजा खानु बिहानको दिनचर्याको हिस्सा हो।',
        incorrectExplanation: 'केही छैन। बिहान उठेपछि सामान्यतया खाजा खाइन्छ।',
      },
      {
        id: 2,
        prompt: 'दिनको लागि तयार भएपछि तपाईं सामान्यतया के गर्नुहुन्छ?',
        choices: ['सुत्न जाने', 'बिहानको खाजा खाने', 'रातिको खाना खाने'],
        correctAnswer: 'बिहानको खाजा खाने',
        correctExplanation: 'एकदम सही! तयार भएपछि सामान्यतया खाजा खाने पालो आउँछ।',
        incorrectExplanation: 'केही छैन। तयार भएपछि सामान्यतया खाजा खाइन्छ।',
      },
      {
        id: 3,
        prompt: 'रातिको खानापछि सामान्यतया के आउँछ?',
        choices: ['ब्युँझनु', 'बिहानको खाजा खाने', 'सुत्नको लागि तयार हुनु'],
        correctAnswer: 'सुत्नको लागि तयार हुनु',
        correctExplanation: 'एकदम सही! रातिको खानापछि सामान्यतया सुत्नको लागि तयार भइन्छ।',
        incorrectExplanation: 'केही छैन। रातिको खानापछि सामान्यतया सुत्नको लागि तयार भइन्छ।',
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

export const DayInOrderActivity = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onLeave,
  onFinish,
  onSignOut,
  onNavigate,
  onComplete,
}) => {
  const t = DAY_IN_ORDER_TRANSLATIONS[selectedLang] || DAY_IN_ORDER_TRANSLATIONS.en;
  const userInitials = getInitials(userName);
  const totalQuestions = t.questions.length;

  // Progression states
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
        activityName: 'A Day in Order',
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
    <div className="day-in-order-layout" aria-label="MINDCARE A Day in Order Activity">
      {/* ==========================================================================
          LEFT SIDEBAR (Consistent with MINDCARE Standard)
          ========================================================================== */}
      <aside className="day-in-order-sidebar" aria-label="Main Navigation">
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
          MAIN ACTIVITY WORKSPACE
          ========================================================================== */}
      <div className="day-in-order-main-wrapper">
        {/* Top Status Bar */}
        <header className="day-in-order-top-bar">
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
        <main className="day-in-order-content-body">
          {!isFinished ? (
            /* ======================================================================
               ACTIVE QUESTION VIEW
               ====================================================================== */
            <div className="day-in-order-inner-container">
              {/* Back / Leave Activity Link */}
              <div className="day-in-order-header-top">
                <button
                  type="button"
                  className="day-in-order-back-link"
                  onClick={onLeave}
                  aria-label={t.leaveActivity}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{t.leaveActivity}</span>
                </button>
              </div>

              {/* Title Row with "level: Gentle" Pill */}
              <div className="day-in-order-title-row">
                <div className="day-in-order-title-left">
                  <p className="day-in-order-question-counter">
                    {t.questionCounter(currentQuestionIdx + 1, totalQuestions)}
                  </p>
                  <h1 className="day-in-order-main-title">{t.activityTitle}</h1>
                </div>

                <div className="day-in-order-level-pill" role="status" aria-label={t.levelPill}>
                  <span>{t.levelPill}</span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div
                className="day-in-order-progress-track"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="day-in-order-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Central Activity Card */}
              <div className="day-in-order-card-container">
                {/* Routine Checklist Icon in Pale Green Circle */}
                <div className="day-in-order-badge-circle" aria-hidden="true">
                  <RoutineOrderIcon size={34} color="#183D36" />
                </div>

                {/* Question Heading */}
                <h2 className="day-in-order-question-text">{currentQ.prompt}</h2>

                {/* Answer Choice Buttons (A, B, C) */}
                <div
                  className="day-in-order-choices-list"
                  role="radiogroup"
                  aria-label={currentQ.prompt}
                >
                  {randomizedChoices.map((choice, index) => {
                    const letterLabel = String.fromCharCode(65 + index); // A, B, C
                    const isSelected = selectedAnswer === choice;
                    const isCorrectAnswer = choice === currentQ.correctAnswer;

                    let choiceClass = 'day-in-order-choice-btn';
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
                        <span className="choice-text">{choice}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel on Answer Submission */}
                {isAnswerLocked && (
                  <div
                    className={`day-in-order-feedback-panel ${
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
            <div className="results-inner-container" aria-label="A day in order results">
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
                <div className="day-in-order-stats-grid">
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

                {/* AI Reflection Box */}
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

export default DayInOrderActivity;
