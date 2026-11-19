import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  CheckCircle2
} from 'lucide-react';
import { Farm, Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  farms: Farm[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  language,
  setLanguage,
  farms,
}) => {
  const t = TRANSLATIONS[language];
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [district, setDistrict] = useState(user.district);
  const [state, setState] = useState(user.state);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name,
      email,
      phone,
      location,
      district,
      state,
      preferredLanguage: language,
      farmCount: farms.length
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-xs text-stone-500">
              {user.district}, {user.state} · {t.registeredOn} {user.createdDate}
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
          {t.verifiedFarmerBadge}
        </span>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t.farmerProfileTitle}
        </h2>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.profileSavedSuccess}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t.fullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.emailAddress}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.mobileNumber}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.villagePanchayat}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.district}
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t.state}
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium"
                required
              />
            </div>
          </div>

          {/* Bilingual Language Selector with exact 2 options: English and Tamil */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t.preferredLanguageLabel}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-medium cursor-pointer"
            >
              <option value="en">🇬🇧 {t.english}</option>
              <option value="ta">🇮🇳 {t.tamil}</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveProfileUpdates}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Account Stats */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm text-xs space-y-2">
        <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
          {t.farmAccountsSecurityTitle}
        </h3>
        <div className="flex items-center justify-between text-stone-600 py-1 border-b border-stone-100">
          <span>{t.activeHoldingsCount}</span>
          <strong>{farms.length} {t.propertiesWord}</strong>
        </div>
        <div className="flex items-center justify-between text-stone-600 py-1 border-b border-stone-100">
          <span>{t.authProvider}</span>
          <span className="font-semibold text-emerald-800">AgriSense Security Service</span>
        </div>
        <div className="flex items-center justify-between text-stone-600 py-1">
          <span>{t.cloudBuckets}</span>
          <span className="font-semibold text-stone-700">leaf-images / farm-records</span>
        </div>
      </div>
    </div>
  );
};
