import React, { useState, useMemo, useEffect } from 'react';
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
  CheckCircleIcon,
  PillCapsuleIcon,
  WaterDropIcon,
  ForkKnifeIcon,
  WalkingActivityIcon,
  FamilyHeartIcon,
  NoteReminderIcon,
  MoreDotsIcon,
  PlusIcon,
  MedicalAppointmentIcon,
} from './Icons';
import './RemindersPage.css';

const REMINDER_TRANSLATIONS = {
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
    eyebrow: 'A gentle nudge',
    title: 'Reminders',
    subtitle: 'Small notes that help the day feel a little lighter.',
    addBtn: 'Add reminder',
    syncNotice: 'Reminders are saved on this device and will sync when you are online.',
    actions: {
      complete: 'Complete',
      done: 'Done',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save reminder',
      confirmDelete: 'Delete',
    },
    status: {
      dueEarlier: 'Due earlier today',
      everyDay: 'Every day',
      once: 'Once',
    },
    emptyState: {
      title: 'No reminders yet.',
      subtitle: "Add a reminder whenever you'd like a little help remembering.",
    },
    modal: {
      addTitle: 'Add a reminder',
      editTitle: 'Edit reminder',
      titleLabel: 'What would you like to remember?',
      titlePlaceholder: 'e.g., Morning medicine',
      timeLabel: 'Time',
      repeatLabel: 'Repeat',
      categoryLabel: 'Category',
      customDaysLabel: 'Select days',
      validationTitle: 'Please enter what you would like to remember.',
      validationTime: 'Please choose a scheduled time.',
      repeats: {
        once: 'Once',
        everyDay: 'Every day',
        custom: 'Custom',
      },
      categories: {
        medical: 'Medical appointment',
        medicine: 'Medicine',
        water: 'Water',
        food: 'Food',
        activity: 'Activity',
        family: 'Family',
        other: 'Other',
      },
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    deleteConfirm: {
      title: 'Delete this reminder?',
      message: 'This will remove the reminder from your list. You can always create it again later.',
    },
    starters: {
      morningMedicine: 'Morning medicine',
      waterGlass: 'Drink a glass of water',
      lunch: 'Lunch',
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
    eyebrow: 'एक कोमल संकेत',
    title: 'रिमाइंडर',
    subtitle: 'छोटे-छोटे नोट जो दिन को थोड़ा हल्का और सहज बनाते हैं।',
    addBtn: 'रिमाइंडर जोड़ें',
    syncNotice: 'रिमाइंडर इस डिवाइस पर सुरक्षित हैं और ऑनलाइन होने पर सिंक होंगे।',
    actions: {
      complete: 'पूरा करें',
      done: 'हो गया',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      cancel: 'रद्द करें',
      save: 'रिमाइंडर सहेजें',
      confirmDelete: 'हटाएं',
    },
    status: {
      dueEarlier: 'आज पहले नियत था',
      everyDay: 'हर दिन',
      once: 'एक बार',
    },
    emptyState: {
      title: 'अभी तक कोई रिमाइंडर नहीं।',
      subtitle: 'जब भी आपको याद रखने में थोड़ी मदद चाहिए, रिमाइंडर जोड़ें।',
    },
    modal: {
      addTitle: 'एक रिमाइंडर जोड़ें',
      editTitle: 'रिमाइंडर संपादित करें',
      titleLabel: 'आप क्या याद रखना चाहेंगे?',
      titlePlaceholder: 'जैसे, सुबह की दवाई',
      timeLabel: 'समय',
      repeatLabel: 'दोहराएं',
      categoryLabel: 'श्रेणी',
      customDaysLabel: 'दिन चुनें',
      validationTitle: 'कृपया लिखें कि आप क्या याद रखना चाहते हैं।',
      validationTime: 'कृपया एक निर्धारित समय चुनें।',
      repeats: {
        once: 'एक बार',
        everyDay: 'हर दिन',
        custom: 'कस्टम',
      },
      categories: {
        medical: 'चिकित्सा अपॉइंटमेंट',
        medicine: 'दवाई',
        water: 'पानी',
        food: 'भोजन',
        activity: 'गतिविधि',
        family: 'परिवार',
        other: 'अन्य',
      },
      days: ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'],
    },
    deleteConfirm: {
      title: 'क्या यह रिमाइंडर हटाएं?',
      message: 'यह रिमाइंडर आपकी सूची से हट जाएगा। आप इसे बाद में फिर से बना सकते हैं।',
    },
    starters: {
      morningMedicine: 'सुबह की दवाई',
      waterGlass: 'एक गिलास पानी पिएं',
      lunch: 'दोपहर का भोजन',
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
    eyebrow: 'এক মৃদু সোঁৱৰণি',
    title: 'স্মাৰক',
    subtitle: 'সৰু টোকা যিয়ে দিনটোক অলপ পাতল আৰু সহজ কৰি তোলে।',
    addBtn: 'স্মাৰক যোগ কৰক',
    syncNotice: 'স্মাৰকসমূহ এই ডিভাইচত সংৰক্ষিত আৰু অনলাইন হ’লে সমন্বয় হ’ব।',
    actions: {
      complete: 'সম্পূৰ্ণ কৰক',
      done: 'হৈ গ’ল',
      edit: 'সম্পাদনা',
      delete: 'মচি পেলাওক',
      cancel: 'বাতিল কৰক',
      save: 'স্মাৰক সংৰক্ষণ কৰক',
      confirmDelete: 'মচক',
    },
    status: {
      dueEarlier: 'আজিৰ পূৰ্বৰ সময়',
      everyDay: 'প্ৰতিদিনে',
      once: 'এবাৰ',
    },
    emptyState: {
      title: 'এতিয়ালৈকে কোনো স্মাৰক নাই।',
      subtitle: 'মনত ৰখাত অলপ সহায় লাগিলে এটা স্মাৰক যোগ কৰক।',
    },
    modal: {
      addTitle: 'স্মাৰক যোগ কৰক',
      editTitle: 'স্মাৰক সম্পাদনা কৰক',
      titleLabel: 'আপুনি কি মনত ৰাখিব বিচাৰে?',
      titlePlaceholder: 'উদাহৰণস্বৰূপে, পুৱাৰ ঔষধ',
      timeLabel: 'সময়',
      repeatLabel: 'পুনৰাবৃত্তি',
      categoryLabel: 'শ্ৰেণী',
      customDaysLabel: 'দিন বাছক',
      validationTitle: 'অনুগ্ৰহ কৰি কি মনত ৰাখিব বিচাৰে লিখক।',
      validationTime: 'অনুগ্ৰহ কৰি এটা সময় নিৰ্ধাৰণ কৰক।',
      repeats: {
        once: 'এবাৰ',
        everyDay: 'প্ৰতিদিনে',
        custom: 'স্বনিৰ্বাচিত',
      },
      categories: {
        medical: 'চিকিৎসা এপইণ্টমেণ্ট',
        medicine: 'ঔষধ',
        water: 'পানী',
        food: 'খাদ্য',
        activity: 'কাৰ্য্যকলাপ',
        family: 'পৰিয়াল',
        other: 'অন্যান্য',
      },
      days: ['সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্ৰ', 'শনি', 'দেও'],
    },
    deleteConfirm: {
      title: 'এই স্মাৰকটো মচি পেলাব বিচাৰেনে?',
      message: 'ই আপোনাৰ তালিকাৰ পৰা স্মাৰকটো আঁতৰাব। পিছত পুনৰ সৃষ্টি কৰিব পাৰিব।',
    },
    starters: {
      morningMedicine: 'পুৱাৰ ঔষধ',
      waterGlass: 'এগিলাচ পানী খাওক',
      lunch: 'দুপৰীয়াৰ সাজ',
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
    eyebrow: 'एक कोमल सम्झना',
    title: 'रिमाइन्डरहरू',
    subtitle: 'साना नोटहरू जसले दिनलाई अलि हलुका र सहज बनाउँछन्।',
    addBtn: 'रिमाइन्डर थप्नुहोस्',
    syncNotice: 'रिमाइन्डरहरू यस उपकरणमा सुरक्षित छन् र अनलाइन हुँदा सिङ्क हुनेछन्।',
    actions: {
      complete: 'पूरा गर्नुहोस्',
      done: 'सकियो',
      edit: 'सम्पादन',
      delete: 'हटाउनुहोस्',
      cancel: 'रद्द गर्नुहोस्',
      save: 'रिमाइन्डर बचत गर्नुहोस्',
      confirmDelete: 'हटाउनुहोस्',
    },
    status: {
      dueEarlier: 'आज अघि नै समय भएको',
      everyDay: 'हरेक दिन',
      once: 'एक पटक',
    },
    emptyState: {
      title: 'अहिलेसम्म कुनै रिमाइन्डर छैन।',
      subtitle: 'सम्झन केही मद्दत चाहिन्छ भने रिमाइन्डर थप्नुहोस्।',
    },
    modal: {
      addTitle: 'रिमाइन्डर थप्नुहोस्',
      editTitle: 'रिमाइन्डर सम्पादन गर्नुहोस्',
      titleLabel: 'तपाईं के सम्झन चाहनुहुन्छ?',
      titlePlaceholder: 'जस्तै, बिहानको औषधि',
      timeLabel: 'समय',
      repeatLabel: 'दोहोर्याउनुहोस्',
      categoryLabel: 'वर्ग',
      customDaysLabel: 'दिनहरू छनोट गर्नुहोस्',
      validationTitle: 'कृपया तपाईंले के सम्झन चाहनुहुन्छ लेख्नुहोस्।',
      validationTime: 'कृपया समय चयन गर्नुहोस्।',
      repeats: {
        once: 'एक पटक',
        everyDay: 'हरेक दिन',
        custom: 'अनुकूल',
      },
      categories: {
        medical: 'चिकित्सा भेट',
        medicine: 'औषधि',
        water: 'पानी',
        food: 'खाना',
        activity: 'क्रियाकलाप',
        family: 'परिवार',
        other: 'अन्य',
      },
      days: ['सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि', 'आइत'],
    },
    deleteConfirm: {
      title: 'के यो रिमाइन्डर मेटाउनुहुन्छ?',
      message: 'यसले सूचीबाट रिमाइन्डर हटाउनेछ। तपाईंले पछि फेरि थप्न सक्नुहुन्छ।',
    },
    starters: {
      morningMedicine: 'बिहानको औषधि',
      waterGlass: 'एक गिलास पानी पिउनुहोस्',
      lunch: 'दिउँसोको खाना',
    },
  },
};

/**
 * Format 24-hour time string ("08:30" or "13:00") into 12-hour format ("8:30 AM", "1:00 PM")
 */
function formatTimeDisplay(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  if (isNaN(hours)) return timeStr;

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Convert minutes from midnight for sorting
 */
function getMinutesFromTime(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  if (parts.length < 2) return 0;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

/**
 * Check if a time string has already passed today
 */
function isTimePassedToday(timeStr) {
  if (!timeStr) return false;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const reminderMinutes = getMinutesFromTime(timeStr);
  return currentMinutes > reminderMinutes;
}

export function RemindersPage({
  userName = '',
  selectedLang = 'en',
  onNavigate,
  onSignOut,
  reminders: propReminders,
  onUpdateReminders,
}) {
  const t = REMINDER_TRANSLATIONS[selectedLang] || REMINDER_TRANSLATIONS.en;

  // Starter reminders matching prototype screenshot
  const defaultStarters = useMemo(
    () => [
      {
        id: 'starter-1',
        title: t.starters.morningMedicine,
        time: '08:30',
        repeat: 'everyDay',
        category: 'medicine',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'starter-2',
        title: t.starters.waterGlass,
        time: '10:00',
        repeat: 'everyDay',
        category: 'water',
        completed: true, // Matches prototype!
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
      {
        id: 'starter-3',
        title: t.starters.lunch,
        time: '13:00',
        repeat: 'everyDay',
        category: 'food',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ],
    [t]
  );

  // Initialize reminders from props, localStorage, or defaults
  const [localReminders, setLocalReminders] = useState(() => {
    if (propReminders && Array.isArray(propReminders)) return propReminders;
    try {
      const stored = localStorage.getItem('mindcare_reminders');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Could not read reminders from localStorage:', e);
    }
    return defaultStarters;
  });

  const reminders = propReminders && Array.isArray(propReminders) ? propReminders : localReminders;

  const setReminders = (updater) => {
    const nextVal = typeof updater === 'function' ? updater(reminders) : updater;
    setLocalReminders(nextVal);
    if (onUpdateReminders) {
      onUpdateReminders(nextVal);
    } else {
      try {
        localStorage.setItem('mindcare_reminders', JSON.stringify(nextVal));
      } catch (e) {
        console.warn('Could not write reminders to localStorage:', e);
      }
    }
  };

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTime, setFormTime] = useState('09:00');
  const [formDate, setFormDate] = useState('');
  const [formRepeat, setFormRepeat] = useState('everyDay');
  const [formCustomDays, setFormCustomDays] = useState(['Mon', 'Wed', 'Fri']);
  const [formCategory, setFormCategory] = useState('medicine');
  const [formNote, setFormNote] = useState('');
  const [formError, setFormError] = useState('');

  // Delete confirmation modal state
  const [deletingId, setDeletingId] = useState(null);

  // Active menu dropdown id
  const [openMenuId, setOpenMenuId] = useState(null);

  // Sync with localStorage whenever reminders change (if not handled by parent)
  useEffect(() => {
    if (!onUpdateReminders) {
      try {
        localStorage.setItem('mindcare_reminders', JSON.stringify(reminders));
      } catch (e) {
        console.warn('Could not write reminders to localStorage:', e);
      }
    }
  }, [reminders, onUpdateReminders]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.reminder-menu-wrapper')) {
        setOpenMenuId(null);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Sort reminders chronologically by time
  const sortedReminders = useMemo(() => {
    return [...reminders].sort((a, b) => {
      const timeA = getMinutesFromTime(a.time);
      const timeB = getMinutesFromTime(b.time);
      return timeA - timeB;
    });
  }, [reminders]);

  // Toggle completion status
  const handleToggleComplete = (id) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextCompleted = !r.completed;
          return {
            ...r,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null,
          };
        }
        return r;
      })
    );
  };

  // Open modal for Adding
  const handleOpenAddModal = () => {
    setEditingReminder(null);
    setFormTitle('');
    setFormTime('09:00');
    setFormDate('');
    setFormRepeat('everyDay');
    setFormCustomDays(['Mon', 'Wed', 'Fri']);
    setFormCategory('medicine');
    setFormNote('');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEditModal = (reminder) => {
    setEditingReminder(reminder);
    setFormTitle(reminder.title);
    setFormTime(reminder.time || '09:00');
    setFormDate(reminder.date || '');
    setFormRepeat(reminder.repeat || 'everyDay');
    setFormCustomDays(reminder.customDays || ['Mon', 'Wed', 'Fri']);
    setFormCategory(reminder.category || 'other');
    setFormNote(reminder.note || '');
    setFormError('');
    setOpenMenuId(null);
    setIsModalOpen(true);
  };

  // Save Add/Edit
  const handleSaveReminder = (e) => {
    e.preventDefault();
    const cleanTitle = formTitle.trim();
    if (!cleanTitle) {
      setFormError(t.modal.validationTitle);
      return;
    }
    if (!formTime) {
      setFormError(t.modal.validationTime);
      return;
    }

    if (editingReminder) {
      // Update existing
      setReminders((prev) =>
        prev.map((r) =>
          r.id === editingReminder.id
            ? {
                ...r,
                title: cleanTitle,
                time: formTime,
                date: formDate || r.date || '',
                repeat: formRepeat,
                customDays: formRepeat === 'custom' ? formCustomDays : [],
                category: formCategory,
                note: formNote.trim(),
              }
            : r
        )
      );
    } else {
      // Create new
      const newReminder = {
        id: `reminder-${Date.now()}`,
        elderId: 'elder_anima_01',
        title: cleanTitle,
        time: formTime,
        date: formDate || '',
        repeat: formRepeat,
        customDays: formRepeat === 'custom' ? formCustomDays : [],
        category: formCategory,
        note: formNote.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setReminders((prev) => [newReminder, ...prev]);
    }

    setIsModalOpen(false);
    setEditingReminder(null);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!deletingId) return;
    setReminders((prev) => prev.filter((r) => r.id !== deletingId));
    setDeletingId(null);
    setOpenMenuId(null);
  };

  // Toggle custom day selection
  const handleToggleDay = (day) => {
    setFormCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
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

  // Sidebar navigation handler
  const handleNavClick = (navId) => {
    if (navId === 'signOut') {
      if (onSignOut) onSignOut();
      return;
    }
    if (onNavigate) {
      onNavigate(navId);
    }
  };

  // Helper to render appropriate category icon
  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'medical':
      case 'medical-appointment':
      case 'medical_appointment':
        return <MedicalAppointmentIcon size={24} color="#183D36" />;
      case 'medicine':
        return <PillCapsuleIcon size={24} color="#183D36" />;
      case 'water':
        return <WaterDropIcon size={24} color="#183D36" />;
      case 'food':
        return <ForkKnifeIcon size={24} color="#183D36" />;
      case 'activity':
        return <WalkingActivityIcon size={24} color="#183D36" />;
      case 'family':
        return <FamilyHeartIcon size={24} color="#183D36" />;
      default:
        return <NoteReminderIcon size={24} color="#183D36" />;
    }
  };

  // Helper for repeat text
  const getRepeatLabel = (reminder) => {
    if (reminder.repeat === 'everyDay') return t.status.everyDay;
    if (reminder.repeat === 'once') return t.status.once;
    if (reminder.repeat === 'custom' && reminder.customDays?.length > 0) {
      return reminder.customDays.join(', ');
    }
    return '';
  };

  return (
    <div className="reminders-layout" aria-label="MINDCARE Reminders Dashboard">
      {/* ==========================================================================
          LEFT SIDEBAR
          ========================================================================== */}
      <aside className="reminders-sidebar" aria-label="Main Navigation">
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
                  className="sidebar-nav-btn active"
                  onClick={() => handleNavClick('reminders')}
                  aria-current="page"
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
      <main className="reminders-main-wrapper" id="reminders-content">
        {/* Top Status Bar */}
        <header className="reminders-top-bar" aria-label="System status">
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

        <div className="reminders-content-container">
          {/* Header Section with + Add reminder button */}
          <section className="reminders-header-section">
            <div className="header-titles">
              <span className="reminders-eyebrow">{t.eyebrow}</span>
              <h1 className="reminders-page-title">{t.title}</h1>
              <p className="reminders-subtitle">{t.subtitle}</p>
            </div>

            <button
              type="button"
              className="add-reminder-btn"
              onClick={handleOpenAddModal}
              aria-label={t.addBtn}
            >
              <PlusIcon size={18} />
              <span>{t.addBtn}</span>
            </button>
          </section>

          {/* Reminders List */}
          <section className="reminders-list-section" aria-label="List of reminders">
            {sortedReminders.length > 0 ? (
              <div className="reminders-cards-stack">
                {sortedReminders.map((reminder) => {
                  const isOverdue = !reminder.completed && isTimePassedToday(reminder.time);
                  const repeatText = getRepeatLabel(reminder);

                  return (
                    <div
                      key={reminder.id}
                      className={`reminder-card ${reminder.completed ? 'card-completed' : ''}`}
                    >
                      {/* Left: Category Icon & Details */}
                      <div className="reminder-left-group">
                        <div className="reminder-icon-box" aria-hidden="true">
                          {renderCategoryIcon(reminder.category)}
                        </div>

                        <div className="reminder-details">
                          <h2
                            className={`reminder-title ${
                              reminder.completed ? 'title-completed' : ''
                            }`}
                          >
                            {reminder.title}
                          </h2>

                          <div className="reminder-meta-row">
                            <span className="reminder-time-group">
                              <ClockOutlineIcon size={16} color="#68857B" />
                              <span>{formatTimeDisplay(reminder.time)}</span>
                            </span>

                            {reminder.date && (
                              <>
                                <span className="meta-separator">·</span>
                                <span className="reminder-date-badge">{reminder.date}</span>
                              </>
                            )}

                            {repeatText && (
                              <>
                                <span className="meta-separator">·</span>
                                <span className="reminder-repeat-badge">{repeatText}</span>
                              </>
                            )}

                            {isOverdue && (
                              <>
                                <span className="meta-separator">·</span>
                                <span className="reminder-overdue-tag">
                                  {t.status.dueEarlier}
                                </span>
                              </>
                            )}
                          </div>

                          {reminder.note && (
                            <p className="reminder-item-note-text">{reminder.note}</p>
                          )}
                        </div>
                      </div>

                      {/* Right: Complete Button & Menu */}
                      <div className="reminder-right-group">
                        {reminder.completed ? (
                          <button
                            type="button"
                            className="reminder-done-pill"
                            onClick={() => handleToggleComplete(reminder.id)}
                            title="Click to mark incomplete"
                            aria-label={`Completed: ${reminder.title}`}
                          >
                            <CheckCircleIcon size={18} color="#4A6F62" />
                            <span>{t.actions.done}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="reminder-complete-btn"
                            onClick={() => handleToggleComplete(reminder.id)}
                            aria-label={`Mark complete: ${reminder.title}`}
                          >
                            {t.actions.complete}
                          </button>
                        )}

                        {/* Unobtrusive ⋯ Menu */}
                        <div className="reminder-menu-wrapper">
                          <button
                            type="button"
                            className="reminder-menu-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === reminder.id ? null : reminder.id);
                            }}
                            aria-label="Reminder options"
                            aria-expanded={openMenuId === reminder.id}
                          >
                            <MoreDotsIcon size={18} color="#6D8B80" />
                          </button>

                          {openMenuId === reminder.id && (
                            <div className="reminder-dropdown-menu" role="menu">
                              <button
                                type="button"
                                className="dropdown-item"
                                role="menuitem"
                                onClick={() => handleOpenEditModal(reminder)}
                              >
                                {t.actions.edit}
                              </button>
                              <button
                                type="button"
                                className="dropdown-item item-delete"
                                role="menuitem"
                                onClick={() => {
                                  setDeletingId(reminder.id);
                                  setOpenMenuId(null);
                                }}
                              >
                                {t.actions.delete}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-reminders-container">
                <div className="empty-icon-circle">
                  <BellNavIcon size={36} color="#8DA89E" />
                </div>
                <h2 className="empty-reminders-title">{t.emptyState.title}</h2>
                <p className="empty-reminders-subtitle">{t.emptyState.subtitle}</p>
                <button
                  type="button"
                  className="add-reminder-btn empty-add-btn"
                  onClick={handleOpenAddModal}
                >
                  <PlusIcon size={18} />
                  <span>{t.addBtn}</span>
                </button>
              </div>
            )}
          </section>

          {/* Bottom Sync Message */}
          <footer className="reminders-footer">
            <CloudIcon size={16} color="#7B958B" />
            <span>{t.syncNotice}</span>
          </footer>
        </div>
      </main>

      {/* ==========================================================================
          ADD / EDIT REMINDER MODAL
          ========================================================================== */}
      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
        >
          <div
            className="modal-dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-heading" className="modal-title">
                {editingReminder ? t.modal.editTitle : t.modal.addTitle}
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="modal-form">
              {/* Reminder Title Input */}
              <div className="form-group">
                <label htmlFor="reminder-title-input" className="form-label">
                  {t.modal.titleLabel}
                </label>
                <input
                  id="reminder-title-input"
                  type="text"
                  className="form-input"
                  placeholder={t.modal.titlePlaceholder}
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (formError) setFormError('');
                  }}
                  autoFocus
                />
              </div>

              {/* Time Input */}
              <div className="form-group">
                <label htmlFor="reminder-time-input" className="form-label">
                  {t.modal.timeLabel}
                </label>
                <input
                  id="reminder-time-input"
                  type="time"
                  className="form-input form-time-input"
                  value={formTime}
                  onChange={(e) => {
                    setFormTime(e.target.value);
                    if (formError) setFormError('');
                  }}
                />
              </div>

              {/* Repeat Options */}
              <div className="form-group">
                <span className="form-label">{t.modal.repeatLabel}</span>
                <div className="repeat-options-row">
                  {[
                    { key: 'once', label: t.modal.repeats.once },
                    { key: 'everyDay', label: t.modal.repeats.everyDay },
                    { key: 'custom', label: t.modal.repeats.custom },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      className={`repeat-pill-btn ${formRepeat === opt.key ? 'active' : ''}`}
                      onClick={() => setFormRepeat(opt.key)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Custom days pills */}
                {formRepeat === 'custom' && (
                  <div className="custom-days-selector">
                    <span className="custom-days-label">{t.modal.customDaysLabel}:</span>
                    <div className="days-pills-row">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          className={`day-selector-btn ${
                            formCustomDays.includes(day) ? 'selected' : ''
                          }`}
                          onClick={() => handleToggleDay(day)}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category Options */}
              <div className="form-group">
                <span className="form-label">{t.modal.categoryLabel}</span>
                <div className="category-options-grid">
                  {[
                    { key: 'medical', label: t.modal.categories.medical || 'Medical appointment', icon: MedicalAppointmentIcon },
                    { key: 'medicine', label: t.modal.categories.medicine, icon: PillCapsuleIcon },
                    { key: 'water', label: t.modal.categories.water, icon: WaterDropIcon },
                    { key: 'food', label: t.modal.categories.food, icon: ForkKnifeIcon },
                    { key: 'activity', label: t.modal.categories.activity, icon: WalkingActivityIcon },
                    { key: 'family', label: t.modal.categories.family, icon: FamilyHeartIcon },
                    { key: 'other', label: t.modal.categories.other, icon: NoteReminderIcon },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        className={`category-select-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setFormCategory(cat.key)}
                      >
                        <span className="cat-btn-icon">
                          <Icon size={20} color={isSelected ? '#183D36' : '#5C7B71'} />
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Date & Notes */}
              <div className="form-group">
                <label htmlFor="reminder-date-input" className="form-label">
                  Date <span className="label-optional">(optional)</span>
                </label>
                <input
                  id="reminder-date-input"
                  type="date"
                  className="form-input"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reminder-note-input" className="form-label">
                  Note <span className="label-optional">(optional)</span>
                </label>
                <input
                  id="reminder-note-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Room 302, bring previous reports"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                />
              </div>

              {/* Gentle Validation Error */}
              {formError && <p className="form-error-msg">{formError}</p>}

              {/* Form Buttons */}
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t.actions.cancel}
                </button>
                <button type="submit" className="modal-btn-save">
                  {t.actions.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================================================
          DELETE CONFIRMATION MODAL
          ========================================================================== */}
      {deletingId && (
        <div
          className="modal-backdrop"
          onClick={() => setDeletingId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog-card delete-confirm-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">{t.deleteConfirm.title}</h2>
            <p className="delete-confirm-message">{t.deleteConfirm.message}</p>
            <div className="modal-actions-row">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={() => setDeletingId(null)}
              >
                {t.actions.cancel}
              </button>
              <button
                type="button"
                className="modal-btn-delete-confirm"
                onClick={handleConfirmDelete}
              >
                {t.actions.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
