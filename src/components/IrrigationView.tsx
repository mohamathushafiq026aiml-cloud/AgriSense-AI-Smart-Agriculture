import React, { useState } from 'react';
import { 
  Droplet, 
  Clock, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar,
  CloudRain,
  Thermometer,
  Layers
} from 'lucide-react';
import { Farm, IrrigationPrediction, Language } from '../types';
import { TRANSLATIONS, GROWTH_STAGE_TRANSLATIONS, CROP_TRANSLATIONS } from '../i18n/translations';

interface IrrigationViewProps {
  currentFarm: Farm | null;
  language: Language;
}

export const IrrigationView: React.FC<IrrigationViewProps> = ({
  currentFarm,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [plantType, setPlantType] = useState(currentFarm?.mainCrop || 'Tomato');
  const [growthStage, setGrowthStage] = useState('Vegetative');
  const [soilMoisture, setSoilMoisture] = useState(42);
  const [temperature, setTemperature] = useState(30);
  const [humidity, setHumidity] = useState(65);
  const [rainfall, setRainfall] = useState(0);
  const [selectedFieldId, setSelectedFieldId] = useState(currentFarm?.fields[0]?.id || '');

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<IrrigationPrediction | null>(null);
  const [history, setHistory] = useState<IrrigationPrediction[]>([
    {
      id: 'irrig-hist-1',
      timestamp: language === 'ta' ? 'நேற்று காலை 06:30' : 'Yesterday at 06:30 AM',
      plantType: 'Tomato',
      growthStage: 'Vegetative',
      temperature: 28,
      humidity: 75,
      soilMoisture: 38,
      rainfall: 0,
      waterRequirement: 4.8,
      irrigationNeed: true,
      recommendedDurationMinutes: 45,
      waterSavingEstimatePercent: 32,
      reason: 'Root zone moisture was 38%. Early morning drip irrigation prevented transpiration wilt.'
    }
  ]);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/irrigation/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature,
          humidity,
          soilMoisture,
          rainfall,
          plantType,
          growthStage,
          farmId: currentFarm?.id,
          fieldId: selectedFieldId
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        setPrediction(res.data);
        setHistory(prev => [res.data, ...prev]);
      }
    } catch (err) {
      console.error('Irrigation calc error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Run calculation once on mount if empty
  React.useEffect(() => {
    if (!prediction) {
      handleCalculate();
    }
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Droplet className="w-4 h-4" />
              <span>{t.faoPenmanEngineBadge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.irrigationPlanner}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {language === 'ta' 
                ? 'துல்லியமான சொட்டு நீர் பாசனத்தின் மூலம் பயிருக்குத் தேவையான நீரை வழங்கி, வேரழுகல் நோயைத் தடுத்து, 40% வரை நிலத்தடி நீரைச் சேமிக்கவும்.' 
                : 'Optimize crop hydration, prevent root rot, and save up to 40% groundwater through precision drip timing.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 font-semibold">
              💧 {t.fieldTargetMoistureBadge}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls (5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            {t.fieldClimateParams}
          </h2>

          {/* Crop Selector */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">{t.cropType}</label>
            <select
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Tomato">{language === 'ta' ? 'தக்காளி (வீரிய ஒட்டு)' : 'Tomato (Hybrid)'}</option>
              <option value="Paddy / Rice">{language === 'ta' ? 'நெல் / நெற்பயிர்' : 'Paddy / Rice'}</option>
              <option value="Sugarcane">{language === 'ta' ? 'கரும்பு' : 'Sugarcane'}</option>
              <option value="Cotton">{language === 'ta' ? 'பருத்தி' : 'Cotton'}</option>
              <option value="Chilli">{language === 'ta' ? 'மிளகாய்' : 'Chilli / Pepper'}</option>
              <option value="Banana">{language === 'ta' ? 'வாழை' : 'Banana'}</option>
              <option value="Corn / Maize">{language === 'ta' ? 'மக்காச்சோளம்' : 'Corn / Maize'}</option>
              <option value="Wheat">{language === 'ta' ? 'கோதுமை' : 'Wheat'}</option>
              <option value="Onion">{language === 'ta' ? 'வெங்காயம்' : 'Onion'}</option>
              <option value="Groundnut">{language === 'ta' ? 'நிலக்கடலை' : 'Groundnut'}</option>
            </select>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">{t.growthStage}</label>
            <select
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Germination">{GROWTH_STAGE_TRANSLATIONS[language]['Germination']}</option>
              <option value="Vegetative">{GROWTH_STAGE_TRANSLATIONS[language]['Vegetative']}</option>
              <option value="Flowering">{GROWTH_STAGE_TRANSLATIONS[language]['Flowering']}</option>
              <option value="Fruiting">{GROWTH_STAGE_TRANSLATIONS[language]['Fruiting']}</option>
              <option value="Maturity">{GROWTH_STAGE_TRANSLATIONS[language]['Maturity']}</option>
            </select>
          </div>

          {/* Soil Moisture Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700">{t.soilMoisture}</span>
              <span className={`font-bold ${soilMoisture < 40 ? 'text-rose-600' : 'text-emerald-700'}`}>
                {soilMoisture}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>{t.moistDry}</span>
              <span>{t.moistOptimal}</span>
              <span>{t.moistSaturated}</span>
            </div>
          </div>

          {/* Temperature & Humidity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">{t.temperature} (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800 font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">{t.humidity} (%)</label>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800 font-medium"
              />
            </div>
          </div>

          {/* Rainfall expected */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">{t.rainfallExpected} (mm)</label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              placeholder="0 mm"
              className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800 font-medium"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? t.calculating : t.calculateWaterNeed}</span>
          </button>
        </div>

        {/* Prediction Results (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {prediction && (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
              {/* Decision Header */}
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    {t.aiIrrigationDecision}
                  </span>
                  <div className="flex items-center gap-2">
                    {prediction.irrigationNeed ? (
                      <div className="flex items-center gap-2 text-blue-700">
                        <Droplet className="w-6 h-6 fill-blue-600 text-blue-600" />
                        <h3 className="text-xl font-extrabold text-stone-900">
                          {t.irrigationRecommended}
                        </h3>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-xl font-extrabold text-stone-900">
                          {t.noIrrigationNeeded}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  prediction.irrigationNeed ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                }`}>
                  {prediction.irrigationNeed ? t.applyWater : t.soilHydrated}
                </span>
              </div>

              {/* 3 Metric Cards: Duration, Demand, Water Savings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-800 font-semibold mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{t.recommendedDuration}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-blue-950">
                    {prediction.recommendedDurationMinutes} {language === 'ta' ? 'நிமிடம்' : 'mins'}
                  </span>
                  <span className="text-[10px] text-blue-700/80 block mt-1">{t.viaDripEmitter}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700 font-semibold mb-1">
                    <Droplet className="w-4 h-4 text-stone-500" />
                    <span>{t.waterRequirement}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-stone-900">
                    {prediction.waterRequirement} {language === 'ta' ? 'மி.மீ/நாள்' : 'mm/day'}
                  </span>
                  <span className="text-[10px] text-stone-500 block mt-1">{t.cropEtcDemand}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>{t.waterSaving}</span>
                  </div>
                  <span className="text-2xl font-extrabold text-emerald-950">
                    {prediction.waterSavingEstimatePercent}%
                  </span>
                  <span className="text-[10px] text-emerald-700/80 block mt-1">{t.vsFloodWatering}</span>
                </div>
              </div>

              {/* Agronomic Reason */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs leading-relaxed space-y-1">
                <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px] block">
                  {t.agronomicReason}
                </span>
                <p className="text-stone-700">
                  {language === 'ta'
                    ? (prediction.irrigationNeed 
                        ? `மண் ஈரப்பதம் (${soilMoisture}%) பயிரின் வளர்ச்சிப் பருவத்திற்குத் தேவையான உகந்த அளவை விடக் குறைவாக உள்ளது. அதிகாலை அல்லது மாலை வேளையில் ${prediction.recommendedDurationMinutes} நிமிடங்கள் சொட்டு நீர் பாசனம் செய்யவும்.`
                        : `மண் ஈரப்பதம் (${soilMoisture}%) தற்போது உகந்த அளவில் உள்ளது. வேர்ப்பகுதியில் போதுமான நீர் இருப்பு உள்ளது. அடுத்த 24 மணி நேரத்திற்குப் பிறகு மீண்டும் சரிபார்க்கவும்.`)
                    : prediction.reason}
                </p>
              </div>

              {/* Drip timing recommendation */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span>
                  <strong>{t.farmerProTip}</strong> {t.dripTimingAdvice}
                </span>
              </div>
            </div>
          )}

          {/* Irrigation Log History */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {t.recentIrrigationRuns}
            </h3>
            <div className="space-y-2">
              {history.map((item, idx) => {
                const localizedCrop = CROP_TRANSLATIONS[language][item.plantType] || item.plantType;
                const localizedStage = GROWTH_STAGE_TRANSLATIONS[language][item.growthStage] || item.growthStage;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-stone-200/60 flex items-center justify-between text-xs hover:bg-stone-50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-stone-900">
                        {localizedCrop} ({localizedStage})
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {language === 'ta' ? 'ஈரப்பதம்' : 'Moist'}: {item.soilMoisture}% · {language === 'ta' ? 'வெப்பநிலை' : 'Temp'}: {item.temperature}°C · {item.timestamp}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-blue-700">
                        {item.recommendedDurationMinutes > 0 
                          ? `${item.recommendedDurationMinutes} ${language === 'ta' ? 'நிமிடம்' : 'mins'}` 
                          : t.skippedHydrated}
                      </span>
                      <span className="text-[10px] text-emerald-700 block font-medium">
                        {t.savedApprox} {item.waterSavingEstimatePercent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
