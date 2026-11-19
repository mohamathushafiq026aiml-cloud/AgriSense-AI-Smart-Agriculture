import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sprout, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Farm, Language, Plant } from '../types';
import { TRANSLATIONS, GROWTH_STAGE_TRANSLATIONS } from '../i18n/translations';

interface PlantGrowthViewProps {
  currentFarm: Farm | null;
  language: Language;
}

export const PlantGrowthView: React.FC<PlantGrowthViewProps> = ({
  currentFarm,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const initialPlant = currentFarm?.fields[0]?.plants[0] || {
    id: 'plant-def',
    fieldId: 'field-1',
    name: 'Tomato Hybrid Row A',
    variety: 'US-618',
    plantingDate: '2026-08-15',
    daysAfterPlanting: 53,
    growthStage: 'Flowering',
    heightCm: 68,
    leafCount: 42,
    healthStatus: 'Good'
  };

  const [activePlant, setActivePlant] = useState<Plant>(initialPlant as Plant);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newHeight, setNewHeight] = useState(activePlant.heightCm);
  const [newLeafCount, setNewLeafCount] = useState(activePlant.leafCount);
  const [newStage, setNewStage] = useState(activePlant.growthStage);

  // Growth progression history for plotting growth curve
  const [timeline, setTimeline] = useState([
    { dap: 10, stage: 'Germination', height: 12, leaves: 4, date: 'Aug 25' },
    { dap: 22, stage: 'Vegetative Early', height: 28, leaves: 14, date: 'Sep 06' },
    { dap: 35, stage: 'Vegetative Peak', height: 46, leaves: 26, date: 'Sep 19' },
    { dap: 45, stage: 'Early Budding', height: 58, leaves: 35, date: 'Sep 29' },
    { dap: 53, stage: 'Flowering', height: 68, leaves: 42, date: 'Today' }
  ]);

  const handleLogMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...activePlant,
      heightCm: Number(newHeight),
      leafCount: Number(newLeafCount),
      growthStage: newStage as any,
      daysAfterPlanting: activePlant.daysAfterPlanting + 7
    };
    setActivePlant(updated);
    setTimeline(prev => [
      ...prev,
      {
        dap: updated.daysAfterPlanting,
        stage: updated.growthStage,
        height: updated.heightCm,
        leaves: updated.leafCount,
        date: 'Recent'
      }
    ]);
    setShowAddLogModal(false);
  };

  // Stage milestone progression
  const stages = [
    { name: GROWTH_STAGE_TRANSLATIONS[language]['Germination'], days: language === 'ta' ? '1-14 நாட்கள்' : '1-14 Days', current: activePlant.growthStage === 'Germination' },
    { name: GROWTH_STAGE_TRANSLATIONS[language]['Vegetative'], days: language === 'ta' ? '15-40 நாட்கள்' : '15-40 Days', current: activePlant.growthStage === 'Vegetative' },
    { name: GROWTH_STAGE_TRANSLATIONS[language]['Flowering'], days: language === 'ta' ? '41-60 நாட்கள்' : '41-60 Days', current: activePlant.growthStage === 'Flowering' },
    { name: GROWTH_STAGE_TRANSLATIONS[language]['Fruiting'], days: language === 'ta' ? '61-85 நாட்கள்' : '61-85 Days', current: activePlant.growthStage === 'Fruiting' },
    { name: GROWTH_STAGE_TRANSLATIONS[language]['Maturity'], days: language === 'ta' ? '86-110 நாட்கள்' : '86-110 Days', current: activePlant.growthStage === 'Maturity' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sprout className="w-4 h-4" />
              <span>{t.plantGrowthTitle}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.plantGrowth}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {t.plantGrowthSubtitle}
            </p>
          </div>

          <button
            onClick={() => setShowAddLogModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.logWeeklyMeasurement}</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">{t.plantAge}</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-stone-900">{activePlant.daysAfterPlanting}</span>
            <span className="text-xs text-stone-500 font-medium">{t.daysDap}</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">{t.sincePlantingDate} {activePlant.plantingDate}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">{t.canopyHeight}</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-stone-900">{activePlant.heightCm}</span>
            <span className="text-xs text-stone-500 font-medium">cm</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">
            {language === 'ta' ? 'கடந்த 14 நாட்களில் +10 செ.மீ' : '+10 cm in past 14 days'}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">{t.leafFoliageCount}</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-stone-900">{activePlant.leafCount}</span>
            <span className="text-xs text-stone-500 font-medium">{language === 'ta' ? 'இலைகள்' : 'leaves'}</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block">{t.optimalLai}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider block">{t.healthRating}</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-emerald-700">
              {language === 'ta' ? (activePlant.healthStatus === 'Good' ? 'நன்று' : activePlant.healthStatus) : activePlant.healthStatus}
            </span>
          </div>
          <span className="text-[11px] text-stone-500 mt-1 block">{t.robustChlorophyll}</span>
        </div>
      </div>

      {/* Phenology Growth Stage Pipeline */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          {t.growthMilestonesTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
          {stages.map((stg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-colors ${
                stg.current
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wider block ${stg.current ? 'text-emerald-200' : 'text-stone-400'}`}>
                {t.stepWord} {idx + 1}
              </span>
              <h4 className="font-bold text-sm mt-0.5">{stg.name}</h4>
              <span className={`text-[11px] mt-1 block ${stg.current ? 'text-emerald-100' : 'text-stone-500'}`}>
                {stg.days}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Growth Curves (Chart Visualization) */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t.canopyProgressionTitle}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t.empiricalGrowthTracking}
            </p>
          </div>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {t.sigmoidalTarget}
          </span>
        </div>

        {/* Height Chart Bars */}
        <div className="pt-6 pb-2">
          <div className="h-48 flex items-end gap-6 sm:gap-12 px-4 border-b border-stone-200">
            {timeline.map((point, index) => {
              const heightPct = Math.round((point.height / 80) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-bold text-emerald-800 opacity-90 group-hover:scale-110 transition-transform">
                    {point.height} cm
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[48px] bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-lg shadow-inner transition-all hover:bg-emerald-400"
                  />
                  <span className="text-[11px] font-medium text-stone-500 mt-1 whitespace-nowrap">
                    {language === 'ta' ? 'நாள்' : 'Day'} {point.dap}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal: Log New Observation */}
      {showAddLogModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              {t.logFieldObservationTitle}
            </h3>
            <p className="text-xs text-stone-500">
              {t.logFieldObservationDesc}
            </p>

            <form onSubmit={handleLogMeasurement} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.plantHeightCm}
                </label>
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => setNewHeight(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.leafCountInput}
                </label>
                <input
                  type="number"
                  value={newLeafCount}
                  onChange={(e) => setNewLeafCount(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.growthStageInput}
                </label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium cursor-pointer"
                >
                  <option value="Germination">{GROWTH_STAGE_TRANSLATIONS[language]['Germination']}</option>
                  <option value="Vegetative">{GROWTH_STAGE_TRANSLATIONS[language]['Vegetative']}</option>
                  <option value="Flowering">{GROWTH_STAGE_TRANSLATIONS[language]['Flowering']}</option>
                  <option value="Fruiting">{GROWTH_STAGE_TRANSLATIONS[language]['Fruiting']}</option>
                  <option value="Maturity">{GROWTH_STAGE_TRANSLATIONS[language]['Maturity']}</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {t.saveMeasurement}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
