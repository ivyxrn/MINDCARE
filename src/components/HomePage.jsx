import React, { useState, useEffect, useRef } from 'react';
import {
  LeafLogo,
  SunIcon,
  HomeNavIcon,
  ActivitiesNavIcon,
  ProgressNavIcon,
  BellNavIcon,
  HelpNavIcon,
  GearNavIcon,
  SignOutNavIcon,
  CloudIcon,
  SparkleIcon,
  CheckCircleIcon,
  RibbonIcon,
  ChevronRightIcon,
  SpeakerIcon,
} from './Icons';
import './HomePage.css';

const HOME_TRANSLATIONS = {
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
    greetings: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    mainHeading: 'Ready for a little time together?',
    subtitle: 'No pressure. Just a few minutes for yourself.',
    readAloud: 'Read aloud',
    speaking: 'Speaking...',
    dailyPractice: {
      tag: 'DAILY PRACTICE',
      headline1: 'A few minutes',
      headline2: 'for yourself.',
      desc: 'Choose something familiar, or let us surprise you with a gentle challenge.',
      btnText: 'Start an activity',
    },
    glance: {
      title: 'Today at a glance',
      completedLabel: 'completed',
      remindersLabel: 'Reminders',
      seeProgress: 'See my progress',
    },
    bottomCards: {
      remindersTitle: 'Reminders',
      remindersSub: (n) => `${n} Open`,
      progressTitle: 'Progress',
      progressSub: 'A steady rhythm',
      helpTitle: 'Help & voice',
      helpSub: 'I can read it aloud',
    },
    voiceName: 'English',
    voiceNotice: 'English speech voice is unavailable on this device.',
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
    greetings: {
      morning: 'सुप्रभात',
      afternoon: 'शुभ अपराह्न',
      evening: 'शुभ संध्या',
    },
    mainHeading: 'क्या आप साथ में कुछ समय बिताने के लिए तैयार हैं?',
    subtitle: 'कोई दबाव नहीं। बस अपने लिए कुछ मिनट।',
    readAloud: 'सुनें',
    speaking: 'बोल रहा है...',
    dailyPractice: {
      tag: 'दैनिक अभ्यास',
      headline1: 'कुछ मिनट',
      headline2: 'अपने लिए।',
      desc: 'कुछ जाना-पहचाना चुनें, या एक हल्की चुनौती के साथ हमें आपको आश्चर्यचकित करने दें।',
      btnText: 'एक गतिविधि शुरू करें',
    },
    glance: {
      title: 'आज की एक झलक',
      completedLabel: 'पूर्ण',
      remindersLabel: 'रिमाइंडर',
      seeProgress: 'मेरी प्रगति देखें',
    },
    bottomCards: {
      remindersTitle: 'रिमाइंडर',
      remindersSub: (n) => `${n} बाकी`,
      progressTitle: 'प्रगति',
      progressSub: 'एक नियमित लय',
      helpTitle: 'मदद और आवाज़',
      helpSub: 'मैं इसे बोलकर सुना सकता हूँ',
    },
    voiceName: 'Hindi',
    voiceNotice: 'इस डिवाइस पर हिन्दी आवाज़ (hi-IN) उपलब्ध नहीं है। / Hindi speech voice is unavailable on this device.',
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
    greetings: {
      morning: 'সুপ্ৰভাত',
      afternoon: 'শুভ দুপৰীয়া',
      evening: 'শুভ সন্ধিয়া',
    },
    mainHeading: 'এককেলগে অলপ সময় কটোৱাৰ বাবে সাজুনে?',
    subtitle: 'কোনো হেঁচা নাই। মাথোঁ নিজৰ বাবে কেইটামান মিনিট।',
    readAloud: 'পঢ়ি শুনক',
    speaking: 'কৈ থকা হৈছে...',
    dailyPractice: {
      tag: 'দৈনন্দিন অভ্যাস',
      headline1: 'কেইটামান মিনিট',
      headline2: 'নিজৰ বাবে।',
      desc: 'পৰিচিত কিবা এটা বাছক, বা এটা মৃদু প্ৰত্যাহ্বানৰ সৈতে আমাক আপোনাক আচৰিত কৰিবলৈ দিয়ক।',
      btnText: 'কাৰ্যকলাপ আৰম্ভ কৰক',
    },
    glance: {
      title: 'আজিৰ এক চমু আভাস',
      completedLabel: 'সম্পূৰ্ণ',
      remindersLabel: 'ৰিমাইণ্ডাৰ',
      seeProgress: 'মোৰ প্ৰগতি চাওক',
    },
    bottomCards: {
      remindersTitle: 'ৰিমাইণ্ডাৰ',
      remindersSub: (n) => `${n} টা বাকী`,
      progressTitle: 'প্ৰগতি',
      progressSub: 'এটা নিয়মীয়া ছন্দ',
      helpTitle: 'সহায় আৰু ধ্বনি',
      helpSub: 'মই ইয়াক পঢ়ি শুনাব পাৰোঁ',
    },
    voiceName: 'Assamese',
    voiceNotice: 'এই ডিভাইচত অসমীয়া কণ্ঠ (as-IN) উপলব্ধ নহয়। / Assamese speech voice is unavailable on this device.',
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
    greetings: {
      morning: 'शुभ प्रभात',
      afternoon: 'शुभ दिउँसो',
      evening: 'शुभ साँझ',
    },
    mainHeading: 'सँगै केही समय बिताउन तयार हुनुहुन्छ?',
    subtitle: 'कुनै दबाब छैन। केवल आफ्नो लागि केही मिनेट।',
    readAloud: 'सुन्नुहोस्',
    speaking: 'बोलिरहेको छ...',
    dailyPractice: {
      tag: 'दैनिक अभ्यास',
      headline1: 'केही मिनेट',
      headline2: 'आफ्नो लागि।',
      desc: 'कुनै परिचित कुरा रोज्नुहोस्, वा एउटा हल्का चुनौतीका साथ हामीलाई तपाईंलाई आश्चर्यचकित गर्न दिनुहोस्।',
      btnText: 'गतिविधि सुरु गर्नुहोस्',
    },
    glance: {
      title: 'आजको एक झलक',
      completedLabel: 'पूरा',
      remindersLabel: 'रिमाइन्डरहरू',
      seeProgress: 'मेरो प्रगति हेर्नुहोस्',
    },
    bottomCards: {
      remindersTitle: 'रिमाइन्डरहरू',
      remindersSub: (n) => `${n} वटा बाँकी`,
      progressTitle: 'प्रगति',
      progressSub: 'एक स्थिर लय',
      helpTitle: 'सहयोग र आवाज',
      helpSub: 'म यसलाई पढेर सुनाउन सक्छु',
    },
    voiceName: 'Nepali',
    voiceNotice: 'यस यन्त्रमा नेपाली आवाज (ne-NP) उपलब्ध छैन। / Nepali speech voice is unavailable on this device.',
  },
};

