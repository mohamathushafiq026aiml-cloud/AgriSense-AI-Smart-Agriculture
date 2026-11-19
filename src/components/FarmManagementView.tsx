import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Farm, Field, Language } from '../types';
import { TRANSLATIONS, SOIL_TYPE_TRANSLATIONS, IRRIGATION_TYPE_TRANSLATIONS, CROP_TRANSLATIONS, GROWTH_STAGE_TRANSLATIONS } from '../i18n/translations';

interface FarmManagementViewProps {
  farms: Farm[];
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm) => void;
  onUpdateFarms: (farms: Farm[]) => void;
  language: Language;
}

export const FarmManagementView: React.FC<FarmManagementViewProps> = ({
  farms,
  currentFarm,
  setCurrentFarm,
  onUpdateFarms,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [notice, setNotice] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // New Farm form state
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [areaAcres, setAreaAcres] = useState(5.0);
  const [soilType, setSoilType] = useState<'Clay' | 'Loamy' | 'Sandy' | 'Black Soil' | 'Red Soil' | 'Alluvial'>('Red Soil');
  const [mainCrop, setMainCrop] = useState('Tomato');
  const [irrigationType, setIrrigationType] = useState<'Drip' | 'Sprinkler' | 'Flood' | 'Furrow' | 'Rainfed'>('Drip');

  // New Field form state
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState(2.0);
  const [fieldCrop, setFieldCrop] = useState('Tomato');
  const [fieldSoilMoisture, setFieldSoilMoisture] = useState(45);

  const showNotification = (type: 'error' | 'success', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    const newFarm: Farm = {
      id: 'farm-' + Date.now(),
      name: farmName,
      location,
      district,
      state,
      areaAcres: Number(areaAcres),
      soilType,
      mainCrop,
      plantingDate: new Date().toISOString().split('T')[0],
      irrigationType,
      createdAt: new Date().toISOString().split('T')[0],
      fields: [
        {
          id: 'field-' + Date.now(),
          farmId: 'farm-' + Date.now(),
          name: language === 'ta' ? 'முதன்மை நிலப்பிரிவு (பிளாக் 1)' : 'Main Plot (Block 1)',
          areaAcres: Number(areaAcres),
          soilType,
          soilMoisture: 48,
          crop: mainCrop,
          variety: 'Certified Hybrid',
          plantingDate: new Date().toISOString().split('T')[0],
          irrigationType,
          plants: [
            {
              id: 'plant-' + Date.now(),
              fieldId: 'field-' + Date.now(),
              name: `${mainCrop} Row 1`,
              variety: 'Standard',
              plantingDate: new Date().toISOString().split('T')[0],
              daysAfterPlanting: 15,
              growthStage: 'Vegetative',
              heightCm: 25,
              leafCount: 12,
              healthStatus: 'Good'
            }
          ]
        }
      ]
    };

    const updated = [...farms, newFarm];
    onUpdateFarms(updated);
    setCurrentFarm(newFarm);
    setShowAddFarmModal(false);
    showNotification('success', language === 'ta' ? 'புதிய பண்ணை வெற்றிகரமாக சேர்க்கப்பட்டது!' : 'New farm added successfully!');
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarm) return;

    const newField: Field = {
      id: 'field-' + Date.now(),
      farmId: currentFarm.id,
      name: fieldName,
      areaAcres: Number(fieldArea),
      soilType: currentFarm.soilType,
      soilMoisture: Number(fieldSoilMoisture),
      crop: fieldCrop,
      variety: 'Select Variety',
      plantingDate: new Date().toISOString().split('T')[0],
      irrigationType: currentFarm.irrigationType,
      plants: [
        {
          id: 'plant-' + Date.now(),
          fieldId: 'field-' + Date.now(),
          name: `${fieldCrop} Stand A`,
          variety: 'Standard',
          plantingDate: new Date().toISOString().split('T')[0],
          daysAfterPlanting: 10,
          growthStage: 'Germination',
          heightCm: 14,
          leafCount: 6,
          healthStatus: 'Good'
        }
      ]
    };

    const updatedFarm = {
      ...currentFarm,
      fields: [...currentFarm.fields, newField]
    };

    const updatedList = farms.map(f => f.id === currentFarm.id ? updatedFarm : f);
    onUpdateFarms(updatedList);
    setCurrentFarm(updatedFarm);
    setShowAddFieldModal(false);
    showNotification('success', language === 'ta' ? 'புதிய நிலப்பிரிவு சேர்க்கப்பட்டது!' : 'New plot added successfully!');
  };

  const handleDeleteFarm = (id: string) => {
    if (farms.length <= 1) {
      showNotification('error', t.minOneFarmNotice);
      return;
    }
    const remaining = farms.filter(f => f.id !== id);
    onUpdateFarms(remaining);
    if (currentFarm?.id === id) {
      setCurrentFarm(remaining[0]);
    }
    showNotification('success', language === 'ta' ? 'பண்ணை நீக்கப்பட்டது.' : 'Farm removed.');
  };

  const farmDisplayName = (language === 'ta' && (currentFarm as any)?.name_ta)
    ? (currentFarm as any).name_ta
    : (currentFarm?.name || '');

  const farmLocation = (language === 'ta' && (currentFarm as any)?.location_ta)
    ? `${(currentFarm as any).location_ta}, ${currentFarm?.district}, ${currentFarm?.state}`
    : `${currentFarm?.location}, ${currentFarm?.district}, ${currentFarm?.state}`;

  const soilDisplay = currentFarm ? (SOIL_TYPE_TRANSLATIONS[language][currentFarm.soilType] || currentFarm.soilType) : '';
  const cropDisplay = currentFarm ? (CROP_TRANSLATIONS[language][currentFarm.mainCrop] || currentFarm.mainCrop) : '';
  const irrigDisplay = currentFarm ? (IRRIGATION_TYPE_TRANSLATIONS[language][currentFarm.irrigationType] || currentFarm.irrigationType) : '';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {notice && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2 text-xs font-semibold ${
          notice.type === 'error' ? 'bg-rose-800 text-white border-rose-600' : 'bg-emerald-800 text-white border-emerald-600'
        }`}>
          {notice.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-200" /> : <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          <span>{notice.text}</span>
        </div>
      )}

      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>{t.parcelRegistryBadge}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            {t.farmManagement}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            {t.farmManagementSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddFarmModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addFarm}</span>
        </button>
      </div>

      {/* Farm Card Details */}
      {currentFarm && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{farmLocation}</span>
              </div>
              <h2 className="text-xl font-extrabold text-stone-900">
                {farmDisplayName}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDeleteFarm(currentFarm.id)}
                className="text-xs text-rose-700 hover:text-rose-800 font-semibold p-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.deleteFarm}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
              <span className="text-stone-500 font-medium block">{t.totalArea}</span>
              <span className="text-base font-bold text-stone-900 mt-1 block">
                {currentFarm.areaAcres} {language === 'ta' ? 'ஏக்கர்' : 'Acres'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
              <span className="text-stone-500 font-medium block">{t.soilClassification}</span>
              <span className="text-base font-bold text-stone-900 mt-1 block">{soilDisplay}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
              <span className="text-stone-500 font-medium block">{t.mainCrop}</span>
              <span className="text-base font-bold text-emerald-800 mt-1 block">{cropDisplay}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
              <span className="text-stone-500 font-medium block">{t.irrigationSystem}</span>
              <span className="text-base font-bold text-blue-800 mt-1 block">{irrigDisplay}</span>
            </div>
          </div>

          {/* Fields / Plots Section */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  {t.cultivatedPlots} ({currentFarm.fields.length})
                </h3>
                <p className="text-xs text-stone-500">{t.separatelyIrrigated}</p>
              </div>

              <button
                onClick={() => setShowAddFieldModal(true)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addFieldPlot}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFarm.fields.map((field) => {
                const fName = (language === 'ta' && (field as any).name_ta) ? (field as any).name_ta : field.name;
                const fCrop = CROP_TRANSLATIONS[language][field.crop] || field.crop;
                const fIrrig = IRRIGATION_TYPE_TRANSLATIONS[language][field.irrigationType] || field.irrigationType;

                return (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{fName}</h4>
                        <span className="text-xs text-emerald-700 font-medium">
                          {fCrop} ({field.variety})
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                        {field.areaAcres} {language === 'ta' ? 'ஏக்கர்' : 'Acres'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-200/60">
                      <div>
                        <span className="text-stone-500">{language === 'ta' ? 'மண் ஈரப்பதம்:' : 'Soil Moisture:'}</span>
                        <strong className="text-blue-800 ml-1">{field.soilMoisture}%</strong>
                      </div>
                      <div>
                        <span className="text-stone-500">{language === 'ta' ? 'பாசனம்:' : 'Irrigation:'}</span>
                        <strong className="text-stone-800 ml-1">{fIrrig}</strong>
                      </div>
                    </div>

                    {field.plants && field.plants.length > 0 && (
                      <div className="pt-2 border-t border-stone-200/60 text-xs">
                        <span className="text-stone-500 block mb-1">{t.activePlantingStand}</span>
                        <div className="flex items-center justify-between font-medium text-stone-800 bg-white p-2 rounded-lg border border-stone-200/60">
                          <span>🌱 {field.plants[0].name}</span>
                          <span className="text-emerald-700 font-semibold">
                            {GROWTH_STAGE_TRANSLATIONS[language][field.plants[0].growthStage] || field.plants[0].growthStage} ({field.plants[0].daysAfterPlanting} DAP)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Farm */}
      {showAddFarmModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-stone-900">
              {t.registerNewFarmTitle}
            </h3>
            <p className="text-xs text-stone-500">
              {t.registerNewFarmDesc}
            </p>

            <form onSubmit={handleCreateFarm} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.farmName}
                </label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder={language === 'ta' ? 'எ.கா. முரளி இயற்கை பண்ணை' : 'e.g. Sunrise Organic Acres'}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.villageLocation}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'ta' ? 'எ.கா. திருவாலம்' : 'e.g. Thiruvalam'}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
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
                    placeholder={language === 'ta' ? 'எ.கா. வேலூர்' : 'e.g. Vellore'}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.areaAcres}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={areaAcres}
                    onChange={(e) => setAreaAcres(Number(e.target.value))}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.soilClassification}
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="Red Soil">{SOIL_TYPE_TRANSLATIONS[language]['Red Soil']}</option>
                    <option value="Black Soil">{SOIL_TYPE_TRANSLATIONS[language]['Black Soil']}</option>
                    <option value="Loamy">{SOIL_TYPE_TRANSLATIONS[language]['Loamy']}</option>
                    <option value="Clay">{SOIL_TYPE_TRANSLATIONS[language]['Clay']}</option>
                    <option value="Alluvial">{SOIL_TYPE_TRANSLATIONS[language]['Alluvial']}</option>
                    <option value="Sandy">{SOIL_TYPE_TRANSLATIONS[language]['Sandy']}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.primaryCrop}
                  </label>
                  <select
                    value={mainCrop}
                    onChange={(e) => setMainCrop(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="Tomato">{CROP_TRANSLATIONS[language]['Tomato']}</option>
                    <option value="Paddy / Rice">{CROP_TRANSLATIONS[language]['Paddy / Rice']}</option>
                    <option value="Sugarcane">{CROP_TRANSLATIONS[language]['Sugarcane']}</option>
                    <option value="Cotton">{CROP_TRANSLATIONS[language]['Cotton']}</option>
                    <option value="Chilli">{CROP_TRANSLATIONS[language]['Chilli']}</option>
                    <option value="Banana">{CROP_TRANSLATIONS[language]['Banana']}</option>
                    <option value="Corn / Maize">{CROP_TRANSLATIONS[language]['Corn / Maize']}</option>
                    <option value="Wheat">{CROP_TRANSLATIONS[language]['Wheat']}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.irrigationSystem}
                  </label>
                  <select
                    value={irrigationType}
                    onChange={(e) => setIrrigationType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  >
                    <option value="Drip">{IRRIGATION_TYPE_TRANSLATIONS[language]['Drip']}</option>
                    <option value="Sprinkler">{IRRIGATION_TYPE_TRANSLATIONS[language]['Sprinkler']}</option>
                    <option value="Furrow">{IRRIGATION_TYPE_TRANSLATIONS[language]['Furrow']}</option>
                    <option value="Flood">{IRRIGATION_TYPE_TRANSLATIONS[language]['Flood']}</option>
                    <option value="Rainfed">{IRRIGATION_TYPE_TRANSLATIONS[language]['Rainfed']}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {t.saveFarm}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Field */}
      {showAddFieldModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              {t.addFieldPlotTo} {farmDisplayName}
            </h3>

            <form onSubmit={handleAddField} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.plotFieldName}
                </label>
                <input
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder={language === 'ta' ? 'எ.கா. கிழக்கு நிலப்பிரிவு (மிளகாய்)' : 'e.g. East Plot (Chilli)'}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.areaAcres}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(Number(e.target.value))}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.cropPlanted}
                  </label>
                  <input
                    type="text"
                    value={fieldCrop}
                    onChange={(e) => setFieldCrop(e.target.value)}
                    placeholder={language === 'ta' ? 'எ.கா. மிளகாய்' : 'e.g. Chilli'}
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.initialSoilMoisture}
                </label>
                <input
                  type="number"
                  value={fieldSoilMoisture}
                  onChange={(e) => setFieldSoilMoisture(Number(e.target.value))}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-medium"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {t.createPlot}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddFieldModal(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-4 py-2.5 rounded-xl text-xs"
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
