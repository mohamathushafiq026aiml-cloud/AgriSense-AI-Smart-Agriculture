import React, { useState } from 'react';
import { 
  Bug, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Info,
  Calendar,
  CloudSun
} from 'lucide-react';
import { Farm, Language, PestRiskPrediction } from '../types';
import { TRANSLATIONS, CROP_TRANSLATIONS, SEVERITY_TRANSLATIONS } from '../i18n/translations';
import { PEST_DATABASE, getLocalizedPest } from '../data/agriData';

interface PestRiskViewProps {
  currentFarm: Farm | null;
  language: Language;
}

export const PestRiskView: React.FC<PestRiskViewProps> = ({
  currentFarm,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedCrop, setSelectedCrop] = useState(currentFarm?.mainCrop || 'Tomato');
  const [temperature, setTemperature] = useState(29);
  const [humidity, setHumidity] = useState(72);
  const [rainfall, setRainfall] = useState(4);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PestRiskPrediction | null>(null);

  const handlePredictPest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pest/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature,
          humidity,
          rainfall,
          plantType: selectedCrop,
          farmId: currentFarm?.id
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        setPrediction(res.data);
      }
    } catch (err) {
      console.error('Pest predict error:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handlePredictPest();
  }, [selectedCrop]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-orange-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Bug className="w-4 h-4" />
              <span>{t.ipmBioDefenseBadge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.pestMonitor}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {language === 'ta'
                ? 'நுண் காலநிலை பூச்சி பெருக்கக் காரணிகளைக் கண்காணித்து, பொருளாதார சேத வரம்பை மீறுவதற்கு முன்பே இயற்கை உயிரியல் காரணிகளைப் பயன்படுத்தவும்.'
                : 'Monitor micro-climatic pest breeding factors and apply organic bio-agents before economic injury thresholds are breached.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-orange-800 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 font-semibold">
              🔍 {t.activeIpmScoutingBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Simulator & Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            {t.cropEnvConditions}
          </h2>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t.selectCropAssess}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 font-medium cursor-pointer"
            >
              <option value="Tomato">{CROP_TRANSLATIONS[language]['Tomato'] || 'Tomato'}</option>
              <option value="Paddy / Rice">{CROP_TRANSLATIONS[language]['Paddy / Rice'] || 'Paddy / Rice'}</option>
              <option value="Cotton">{CROP_TRANSLATIONS[language]['Cotton'] || 'Cotton'}</option>
              <option value="Chilli">{CROP_TRANSLATIONS[language]['Chilli'] || 'Chilli'}</option>
              <option value="Sugarcane">{CROP_TRANSLATIONS[language]['Sugarcane'] || 'Sugarcane'}</option>
              <option value="Corn / Maize">{CROP_TRANSLATIONS[language]['Corn / Maize'] || 'Corn / Maize'}</option>
              <option value="Banana">{CROP_TRANSLATIONS[language]['Banana'] || 'Banana'}</option>
              <option value="Wheat">{CROP_TRANSLATIONS[language]['Wheat'] || 'Wheat'}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">{t.temperature} (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">{t.humidity} (%)</label>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">{t.rainfallExpected} (mm)</label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
            />
          </div>

          <button
            onClick={handlePredictPest}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? t.evaluatingRisk : t.runPestPrediction}</span>
          </button>
        </div>

        {/* Right Assessment (7 columns) */}
        <div className="lg:col-span-7">
          {prediction && (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    {t.primaryPestIdentified}
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    {language === 'ta' && (prediction as any).pest_ta ? (prediction as any).pest_ta : prediction.pest}
                  </h3>
                  {prediction.scientificName && (
                    <span className="text-xs text-stone-500 italic">
                      {prediction.scientificName}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    prediction.riskLevel === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    prediction.riskLevel === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    prediction.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {SEVERITY_TRANSLATIONS[language][prediction.riskLevel] || prediction.riskLevel} {language === 'ta' ? 'அபாயம்' : 'Risk'} ({prediction.riskScore}/100)
                  </span>
                </div>
              </div>

              {/* Possible Cause */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs leading-relaxed">
                <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] block mb-1">
                  {t.possibleCause}
                </span>
                <p className="text-stone-700">
                  {language === 'ta' && (prediction as any).possibleCause_ta ? (prediction as any).possibleCause_ta : prediction.possibleCause}
                </p>
              </div>

              {/* Biological Control & Prevention */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.biologicalControl}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {language === 'ta' && (prediction as any).biologicalControl_ta
                      ? (prediction as any).biologicalControl_ta
                      : (prediction.biologicalControl || (language === 'ta' ? 'வேப்பெண்ணெய் (10,000 ppm) @ 2-3 மி.லி/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.' : 'Apply cold-pressed Neem oil (10,000 ppm) @ 2-3 ml/L or release green lacewings.'))}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800">
                    <ShieldAlert className="w-4 h-4 text-orange-600" />
                    <span>{t.preventionTips}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {language === 'ta' && (prediction as any).prevention_ta ? (prediction as any).prevention_ta : prediction.prevention}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pest Encyclopedia / Reference Cards */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
          <span>{t.pestLibraryTitle}</span>
          <span className="text-xs text-stone-400 font-normal">{t.biologicalIpm}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PEST_DATABASE.map((rawPest) => {
            const pest = getLocalizedPest(rawPest, language);
            const severityText = SEVERITY_TRANSLATIONS[language][pest.riskLevel] || pest.riskLevel;

            return (
              <div
                key={pest.id}
                className="p-3.5 rounded-xl border border-stone-200/80 hover:border-orange-300 transition-colors bg-stone-50/40 text-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{pest.name}</h4>
                    <span className="text-[11px] text-stone-500 italic block">{pest.scientificName}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    pest.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800' :
                    pest.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {severityText}
                  </span>
                </div>

                <div className="text-[11px] text-stone-600">
                  <strong>{t.hostsColon}</strong> {pest.crops.join(', ')}
                </div>

                <p className="text-stone-700 line-clamp-2 text-[11px]">
                  {pest.symptoms}
                </p>

                <div className="pt-2 border-t border-stone-200/60 text-[11px] text-emerald-800 font-medium">
                  🌱 <strong>{t.bioControlColon}</strong> {pest.biologicalControl}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
