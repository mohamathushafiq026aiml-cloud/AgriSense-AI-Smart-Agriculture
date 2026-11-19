import React from 'react';
import { 
  Sprout, 
  Languages, 
  Bell, 
  CloudSun, 
  User, 
  ShieldAlert,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Farm, Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  farms: Farm[];
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm) => void;
  user: UserProfile;
  unreadAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  farms,
  currentFarm,
  setCurrentFarm,
  user,
  unreadAlertsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'dashboard', label: t.dashboard },
    { id: 'scan', label: t.scanLeaf },
    { id: 'irrigation', label: t.irrigation },
    { id: 'pest', label: t.pestRisk },
    { id: 'growth', label: t.plantGrowth },
    { id: 'farm', label: t.farmManagement },
    { id: 'alerts', label: t.aiAlerts, badge: unreadAlertsCount },
    { id: 'chat', label: t.aiAssistant },
    { id: 'schemes', label: t.governmentSchemes },
    { id: 'marketplace', label: t.marketplace },
    { id: 'reports', label: t.reports },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-emerald-900 text-white sticky top-0 z-50 shadow-md border-b border-emerald-800">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-700 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-inner">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">AgriSense AI</span>
                <span className="text-[10px] tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-300 border border-emerald-700">Smart Agro</span>
              </div>
              <p className="text-xs text-emerald-200/80 hidden sm:block">🌾 {t.tagline}</p>
            </div>
          </div>

          {/* Quick Controls: Farm Selector, Language Picker, Alert Bell, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Farm Switcher */}
            {farms.length > 0 && (
              <div className="relative hidden md:block">
                <select
                  value={currentFarm?.id || ''}
                  onChange={(e) => {
                    const selected = farms.find(f => f.id === e.target.value);
                    if (selected) setCurrentFarm(selected);
                  }}
                  className="bg-emerald-800/90 text-emerald-100 text-xs rounded-lg px-3 py-2 pr-7 border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer font-medium appearance-none"
                >
                  {farms.map((farm) => (
                    <option key={farm.id} value={farm.id}>
                      🌱 {farm.name} ({farm.areaAcres} ac)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 text-emerald-300 pointer-events-none" />
              </div>
            )}

            {/* Bilingual Language Selector: English 🇬🇧 and Tamil 🇮🇳 */}
            <div className="flex items-center bg-emerald-950/60 border border-emerald-700/80 rounded-xl p-0.5 text-xs text-emerald-100 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-800/40'
                }`}
                title="Switch website to English"
                aria-label="English"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  language === 'ta'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-800/40'
                }`}
                title="இணையதளத்தை தமிழில் மாற்றுக"
                aria-label="தமிழ்"
              >
                <span>🇮🇳</span>
                <span>தமிழ்</span>
              </button>
            </div>

            {/* Alerts Notification Bell */}
            <button
              onClick={() => setCurrentTab('alerts')}
              className="relative p-2 rounded-lg bg-emerald-800/70 hover:bg-emerald-800 text-emerald-200 transition-colors focus:outline-none"
              title="Early Warning Alerts"
              aria-label="View early warnings"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-stone-900 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* User Profile Badge */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 p-1.5 pl-2 sm:px-2.5 rounded-lg bg-emerald-800/70 hover:bg-emerald-800 text-emerald-100 text-xs transition-colors"
              title="Farmer Profile"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[11px] text-white">
                {user.name.charAt(0)}
              </div>
              <span className="hidden lg:inline font-medium">{user.name.split(' ')[0]}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-emerald-200 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <nav className="hidden md:block bg-emerald-950/70 border-t border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none text-xs font-medium">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-800/50'
                  }`}
                >
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-amber-400 text-emerald-950' : 'bg-amber-500 text-stone-900'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-2 pb-4 space-y-3">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-2 border-b border-emerald-800/60">
                <span className="text-xs text-emerald-200 font-medium">{t.selectLanguage}:</span>
                <div className="flex items-center bg-emerald-900 border border-emerald-700 rounded-lg p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => { setLanguage('en'); }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      language === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-300'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLanguage('ta'); }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      language === 'ta' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-300'
                    }`}
                  >
                    🇮🇳 தமிழ்
                  </button>
                </div>
              </div>

              {farms.length > 0 && (
                <div className="pb-3 border-b border-emerald-800/60">
                  <label className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block mb-1">
                    {t.activeFarmLabel}
                  </label>
                  <select
                    value={currentFarm?.id || ''}
                    onChange={(e) => {
                      const selected = farms.find(f => f.id === e.target.value);
                      if (selected) setCurrentFarm(selected);
                    }}
                    className="w-full bg-emerald-900 text-emerald-100 text-xs rounded-lg p-2 border border-emerald-700"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.areaAcres} Acres, {f.district})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => {
                  const active = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        active
                          ? 'bg-emerald-700 text-white font-semibold'
                          : 'text-emerald-200 hover:bg-emerald-900 text-emerald-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] bg-amber-500 text-stone-900 font-bold px-1.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
    </header>
  );
};
