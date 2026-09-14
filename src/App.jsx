import React, { useState, useEffect } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { LanguageSelection } from './components/LanguageSelection';
import { ProfileSetup } from './components/ProfileSetup';
import { SettingsScreen } from './components/SettingsScreen';
import { HomePage } from './components/HomePage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { ProgressPage } from './components/ProgressPage';
import { RemindersPage } from './components/RemindersPage';
import { HelpVoicePage } from './components/HelpVoicePage';
import { MemoryMatchActivity } from './components/MemoryMatchActivity';
import { FruitFocusActivity } from './components/FruitFocusActivity';
import { PatternPathActivity } from './components/PatternPathActivity';
import { DayInOrderActivity } from './components/DayInOrderActivity';
import { CaregiverLoginPage } from './components/CaregiverLoginPage';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getStoredReminders, saveStoredReminders } from './utils/reminderRepository';
import './App.css';

const DEFAULT_ELDER_PROFILE = {
  elderId: 'elder_anima_01',
  name: 'Anima Das',
  preferredLanguage: 'en',
  interests: [],
  accessibility: {
    textSize: 'A',
    voiceAssistance: false,
    highContrast: false,
  },
};

const JOY_DISPLAY_NAMES = {
  gardening: 'Gardening',
  stories: 'Stories',
  cooking: 'Cooking',
  nature: 'Nature',
  family: 'Family',
};

