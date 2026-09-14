/**
 * activityStats.js
 * Shared utility for calculating real-time metrics, activity breakdown,
 * recent history, observations, and gentle alerts from actual activity results.
 */

// Helper: Check if date is today
export const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

// Helper: Check if date is in current week (Monday-based)
export const isCurrentWeek = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;

  const now = new Date();
  const day = now.getDay();
  // Mon-based diff
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return d >= monday && d <= sunday;
};

// Helper: Format relative timestamp
export const formatSessionTime = (isoString) => {
  if (!isoString) return 'Earlier';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return 'Earlier';

  const now = new Date();
  const isDateToday = isToday(d);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isDateYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  const timeStr = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  if (isDateToday) return `Today · ${timeStr}`;
  if (isDateYesterday) return `Yesterday · ${timeStr}`;

  return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${timeStr}`;
};

/**
 * Formats natural language prompt from selected elder interests
 */
export const formatUsefulPrompt = (interests = []) => {
  const cleanInterests = (interests || [])
    .map((i) => (typeof i === 'string' ? i.trim().toLowerCase() : ''))
    .filter(Boolean);

  if (cleanInterests.length === 0) {
    return 'Try sharing a warm conversation about familiar memories or something they enjoy.';
  }

  if (cleanInterests.length === 1) {
    return `Try sharing a warm conversation about familiar memories or ${cleanInterests[0]}.`;
  }

  if (cleanInterests.length === 2) {
    return `Try sharing a warm conversation about familiar memories, ${cleanInterests[0]}, or ${cleanInterests[1]}.`;
  }

  // 3 or more interests
  const allExceptLast = cleanInterests.slice(0, -1).join(', ');
  const last = cleanInterests[cleanInterests.length - 1];
  return `Try sharing a warm conversation about familiar memories, ${allExceptLast}, or ${last}.`;
};

/**
 * Calculates complete dashboard and progress metrics from activityHistory
 */
export const calculateActivityStats = (
  activityHistory = [],
  elderName = 'Anima Das',
  reminders = [],
  interests = []
) => {
  const firstName = elderName && elderName.trim() ? elderName.trim().split(/\s+/)[0] : 'Anima';

  // Ensure activityHistory is an array of valid session objects
  const sessions = (activityHistory || []).filter(
    (s) => s && (s.questionsCompleted > 0 || typeof s.accuracy === 'number')
  );

  // Sort sessions: newest first
  const sortedSessions = [...sessions].sort((a, b) => {
    const timeA = new Date(a.completionDateTime || a.timestamp || 0).getTime();
    const timeB = new Date(b.completionDateTime || b.timestamp || 0).getTime();
    return timeB - timeA;
  });

  // Today's sessions
  const todaySessions = sortedSessions.filter((s) =>
    isToday(s.completionDateTime || s.timestamp)
  );

  // Latest session completed today (or empty state)
  const todayPractice = todaySessions.length > 0 ? todaySessions[0].activityName : 'No activity yet';

  // Sessions this week count
  const sessionsThisWeek = sortedSessions.filter((s) =>
    isCurrentWeek(s.completionDateTime || s.timestamp)
  ).length;

  // Overall accuracy calculation across all answered questions
  let totalQuestions = 0;
  let totalCorrect = 0;
  let totalResponseTimeSum = 0;
  let sessionsWithResponseTime = 0;

  sortedSessions.forEach((s) => {
    const qCount = s.questionsCompleted || (s.questionResults ? s.questionResults.length : 0);
    const cCount = s.correctAnswers !== undefined ? s.correctAnswers : Math.round(((s.accuracy || 0) / 100) * qCount);

    if (qCount > 0) {
      totalQuestions += qCount;
      totalCorrect += cCount;
    }

    const avgResp = s.averageResponseTime || s.avgResponseTime;
    if (typeof avgResp === 'number' && avgResp > 0) {
      totalResponseTimeSum += avgResp;
      sessionsWithResponseTime++;
    }
  });

  const accuracyPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const accuracyFormatted = totalQuestions > 0 ? `${accuracyPct}%` : '0%';

  const avgResponseTimeSec = sessionsWithResponseTime > 0 ? Math.round(totalResponseTimeSum / sessionsWithResponseTime) : 0;
  const responseTimeFormatted = sessionsWithResponseTime > 0 ? `${avgResponseTimeSec}s` : '0s';

  // Activity Overview for 4 MINDCARE activities
  const activityDefinitions = [
    { id: 'memory-match', name: 'Memory Match' },
    { id: 'fruit-focus', name: 'Fruit Focus' },
    { id: 'pattern-path', name: 'Pattern Path' },
    { id: 'day-in-order', name: 'A Day in Order' },
  ];

  const activityOverview = activityDefinitions.map((act) => {
    // Find all sessions for this activity (matching by normalized name)
    const actSessions = sortedSessions.filter((s) => {
      const sName = (s.activityName || '').toLowerCase().replace(/\s+/g, '');
      const target = act.name.toLowerCase().replace(/\s+/g, '');
      return sName === target || s.activityId === act.id;
    });

    let actQuestions = 0;
    let actCorrect = 0;
    actSessions.forEach((s) => {
      const q = s.questionsCompleted || (s.questionResults ? s.questionResults.length : 0);
      const c = s.correctAnswers !== undefined ? s.correctAnswers : Math.round(((s.accuracy || 0) / 100) * q);
      actQuestions += q;
      actCorrect += c;
    });

    const actAccuracy = actQuestions > 0 ? Math.round((actCorrect / actQuestions) * 100) : 0;

    return {
      id: act.id,
      name: act.name,
      sessions: actSessions.length,
      accuracy: actSessions.length > 0 ? `${actAccuracy}%` : 'Not played yet',
      hasPlayed: actSessions.length > 0,
    };
  });

  // Recent Sessions list (up to 5 most recent)
  const recentSessions = sortedSessions.slice(0, 5).map((s, idx) => ({
    id: s.id || `session-${idx}-${s.completionDateTime || Date.now()}`,
    activity: s.activityName || 'Practice activity',
    timestamp: formatSessionTime(s.completionDateTime || s.timestamp),
    score: typeof s.accuracy === 'number' ? `${Math.round(s.accuracy)}%` : 'Completed',
  }));

  // Dynamic non-clinical observations based on actual progress
  let steadyStartDesc = '';
  if (todaySessions.length > 0) {
    const latestToday = todaySessions[0];
    steadyStartDesc = `${firstName} completed a ${latestToday.activityName} activity today. The gentle pace looks consistent and steady.`;
  } else {
    steadyStartDesc = `No activity completed yet today. A quiet day can be just as restful.`;
  }

  const promptDesc = formatUsefulPrompt(interests);

  const observations = [
    {
      type: 'steady',
      headline: todaySessions.length > 0 ? 'A steady start' : 'Today at ease',
      desc: steadyStartDesc,
    },
    {
      type: 'prompt',
      headline: 'A useful prompt',
      desc: promptDesc,
    },
  ];

  // Dynamic gentle alert based on reminders and activity
  let gentleAlertText = '';
  const pendingReminders = (reminders || []).filter((r) => !r.completed);

  if (pendingReminders.length > 0) {
    const firstPending = pendingReminders[0];
    gentleAlertText = `A gentle check-in for "${firstPending.title}" may be helpful around ${firstPending.time || 'today'}.`;
  } else if (todaySessions.length === 0) {
    gentleAlertText = `A gentle check-in may be helpful this afternoon.`;
  } else {
    gentleAlertText = `${firstName} has completed today's practice. Everything is calm and steady.`;
  }

  return {
    todayPractice,
    overallAccuracy: accuracyFormatted,
    accuracyPct,
    averageResponseTime: responseTimeFormatted,
    sessionsThisWeek,
    activityOverview,
    recentSessions,
    observations,
    gentleAlertText,
    totalSessionsCount: sortedSessions.length,
  };
};
