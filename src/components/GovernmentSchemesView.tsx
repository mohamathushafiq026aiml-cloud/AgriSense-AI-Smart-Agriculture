import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Search, 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { GOVERNMENT_SCHEMES_DATA, getLocalizedScheme } from '../data/agriData';

interface GovernmentSchemesViewProps {
  language: Language;
}

export const GovernmentSchemesView: React.FC<GovernmentSchemesViewProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryTranslations: Record<Language, Record<string, string>> = {
    en: {
      'All': 'All',
      'Income Support': 'Income Support',
      'Crop Insurance': 'Crop Insurance',
      'Micro Irrigation': 'Micro Irrigation',
      'Farm Machinery': 'Farm Machinery',
      'Soil Testing': 'Soil Testing',
      'Organic Farming': 'Organic Farming'
    },
    ta: {
      'All': 'அனைத்தும்',
      'Income Support': 'வருமான ஆதரவு',
      'Crop Insurance': 'பயிர் காப்பீடு',
      'Micro Irrigation': 'நுண் பாசனம்',
      'Farm Machinery': 'விவசாய இயந்திரங்கள்',
      'Soil Testing': 'மண் பரிசோதனை',
      'Organic Farming': 'இயற்கை விவசாயம்'
    }
  };

  const categories = ['All', 'Income Support', 'Crop Insurance', 'Micro Irrigation', 'Farm Machinery', 'Soil Testing', 'Organic Farming'];

  const filteredSchemes = GOVERNMENT_SCHEMES_DATA.filter((scheme) => {
    const locScheme = getLocalizedScheme(scheme, language);
    const matchesSearch = locScheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          locScheme.benefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          locScheme.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>{t.agriMinistryBadge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.schemesTitle}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {t.schemesSubtitle}
            </p>
          </div>

          <span className="text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            {t.directDbtPortalsBadge}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchSchemesPlaceholder}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {categoryTranslations[language][cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((rawScheme) => {
          const scheme = getLocalizedScheme(rawScheme, language);

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-0.5">
                      {scheme.category} · {scheme.state}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      {scheme.schemeName}
                    </h3>
                  </div>
                </div>

                {/* Benefit Summary */}
                <div className="mt-3 p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs">
                  <span className="font-bold text-purple-950 block mb-0.5">{t.primaryBenefit}</span>
                  <p className="text-stone-700 leading-relaxed">{scheme.benefit}</p>
                </div>

                {/* Eligibility */}
                <div className="mt-3 text-xs space-y-1">
                  <span className="font-semibold text-stone-800 block">{t.eligibility}</span>
                  <p className="text-stone-600 leading-relaxed">{scheme.eligibility}</p>
                </div>

                {/* Required Documents Checklist */}
                <div className="mt-3 text-xs space-y-1.5">
                  <span className="font-semibold text-stone-800 block">{t.requiredDocuments}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.requiredDocuments.map((doc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] border border-stone-200"
                      >
                        ✓ {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Official Portal Button */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px]">{t.viaApplicationMethod} {scheme.applicationMethod}</span>
                <a
                  href={scheme.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{t.applyNow}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
