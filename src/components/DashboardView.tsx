import React from 'react';
import { 
  HeartPulse, 
  CloudSun, 
  Droplet, 
  Bug, 
  ShieldCheck, 
  Camera, 
  Bot, 
  Bell, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DiseaseDetectionResult, EarlyWarningAlert, Farm, FarmHealthScore, Language, WeatherData } from '../types';
import { TRANSLATIONS, GROWTH_STAGE_TRANSLATIONS, SEVERITY_TRANSLATIONS } from '../i18n/translations';
import { getLocalizedScan, getLocalizedAlert } from '../data/agriData';

interface DashboardViewProps {
  currentFarm: Farm | null;
  healthScore: FarmHealthScore;
  weather: WeatherData;
  recentScans: DiseaseDetectionResult[];
  alerts: EarlyWarningAlert[];
  language: Language;
  onNavigate: (tab: string) => void;
  onScanSelect: (scan: DiseaseDetectionResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentFarm,
  healthScore,
  weather,
  recentScans,
  alerts,
  language,
  onNavigate,
  onScanSelect,
}) => {
  const t = TRANSLATIONS[language];

  // Helper color & label for Farm Health Score
  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return { 
        label: language === 'ta' ? 'மிகச் சிறந்தது' : 'Excellent', 
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200' 
      };
    }
    if (score >= 75) {
      return { 
        label: language === 'ta' ? 'நன்று' : 'Good', 
        color: 'text-emerald-800 bg-emerald-50/80 border-emerald-200' 
      };
    }
    if (score >= 60) {
      return { 
        label: language === 'ta' ? 'மிதமானது' : 'Fair', 
        color: 'text-amber-800 bg-amber-50 border-amber-200' 
      };
    }
    if (score >= 40) {
      return { 
        label: language === 'ta' ? 'மோசம்' : 'Poor', 
        color: 'text-orange-800 bg-orange-50 border-orange-200' 
      };
    }
    return { 
      label: language === 'ta' ? 'மிகத் தீவிரம்' : 'Critical', 
      color: 'text-rose-800 bg-rose-50 border-rose-200' 
    };
  };

  const scoreBadge = getScoreBadge(healthScore.score);
  const unreadAlerts = alerts.filter(a => !a.read);

  // Localized weather condition
  const weatherConditionText = language === 'ta'
    ? (weather.condition.toLowerCase().includes('cloud') ? 'பகுதி மேகமூட்டம்' :
       weather.condition.toLowerCase().includes('rain') ? 'மழைப்பொழிவு' : 'மிதமான வெயில்')
    : weather.condition;

  const farmDisplayName = (language === 'ta' && (currentFarm as any)?.name_ta) 
    ? (currentFarm as any).name_ta 
    : (currentFarm?.name || (language === 'ta' ? 'செயலில் உள்ள பண்ணை' : 'Active Farm'));

  const farmDisplayLocation = (language === 'ta' && (currentFarm as any)?.location_ta)
    ? (currentFarm as any).location_ta
    : (currentFarm?.location || (language === 'ta' ? 'தமிழ்நாடு' : 'Tamil Nadu'));

  const growthStageText = GROWTH_STAGE_TRANSLATIONS[language][currentFarm?.fields[0]?.plants[0]?.growthStage || 'Vegetative'] || 'Vegetative';

  return (
    <div className="space-y-6 pb-12">
      {/* Farmer Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-sm border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-1">
              <span>🌾 {farmDisplayName}</span>
              <span>·</span>
              <span>{farmDisplayLocation}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.welcomeFarmer}
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              {t.activeMonitoringDesc} <strong className="text-emerald-300 font-semibold">{growthStageText}</strong> {t.vegetativeVitalityDesc}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('scan')}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2 text-sm cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{t.scanLeaf}</span>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-medium px-3.5 py-2.5 rounded-xl border border-emerald-600 transition-colors flex items-center gap-2 text-sm cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>{t.askAI}</span>
            </button>
          </div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <HeartPulse className="w-64 h-64 text-emerald-300" />
        </div>
      </div>

      {/* Main 5 Metric Cards: Health Score, Weather, Disease Risk, Pest Risk, Water Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Farm Health Score Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.farmHealthScore}</span>
            <span className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
              <HeartPulse className="w-4 h-4" />
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900">{healthScore.score}</span>
            <span className="text-xs text-stone-400 font-medium">/ 100</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
            <span className={`px-2 py-0.5 rounded font-semibold text-[11px] border ${scoreBadge.color}`}>
              {scoreBadge.label}
            </span>
            <button 
              onClick={() => onNavigate('farm')}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.breakdown}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Live Weather Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.currentWeather}</span>
            <span className="p-2 bg-sky-50 rounded-lg text-sky-700">
              <CloudSun className="w-4 h-4" />
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900">{Math.round(weather.temperature)}°C</span>
            <span className="text-xs text-stone-500 font-medium">{weatherConditionText}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>💧 {language === 'ta' ? 'ஈரப்பதம்' : 'Hum'}: {weather.humidity}%</span>
            <span>🌧 {weather.rainfallMm} {language === 'ta' ? 'மி.மீ' : 'mm'}</span>
          </div>
        </div>

        {/* 3. Disease Risk Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.diseaseRisk}</span>
            <span className="p-2 bg-amber-50 rounded-lg text-amber-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">
              {language === 'ta' ? 'குறைவு - மிதமானது' : 'Low - Mild'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>{t.dewRiskLow}</span>
            <button 
              onClick={() => onNavigate('scan')}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.scanLeaf}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4. Pest Risk Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.pestRiskStatus}</span>
            <span className="p-2 bg-orange-50 rounded-lg text-orange-700">
              <Bug className="w-4 h-4" />
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700">
              {language === 'ta' ? 'மிதமானது' : 'Medium'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>{t.watchlistPest}</span>
            <button 
              onClick={() => onNavigate('pest')}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>{language === 'ta' ? 'கட்டுப்பாடு' : 'IPM'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5. Water Status Card */}
        <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.waterStatus}</span>
            <span className="p-2 bg-blue-50 rounded-lg text-blue-700">
              <Droplet className="w-4 h-4" />
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900">{t.optimalMoist}</span>
            <span className="text-xs text-stone-500 font-medium">({language === 'ta' ? '42% ஈரப்பதம்' : '42% moist'})</span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>{t.nextDripSchedule}</span>
            <button 
              onClick={() => onNavigate('irrigation')}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.irrigation}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Active Alerts & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Alerts & Farm Health Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active AI Early Warnings */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-stone-900">{t.aiEarlyWarningsTitle}</h2>
                  <p className="text-xs text-stone-500">{t.aiEarlyWarningsSubtitle}</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('alerts')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>{t.viewAllAlerts} ({alerts.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((rawAlert) => {
                const alert = getLocalizedAlert(rawAlert, language);

                return (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-lg border text-xs transition-colors flex items-start gap-3 ${
                      alert.severity === 'danger'
                        ? 'bg-rose-50/50 border-rose-200 text-stone-900'
                        : alert.severity === 'warning'
                        ? 'bg-amber-50/50 border-amber-200 text-stone-900'
                        : 'bg-emerald-50/40 border-emerald-200 text-stone-900'
                    }`}
                  >
                    <div className="mt-0.5">
                      {alert.severity === 'danger' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ) : alert.severity === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 text-sm">{alert.title}</span>
                        <span className="text-[11px] text-stone-400">{alert.timestamp}</span>
                      </div>
                      <p className="text-stone-600 mt-1 leading-relaxed">{alert.message}</p>
                      <div className="mt-2 pt-2 border-t border-stone-200/50 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-emerald-800">
                          <strong>{t.actionColon}</strong> {alert.action}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Farm Health Pillars Breakdown */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 mb-1">{t.healthPillarsTitle}</h2>
            <p className="text-xs text-stone-500 mb-4">{t.healthPillarsSubtitle}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-[11px] text-stone-500 font-medium block">{t.plantHealth}</span>
                <span className="text-lg font-bold text-emerald-700">{healthScore.plantHealth}%</span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${healthScore.plantHealth}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-[11px] text-stone-500 font-medium block">{t.soilHealth}</span>
                <span className="text-lg font-bold text-emerald-700">{healthScore.soilHealth}%</span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${healthScore.soilHealth}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-[11px] text-stone-500 font-medium block">{t.waterStatusPillar}</span>
                <span className="text-lg font-bold text-emerald-700">{healthScore.waterStatus}%</span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${healthScore.waterStatus}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-[11px] text-stone-500 font-medium block">{t.pestDefense}</span>
                <span className="text-lg font-bold text-amber-700">{healthScore.pestRisk}%</span>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${healthScore.pestRisk}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Recent Scans & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-stone-900 mb-3 uppercase tracking-wider">{t.quickActions}</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('scan')}
                className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-colors cursor-pointer"
              >
                <Camera className="w-5 h-5 text-emerald-700 mb-1" />
                <span className="text-xs font-bold text-emerald-950 block">{t.scanLeaf}</span>
                <span className="text-[11px] text-emerald-700">{t.detectDiseaseDesc}</span>
              </button>

              <button
                onClick={() => onNavigate('irrigation')}
                className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-left transition-colors cursor-pointer"
              >
                <Droplet className="w-5 h-5 text-blue-700 mb-1" />
                <span className="text-xs font-bold text-blue-950 block">{t.checkIrrigation}</span>
                <span className="text-[11px] text-blue-700">{t.waterCalculatorDesc}</span>
              </button>

              <button
                onClick={() => onNavigate('chat')}
                className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition-colors cursor-pointer"
              >
                <Bot className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-xs font-bold text-amber-950 block">{t.askAI}</span>
                <span className="text-[11px] text-amber-700">{t.aiConsultDesc}</span>
              </button>

              <button
                onClick={() => onNavigate('schemes')}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-left transition-colors cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-purple-700 mb-1" />
                <span className="text-xs font-bold text-purple-950 block">{t.governmentSchemes}</span>
                <span className="text-[11px] text-purple-700">{t.govtSchemesDesc}</span>
              </button>
            </div>
          </div>

          {/* Recent Disease Scans */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">{t.recentScans}</h2>
              <button 
                onClick={() => onNavigate('scan')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
              >
                {t.newScan}
              </button>
            </div>

            {recentScans.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-xs border border-dashed rounded-lg">
                <Camera className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p>{t.noRecentScans}</p>
                <button
                  onClick={() => onNavigate('scan')}
                  className="mt-2 text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  {t.scanYourFirstLeaf}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentScans.slice(0, 4).map((rawScan) => {
                  const locScan = getLocalizedScan(rawScan, language);
                  if (!locScan) return null;
                  const severityText = SEVERITY_TRANSLATIONS[language][locScan.severity] || locScan.severity;

                  return (
                    <div
                      key={rawScan.id || Math.random()}
                      onClick={() => {
                        onScanSelect(rawScan);
                        onNavigate('scan');
                      }}
                      className="p-2.5 rounded-lg border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{locScan.plant}</div>
                        <div className="text-stone-500 text-[11px]">{locScan.disease}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          locScan.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                          locScan.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                          locScan.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {severityText}
                        </span>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          {locScan.confidence}% {t.confidenceMatch}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
