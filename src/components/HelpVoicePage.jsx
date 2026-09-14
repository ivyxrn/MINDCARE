import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  SpeakerIcon,
  MicrophoneIcon,
  PlayOutlineIcon,
  ChevronRightIcon,
  ShieldIcon,
  FamilyHeartIcon,
} from './Icons';
import {
  getRemindersLeftForToday,
  formatReminderSpeechResponse,
  getStoredReminders,
} from '../utils/reminderRepository';
import './HelpVoicePage.css';

const HELP_TRANSLATIONS = {
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
    eyebrow: 'You are not alone',
    title: 'Help & voice',
    hero: {
      title: 'Hello, I’m here with you.',
      subtitle: 'No pressure. Just a few minutes for yourself.',
      readAloud: 'Read aloud',
      speaking: 'Speaking...',
      startListening: 'Start listening',
      stopListening: 'Stop listening',
      listeningState: 'Listening… speak clearly',
      hint: 'Try “start activity” or “check reminders.”',
      privacyNotice: 'Voice input uses your device’s speech recognition and may require an internet connection.',
      heardPrefix: 'I heard:',
      navigatingTo: 'Opening',
      startingActivity: 'Starting',
      unrecognized: 'I didn’t quite catch that. Try saying “check reminders” or “start an activity.”',
      micDenied: 'Microphone access is needed for voice input. You can still use the buttons below.',
      notSupported: 'Voice input isn’t available on this device. You’re still welcome to use the buttons below.',
      noSpeech: 'No speech was detected. Tap “Start listening” whenever you’re ready.',
      networkError: 'Voice recognition service is currently unavailable. You can use the buttons below.',
      readAloudText: 'Hello, I am here with you. Take your time, there is no pressure. You can say check reminders or start an activity.',
    },
    bottomCards: {
      activityTitle: 'Start an activity',
      activitySubtitle: 'Choose a gentle activity',
      remindersTitle: 'Check reminders',
      remindersSubtitle: 'See what is next',
    },
    disclaimer: 'MINDCARE supports engagement and caregiver assistance. It does not diagnose or replace professional care.',
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
    eyebrow: 'आप अकेले नहीं हैं',
    title: 'मदद और आवाज़',
    hero: {
      title: 'नमस्ते, मैं आपके साथ हूँ।',
      subtitle: 'कोई दबाव नहीं। बस अपने लिए कुछ मिनट।',
      readAloud: 'सुनें',
      speaking: 'बोल रहा है...',
      startListening: 'बोलना शुरू करें',
      stopListening: 'रोकें',
      listeningState: 'सुन रहा हूँ… कृपया बोलें',
      hint: 'कहें “गतिविधि शुरू करें” या “रिमाइंडर देखें।”',
      privacyNotice: 'वॉइस इनपुट आपके डिवाइस की वाक् पहचान का उपयोग करता है।',
      heardPrefix: 'मैंने सुना:',
      navigatingTo: 'खोल रहा हूँ',
      startingActivity: 'शुरू कर रहा हूँ',
      unrecognized: 'मैं समझ नहीं पाया। कहें “रिमाइंडर देखें” या “गतिविधि शुरू करें।”',
      micDenied: 'वॉइस इनपुट के लिए माइक्रोफ़ोन की अनुमति आवश्यक है। आप नीचे दिए गए बटनों का उपयोग कर सकते हैं।',
      notSupported: 'इस डिवाइस पर वॉइस इनपुट उपलब्ध नहीं है। आप नीचे दिए गए बटनों का उपयोग कर सकते हैं।',
      noSpeech: 'कोई आवाज़ नहीं सुनी गई। तैयार होने पर दोबारा प्रयास करें।',
      networkError: 'वाक् सेवा अनुपलब्ध है। आप नीचे दिए गए बटनों का उपयोग कर सकते हैं।',
      readAloudText: 'नमस्ते, मैं आपके साथ हूँ। कोई जल्दबाजी नहीं है। आप गतिविधि शुरू करें या रिमाइंडर देखें कह सकते हैं।',
    },
    bottomCards: {
      activityTitle: 'एक गतिविधि शुरू करें',
      activitySubtitle: 'एक हल्की गतिविधि चुनें',
      remindersTitle: 'रिमाइंडर देखें',
      remindersSubtitle: 'देखें आगे क्या है',
    },
    disclaimer: 'MINDCARE देखभाल और सहायता प्रदान करता है। यह किसी पेशेवर चिकित्सा का विकल्प नहीं है।',
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
    eyebrow: 'আপুনি অকলে নাই',
    title: 'সহায় আৰু মাত',
    hero: {
      title: 'নমস্কাৰ, মই আপোনাৰ লগত আছোঁ।',
      subtitle: 'কোনো চাপ নাই। কেৱল নিজৰ বাবে কেইটামান মিনিট।',
      readAloud: 'শুনক',
      speaking: 'কৈ থকা হৈছে...',
      startListening: 'কোৱা আৰম্ভ কৰক',
      stopListening: 'বন্ধ কৰক',
      listeningState: 'শুনি আছোঁ… স্পষ্টকৈ কওক',
      hint: 'কওক “কাৰ্য্যকলাপ আৰম্ভ কৰক” বা “স্মাৰক চাওক।”',
      privacyNotice: 'ভইচ ইনপুটে ডিভাইচৰ স্পীচ ৰিকগনিচন ব্যৱহাৰ কৰে।',
      heardPrefix: 'মই শুনিলোঁ:',
      navigatingTo: 'খুলি থকা হৈছে',
      startingActivity: 'আৰম্ভ কৰি থকা হৈছে',
      unrecognized: 'মই ভালদৰে বুজি নাপালোঁ। কওক “স্মাৰক চাওক” বা “কাৰ্য্যকলাপ আৰম্ভ কৰক।”',
      micDenied: 'মাইক্ৰ’ফোনৰ অনুমতিৰ প্ৰয়োজন। আপুনি তলৰ বুটামবোৰ ব্যৱহাৰ কৰিব পাৰে।',
      notSupported: 'এই ডিভাইচত ভইচ ইনপুট উপলব্ধ নহয়।',
      noSpeech: 'কোনো শব্দ ধৰা নপৰিল। পুনৰ চেষ্টা কৰক।',
      networkError: 'ভইচ সেৱা অনুপলব্ধ। আপুনি তলৰ বুটাম ব্যৱহাৰ কৰিব পাৰে।',
      readAloudText: 'নমস্কাৰ, মই আপোনাৰ লগত আছোঁ। কোনো খৰখেদা নাই। আপুনি কাৰ্য্যকলাপ আৰম্ভ কৰক বুলি ক’ব পাৰে।',
    },
    bottomCards: {
      activityTitle: 'কাৰ্য্যকলাপ আৰম্ভ কৰক',
      activitySubtitle: 'এক সহজ কাৰ্য্যকলাপ বাছক',
      remindersTitle: 'স্মাৰক চাওক',
      remindersSubtitle: 'আগলৈ কি আছে চাওক',
    },
    disclaimer: 'MINDCARE-এ সহায়ক সাহাৰ্য্য প্ৰদান কৰে। ই কোনো চিকিৎসা নিদানৰ বিকল্প নহয়।',
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
    eyebrow: 'तपाईं एक्लो हुनुहुन्न',
    title: 'मद्दत र आवाज',
    hero: {
      title: 'नमस्ते, म तपाईंसँगै छु।',
      subtitle: 'कुनै दबाब छैन। बस आफ्नो लागि केही मिनेट।',
      readAloud: 'सुन्नुहोस्',
      speaking: 'बोलिरहेको छ...',
      startListening: 'बोल्न सुरु गर्नुहोस्',
      stopListening: 'रोक्नुहोस्',
      listeningState: 'सुन्दैछु… स्पष्ट बोल्नुहोस्',
      hint: 'भन्नुहोस् “क्रियाकलाप सुरु गर्नुहोस्” वा “रिमाइन्डर हेर्नुहोस्।”',
      privacyNotice: 'आवाज इनपुटले तपाईंको उपकरणको वाक् पहिचान प्रयोग गर्दछ।',
      heardPrefix: 'मैले सुनेँ:',
      navigatingTo: 'खोल्दैछ',
      startingActivity: 'सुरु गर्दैछ',
      unrecognized: 'मैले बुझिनँ। भन्नुहोस् “रिमाइन्डर हेर्नुहोस्” वा “क्रियाकलाप सुरु गर्नुहोस्।”',
      micDenied: 'आवाज इनपुटको लागि माइक्रोफोन अनुमति आवश्यक छ।',
      notSupported: 'यस उपकरणमा आवाज इनपुट उपलब्ध छैन।',
      noSpeech: 'कुनै आवाज सुनिएन। तयार भएपछि फेरि प्रयास गर्नुहोस्।',
      networkError: 'वाक् सेवा उपलब्ध छैन।',
      readAloudText: 'नमस्ते, म तपाईंसँगै छु। कुनै हतार छैन। तपाईं क्रियाकलाप सुरु गर्नुहोस् वा रिमाइन्डर हेर्नुहोस् भन्न सक्नुहुन्छ।',
    },
    bottomCards: {
      activityTitle: 'क्रियाकलाप सुरु गर्नुहोस्',
      activitySubtitle: 'एक सहज क्रियाकलाप छनोट गर्नुहोस्',
      remindersTitle: 'रिमाइन्डर हेर्नुहोस्',
      remindersSubtitle: 'अब के छ हेर्नुहोस्',
    },
    disclaimer: 'MINDCARE ले संलग्नता र हेरचाहकर्ता सहयोग प्रदान गर्दछ। यो चिकित्सा निदानको विकल्प होइन।',
  },
};

