import React, { useState, useMemo } from 'react';
import {
  LeafLogo,
  HomeNavIcon,
  SignOutNavIcon,
  BellNavIcon,
  FamilyHeartIcon,
  LightbulbIcon,
  ChevronRightIcon,
  TargetFocusIcon,
  WavesPatternIcon,
  RoutineOrderIcon,
  PlayOutlineIcon,
  MedicalAppointmentIcon,
  PillCapsuleIcon,
  WaterDropIcon,
  ForkKnifeIcon,
  WalkingActivityIcon,
  NoteReminderIcon,
  PlusIcon,
} from './Icons';
import { calculateActivityStats } from '../utils/activityStats';
import { createReminder, getTodayDateString, saveStoredReminders } from '../utils/reminderRepository';
import './CaregiverDashboard.css';

const EMPTY_ARRAY = [];

export function CaregiverDashboard({
  elderId = 'elder_anima_01',
  elderName = 'Anima Das',
  elderInterests = EMPTY_ARRAY,
  interests,
  connectionStatus = 'Connected',
  activityHistory = EMPTY_ARRAY,
  reminders = EMPTY_ARRAY,
  onElderView,
  onSignOut,
  onViewReminders,
  onAddReminder,
  onUpdateReminders,
}) {
  const [alertDismissed, setAlertDismissed] = useState(false);

  // Modal states for Caregiver-Added Reminder
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('medical');
  const [formDate, setFormDate] = useState(() => getTodayDateString());
  const [formTime, setFormTime] = useState('09:00');
  const [formRepeat, setFormRepeat] = useState('once');
  const [formCustomDays, setFormCustomDays] = useState(['Mon', 'Wed', 'Fri']);
  const [formNote, setFormNote] = useState('');
  const [formError, setFormError] = useState('');

  // Resolved interests (supports elderInterests or interests prop)
  const resolvedInterests = elderInterests && elderInterests.length > 0 ? elderInterests : interests || EMPTY_ARRAY;

  // Format today's date
  const todayFormatted = useMemo(() => {
    try {
      const d = new Date();
      return d.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
    } catch {
      return 'Thursday, 24 October';
    }
  }, []);

  // Compute all metrics, overview, recent sessions, observations, and alerts dynamically
  const stats = useMemo(() => {
    return calculateActivityStats(activityHistory, elderName, reminders, resolvedInterests);
  }, [activityHistory, elderName, reminders, resolvedInterests]);

  const getActivityIcon = (actId) => {
    switch (actId) {
      case 'memory-match':
        return <TargetFocusIcon size={18} color="#204C41" />;
      case 'fruit-focus':
        return <PlayOutlineIcon size={18} color="#204C41" />;
      case 'pattern-path':
        return <WavesPatternIcon size={18} color="#204C41" />;
      case 'day-in-order':
        return <RoutineOrderIcon size={18} color="#204C41" />;
      default:
        return <TargetFocusIcon size={18} color="#204C41" />;
    }
  };

  const formatReminderTime = (timeStr) => {
    if (!timeStr) return '';
    if (
      timeStr.includes('AM') ||
      timeStr.includes('PM') ||
      timeStr.includes('am') ||
      timeStr.includes('pm')
    ) {
      return timeStr;
    }
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      let h = parseInt(parts[0], 10);
      const m = parts[1];
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${m} ${ampm}`;
    }
    return timeStr;
  };

  const firstName = elderName && elderName.trim() ? elderName.trim().split(/\s+/)[0] : 'Anima';

  const handleOpenAddModal = () => {
    setFormTitle('');
    setFormCategory('medical');
    setFormDate(getTodayDateString());
    setFormTime('09:00');
    setFormRepeat('once');
    setFormCustomDays(['Mon', 'Wed', 'Fri']);
    setFormNote('');
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleToggleDay = (day) => {
    setFormCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveReminder = (e) => {
    e.preventDefault();
    const cleanTitle = formTitle.trim();
    if (!cleanTitle) {
      setFormError('Please enter an appointment or reminder title.');
      return;
    }
    if (!formTime) {
      setFormError('Please choose a scheduled time.');
      return;
    }

    const newReminder = createReminder({
      elderId,
      title: cleanTitle,
      category: formCategory,
      date: formDate,
      time: formTime,
      repeat: formRepeat,
      customDays: formRepeat === 'custom' ? formCustomDays : [],
      note: formNote.trim(),
      createdBy: 'caregiver',
    });

    if (onAddReminder) {
      onAddReminder(newReminder);
    } else if (onUpdateReminders) {
      onUpdateReminders((prev) => [newReminder, ...prev]);
    } else {
      saveStoredReminders(elderId, [newReminder, ...reminders]);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="caregiver-dashboard-root" data-elder-id={elderId}>
      {/* Top Navbar */}
      <header className="caregiver-nav-header">
        <div className="caregiver-brand">
          <LeafLogo size={34} bgColor="#F5E8D8" />
          <span className="brand-name">MINDCARE</span>
        </div>

        <div className="caregiver-nav-actions">
          <button
            type="button"
            className="elder-view-btn"
            onClick={onElderView}
            aria-label="Return to elder view"
            id="elder-view-nav-btn"
          >
            <HomeNavIcon size={18} color="#183D36" />
            <span>Elder view</span>
          </button>

          <button
            type="button"
            className="caregiver-signout-btn"
            onClick={onSignOut}
            aria-label="Sign out"
            id="caregiver-signout-btn"
          >
            <SignOutNavIcon size={18} color="#183D36" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="caregiver-dashboard-container">
        {/* Hero Section */}
        <section className="caregiver-hero-section">
          <div className="caregiver-hero-left">
            <span className="caregiver-date-eyebrow">{todayFormatted}</span>
            <h1 className="caregiver-hero-title">Caregiver dashboard</h1>
            <p className="caregiver-hero-subtitle">
              A calm picture of how {elderName} is engaging today.
            </p>
          </div>

          <div className="caregiver-hero-right">
            <div className="connected-status-pill" role="status">
              <span className="connected-dot" aria-hidden="true" />
              <span>{connectionStatus}</span>
            </div>
          </div>
        </section>

        {/* Top 4 Summary Cards */}
        <section className="caregiver-summary-grid" aria-label="Key engagement metrics">
          <div className="summary-metric-card">
            <span className="metric-label">TODAY'S ACTIVITY</span>
            <span className="metric-value">{stats.todayPractice}</span>
          </div>

          <div className="summary-metric-card">
            <span className="metric-label">ACCURACY</span>
            <span className="metric-value">{stats.overallAccuracy}</span>
          </div>

          <div className="summary-metric-card">
            <span className="metric-label">RESPONSE TIME</span>
            <span className="metric-value">{stats.averageResponseTime}</span>
          </div>

          <div className="summary-metric-card">
            <span className="metric-label">SESSIONS THIS WEEK</span>
            <span className="metric-value">{stats.sessionsThisWeek}</span>
          </div>
        </section>

        {/* Middle Section: Observations & Gentle alerts */}
        <section className="caregiver-middle-grid">
          {/* Observations Card */}
          <div className="caregiver-observations-card">
            <h2 className="section-title">Observations</h2>

            <div className="observation-items">
              {stats.observations.map((obs) => (
                <div
                  key={obs.type}
                  className={`observation-item ${
                    obs.type === 'steady' ? 'observation-steady' : 'observation-prompt'
                  }`}
                >
                  <div
                    className={`observation-icon-box ${
                      obs.type === 'steady' ? 'steady-icon' : 'prompt-icon'
                    }`}
                  >
                    {obs.type === 'steady' ? (
                      <FamilyHeartIcon size={20} color="#204C41" />
                    ) : (
                      <LightbulbIcon size={20} color="#C27157" />
                    )}
                  </div>
                  <div className="observation-content">
                    <h3 className="observation-headline">{obs.headline}</h3>
                    <p className="observation-desc">{obs.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gentle Alerts Card */}
          <div className="caregiver-alerts-card">
            <div className="alerts-card-header">
              <h2 className="alerts-title">Gentle alerts</h2>
              <BellNavIcon size={20} color="#FAF7F2" />
            </div>

            <div className="alerts-content">
              {!alertDismissed ? (
                <div className="gentle-alert-banner" role="alert">
                  <span className="alert-coral-dot" aria-hidden="true" />
                  <span className="alert-text">{stats.gentleAlertText}</span>
                  <button
                    type="button"
                    className="alert-dismiss-btn"
                    onClick={() => setAlertDismissed(true)}
                    aria-label="Dismiss alert"
                    title="Dismiss alert"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="alert-dismissed-state">
                  <span className="dismissed-check">✓</span>
                  <span>Alert dismissed. Everything looks calm and steady.</span>
                  <button
                    type="button"
                    className="alert-undo-btn"
                    onClick={() => setAlertDismissed(false)}
                  >
                    Restore
                  </button>
                </div>
              )}
            </div>

            <footer className="alerts-footer-note">
              <p>
                This view supports a conversation with {firstName}. It is not a clinical assessment.
              </p>
            </footer>
          </div>
        </section>

        {/* Lower Section: Activity Overview, Recent Sessions & Today's Reminders */}
        <section className="caregiver-bottom-grid">
          {/* Activity Overview Card */}
          <div className="caregiver-bottom-card">
            <div className="bottom-card-header">
              <h2 className="section-title">Activity overview</h2>
              <span className="bottom-card-badge">4 activities</span>
            </div>

            <div className="activity-overview-list">
              {stats.activityOverview.map((act) => (
                <div key={act.id} className="activity-overview-row">
                  <div className="activity-row-left">
                    <div className="activity-icon-badge">{getActivityIcon(act.id)}</div>
                    <span className="activity-name">{act.name}</span>
                  </div>
                  <div className="activity-row-right">
                    <span className="activity-sessions-count">
                      {act.sessions} {act.sessions === 1 ? 'session' : 'sessions'}
                    </span>
                    <span
                      className={`activity-accuracy-badge ${
                        !act.hasPlayed ? 'unplayed' : ''
                      }`}
                    >
                      {act.accuracy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions Card */}
          <div className="caregiver-bottom-card">
            <div className="bottom-card-header">
              <h2 className="section-title">Recent sessions</h2>
              <span className="bottom-card-badge">
                {stats.recentSessions.length > 0 ? `${stats.recentSessions.length} sessions` : 'Empty'}
              </span>
            </div>

            <div className="recent-sessions-list">
              {stats.recentSessions.length > 0 ? (
                stats.recentSessions.map((session) => (
                  <div key={session.id} className="recent-session-row">
                    <div className="recent-session-info">
                      <span className="recent-session-name">{session.activity}</span>
                      <span className="recent-session-time">{session.timestamp}</span>
                    </div>
                    <span className="recent-session-score">{session.score}</span>
                  </div>
                ))
              ) : (
                <div className="empty-recent-sessions">
                  <p>No completed activities yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Today's Reminders Card with Caregiver Add Reminder feature */}
          <div className="caregiver-bottom-card caregiver-reminders-card">
            <div className="bottom-card-header">
              <h2 className="section-title">Today&apos;s reminders</h2>
              <div className="bottom-card-header-actions">
                <span className="bottom-card-badge">
                  {reminders.length > 0 ? `${reminders.length} items` : 'Routine'}
                </span>
                <button
                  type="button"
                  className="caregiver-add-reminder-btn"
                  onClick={handleOpenAddModal}
                  id="caregiver-add-reminder-btn"
                  aria-label="Add reminder"
                >
                  <PlusIcon size={13} />
                  <span>Add reminder</span>
                </button>
              </div>
            </div>

            <div className="reminders-overview-list">
              {reminders.length > 0 ? (
                reminders.map((rem) => (
                  <div key={rem.id} className="reminder-overview-row">
                    <div className="reminder-status-col">
                      {rem.completed ? (
                        <span className="reminder-check-done" aria-label="Completed">
                          ✓
                        </span>
                      ) : (
                        <span className="reminder-check-pending" aria-label="Pending">
                          ○
                        </span>
                      )}
                    </div>
                    <div className="reminder-details">
                      <div className="reminder-title-line">
                        {rem.category === 'medical' && (
                          <span className="medical-pill-tag" title="Medical appointment">
                            <MedicalAppointmentIcon size={12} color="#183D36" />
                            <span>Appointment</span>
                          </span>
                        )}
                        <span
                          className={`reminder-item-title ${
                            rem.completed ? 'completed-text' : ''
                          }`}
                        >
                          {rem.title}
                        </span>
                      </div>
                      <div className="reminder-meta-inline">
                        <span className="reminder-item-time">
                          {formatReminderTime(rem.time)}
                        </span>
                        {rem.date && (
                          <>
                            <span className="meta-inline-dot">·</span>
                            <span className="reminder-item-date">{rem.date}</span>
                          </>
                        )}
                        {rem.note && (
                          <>
                            <span className="meta-inline-dot">·</span>
                            <span className="reminder-item-note">{rem.note}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-reminders-overview">
                  <p>No reminders scheduled today.</p>
                </div>
              )}
            </div>

            <div className="reminders-card-footer">
              <button
                type="button"
                className="view-reminders-link"
                onClick={onViewReminders}
                id="view-all-reminders-link"
              >
                <span>View all reminders</span>
                <ChevronRightIcon size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
          CAREGIVER ADD REMINDER MODAL
          ========================================================================== */}
      {isAddModalOpen && (
        <div
          className="caregiver-modal-backdrop"
          onClick={() => setIsAddModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="caregiver-modal-heading"
        >
          <div
            className="caregiver-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="caregiver-modal-header">
              <div>
                <span className="modal-elder-eyebrow">For {elderName}</span>
                <h2 id="caregiver-modal-heading" className="caregiver-modal-title">
                  Add reminder
                </h2>
              </div>
              <button
                type="button"
                className="caregiver-modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="caregiver-modal-form">
              {/* Category Selector */}
              <div className="form-group">
                <label className="caregiver-form-label">Reminder Category</label>
                <div className="caregiver-categories-grid">
                  {[
                    { key: 'medical', label: 'Medical appointment', icon: MedicalAppointmentIcon },
                    { key: 'medicine', label: 'Medicine', icon: PillCapsuleIcon },
                    { key: 'water', label: 'Water', icon: WaterDropIcon },
                    { key: 'food', label: 'Food', icon: ForkKnifeIcon },
                    { key: 'activity', label: 'Activity', icon: WalkingActivityIcon },
                    { key: 'family', label: 'Family', icon: FamilyHeartIcon },
                    { key: 'other', label: 'Other', icon: NoteReminderIcon },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        className={`caregiver-cat-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setFormCategory(cat.key);
                          if (cat.key === 'medical' && !formTitle) {
                            // Suggest clean medical placeholder
                          }
                        }}
                      >
                        <span className="cat-btn-icon">
                          <Icon size={18} color={isSelected ? '#183D36' : '#5C7B71'} />
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Input */}
              <div className="form-group">
                <label htmlFor="caregiver-reminder-title" className="caregiver-form-label">
                  {formCategory === 'medical' ? 'Appointment or Reminder Title' : 'Title'}
                </label>
                <input
                  id="caregiver-reminder-title"
                  type="text"
                  className="caregiver-form-input"
                  placeholder={
                    formCategory === 'medical'
                      ? 'e.g., Dr. Sen - Cardiology checkup'
                      : 'e.g., Morning medicine'
                  }
                  value={formTitle}
                  onChange={(e) => {
                    setFormTitle(e.target.value);
                    if (formError) setFormError('');
                  }}
                  autoFocus
                />
              </div>

              {/* Date and Time Row */}
              <div className="caregiver-form-row">
                <div className="form-group flex-1">
                  <label htmlFor="caregiver-reminder-date" className="caregiver-form-label">
                    Date
                  </label>
                  <input
                    id="caregiver-reminder-date"
                    type="date"
                    className="caregiver-form-input"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="caregiver-reminder-time" className="caregiver-form-label">
                    Time
                  </label>
                  <input
                    id="caregiver-reminder-time"
                    type="time"
                    className="caregiver-form-input"
                    value={formTime}
                    onChange={(e) => {
                      setFormTime(e.target.value);
                      if (formError) setFormError('');
                    }}
                  />
                </div>
              </div>

              {/* Repeat Options */}
              <div className="form-group">
                <label className="caregiver-form-label">Repeat</label>
                <div className="caregiver-repeat-pills">
                  {[
                    { key: 'once', label: 'Once' },
                    { key: 'everyDay', label: 'Every day' },
                    { key: 'custom', label: 'Custom' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      className={`caregiver-repeat-pill ${formRepeat === opt.key ? 'active' : ''}`}
                      onClick={() => setFormRepeat(opt.key)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {formRepeat === 'custom' && (
                  <div className="caregiver-days-pills">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`caregiver-day-btn ${
                          formCustomDays.includes(day) ? 'selected' : ''
                        }`}
                        onClick={() => handleToggleDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Notes */}
              <div className="form-group">
                <label htmlFor="caregiver-reminder-note" className="caregiver-form-label">
                  Note <span className="label-optional">(optional)</span>
                </label>
                <input
                  id="caregiver-reminder-note"
                  type="text"
                  className="caregiver-form-input"
                  placeholder="e.g., Room 304, bring health card and test results"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                />
              </div>

              {formError && <p className="caregiver-form-error">{formError}</p>}

              {/* Modal Actions */}
              <div className="caregiver-modal-actions">
                <button
                  type="button"
                  className="caregiver-modal-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="caregiver-modal-save">
                  Save reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaregiverDashboard;