export function App() {
  // Synchronously determine initial screen from persisted onboarding flag (no visible flash)
  const [currentScreen, setCurrentScreen] = useState(() => {
    try {
      const completed = localStorage.getItem('mindcare_onboarding_completed');
      if (completed === 'true') {
        return 'home';
      }
    } catch (e) {
      console.warn('Failed to read mindcare_onboarding_completed from localStorage:', e);
    }
    return 'landing';
  });

  // Single source of truth for Elder Profile
  const [elderProfile, setElderProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('mindcare_elder_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            elderId: parsed.elderId || DEFAULT_ELDER_PROFILE.elderId,
            name: parsed.name && parsed.name.trim() ? parsed.name.trim() : DEFAULT_ELDER_PROFILE.name,
            preferredLanguage: parsed.preferredLanguage || DEFAULT_ELDER_PROFILE.preferredLanguage,
            interests: Array.isArray(parsed.interests) ? parsed.interests : [],
            accessibility: {
              textSize: parsed.accessibility?.textSize || DEFAULT_ELDER_PROFILE.accessibility.textSize,
              voiceAssistance: typeof parsed.accessibility?.voiceAssistance === 'boolean'
                ? parsed.accessibility.voiceAssistance
                : DEFAULT_ELDER_PROFILE.accessibility.voiceAssistance,
              highContrast: typeof parsed.accessibility?.highContrast === 'boolean'
                ? parsed.accessibility.highContrast
                : DEFAULT_ELDER_PROFILE.accessibility.highContrast,
            },
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse elder profile from localStorage:', e);
    }
    return DEFAULT_ELDER_PROFILE;
  });

  // Keep localStorage synced with elderProfile
  useEffect(() => {
    try {
      localStorage.setItem('mindcare_elder_profile', JSON.stringify(elderProfile));
    } catch (e) {
      console.warn('Failed to save elder profile to localStorage:', e);
    }
  }, [elderProfile]);

  const [selectedLang, setSelectedLang] = useState(() => elderProfile.preferredLanguage || 'en');
  const [userName, setUserName] = useState(() => elderProfile.name || DEFAULT_ELDER_PROFILE.name);

  // Safe developer / testing reset utilities exposed on window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.resetMindcareOnboarding = () => {
        try {
          localStorage.removeItem('mindcare_onboarding_completed');
          localStorage.removeItem('mindcare_elder_profile');
          console.info('[MINDCARE] Onboarding and elder profile reset. Reloading...');
          window.location.reload();
        } catch (e) {
          console.error('[MINDCARE] Error resetting onboarding:', e);
        }
      };

      window.clearMindcareData = () => {
        try {
          localStorage.removeItem('mindcare_onboarding_completed');
          localStorage.removeItem('mindcare_elder_profile');
          localStorage.removeItem('mindcare_reminders');
          localStorage.removeItem('mindcare_activity_history');
          console.info('[MINDCARE] All local data reset. Reloading...');
          window.location.reload();
        } catch (e) {
          console.error('[MINDCARE] Error clearing local data:', e);
        }
      };
    }
  }, []);

  const handleUpdateName = (newName) => {
    setUserName(newName);
    setElderProfile((prev) => ({
      ...prev,
      name: newName && newName.trim() ? newName.trim() : DEFAULT_ELDER_PROFILE.name,
    }));
  };

  const handleUpdateLang = (lang) => {
    setSelectedLang(lang);
    setElderProfile((prev) => ({
      ...prev,
      preferredLanguage: lang,
    }));
  };

  // Single source of truth for Reminders (lifted from RemindersPage, backed by reminderRepository)
  const [reminders, setReminders] = useState(() => {
    return getStoredReminders(DEFAULT_ELDER_PROFILE.elderId);
  });

  const handleUpdateReminders = (updater) => {
    setReminders((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveStoredReminders(elderProfile?.elderId || DEFAULT_ELDER_PROFILE.elderId, next);
      return next;
    });
  };

  // Stored activity history for dynamic Progress & Caregiver calculations
  const [activityHistory, setActivityHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('mindcare_activity_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse activity history from localStorage:', e);
      return [];
    }
  });

  const handleRecordActivity = (activityResult) => {
    if (!activityResult) return;
    setActivityHistory((prev) => {
      const updated = [activityResult, ...(prev || [])];
      try {
        localStorage.setItem('mindcare_activity_history', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save activity history to localStorage:', e);
      }
      return updated;
    });
  };

  // Accessibility & Comfort Settings (Screen 3)
  const [textSize, setTextSize] = useState(
    () => elderProfile.accessibility?.textSize || DEFAULT_ELDER_PROFILE.accessibility.textSize
  );
  const [voiceAssistance, setVoiceAssistance] = useState(
    () => (typeof elderProfile.accessibility?.voiceAssistance === 'boolean'
      ? elderProfile.accessibility.voiceAssistance
      : DEFAULT_ELDER_PROFILE.accessibility.voiceAssistance)
  );
  const [highContrast, setHighContrast] = useState(
    () => (typeof elderProfile.accessibility?.highContrast === 'boolean'
      ? elderProfile.accessibility.highContrast
      : DEFAULT_ELDER_PROFILE.accessibility.highContrast)
  );

  const handleUpdateTextSize = (newSize) => {
    setTextSize(newSize);
    setElderProfile((prev) => ({
      ...prev,
      accessibility: {
        ...(prev.accessibility || DEFAULT_ELDER_PROFILE.accessibility),
        textSize: newSize,
      },
    }));
  };

  const handleToggleVoiceAssistance = () => {
    setVoiceAssistance((prev) => {
      const next = !prev;
      setElderProfile((p) => ({
        ...p,
        accessibility: {
          ...(p.accessibility || DEFAULT_ELDER_PROFILE.accessibility),
          voiceAssistance: next,
        },
      }));
      return next;
    });
  };

  const handleToggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      setElderProfile((p) => ({
        ...p,
        accessibility: {
          ...(p.accessibility || DEFAULT_ELDER_PROFILE.accessibility),
          highContrast: next,
        },
      }));
      return next;
    });
  };

  // Apply root-level text-size scaling across the application
  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
  }, [textSize]);

  // Apply root-level high contrast mode across the application
  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
  }, [highContrast]);

  const handleTogglePreference = (optionId) => {
    const normId = (optionId || '').toLowerCase();
    const displayName = JOY_DISPLAY_NAMES[normId] || (optionId.charAt(0).toUpperCase() + optionId.slice(1));

    setElderProfile((prev) => {
      const current = Array.isArray(prev.interests) ? prev.interests : [];
      const exists = current.some((item) => item.toLowerCase() === normId);
      const nextInterests = exists
        ? current.filter((item) => item.toLowerCase() !== normId)
        : [...current, displayName];

      return {
        ...prev,
        interests: nextInterests,
      };
    });
  };

  const handleFinishSetup = () => {
    const finalProfile = {
      ...elderProfile,
      name: userName && userName.trim() ? userName.trim() : elderProfile.name || DEFAULT_ELDER_PROFILE.name,
      preferredLanguage: selectedLang,
      accessibility: {
        textSize,
        voiceAssistance,
        highContrast,
      },
    };
    try {
      localStorage.setItem('mindcare_onboarding_completed', 'true');
      localStorage.setItem('mindcare_elder_profile', JSON.stringify(finalProfile));
    } catch (e) {
      console.warn('Failed to save onboarding completion state to localStorage:', e);
    }
    setElderProfile(finalProfile);
    setCurrentScreen('home');
  };

  if (currentScreen === 'home') {
    return (
      <HomePage
        userName={elderProfile.name}
        selectedLang={selectedLang}
        onSignOut={() => setCurrentScreen('landing')}
        onNavigate={(page) => {
          if (page === 'settings') setCurrentScreen('settings');
          if (page === 'activities') setCurrentScreen('activities');
          if (page === 'progress') setCurrentScreen('progress');
          if (page === 'reminders') setCurrentScreen('reminders');
          if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
          if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
          if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
          if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
        }}
      />
    );
  }

  if (currentScreen === 'activities') {
    return (
      <ActivitiesPage
        userName={elderProfile.name}
        selectedLang={selectedLang}
        onSignOut={() => setCurrentScreen('landing')}
        onNavigate={(page) => {
          if (page === 'home') setCurrentScreen('home');
          if (page === 'settings') setCurrentScreen('settings');
          if (page === 'progress') setCurrentScreen('progress');
          if (page === 'reminders') setCurrentScreen('reminders');
          if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
          if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
          if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
          if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
        }}
        onPlayActivity={(activityId) => {
          if (activityId === 'memory-match' || activityId === 'memoryMatch') {
            setCurrentScreen('memory-match');
          }
          if (activityId === 'fruit-focus' || activityId === 'fruitFocus') {
            setCurrentScreen('fruit-focus');
          }
          if (activityId === 'pattern-path' || activityId === 'patternPath') {
            setCurrentScreen('pattern-path');
          }
          if (activityId === 'day-in-order' || activityId === 'dayInOrder') {
            setCurrentScreen('day-in-order');
          }
        }}
      />
    );
  }

  if (currentScreen === 'progress') {
    return (
      <ProgressPage
        userName={elderProfile.name}
        selectedLang={selectedLang}
        activityHistory={activityHistory}
        onSignOut={() => setCurrentScreen('landing')}
        onNavigate={(page) => {
          if (page === 'home') setCurrentScreen('home');
          if (page === 'activities') setCurrentScreen('activities');
          if (page === 'reminders') setCurrentScreen('reminders');
          if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
          if (page === 'settings') setCurrentScreen('settings');
          if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
          if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
          if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
        }}
      />
    );
  }

  if (currentScreen === 'reminders') {
    return (
      <RemindersPage
        userName={elderProfile.name}
        selectedLang={selectedLang}
        reminders={reminders}
        onUpdateReminders={handleUpdateReminders}
        onSignOut={() => setCurrentScreen('landing')}
        onNavigate={(page) => {
          if (page === 'home') setCurrentScreen('home');
          if (page === 'activities') setCurrentScreen('activities');
          if (page === 'progress') setCurrentScreen('progress');
          if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
          if (page === 'settings') setCurrentScreen('settings');
          if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
          if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
          if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
        }}
      />
    );
  }

  if (currentScreen === 'help') {
    return (
      <HelpVoicePage
        userName={elderProfile.name}
        selectedLang={selectedLang}
        reminders={reminders}
        onSignOut={() => setCurrentScreen('landing')}
        onNavigate={(page) => {
          if (page === 'home') setCurrentScreen('home');
          if (page === 'activities') setCurrentScreen('activities');
          if (page === 'progress') setCurrentScreen('progress');
          if (page === 'reminders') setCurrentScreen('reminders');
          if (page === 'settings') setCurrentScreen('settings');
          if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
          if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
          if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
        }}
      />
    );
  }

  if (currentScreen === 'fruit-focus') {
    return (
      <ErrorBoundary onReset={() => setCurrentScreen('activities')}>
        <FruitFocusActivity
          userName={userName}
          selectedLang={selectedLang}
          onLeave={() => setCurrentScreen('activities')}
          onFinish={() => setCurrentScreen('activities')}
          onSignOut={() => setCurrentScreen('landing')}
          onNavigate={(page) => {
            if (page === 'home') setCurrentScreen('home');
            if (page === 'activities') setCurrentScreen('activities');
            if (page === 'progress') setCurrentScreen('progress');
            if (page === 'reminders') setCurrentScreen('reminders');
            if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
            if (page === 'settings') setCurrentScreen('settings');
            if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
            if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
            if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
          }}
          onComplete={(activityResult) => {
            handleRecordActivity(activityResult);
          }}
        />
      </ErrorBoundary>
    );
  }

  if (currentScreen === 'pattern-path') {
    return (
      <ErrorBoundary onReset={() => setCurrentScreen('activities')}>
        <PatternPathActivity
          userName={userName}
          selectedLang={selectedLang}
          onLeave={() => setCurrentScreen('activities')}
          onFinish={() => setCurrentScreen('activities')}
          onSignOut={() => setCurrentScreen('landing')}
          onNavigate={(page) => {
            if (page === 'home') setCurrentScreen('home');
            if (page === 'activities') setCurrentScreen('activities');
            if (page === 'progress') setCurrentScreen('progress');
            if (page === 'reminders') setCurrentScreen('reminders');
            if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
            if (page === 'settings') setCurrentScreen('settings');
            if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
            if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
            if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
          }}
          onComplete={(activityResult) => {
            handleRecordActivity(activityResult);
          }}
        />
      </ErrorBoundary>
    );
  }

  if (currentScreen === 'day-in-order') {
    return (
      <ErrorBoundary onReset={() => setCurrentScreen('activities')}>
        <DayInOrderActivity
          userName={userName}
          selectedLang={selectedLang}
          onLeave={() => setCurrentScreen('activities')}
          onFinish={() => setCurrentScreen('activities')}
          onSignOut={() => setCurrentScreen('landing')}
          onNavigate={(page) => {
            if (page === 'home') setCurrentScreen('home');
            if (page === 'activities') setCurrentScreen('activities');
            if (page === 'progress') setCurrentScreen('progress');
            if (page === 'reminders') setCurrentScreen('reminders');
            if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
            if (page === 'settings') setCurrentScreen('settings');
            if (page === 'memory-match' || page === 'memoryMatch') setCurrentScreen('memory-match');
            if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
            if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
          }}
          onComplete={(activityResult) => {
            handleRecordActivity(activityResult);
          }}
        />
      </ErrorBoundary>
    );
  }

  if (currentScreen === 'memory-match') {
    return (
      <ErrorBoundary onReset={() => setCurrentScreen('activities')}>
        <MemoryMatchActivity
          userName={userName}
          selectedLang={selectedLang}
          onLeave={() => setCurrentScreen('activities')}
          onFinish={() => setCurrentScreen('activities')}
          onSignOut={() => setCurrentScreen('landing')}
          onNavigate={(page) => {
            if (page === 'home') setCurrentScreen('home');
            if (page === 'activities') setCurrentScreen('activities');
            if (page === 'progress') setCurrentScreen('progress');
            if (page === 'reminders') setCurrentScreen('reminders');
            if (page === 'help' || page === 'help-voice' || page === 'helpVoice') setCurrentScreen('help');
            if (page === 'settings') setCurrentScreen('settings');
            if (page === 'fruit-focus' || page === 'fruitFocus') setCurrentScreen('fruit-focus');
            if (page === 'pattern-path' || page === 'patternPath') setCurrentScreen('pattern-path');
            if (page === 'day-in-order' || page === 'dayInOrder') setCurrentScreen('day-in-order');
          }}
          onComplete={(activityResult) => {
            handleRecordActivity(activityResult);
          }}
        />
      </ErrorBoundary>
    );
  }

  if (currentScreen === 'settings') {
    return (
      <SettingsScreen
        selectedLang={selectedLang}
        textSize={textSize}
        onChangeTextSize={handleUpdateTextSize}
        voiceAssistance={voiceAssistance}
        onToggleVoiceAssistance={handleToggleVoiceAssistance}
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
        onBack={() => {
          const completed = (() => {
            try {
              return localStorage.getItem('mindcare_onboarding_completed') === 'true';
            } catch {
              return false;
            }
          })();
          if (completed) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('profile');
          }
        }}
        onFinish={handleFinishSetup}
        onBackToLanding={() => {
          const completed = (() => {
            try {
              return localStorage.getItem('mindcare_onboarding_completed') === 'true';
            } catch {
              return false;
            }
          })();
          if (completed) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('landing');
          }
        }}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileSetup
        selectedLang={selectedLang}
        name={userName}
        onChangeName={handleUpdateName}
        selectedPreferences={(elderProfile.interests || []).map((i) => i.toLowerCase())}
        onTogglePreference={handleTogglePreference}
        onBack={() => setCurrentScreen('language')}
        onContinue={() => setCurrentScreen('settings')}
        onBackToLanding={() => {
          const completed = (() => {
            try {
              return localStorage.getItem('mindcare_onboarding_completed') === 'true';
            } catch {
              return false;
            }
          })();
          if (completed) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('landing');
          }
        }}
      />
    );
  }

  if (currentScreen === 'language') {
    return (
      <LanguageSelection
        selectedLang={selectedLang}
        onSelectLang={handleUpdateLang}
        onBackToLanding={() => {
          const completed = (() => {
            try {
              return localStorage.getItem('mindcare_onboarding_completed') === 'true';
            } catch {
              return false;
            }
          })();
          if (completed) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('landing');
          }
        }}
        onContinue={() => setCurrentScreen('profile')}
      />
    );
  }

  if (currentScreen === 'caregiver-login') {
    return (
      <CaregiverLoginPage
        onBack={() => setCurrentScreen('landing')}
        onLogin={() => setCurrentScreen('caregiver-dashboard')}
      />
    );
  }

  if (currentScreen === 'caregiver-dashboard') {
    return (
      <CaregiverDashboard
        elderId={elderProfile.elderId}
        elderName={elderProfile.name}
        elderInterests={elderProfile.interests}
        activityHistory={activityHistory}
        reminders={reminders}
        onAddReminder={(newReminder) => {
          handleUpdateReminders((prev) => [newReminder, ...prev]);
        }}
        onUpdateReminders={handleUpdateReminders}
        onElderView={() => setCurrentScreen('home')}
        onSignOut={() => setCurrentScreen('landing')}
        onViewReminders={() => setCurrentScreen('reminders')}
      />
    );
  }

  return (
    <main className="mindcare-app" id="main-content">
      <LeftPanel
        onGetStarted={() => {
          const completed = (() => {
            try {
              return localStorage.getItem('mindcare_onboarding_completed') === 'true';
            } catch {
              return false;
            }
          })();
          if (completed) {
            setCurrentScreen('home');
          } else {
            setCurrentScreen('language');
          }
        }}
        onCaregiverClick={() => setCurrentScreen('caregiver-login')}
      />
      <RightPanel />
    </main>
  );
}

export default App;