export function HelpVoicePage({
  userName = '',
  selectedLang = 'en',
  reminders: propReminders,
  onNavigate,
  onSignOut,
}) {
  const t = HELP_TRANSLATIONS[selectedLang] || HELP_TRANSLATIONS.en;

  // Resolved reminders from prop or repository
  const reminders = useMemo(() => {
    if (Array.isArray(propReminders)) return propReminders;
    return getStoredReminders();
  }, [propReminders]);

  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('idle'); // idle | success | info | error
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const navigationTimeoutRef = useRef(null);

  // Check browser speech recognition support
  const isSpeechSupported = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  // Cleanup timers & speech on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Interpret voice command and dispatch action
  const processVoiceCommand = (rawTranscript) => {
    const transcript = rawTranscript.trim().toLowerCase();
    setRecognizedText(rawTranscript);

    // 0. Informational Query: "How many reminders are left for today?" & natural variants
    // Must be matched BEFORE generic reminder navigation to prevent navigating away.
    const isReminderCountQuery = (() => {
      const hasReminderWord =
        transcript.includes('reminder') ||
        transcript.includes('reminders') ||
        transcript.includes('रिमाइंडर') ||
        transcript.includes('रिमाइन्डर') ||
        transcript.includes('স্মাৰক') ||
        transcript.includes('सम्झौता');

      if (!hasReminderWord) return false;

      // English variants:
      // "How many reminders are left for today?"
      // "How many reminders do I have left today?"
      // "How many reminders are remaining today?"
      // "How many reminders are left?"
      // "How many reminders do I have today?"
      if (
        transcript.includes('how many') ||
        transcript.includes('left') ||
        transcript.includes('remaining') ||
        (transcript.includes('do i have') && (transcript.includes('today') || transcript.includes('left'))) ||
        transcript.includes('count') ||
        transcript.includes('number of')
      ) {
        return true;
      }

      // Hindi variants: "कितने रिमाइंडर", "रिमाइंडर बाकी", "रिमाइंडर बचे"
      if (
        transcript.includes('कितने') ||
        transcript.includes('कितना') ||
        transcript.includes('बाकी') ||
        transcript.includes('बचे') ||
        transcript.includes('शेष')
      ) {
        return true;
      }

      // Assamese variants: "কিমান স্মাৰক", "স্মাৰক বাকী"
      if (
        transcript.includes('কিমান') ||
        transcript.includes('বাকী') ||
        transcript.includes('আজি')
      ) {
        return true;
      }

      // Nepali variants: "कति रिमाइन्डर", "रिमाइन्डर बाँकी"
      if (
        transcript.includes('कति') ||
        transcript.includes('बाँकी') ||
        transcript.includes('आज')
      ) {
        return true;
      }

      return false;
    })();

    if (isReminderCountQuery) {
      // Clear any pending navigation
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }

      // Dynamic calculation from existing reminder source of truth
      const count = getRemindersLeftForToday(reminders);
      const speechResponse = formatReminderSpeechResponse(count, selectedLang);

      setFeedbackType('success');
      setFeedbackMessage(speechResponse);

      // Speak dynamic result using existing speech synthesis
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechResponse);
        const localeMap = {
          en: 'en-IN',
          hi: 'hi-IN',
          as: 'as-IN',
          ne: 'ne-NP',
        };
        utterance.lang = localeMap[selectedLang] || 'en-IN';
        utterance.rate = 0.92;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }

      // Explicitly return without navigating!
      return;
    }

    // 1. Navigation Commands
    if (
      transcript.includes('home') ||
      transcript.includes('घर') ||
      transcript.includes('गृहपृष्ठ') ||
      transcript.includes('होम')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.navigatingTo} ${t.sidebar.home}...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 900);
      return;
    }

    if (
      transcript.includes('progress') ||
      transcript.includes('प्रगति') ||
      transcript.includes('প্ৰগতি')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.navigatingTo} ${t.sidebar.progress}...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('progress');
      }, 900);
      return;
    }

    if (
      transcript.includes('reminder') ||
      transcript.includes('रिमाइंडर') ||
      transcript.includes('স্মাৰক') ||
      transcript.includes('रिमाइन्डर')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.navigatingTo} ${t.sidebar.reminders}...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('reminders');
      }, 900);
      return;
    }

    if (
      transcript.includes('setting') ||
      transcript.includes('सेटिंग्स') ||
      transcript.includes('ছেটিংছ') ||
      transcript.includes('सेटिङ')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.navigatingTo} ${t.sidebar.settings}...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('settings');
      }, 900);
      return;
    }

    // 2. Individual Activities
    if (transcript.includes('memory') || transcript.includes('मेमोरी') || transcript.includes('মেম’ৰি')) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.startingActivity} Memory match...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('memory-match');
      }, 900);
      return;
    }

    if (transcript.includes('fruit') || transcript.includes('फल') || transcript.includes('फ्रूट') || transcript.includes('ফ্ৰুট')) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.startingActivity} Fruit focus...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('fruit-focus');
      }, 900);
      return;
    }

    if (transcript.includes('pattern') || transcript.includes('पैटर्न') || transcript.includes('পেটাৰ্ন') || transcript.includes('प्याटर्न')) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.startingActivity} Pattern path...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('pattern-path');
      }, 900);
      return;
    }

    if (
      transcript.includes('day in order') ||
      transcript.includes('order') ||
      transcript.includes('दिन का क्रम') ||
      transcript.includes('দিনৰ ক্ৰম') ||
      transcript.includes('दिनको क्रम')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.startingActivity} A day in order...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('day-in-order');
      }, 900);
      return;
    }

    if (
      transcript.includes('activity') ||
      transcript.includes('activities') ||
      transcript.includes('गतिविधि') ||
      transcript.includes('काৰ্য্যকলাপ') ||
      transcript.includes('क्रियाकलाप')
    ) {
      setFeedbackType('success');
      setFeedbackMessage(`${t.hero.navigatingTo} ${t.sidebar.activities}...`);
      navigationTimeoutRef.current = setTimeout(() => {
        if (onNavigate) onNavigate('activities');
      }, 900);
      return;
    }

    // Unrecognized command
    setFeedbackType('info');
    setFeedbackMessage(t.hero.unrecognized);
  };

  // Expose test hook on window for test verification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.testVoiceCommand = (cmd) => {
        processVoiceCommand(cmd);
      };
    }
  });

  // Start or Stop listening
  const handleToggleListening = () => {
    // If not supported
    if (!isSpeechSupported) {
      setFeedbackType('error');
      setFeedbackMessage(t.hero.notSupported);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // If currently speaking via SpeechSynthesis, stop it
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // If already listening, stop
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    // Start recognition
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      // Locale mapping
      const localeMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        as: 'as-IN',
        ne: 'ne-NP',
      };
      recognition.lang = localeMap[selectedLang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setFeedbackType('info');
        setFeedbackMessage(t.hero.listeningState);
      };

      recognition.onresult = (event) => {
        if (event.results && event.results.length > 0) {
          const spoken = event.results[0][0].transcript;
          processVoiceCommand(spoken);
        }
      };

      recognition.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        setIsListening(false);
        setFeedbackType('error');
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setFeedbackMessage(t.hero.micDenied);
        } else if (event.error === 'no-speech') {
          setFeedbackMessage(t.hero.noSpeech);
        } else if (event.error === 'network') {
          setFeedbackMessage(t.hero.networkError);
        } else {
          setFeedbackMessage(t.hero.notSupported);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start SpeechRecognition:', err);
      setIsListening(false);
      setFeedbackType('error');
      setFeedbackMessage(t.hero.notSupported);
    }
  };

  // Read Aloud Handler
  const handleToggleReadAloud = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setFeedbackType('error');
      setFeedbackMessage('Speech synthesis is not supported on this device.');
      return;
    }

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    // If already speaking, cancel
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = t.hero.readAloudText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const localeMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      as: 'as-IN',
      ne: 'ne-NP',
    };
    utterance.lang = localeMap[selectedLang] || 'en-IN';
    utterance.rate = 0.92;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // User initials for top-bar avatar
  const userInitials = useMemo(() => {
    if (!userName || typeof userName !== 'string') return 'AD';
    const trimmed = userName.trim();
    if (!trimmed) return 'AD';
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [userName]);

  // Sidebar navigation
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
    <div className="help-layout" aria-label="MINDCARE Help and Voice Dashboard">
      {/* ==========================================================================
          LEFT SIDEBAR
          ========================================================================== */}
      <aside className="help-sidebar" aria-label="Main Navigation">
        <div className="sidebar-top">
          {/* Brand */}
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
                  className="sidebar-nav-btn active"
                  onClick={() => handleNavClick('help')}
                  aria-current="page"
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
      <main className="help-main-wrapper" id="help-content">
        {/* Top Status Bar */}
        <header className="help-top-bar" aria-label="System status">
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

        <div className="help-content-container">
          {/* Header Banner */}
          <section className="help-header-section">
            <span className="help-eyebrow">{t.eyebrow}</span>
            <h1 className="help-page-title">{t.title}</h1>
          </section>

          {/* ==========================================================================
              MAIN HERO CARD
              ========================================================================== */}
          <section className="help-hero-card" aria-label="Voice assistance">
            {/* Top Badge with Heart Icon */}
            <div className="hero-heart-badge" aria-hidden="true">
              <FamilyHeartIcon size={26} color="#183D36" />
            </div>

            <h2 className="hero-heading">{t.hero.title}</h2>
            <p className="hero-subtitle">{t.hero.subtitle}</p>

            {/* Action Buttons */}
            <div className="hero-buttons-stack">
              {/* 1. Read aloud Button */}
              <button
                type="button"
                className={`hero-btn-read ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleToggleReadAloud}
                aria-label={isSpeaking ? t.hero.speaking : t.hero.readAloud}
              >
                <SpeakerIcon size={20} color="#FAF6EE" />
                <span>{isSpeaking ? t.hero.speaking : t.hero.readAloud}</span>
              </button>

              {/* 2. Start / Stop listening Button */}
              <button
                type="button"
                className={`hero-btn-listen ${isListening ? 'listening' : ''}`}
                onClick={handleToggleListening}
                aria-label={isListening ? t.hero.stopListening : t.hero.startListening}
              >
                <span className={`mic-icon-wrapper ${isListening ? 'pulse' : ''}`}>
                  <MicrophoneIcon size={20} color="#183D36" />
                </span>
                <span>{isListening ? t.hero.stopListening : t.hero.startListening}</span>
              </button>
            </div>

            {/* Helper Hint */}
            <p className="hero-hint-text">{t.hero.hint}</p>

            {/* Active Listening / Transcript Feedback Area */}
            {(isListening || recognizedText || feedbackMessage) && (
              <div className={`voice-feedback-card feedback-${feedbackType}`}>
                {isListening && (
                  <div className="listening-indicator-row">
                    <span className="listening-pulse-dot" />
                    <span className="listening-text">{t.hero.listeningState}</span>
                  </div>
                )}

                {recognizedText && (
                  <div className="heard-transcript-row">
                    <span className="heard-label">{t.hero.heardPrefix}</span>
                    <span className="heard-quote">“{recognizedText}”</span>
                  </div>
                )}

                {feedbackMessage && !isListening && (
                  <div className="feedback-message-text">{feedbackMessage}</div>
                )}
              </div>
            )}

            {/* Privacy Notice */}
            <div className="hero-privacy-note">
              <span>{t.hero.privacyNotice}</span>
            </div>
          </section>

          {/* ==========================================================================
              BOTTOM TWO QUICK-ACTION CARDS
              ========================================================================== */}
          <section className="help-bottom-grid">
            {/* Card 1: Start an activity */}
            <div
              className="quick-nav-card"
              role="button"
              tabIndex={0}
              onClick={() => handleNavClick('activities')}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('activities')}
            >
              <div className="quick-card-left">
                <div className="quick-icon-box" aria-hidden="true">
                  <PlayOutlineIcon size={22} color="#183D36" />
                </div>
                <div className="quick-card-text">
                  <h3 className="quick-title">{t.bottomCards.activityTitle}</h3>
                  <p className="quick-subtitle">{t.bottomCards.activitySubtitle}</p>
                </div>
              </div>
              <ChevronRightIcon size={18} color="#8DA89E" />
            </div>

            {/* Card 2: Check reminders */}
            <div
              className="quick-nav-card"
              role="button"
              tabIndex={0}
              onClick={() => handleNavClick('reminders')}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('reminders')}
            >
              <div className="quick-card-left">
                <div className="quick-icon-box" aria-hidden="true">
                  <BellNavIcon size={22} color="#183D36" />
                </div>
                <div className="quick-card-text">
                  <h3 className="quick-title">{t.bottomCards.remindersTitle}</h3>
                  <p className="quick-subtitle">{t.bottomCards.remindersSubtitle}</p>
                </div>
              </div>
              <ChevronRightIcon size={18} color="#8DA89E" />
            </div>
          </section>

          {/* Bottom Disclaimer */}
          <footer className="help-footer-disclaimer">
            <ShieldIcon size={16} color="#7B958B" />
            <span>{t.disclaimer}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
