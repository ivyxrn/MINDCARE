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
import './MemoryMatchActivity.css';

const MEMORY_MATCH_TRANSLATIONS = {
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
    activityTitle: 'Memory match',
    questionCounter: (curr, total) => `Question ${curr} of ${total}`,
    levelNames: {
      1: 'level: Steady',
      2: 'level: Brisk',
      3: 'level: Quick',
    },
    flashPhase: {
      title: 'Take a moment to remember.',
      subtitle: 'Look closely at what you see first.',
      objectsLabel: 'You saw these objects first:',
    },
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
      highestLevel: 'Highest level',
      levelPrefix: 'Level',
      doneBtn: 'Done ✓',
      syncStatus: 'Sync completed.',
      aiSummaryTitle: 'Activity reflection',
      aiSummary: (correct, total, level) =>
        `You answered ${correct} of ${total} questions correctly and reached Level ${level}. You stayed with the activity and took your time.`,
    },
    questions: [
      {
        id: 1,
        objects: ['Blue flower', 'Rose'],
        prompt: 'Which object did you see first?',
        choices: ['Blue flower', 'Rose', 'Carrot'],
        correctAnswer: 'Blue flower',
        correctExplanation: "That's right! You saw Blue flower first.",
        incorrectExplanation: 'Not quite. The first object you saw was Blue flower.',
      },
      {
        id: 2,
        objects: ['Rose', 'Carrot'],
        prompt: 'Which object was shown second?',
        choices: ['Carrot', 'Blue flower', 'Rose'],
        correctAnswer: 'Carrot',
        correctExplanation: "That's right! You saw Carrot second.",
        incorrectExplanation: 'Not quite. The second object you saw was Carrot.',
      },
      {
        id: 3,
        objects: ['Carrot', 'Blue flower'],
        prompt: 'Which object completed the set?',
        choices: ['Rose', 'Carrot', 'Blue flower'],
        correctAnswer: 'Blue flower',
        correctExplanation: "That's right! Blue flower completed the set.",
        incorrectExplanation: 'Not quite. Blue flower completed the set.',
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
    activityTitle: 'मेमोरी मैच',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    levelNames: {
      1: 'स्तर: स्थिर',
      2: 'स्तर: मध्यम',
      3: 'स्तर: त्वरित',
    },
    flashPhase: {
      title: 'याद रखने के लिए कुछ क्षण लें।',
      subtitle: 'जो आप पहले देखते हैं उसे ध्यान से देखें।',
      objectsLabel: 'आपने ये वस्तुएं पहले देखीं:',
    },
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
      highestLevel: 'उच्चतम स्तर',
      levelPrefix: 'स्तर',
      doneBtn: 'पूर्ण ✓',
      syncStatus: 'सिंक पूर्ण हुआ।',
      aiSummaryTitle: 'सत्र सारांश',
      aiSummary: (correct, total, level) =>
        `आपने ${total} में से ${correct} प्रश्नों के सही उत्तर दिए और स्तर ${level} तक पहुँचे। आपने गतिविधि पर पूरा ध्यान दिया।`,
    },
    questions: [
      {
        id: 1,
        objects: ['नीला फूल', 'गुलाब'],
        prompt: 'आपने कौन सी वस्तु सबसे पहले देखी?',
        choices: ['नीला फूल', 'गुलाब', 'गाजर'],
        correctAnswer: 'नीला फूल',
        correctExplanation: 'बिल्कुल सही! आपने सबसे पहले नीला फूल देखा था।',
        incorrectExplanation: 'कोई बात नहीं। सबसे पहले आपने नीला फूल देखा था।',
      },
      {
        id: 2,
        objects: ['गुलाब', 'गाजर'],
        prompt: 'दूसरी कौन सी वस्तु दिखाई गई थी?',
        choices: ['गाजर', 'नीला फूल', 'गुलाब'],
        correctAnswer: 'गाजर',
        correctExplanation: 'बिल्कुल सही! दूसरी वस्तु गाजर थी।',
        incorrectExplanation: 'कोई बात नहीं। दूसरी वस्तु गाजर थी।',
      },
      {
        id: 3,
        objects: ['गाजर', 'नीला फूल'],
        prompt: 'क्रम को किस वस्तु ने पूरा किया?',
        choices: ['गुलाब', 'गाजर', 'नीला फूल'],
        correctAnswer: 'नीला फूल',
        correctExplanation: 'बिल्कुल सही! नीले फूल ने क्रम पूरा किया।',
        incorrectExplanation: 'कोई बात नहीं। नीले फूल ने क्रम पूरा किया था।',
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
    activityTitle: 'স্মৃতি মিলন',
    questionCounter: (curr, total) => `প্ৰশ্ন ${curr} / ${total}`,
    levelNames: {
      1: 'স্তৰ: স্থিৰ',
      2: 'স্তৰ: মধ্যম',
      3: 'স্তৰ: ত্বৰিৎ',
    },
    flashPhase: {
      title: 'মনত ৰাখিবলৈ কিছু সময় লওক।',
      subtitle: 'আপুনি প্ৰথমে কি দেখে ভালদৰে লক্ষ্য কৰক।',
      objectsLabel: 'আপুনি প্ৰথমে এই বস্তুবোৰ দেখিছিল:',
    },
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
      highestLevel: 'সৰ্বোচ্চ স্তৰ',
      levelPrefix: 'স্তৰ',
      doneBtn: 'সম্পূৰ্ণ ✓',
      syncStatus: 'সংমিশ্ৰণ সম্পূৰ্ণ।',
      aiSummaryTitle: 'সত্ৰৰ পৰ্যবেক্ষণ',
      aiSummary: (correct, total, level) =>
        `আপুনি ${total} টাৰ ভিতৰত ${correct} টা প্ৰশ্নৰ সঠিক উত্তৰ দিলে আৰু স্তৰ ${level} পালেহি।`,
    },
    questions: [
      {
        id: 1,
        objects: ['নীলা ফুল', 'গোলাপ'],
        prompt: 'আপুনি কোনটো বস্তু প্ৰথমে দেখিছিল?',
        choices: ['নীলা ফুল', 'গোলাপ', 'গাজৰ'],
        correctAnswer: 'নীলা ফুল',
        correctExplanation: 'একেবাৰে সঠিক! আপুনি প্ৰথমে নীলা ফুল দেখিছিল।',
        incorrectExplanation: 'কোনো কথা নাই। আপুনি প্ৰথমে নীলা ফুল দেখিছিল।',
      },
      {
        id: 2,
        objects: ['গোলাপ', 'গাজৰ'],
        prompt: 'দ্বিতীয় স্থানত কোনটো বস্তু দেখুওৱা হৈছিল?',
        choices: ['গাজৰ', 'নীলা ফুল', 'গোলাপ'],
        correctAnswer: 'গাজৰ',
        correctExplanation: 'একেবাৰে সঠিক! দ্বিতীয় বস্তু গাজৰ আছিল।',
        incorrectExplanation: 'কোনো কথা নাই। দ্বিতীয় বস্তু গাজৰ আছিল।',
      },
      {
        id: 3,
        objects: ['গাজৰ', 'নীলা ফুল'],
        prompt: 'কোনটো বস্তুৱে ক্ৰমটো সম্পূৰ্ণ কৰিলে?',
        choices: ['গোলাপ', 'গাজৰ', 'নীলা ফুল'],
        correctAnswer: 'নীলা ফুল',
        correctExplanation: 'একেবাৰে সঠিক! নীলা ফুলে ক্ৰমটো সম্পূৰ্ণ কৰিলে।',
        incorrectExplanation: 'কোনো কথা নাই। নীলা ফুলে ক্ৰমটো সম্পূৰ্ণ কৰিছিল।',
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
    activityTitle: 'स्मृति मिलान',
    questionCounter: (curr, total) => `प्रश्न ${curr} / ${total}`,
    levelNames: {
      1: 'स्तर: स्थिर',
      2: 'स्तर: मध्यम',
      3: 'स्तर: छिटो',
    },
    flashPhase: {
      title: 'सम्झनका लागि केही बेर समय लिनुहोस्।',
      subtitle: 'तपाईंले पहिले के देख्नुहुन्छ ध्यान दिएर हेर्नुहोस्।',
      objectsLabel: 'तपाईंले पहिले यी वस्तुहरू देख्नुभएको थियो:',
    },
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
      highestLevel: 'उच्चतम स्तर',
      levelPrefix: 'स्तर',
      doneBtn: 'सम्पन्न ✓',
      syncStatus: 'सिङ्क सम्पन्न भयो।',
      aiSummaryTitle: 'सत्र सारांश',
      aiSummary: (correct, total, level) =>
        `तपाईंले ${total} मध्ये ${correct} प्रश्नहरूको सही उत्तर दिनुभयो र स्तर ${level} सम्म पुग्नुभयो।`,
    },
    questions: [
      {
        id: 1,
        objects: ['नीलो फूल', 'गुलाब'],
        prompt: 'तपाईंले कुन वस्तु सबैभन्दा पहिले देख्नुभयो?',
        choices: ['नीलो फूल', 'गुलाब', 'गाजर'],
        correctAnswer: 'नीलो फूल',
        correctExplanation: 'एकदम सही! तपाईंले सबैभन्दा पहिले नीलो फूल देख्नुभएको थियो।',
        incorrectExplanation: 'केही छैन। तपाईंले सबैभन्दा पहिले नीलो फूल देख्नुभएको थियो।',
      },
      {
        id: 2,
        objects: ['गुलाब', 'गाजर'],
        prompt: 'दोस्रो पटक कुन वस्तु देखाइएको थियो?',
        choices: ['गाजर', 'नीलो फूल', 'गुलाब'],
        correctAnswer: 'गाजर',
        correctExplanation: 'एकदम सही! दोस्रो वस्तु गाजर थियो।',
        incorrectExplanation: 'केही छैन। दोस्रो वस्तु गाजर थियो।',
      },
      {
        id: 3,
        objects: ['गाजर', 'नीलो फूल'],
        prompt: 'क्रमलाई कुन वस्तुले पूरा गर्यो?',
        choices: ['गुलाब', 'गाजर', 'नीलो फूल'],
        correctAnswer: 'नीलो फूल',
        correctExplanation: 'एकदम सही! नीलो फूलले क्रम पूरा गर्यो।',
        incorrectExplanation: 'केही छैन। नीलो फूलले क्रम पूरा गरेको थियो।',
      },
    ],
  },
};

// Durations for the 3 difficulty levels (in seconds)
const LEVEL_DURATIONS = {
  1: 7,
  2: 5,
  3: 3,
};

// Helper: Generate Avatar Initials
const getInitials = (fullName) => {
  if (!fullName || !fullName.trim()) return 'AD';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper: Shuffle array randomly
const shuffleChoices = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const MemoryMatchActivity = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onLeave,
  onFinish,
  onSignOut,
  onNavigate,
  onComplete,
}) => {
  const t = MEMORY_MATCH_TRANSLATIONS[selectedLang] || MEMORY_MATCH_TRANSLATIONS.en;
  const userInitials = getInitials(userName);
  const totalQuestions = t.questions.length;

  // Activity progression states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [phase, setPhase] = useState('flash'); // 'flash' (showing objects) | 'question' (objects hidden, answering)
  const [flashProgress, setFlashProgress] = useState(100); // 100% -> 0% smooth countdown
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Results & telemetry tracking
  const [questionResults, setQuestionResults] = useState([]);
  const questionStartTimeRef = useRef(null);
  const flashTimerRef = useRef(null);
  const flashIntervalRef = useRef(null);

  const currentQ = t.questions[currentQuestionIdx];

  // Randomize answer positions whenever question choices change
  const randomizedChoices = useMemo(() => {
    return shuffleChoices(currentQ.choices);
  }, [currentQ.choices]);

  // Handle Flash Phase Countdown
  useEffect(() => {
    if (isFinished || phase !== 'flash') return;

    const flashDurationSec = LEVEL_DURATIONS[difficultyLevel] || 7;
    const flashDurationMs = flashDurationSec * 1000;
    const startTime = Date.now();

    // Smooth visual progress bar update every 40ms
    flashIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingRatio = Math.max(0, 1 - elapsed / flashDurationMs);
      setFlashProgress(remainingRatio * 100);
    }, 40);

    // Transition to Question phase after duration ends
    flashTimerRef.current = setTimeout(() => {
      clearInterval(flashIntervalRef.current);
      setFlashProgress(0);
      setPhase('question');
      questionStartTimeRef.current = Date.now();
    }, flashDurationMs);

    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
    };
  }, [phase, currentQuestionIdx, difficultyLevel, isFinished]);

  // Option Selection Handler
  const handleSelectChoice = useCallback(
    (choice) => {
      if (isAnswerLocked || phase !== 'question') return;

      const answerTime = typeof performance !== 'undefined' ? performance.now() : 0;
      const startTime = questionStartTimeRef.current || answerTime;
      const elapsedMs = Math.max(0, answerTime - startTime);
      const responseTimeSec = Math.round((elapsedMs / 1000) * 10) / 10 || 2.0;

      const isCorrect = choice === currentQ.correctAnswer;
      setSelectedAnswer(choice);
      setIsAnswerLocked(true);

      // Record question result telemetry
      const resultItem = {
        questionNumber: currentQuestionIdx + 1,
        levelUsed: difficultyLevel,
        flashDuration: LEVEL_DURATIONS[difficultyLevel],
        selectedAnswer: choice,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        responseTime: responseTimeSec,
      };

      setQuestionResults((prev) => [...prev, resultItem]);
    },
    [isAnswerLocked, phase, currentQ, currentQuestionIdx, difficultyLevel]
  );

  // Next Question or Finish Action
  const handleProceed = () => {
    const lastResult = questionResults[questionResults.length - 1];
    const wasCorrect = lastResult ? lastResult.isCorrect : false;

    // Adaptive Difficulty Rule:
    // Correct -> +1 level (max 3)
    // Incorrect -> -1 level (min 1)
    let nextLevel = difficultyLevel;
    if (wasCorrect) {
      nextLevel = Math.min(3, difficultyLevel + 1);
    } else {
      nextLevel = Math.max(1, difficultyLevel - 1);
    }

    if (currentQuestionIdx < totalQuestions - 1) {
      setDifficultyLevel(nextLevel);
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setFlashProgress(100);
      setPhase('flash');
    } else {
      // Activity Complete
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
          : 5.0;
      const highestLevel = Math.max(
        ...completedResults.map((r) => r.levelUsed),
        difficultyLevel
      );
      const totalResponse = Math.round(
        completedResults.reduce((sum, r) => sum + r.responseTime, 0) * 10
      ) / 10;

      const finalActivityData = {
        activityName: 'Memory match',
        completionDateTime: new Date().toISOString(),
        questionsCompleted: totalQuestions,
        correctAnswers: correctCount,
        accuracy: accuracyPct,
        highestLevelReached: highestLevel,
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

  // Progress percentage for Question 1, 2, 3
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
      : 6;
  const highestLevel =
    questionResults.length > 0
      ? Math.max(...questionResults.map((r) => r.levelUsed))
      : difficultyLevel;

  return (
    <div className="activity-screen-layout" aria-label="MINDCARE Memory Match Activity">
      {/* ==========================================================================
          LEFT SIDEBAR (Consistent with MINDCARE Shell)
          ========================================================================== */}
      <aside className="activity-sidebar" aria-label="Main Navigation">
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
      <div className="activity-main-wrapper">
        {/* Top Status Bar */}
        <header className="activity-top-bar">
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
        <main className="activity-content-body">
          {!isFinished ? (
            /* ======================================================================
               ACTIVE QUESTION VIEW
               ====================================================================== */
            <div className="activity-inner-container">
              {/* Back / Leave Activity Link */}
              <div className="activity-header-top">
                <button
                  type="button"
                  className="activity-back-link"
                  onClick={onLeave}
                  aria-label={t.leaveActivity}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{t.leaveActivity}</span>
                </button>
              </div>

              {/* Title & Level Row */}
              <div className="activity-title-row">
                <div>
                  <p className="activity-question-counter">
                    {t.questionCounter(currentQuestionIdx + 1, totalQuestions)}
                  </p>
                  <h1 className="activity-main-title">{t.activityTitle}</h1>
                </div>

                <div className="activity-level-pill" role="status">
                  <span>{t.levelNames[difficultyLevel] || `level: Steady`}</span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div
                className="activity-progress-track"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="activity-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Central Card Container */}
              <div className="activity-card-container">
                {/* Central Brain Icon */}
                <div className="activity-card-brain-badge" aria-hidden="true">
                  <ActivitiesNavIcon size={36} color="#183D36" />
                </div>

                {/* PHASE 1: SHOW MEMORY OBJECTS */}
                {phase === 'flash' && (
                  <div className="flash-phase-panel" aria-live="polite">
                    <p className="flash-prompt-title">{t.flashPhase.title}</p>

                    <div className="memory-objects-box">
                      <p className="memory-box-label">{t.flashPhase.objectsLabel}</p>
                      <div className="memory-pills-row">
                        {currentQ.objects.map((obj, i) => (
                          <span key={i} className="memory-object-pill">
                            {obj}
                          </span>
                        ))}
                      </div>
                      <p className="memory-box-sub">{t.flashPhase.subtitle}</p>
                    </div>

                    {/* Subtle Calm Countdown Progress Bar (no numbers) */}
                    <div className="flash-countdown-container">
                      <div
                        className="flash-countdown-bar"
                        style={{ width: `${flashProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* PHASE 2: HIDE OBJECTS & ANSWER QUESTION */}
                {phase === 'question' && (
                  <div className="question-phase-panel" aria-live="polite">
                    <h2 className="activity-question-text">{currentQ.prompt}</h2>

                    {/* Answer Choice Cards */}
                    <div className="answer-choices-list" role="radiogroup" aria-label={currentQ.prompt}>
                      {randomizedChoices.map((choice, index) => {
                        const letterLabel = String.fromCharCode(65 + index); // A, B, C
                        const isSelected = selectedAnswer === choice;
                        const isCorrectAnswer = choice === currentQ.correctAnswer;

                        let choiceClass = 'answer-choice-card';
                        if (isSelected) {
                          choiceClass += isCorrectAnswer ? ' selected-correct' : ' selected-incorrect';
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
                )}
              </div>
            </div>
          ) : (
            /* ======================================================================
               FINAL RESULTS VIEW (Matching media_1789364687013.png)
               ====================================================================== */
            <div className="results-inner-container" aria-label="Memory match results">
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

                {/* 2x2 Statistics Cards Grid */}
                <div className="results-stats-grid">
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

                  {/* Stat 4: Highest Level Reached */}
                  <div className="results-stat-box">
                    <div className="stat-box-row">
                      <span className="stat-big-value">
                        {t.results.levelPrefix} {highestLevel}
                      </span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <ActivitiesNavIcon size={22} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-box-label">{t.results.highestLevel}</span>
                  </div>
                </div>

                {/* Future AI Summary Reflection Placeholder Box */}
                <div className="results-ai-reflection-box" role="note">
                  <p className="ai-reflection-text">
                    💡 {t.results.aiSummary(totalCorrect, totalQuestions, highestLevel)}
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

export default MemoryMatchActivity;
