/**
 * MINDCARE Reminder Repository & Shared State Utilities
 * Provides a persistent, elderId-associated abstraction for reminder data.
 * Structured so that frontend localStorage can easily be replaced by backend API calls.
 */

export const STORAGE_KEY_REMINDERS = 'mindcare_reminders';
export const DEFAULT_ELDER_ID = 'elder_anima_01';

export const DEFAULT_STARTER_REMINDERS = [
  {
    id: 'starter-1',
    elderId: DEFAULT_ELDER_ID,
    title: 'Morning medicine',
    time: '08:30',
    repeat: 'everyDay',
    category: 'medicine',
    completed: false,
    createdAt: '2026-09-14T08:00:00.000Z',
  },
  {
    id: 'starter-2',
    elderId: DEFAULT_ELDER_ID,
    title: 'A glass of water',
    time: '10:00',
    repeat: 'everyDay',
    category: 'water',
    completed: true,
    createdAt: '2026-09-14T08:00:00.000Z',
    completedAt: '2026-09-14T10:05:00.000Z',
  },
  {
    id: 'starter-3',
    elderId: DEFAULT_ELDER_ID,
    title: 'Lunch',
    time: '13:00',
    repeat: 'everyDay',
    category: 'food',
    completed: false,
    createdAt: '2026-09-14T08:00:00.000Z',
  },
];

/**
 * Get current date string formatted as YYYY-MM-DD
 */
export function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Retrieve reminders associated with an elderId from persistent storage.
 */
export function getStoredReminders(elderId = DEFAULT_ELDER_ID) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REMINDERS);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Ensure elderId is set for backwards compatibility
        return parsed.map((item) => ({
          ...item,
          elderId: item.elderId || elderId || DEFAULT_ELDER_ID,
        }));
      }
    }
  } catch (err) {
    console.warn('[reminderRepository] Could not read reminders from localStorage:', err);
  }

  // Fallback to starter reminders with current elderId
  return DEFAULT_STARTER_REMINDERS.map((r) => ({
    ...r,
    elderId: elderId || DEFAULT_ELDER_ID,
  }));
}

/**
 * Save reminders to persistent storage.
 */
export function saveStoredReminders(elderId = DEFAULT_ELDER_ID, reminders = []) {
  try {
    const sanitized = (reminders || []).map((item) => ({
      ...item,
      elderId: item.elderId || elderId || DEFAULT_ELDER_ID,
    }));
    localStorage.setItem(STORAGE_KEY_REMINDERS, JSON.stringify(sanitized));
    return sanitized;
  } catch (err) {
    console.warn('[reminderRepository] Could not save reminders to localStorage:', err);
    return reminders;
  }
}

/**
 * Create a new standardized reminder item.
 */
export function createReminder({
  elderId = DEFAULT_ELDER_ID,
  title,
  category = 'medical',
  date = '',
  time = '09:00',
  repeat = 'once',
  customDays = [],
  note = '',
  createdBy = 'elder',
}) {
  const cleanTitle = (title || '').trim();
  const cleanNote = (note || '').trim();
  const cleanDate = date || getTodayDateString();

  return {
    id: `reminder-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    elderId: elderId || DEFAULT_ELDER_ID,
    title: cleanTitle,
    category,
    date: cleanDate,
    time: time || '09:00',
    repeat: repeat || 'once',
    customDays: repeat === 'custom' ? customDays : [],
    note: cleanNote,
    completed: false,
    createdAt: new Date().toISOString(),
    createdBy,
  };
}

/**
 * Determine if a specific reminder is scheduled for today.
 */
export function isReminderScheduledForToday(reminder) {
  if (!reminder) return false;

  const todayStr = getTodayDateString();
  const now = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDay = dayNames[now.getDay()];

  // If a specific date is given
  if (reminder.date) {
    if (reminder.date === todayStr) return true;
    // Specific date is not today, and it is a one-time reminder
    if (!reminder.repeat || reminder.repeat === 'once') return false;
  }

  // Custom days of week
  if (reminder.repeat === 'custom') {
    return Array.isArray(reminder.customDays) && reminder.customDays.includes(todayDay);
  }

  // Routine every day
  if (reminder.repeat === 'everyDay') {
    return true;
  }

  // If no date or repeat specified, default to today
  return true;
}

/**
 * Count the number of incomplete reminders applicable to today.
 */
export function getRemindersLeftForToday(reminders) {
  if (!Array.isArray(reminders)) return 0;
  return reminders.filter((r) => !r.completed && isReminderScheduledForToday(r)).length;
}

/**
 * Format spoken and displayed response for "How many reminders are left for today?".
 */
export function formatReminderSpeechResponse(count, lang = 'en') {
  const safeCount = Number.isInteger(count) ? Math.max(0, count) : 0;

  switch (lang) {
    case 'hi':
      if (safeCount === 0) {
        return 'आज के लिए आपका कोई रिमाइंडर शेष नहीं है।';
      }
      if (safeCount === 1) {
        return 'आज के लिए आपका 1 रिमाइंडर बाकी है।';
      }
      return `आज के लिए आपके ${safeCount} रिमाइंडर बाकी हैं।`;

    case 'as':
      if (safeCount === 0) {
        return 'আজিৰ বাবে আপোনাৰ কোনো স্মাৰক বাকী নাই।';
      }
      if (safeCount === 1) {
        return 'আজিৰ বাবে আপোনাৰ 1 টা স্মাৰক বাকী আছে।';
      }
      return `আজিৰ বাবে আপোনাৰ ${safeCount} টা স্মাৰক বাকী আছে।`;

    case 'ne':
      if (safeCount === 0) {
        return 'आजको लागि तपाईंको कुनै रिमाइन्डर बाँकी छैन।';
      }
      if (safeCount === 1) {
        return 'आजको लागि तपाईंको 1 वटा रिमाइन्डर बाँकी छ।';
      }
      return `आजको लागि तपाईंको ${safeCount} वटा रिमाइन्डर बाँकी छन्।`;

    case 'en':
    default:
      if (safeCount === 0) {
        return 'You have no reminders left for today.';
      }
      if (safeCount === 1) {
        return 'You have 1 reminder left for today.';
      }
      return `You have ${safeCount} reminders left for today.`;
  }
}
