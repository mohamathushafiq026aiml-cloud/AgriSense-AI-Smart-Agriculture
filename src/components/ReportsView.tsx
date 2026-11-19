import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
} from 'lucide-react';
import { DiseaseDetectionResult, Farm, FarmHealthScore, Language, WeatherData } from '../types';
import { TRANSLATIONS, SEVERITY_TRANSLATIONS, CROP_TRANSLATIONS, SOIL_TYPE_TRANSLATIONS, IRRIGATION_TYPE_TRANSLATIONS } from '../i18n/translations';
import { getLocalizedScan } from '../data/agriData';

interface ReportsViewProps {
  currentFarm: Farm | null;
  healthScore: FarmHealthScore;
  weather: WeatherData;
  recentScans: DiseaseDetectionResult[];
  language: Language;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  currentFarm,
  healthScore,
  weather,
  recentScans,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedReportType, setSelectedReportType] = useState<'complete' | 'disease'>('complete');

  const handlePrint = () => {
    window.print();
  };

  const farmDisplayName = (language === 'ta' && (currentFarm as any)?.name_ta) 
    ? (currentFarm as any).name_ta 
    : (currentFarm?.name || (language === 'ta' ? 'முதன்மை பண்ணை' : 'Primary Farm'));

  const farmLocation = (language === 'ta' && (currentFarm as any)?.location_ta)
    ? `${(currentFarm as any).location_ta}, ${currentFarm?.district}`
    : `${currentFarm?.location}, ${currentFarm?.district}`;

  const soilDisplay = currentFarm ? (SOIL_TYPE_TRANSLATIONS[language][currentFarm.soilType] || currentFarm.soilType) : '';
  const cropDisplay = currentFarm ? (CROP_TRANSLATIONS[language][currentFarm.mainCrop] || currentFarm.mainCrop) : '';
  const irrigDisplay = currentFarm ? (IRRIGATION_TYPE_TRANSLATIONS[language][currentFarm.irrigationType] || currentFarm.irrigationType) : '';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>{t.farmIntelligenceBadge}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t.reportsTitle}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            {t.reportsSubtitle}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>{t.printSavePdf}</span>
        </button>
      </div>

      {/* Select Report Type Tabs */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setSelectedReportType('complete')}
          className={`px-3.5 py-2 rounded-xl border transition-colors cursor-pointer ${
            selectedReportType === 'complete'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
          }`}
        >
          {t.completeHealthAuditTab}
        </button>
        <button
          onClick={() => setSelectedReportType('disease')}
          className={`px-3.5 py-2 rounded-xl border transition-colors cursor-pointer ${
            selectedReportType === 'disease'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
          }`}
        >
          {t.diseasePathologyTab}
        </button>
      </div>

      {/* Printable Sheet Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Report Official Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-emerald-900 tracking-tight">🌾 {t.appName}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {t.officialDossier}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {t.microAgroSystem}
            </p>
          </div>

          <div className="text-right text-xs text-stone-500">
            <div><strong>{t.reportDate}</strong> {new Date().toLocaleDateString()}</div>
            <div><strong>{t.dossierId}</strong> AGRI-AUDIT-{Date.now().toString().slice(-6)}</div>
          </div>
        </div>

        {/* Farm Metadata */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-stone-400 block text-[11px]">{t.farmNameReport}</span>
            <strong className="text-stone-900 text-sm">{farmDisplayName}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">{t.locationReport}</span>
            <strong className="text-stone-900">{farmLocation}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">{t.totalLandReport}</span>
            <strong className="text-stone-900">{currentFarm?.areaAcres} {language === 'ta' ? 'ஏக்கர்' : 'Acres'} ({soilDisplay})</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">{t.primaryCropReport}</span>
            <strong className="text-emerald-800">{cropDisplay} ({irrigDisplay})</strong>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        {selectedReportType === 'complete' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {t.executiveSummaryTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                <span className="text-stone-500 block">{t.overallHealthScore}</span>
                <div className="text-2xl font-extrabold text-emerald-800">
                  {healthScore.score} / 100
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block">
                  {t.ratingLabel} {language === 'ta' ? (healthScore.status === 'Good' ? 'நன்று' : healthScore.status) : healthScore.status}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                <span className="text-stone-500 block">{t.weatherIndex}</span>
                <div className="text-2xl font-extrabold text-stone-900">
                  {Math.round(weather.temperature)}°C
                </div>
                <span className="text-[11px] text-stone-500 font-semibold block">
                  {language === 'ta' ? 'ஈரப்பதம்' : 'Humidity'} {weather.humidity}% · {language === 'ta' ? 'மழை' : 'Rain'} {weather.rainfallMm} mm
                </span>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                <span className="text-stone-500 block">{t.loggedScansCount}</span>
                <div className="text-2xl font-extrabold text-stone-900">
                  {recentScans.length}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block">
                  {t.pathologyAuditCurrent}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Pathology Scans Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            {t.recentScansAuditTitle}
          </h3>

          {recentScans.length === 0 ? (
            <p className="text-xs text-stone-400 italic">{t.noIncidentsLogged}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 border-y border-stone-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">{t.dateHeader}</th>
                    <th className="py-2.5 px-3">{t.cropVarietyHeader || t.plant}</th>
                    <th className="py-2.5 px-3">{t.conditionDiseaseHeader}</th>
                    <th className="py-2.5 px-3">{t.severityHeader}</th>
                    <th className="py-2.5 px-3">{t.confidenceHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentScans.map((rawScan, idx) => {
                    const s = getLocalizedScan(rawScan, language) || rawScan;
                    const severityLabel = SEVERITY_TRANSLATIONS[language][s.severity] || s.severity;

                    return (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 text-stone-500">{new Date(s.timestamp || Date.now()).toLocaleDateString()}</td>
                        <td className="py-2.5 px-3 font-semibold text-stone-900">{s.plant}</td>
                        <td className="py-2.5 px-3 text-stone-800">{s.disease}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            s.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            s.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {severityLabel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-emerald-700">{s.confidence}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Official Disclaimer */}
        <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-400 leading-relaxed">
          <p>
            <strong>{t.officialDisclaimerTitle}</strong> {t.officialDisclaimerBody}
          </p>
        </div>
      </div>
    </div>
  );
};
