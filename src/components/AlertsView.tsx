import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet, 
  Bug, 
  CloudRain, 
  Flame, 
  ShieldAlert, 
  Check
} from 'lucide-react';
import { EarlyWarningAlert, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { getLocalizedAlert } from '../data/agriData';

interface AlertsViewProps {
  alerts: EarlyWarningAlert[];
  onMarkRead: (id: string) => void;
  language: Language;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onMarkRead,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [filterType, setFilterType] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !alert.read;
    return alert.type === filterType;
  });

  const getAlertIcon = (type: EarlyWarningAlert['type']) => {
    switch (type) {
      case 'disease': return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'water': return <Droplet className="w-5 h-5 text-blue-600" />;
      case 'pest': return <Bug className="w-5 h-5 text-orange-600" />;
      case 'rain': return <CloudRain className="w-5 h-5 text-sky-600" />;
      case 'heat': return <Flame className="w-5 h-5 text-rose-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  const filterTabs = [
    { id: 'all', label: t.allAlerts },
    { id: 'unread', label: t.unreadOnly },
    { id: 'disease', label: t.diseaseAlerts },
    { id: 'water', label: t.waterAlerts },
    { id: 'pest', label: t.pestAlerts },
    { id: 'rain', label: t.rainAlerts },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4" />
              <span>{t.agroThreatBadge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.threatDetectionTitle}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {t.threatDetectionSubtitle}
            </p>
          </div>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 self-start sm:self-auto">
            {alerts.filter(a => !a.read).length} {t.unresolvedWarnings}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        {filterTabs.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              filterType === f.id
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/80 text-stone-500 text-xs space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-800 text-sm">{t.allClearAlertsTitle}</h4>
            <p>{t.noActiveThreats}</p>
          </div>
        ) : (
          filteredAlerts.map((rawAlert) => {
            const alert = getLocalizedAlert(rawAlert, language);

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                  !alert.read ? 'border-amber-300 ring-1 ring-amber-100' : 'border-stone-200/80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-stone-900 text-sm">{alert.title}</h3>
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" title={t.unreadOnly} />
                      )}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                      {alert.message}
                    </p>
                    <div className="pt-2 text-xs text-emerald-900 font-medium">
                      <strong className="text-emerald-950">{t.actionColon}</strong> {alert.action}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                  <span className="text-[11px] text-stone-400">{alert.timestamp}</span>
                  {!alert.read && (
                    <button
                      onClick={() => onMarkRead(alert.id)}
                      className="text-xs text-stone-600 hover:text-emerald-700 font-semibold p-1.5 rounded-lg border border-stone-200 hover:border-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.acknowledge}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