// Helper: Extract First Name (Proper noun, always preserved)
const getFirstName = (fullName) => {
  if (!fullName || !fullName.trim()) return 'Anima';
  return fullName.trim().split(/\s+/)[0];
};

// Helper: Generate Avatar Initials
const getInitials = (fullName) => {
  if (!fullName || !fullName.trim()) return 'AD';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper: Time-Based Period
const getPeriodOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
};

// Helper: Resolve English voice (Prefer en-IN, then any English voice, then fallback)
const getEnglishVoice = (voices) => {
  if (!voices || voices.length === 0) return null;

  // 1. Prefer exact 'en-in' locale match
  const exactEnIn = voices.find(
    (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === 'en-in'
  );
  if (exactEnIn) return exactEnIn;

  // 2. Prefer voice with name containing India / Indian English
  const nameEnIn = voices.find(
    (v) =>
      v.lang &&
      v.lang.toLowerCase().startsWith('en') &&
      v.name &&
      v.name.toLowerCase().includes('india')
  );
  if (nameEnIn) return nameEnIn;

  // 3. Fallback to any English voice (e.g. en-US, en-GB, en-AU)
  const anyEnglish = voices.find(
    (v) =>
      (v.lang && (v.lang.toLowerCase() === 'en' || v.lang.toLowerCase().startsWith('en-'))) ||
      (v.name && v.name.toLowerCase().includes('english'))
  );
  if (anyEnglish) return anyEnglish;

  // 4. Fallback to browser default voice if present
  return voices.find((v) => v.default) || voices[0] || null;
};

// Helper: Resolve Regional voice for selected language
// Enforces strict matching for Assamese and Nepali so unrelated voices are never used
const getRegionalVoice = (voices, langCode) => {
  if (!voices || voices.length === 0) return null;

  if (langCode === 'en') {
    return getEnglishVoice(voices);
  }

  if (langCode === 'hi') {
    // Prefer exact hi-IN match first
    const hiIn = voices.find(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === 'hi-in'
    );
    if (hiIn) return hiIn;

    // Any Hindi voice
    return (
      voices.find(
        (v) =>
          (v.lang && (v.lang.toLowerCase() === 'hi' || v.lang.toLowerCase().startsWith('hi-'))) ||
          (v.name && v.name.toLowerCase().includes('hindi'))
      ) || null
    );
  }

  if (langCode === 'as') {
    // Strict Assamese voice check: as-IN or voice explicitly tagged as Assamese
    // Do not use unrelated languages
    const asIn = voices.find(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === 'as-in'
    );
    if (asIn) return asIn;

    return (
      voices.find(
        (v) =>
          (v.lang && (v.lang.toLowerCase() === 'as' || v.lang.toLowerCase().startsWith('as-'))) ||
          (v.name &&
            (v.name.toLowerCase().includes('assamese') ||
              v.name.toLowerCase().includes('as-in')))
      ) || null
    );
  }

  if (langCode === 'ne') {
    // Strict Nepali voice check: ne-NP or voice explicitly tagged as Nepali
    // Do not use unrelated languages
    const neNp = voices.find(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === 'ne-np'
    );
    if (neNp) return neNp;

    return (
      voices.find(
        (v) =>
          (v.lang && (v.lang.toLowerCase() === 'ne' || v.lang.toLowerCase().startsWith('ne-'))) ||
          (v.name &&
            (v.name.toLowerCase().includes('nepali') ||
              v.name.toLowerCase().includes('ne-np')))
      ) || null
    );
  }

  return null;
};

// Helper: Build Speech Segments for mixed-language speech
// Segment 1: greetingPrefix (Regional language voice)
// Segment 2: userName (English voice ALWAYS - proper noun never translated)
// Segment 3: messageSuffix (Regional language voice)
const buildSpeechSegments = (lang, period, spokenName, completed, total, reminders) => {
  const allCompletedNoReminders = completed === total && reminders === 0;
  const noCompleted = completed === 0;

  // 1. ENGLISH
  if (lang === 'en') {
    const greeting =
      period === 'morning' ? 'Good morning,' : period === 'afternoon' ? 'Good afternoon,' : 'Good evening,';
    const numWords = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five' };

    let suffix = '';
    if (allCompletedNoReminders) {
      suffix = '. You have completed all your activities for today. You have no pending reminders. Come back tomorrow.';
    } else if (noCompleted) {
      const remText =
        reminders === 0
          ? 'no pending reminders'
          : reminders === 1
          ? 'one pending reminder'
          : `${numWords[reminders] || reminders} pending reminders`;
      suffix = `. You haven't completed any activities today. You have ${remText}. Ready for a little time together?`;
    } else {
      const actText = completed === 1 ? 'one activity' : `${numWords[completed] || completed} activities`;
      const remText =
        reminders === 0
          ? 'no pending reminders'
          : reminders === 1
          ? 'one pending reminder'
          : `${numWords[reminders] || reminders} pending reminders`;
      suffix = `. You have completed ${actText} today. You have ${remText}. Ready for a little time together?`;
    }

    return { prefix: greeting, name: spokenName, suffix: suffix };
  }

  // 2. HINDI
  if (lang === 'hi') {
    const greeting =
      period === 'morning' ? 'सुप्रभात,' : period === 'afternoon' ? 'शुभ अपराह्न,' : 'शुभ संध्या,';
    const numWordsHi = { 0: 'कोई', 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच' };

    let suffix = '';
    if (allCompletedNoReminders) {
      suffix = '। आपने आज की सभी गतिविधियाँ पूरी कर ली हैं। आपका कोई रिमाइंडर बाकी नहीं है। कल फिर आइए।';
    } else if (noCompleted) {
      const remText =
        reminders === 0
          ? 'कोई रिमाइंडर बाकी नहीं है'
          : `आपके ${numWordsHi[reminders] || reminders} रिमाइंडर बाकी हैं`;
      suffix = `। आपने आज अभी तक कोई गतिविधि पूरी नहीं की है। ${remText}। क्या आप अपने लिए कुछ समय देना चाहेंगे?`;
    } else {
      const actText = completed === 1 ? 'एक गतिविधि' : `${numWordsHi[completed] || completed} गतिविधियाँ`;
      const remText =
        reminders === 0
          ? 'कोई रिमाइंडर बाकी नहीं है'
          : `आपके ${numWordsHi[reminders] || reminders} रिमाइंडर बाकी हैं`;
      suffix = `। आपने आज ${actText} पूरी की हैं। ${remText}। क्या आप अपने लिए कुछ समय देना चाहेंगे?`;
    }

    return { prefix: greeting, name: spokenName, suffix: suffix };
  }

  // 3. ASSAMESE
  if (lang === 'as') {
    const greeting =
      period === 'morning' ? 'সুপ্ৰভাত,' : period === 'afternoon' ? 'শুভ দুপৰীয়া,' : 'শুভ সন্ধিয়া,';
    const numWordsAs = { 0: 'কোনো', 1: 'এটা', 2: 'দুটা', 3: 'তিনিটা', 4: 'চাৰিটা', 5: 'পাঁচটা' };

    let suffix = '';
    if (allCompletedNoReminders) {
      suffix = '। আপুনি আজি আপোনাৰ সকলো কাৰ্যকলাপ সম্পূৰ্ণ কৰিছে। আপোনাৰ কোনো ৰিমাইণ্ডাৰ বাকী নাই। কাইলৈ আকৌ আহিব।';
    } else if (noCompleted) {
      const remText =
        reminders === 0
          ? 'আপোনাৰ কোনো ৰিমাইণ্ডাৰ বাকী নাই'
          : `আপোনাৰ ${numWordsAs[reminders] || reminders} ৰিমাইণ্ডাৰ বাকী আছে`;
      suffix = `। আপুনি আজি এতিয়ালৈকে কোনো কাৰ্যকলাপ সম্পূৰ্ণ কৰা নাই। ${remText}। আপুনি নিজৰ বাবে অলপ সময় উলিয়াব বিচাৰিবনে?`;
    } else {
      const actText = completed === 1 ? 'এটা কাৰ্যকলাপ' : `${numWordsAs[completed] || completed} কাৰ্যকলাপ`;
      const remText =
        reminders === 0
          ? 'আপোনাৰ কোনো ৰিমাইণ্ডাৰ বাকী নাই'
          : `আপোনাৰ ${numWordsAs[reminders] || reminders} ৰিমাইণ্ডাৰ বাকী আছে`;
      suffix = `। আপুনি আজি ${actText} সম্পূৰ্ণ কৰিছে। ${remText}। আপুনি নিজৰ বাবে অলপ সময় উলিয়াব বিচাৰিবনে?`;
    }

    return { prefix: greeting, name: spokenName, suffix: suffix };
  }

  // 4. NEPALI
  if (lang === 'ne') {
    const greeting =
      period === 'morning' ? 'शुभ प्रभात,' : period === 'afternoon' ? 'शुभ दिउँसो,' : 'शुभ साँझ,';
    const numWordsNe = { 0: 'कुनै', 1: 'एउटा', 2: 'दुईवटा', 3: 'तीनवटा', 4: 'चारवटा', 5: 'पाँचवटा' };

    let suffix = '';
    if (allCompletedNoReminders) {
      suffix = '। तपाईंले आजका सबै गतिविधिहरू पूरा गर्नुभएको छ। तपाईंका कुनै पनि रिमाइन्डर बाँकी छैनन्। भोलि फेरि आउनुहोस्।';
    } else if (noCompleted) {
      const remText =
        reminders === 0
          ? 'तपाईंका कुनै पनि रिमाइन्डर बाँकी छैनन्'
          : `तपाईंका ${numWordsNe[reminders] || reminders} रिमाइन्डर बाँकी छन्`;
      suffix = `। तपाईंले आज अहिलेसम्म कुनै गतिविधि पूरा गर्नुभएको छैन। ${remText}। के तपाईं आफ्नो लागि केही समय दिन चाहनुहुन्छ?`;
    } else {
      const actText = completed === 1 ? 'एउटा गतिविधि' : `${numWordsNe[completed] || completed} गतिविधि`;
      const remText =
        reminders === 0
          ? 'तपाईंका कुनै पनि रिमाइन्डर बाँकी छैनन्'
          : `तपाईंका ${numWordsNe[reminders] || reminders} रिमाइन्डर बाँकी छन्`;
      suffix = `। तपाईंले आज ${actText} पूरा गर्नुभएको छ। ${remText}। के तपाईं आफ्नो लागि केही समय दिन चाहनुहुन्छ?`;
    }

    return { prefix: greeting, name: spokenName, suffix: suffix };
  }

  return { prefix: '', name: spokenName, suffix: '' };
};

export const HomePage = ({
  userName = 'Anima Das',
  selectedLang = 'en',
  onSignOut,
  onNavigate,
}) => {
  // Frontend dynamic activity and reminder state (default matching screenshot: 1 completed, 2 reminders)
  const [completedActivities, _setCompletedActivities] = useState(1);
  const [totalActivities] = useState(3);
  const [pendingReminders, _setPendingReminders] = useState(2);
  const [activeNav, setActiveNav] = useState('home');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);

  const noticeTimerRef = useRef(null);
  const activeUtterancesRef = useRef([]);

  const t = HOME_TRANSLATIONS[selectedLang] || HOME_TRANSLATIONS.en;
  const period = getPeriodOfDay();
  const timeGreeting = t.greetings[period] || t.greetings.morning;
  const spokenName = userName && userName.trim() ? userName.trim() : 'Anima Das';
  const firstName = getFirstName(userName);
  const userInitials = getInitials(userName);

  // Load voices asynchronously and listen for voiceschanged event
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      activeUtterancesRef.current = [];
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  // Show a temporary accessible notice banner
  const triggerVoiceNotice = (message) => {
    setVoiceNotice(message);
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = setTimeout(() => {
      setVoiceNotice(null);
    }, 4500);
  };

  // Real SpeechSynthesis Read Aloud handler with Segmented Speech and Voice Detection
  const handleToggleReadAloud = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      triggerVoiceNotice('Speech synthesis is not supported on this browser.');
      return;
    }

    // If currently speaking, clicking immediately stops playback
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      activeUtterancesRef.current = [];
      setIsSpeaking(false);
      return;
    }

    // Cancel any previous queue cleanly
    window.speechSynthesis.cancel();
    activeUtterancesRef.current = [];

    // Get current voices (live voices or cached availableVoices)
    const currentVoices = window.speechSynthesis.getVoices();
    const voices = currentVoices && currentVoices.length > 0 ? currentVoices : availableVoices;

    // Determine target locale
    const targetLocales = {
      en: 'en-IN',
      hi: 'hi-IN',
      as: 'as-IN',
      ne: 'ne-NP',
    };
    const regionalLocale = targetLocales[selectedLang] || 'en-IN';

    // 1. Resolve regional voice
    const regionalVoice = getRegionalVoice(voices, selectedLang);

    // 2. Resolve English voice for the user's name
    const englishVoice = getEnglishVoice(voices);

    // Strict Voice Requirement for Assamese, Nepali, and Hindi:
    // If no compatible voice exists on device/browser:
    // DO NOT speak only the user's name
    // DO NOT speak a broken/partial sentence
    // DO NOT silently pretend that speech worked
    // DO NOT fall back to an English voice for the regional sentence
    if (selectedLang !== 'en' && !regionalVoice) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      triggerVoiceNotice(t.voiceNotice);
      return;
    }

    // If English selected but no voices at all
    if (selectedLang === 'en' && voices.length === 0) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      triggerVoiceNotice(t.voiceNotice);
      return;
    }

    // Build the 3 speech segments (name always preserved as proper noun, spoken in English)
    const segments = buildSpeechSegments(
      selectedLang,
      period,
      spokenName,
      completedActivities,
      totalActivities,
      pendingReminders
    );

    // Create utterances
    const queue = [];

    // Segment 1: Greeting Prefix (e.g. "Good morning," / "सुप्रभात," in regional voice)
    if (segments.prefix) {
      const uPrefix = new SpeechSynthesisUtterance(segments.prefix);
      uPrefix.lang = regionalLocale;
      if (regionalVoice) uPrefix.voice = regionalVoice;
      uPrefix.rate = 0.93;
      queue.push(uPrefix);
    }

    // Segment 2: User's Name (Proper noun - ALWAYS in English voice, preferably en-IN)
    if (segments.name) {
      const uName = new SpeechSynthesisUtterance(segments.name);
      uName.lang = 'en-IN';
      if (englishVoice) uName.voice = englishVoice;
      uName.rate = 0.93;
      queue.push(uName);
    }

    // Segment 3: Remaining sentence (in regional voice)
    if (segments.suffix) {
      const uSuffix = new SpeechSynthesisUtterance(segments.suffix);
      uSuffix.lang = regionalLocale;
      if (regionalVoice) uSuffix.voice = regionalVoice;
      uSuffix.rate = 0.93;
      queue.push(uSuffix);
    }

    if (queue.length === 0) {
      setIsSpeaking(false);
      return;
    }

    // Retain references to avoid Chromium garbage collection dropping utterances mid-playback
    activeUtterancesRef.current = queue;

    // First utterance starts -> isSpeaking = true
    queue[0].onstart = () => {
      setIsSpeaking(true);
      setVoiceNotice(null);
    };

    // Last utterance ends -> isSpeaking = false
    queue[queue.length - 1].onend = () => {
      setIsSpeaking(false);
      activeUtterancesRef.current = [];
    };

    // Error handling on all utterances
    queue.forEach((u) => {
      u.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis segment notice:', e);
        }
        setIsSpeaking(false);
        activeUtterancesRef.current = [];
      };
    });

    // Windows Chromium unpause guard if audio context was left paused
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Speak sequentially through the browser's speech queue
    queue.forEach((u) => {
      window.speechSynthesis.speak(u);
    });
  };

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    if (navId === 'signOut') {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (onSignOut) onSignOut();
      return;
    }
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  return (
    <div className="home-layout" aria-label="MINDCARE Home Dashboard">
      {/* ==========================================================================
          LEFT SIDEBAR
          ========================================================================== */}
      <aside className="home-sidebar" aria-label="Main Navigation">
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
                  className={`sidebar-nav-btn ${activeNav === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                  aria-current={activeNav === 'home' ? 'page' : undefined}
                >
                  <span className="sidebar-nav-icon"><HomeNavIcon size={23} /></span>
                  <span>{t.sidebar.home}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-btn ${activeNav === 'activities' ? 'active' : ''}`}
                  onClick={() => handleNavClick('activities')}
                >
                  <span className="sidebar-nav-icon"><ActivitiesNavIcon size={23} /></span>
                  <span>{t.sidebar.activities}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-btn ${activeNav === 'progress' ? 'active' : ''}`}
                  onClick={() => handleNavClick('progress')}
                >
                  <span className="sidebar-nav-icon"><ProgressNavIcon size={23} /></span>
                  <span>{t.sidebar.progress}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-btn ${activeNav === 'reminders' ? 'active' : ''}`}
                  onClick={() => handleNavClick('reminders')}
                >
                  <span className="sidebar-nav-icon"><BellNavIcon size={23} /></span>
                  <span>{t.sidebar.reminders}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-btn ${activeNav === 'help' ? 'active' : ''}`}
                  onClick={() => handleNavClick('help')}
                >
                  <span className="sidebar-nav-icon"><HelpNavIcon size={23} /></span>
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
            className={`sidebar-nav-btn ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
          >
            <span className="sidebar-nav-icon"><GearNavIcon size={23} /></span>
            <span>{t.sidebar.settings}</span>
          </button>
          <button
            type="button"
            className="sidebar-nav-btn"
            onClick={() => handleNavClick('signOut')}
          >
            <span className="sidebar-nav-icon"><SignOutNavIcon size={23} /></span>
            <span>{t.sidebar.signOut}</span>
          </button>
        </div>
      </aside>

      {/* ==========================================================================
          MAIN DASHBOARD AREA
          ========================================================================== */}
      <div className="home-main-wrapper">
        {/* Top Bar */}
        <header className="home-top-bar">
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
        <main className="home-content-body">
          {/* Greeting & Read Aloud Row */}
          <section className="home-greeting-row" aria-label="Greeting and voice overview">
            <div className="greeting-text-group">
              <p className="greeting-coral-intro">
                {timeGreeting}, {firstName}
              </p>
              <h1 className="greeting-main-heading">{t.mainHeading}</h1>
              <p className="greeting-subtitle">{t.subtitle}</p>

              {/* Accessible Voice Unavailable Notification */}
              {voiceNotice && (
                <div className="voice-notice-badge" role="status">
                  <span aria-hidden="true">⚠️</span>
                  <span>{voiceNotice}</span>
                </div>
              )}
            </div>

            {/* Functional Read Aloud Button */}
            <button
              type="button"
              className={`btn-read-aloud ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleToggleReadAloud}
              aria-label={isSpeaking ? 'Stop speaking' : t.readAloud}
              aria-pressed={isSpeaking}
            >
              <SpeakerIcon size={21} color={isSpeaking ? '#FAF6F0' : '#183D36'} />
              <span>{isSpeaking ? t.speaking : t.readAloud}</span>
            </button>
          </section>

          {/* Middle Section: Daily Practice & Today at a Glance */}
          <section className="home-middle-grid" aria-label="Today's activities and overview">
            {/* Daily Practice Card */}
            <div className="daily-practice-card">
              <div className="daily-deco-arc" aria-hidden="true" />

              <div className="daily-content-top">
                <div className="daily-tag-badge">
                  <SparkleIcon size={16} color="#385C50" />
                  <span>{t.dailyPractice.tag}</span>
                </div>

                <h2 className="daily-card-headline">
                  {t.dailyPractice.headline1}<br />
                  <span className="daily-italic">{t.dailyPractice.headline2}</span>
                </h2>

                <p className="daily-card-desc">{t.dailyPractice.desc}</p>
              </div>

              <button
                type="button"
                className="daily-card-btn"
                onClick={() => handleNavClick('activities')}
              >
                <span>{t.dailyPractice.btnText}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Today at a Glance Card */}
            <div className="glance-card">
              <div>
                <div className="glance-top-row">
                  <h3 className="glance-title">{t.glance.title}</h3>
                  <div className="glance-sun-icon" aria-hidden="true">
                    <SunIcon size={24} color="#D48D75" />
                  </div>
                </div>

                <div className="glance-stats-grid">
                  {/* Completed Stat Box */}
                  <div className="glance-stat-box">
                    <div className="stat-box-top">
                      <span className="stat-number">{completedActivities}</span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <CheckCircleIcon size={24} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-label">{t.glance.completedLabel}</span>
                  </div>

                  {/* Reminders Stat Box */}
                  <div className="glance-stat-box">
                    <div className="stat-box-top">
                      <span className="stat-number">{pendingReminders}</span>
                      <span className="stat-box-icon" aria-hidden="true">
                        <BellNavIcon size={24} color="#385C50" />
                      </span>
                    </div>
                    <span className="stat-label">{t.glance.remindersLabel}</span>
                  </div>
                </div>
              </div>

              {/* See My Progress Button */}
              <button
                type="button"
                className="glance-progress-btn"
                onClick={() => handleNavClick('progress')}
              >
                <span>{t.glance.seeProgress}</span>
                <ChevronRightIcon size={18} color="#265045" />
              </button>
            </div>
          </section>

          {/* Bottom Row: Three Feature Cards */}
          <section className="home-bottom-cards" aria-label="Feature summaries">
            {/* Card 1: Reminders */}
            <div
              className="feature-summary-card"
              onClick={() => handleNavClick('reminders')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('reminders')}
            >
              <div className="feature-card-left">
                <div className="feature-card-icon-box" aria-hidden="true">
                  <BellNavIcon size={24} color="#385C50" />
                </div>
                <div className="feature-card-text">
                  <span className="feature-card-title">{t.bottomCards.remindersTitle}</span>
                  <span className="feature-card-sub">{t.bottomCards.remindersSub(pendingReminders)}</span>
                </div>
              </div>
              <div className="feature-card-chevron" aria-hidden="true">
                <ChevronRightIcon size={18} />
              </div>
            </div>

            {/* Card 2: Progress */}
            <div
              className="feature-summary-card"
              onClick={() => handleNavClick('progress')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('progress')}
            >
              <div className="feature-card-left">
                <div className="feature-card-icon-box" aria-hidden="true">
                  <RibbonIcon size={24} color="#385C50" />
                </div>
                <div className="feature-card-text">
                  <span className="feature-card-title">{t.bottomCards.progressTitle}</span>
                  <span className="feature-card-sub">{t.bottomCards.progressSub}</span>
                </div>
              </div>
              <div className="feature-card-chevron" aria-hidden="true">
                <ChevronRightIcon size={18} />
              </div>
            </div>

            {/* Card 3: Help & Voice */}
            <div
              className="feature-summary-card"
              onClick={() => handleNavClick('help')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('help')}
            >
              <div className="feature-card-left">
                <div className="feature-card-icon-box" aria-hidden="true">
                  <HelpNavIcon size={24} color="#385C50" />
                </div>
                <div className="feature-card-text">
                  <span className="feature-card-title">{t.bottomCards.helpTitle}</span>
                  <span className="feature-card-sub">{t.bottomCards.helpSub}</span>
                </div>
              </div>
              <div className="feature-card-chevron" aria-hidden="true">
                <ChevronRightIcon size={18} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
