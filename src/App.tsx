import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Camera, 
  Bot, 
  User, 
  Bell 
} from 'lucide-react';
import { 
  DiseaseDetectionResult, 
  EarlyWarningAlert, 
  Farm, 
  FarmHealthScore, 
  Language, 
  UserProfile, 
  WeatherData 
} from './types';
import { INITIAL_FARMS } from './data/agriData';
import { TRANSLATIONS } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DiseaseScannerView } from './components/DiseaseScannerView';
import { IrrigationView } from './components/IrrigationView';
import { PestRiskView } from './components/PestRiskView';
import { PlantGrowthView } from './components/PlantGrowthView';
import { FarmManagementView } from './components/FarmManagementView';
import { AlertsView } from './components/AlertsView';
import { ChatbotView } from './components/ChatbotView';
import { GovernmentSchemesView } from './components/GovernmentSchemesView';
import { MarketplaceView } from './components/MarketplaceView';
import { ReportsView } from './components/ReportsView';
import { ProfileView } from './components/ProfileView';

export default function App() {
  // 1. Language preference (persisted: 'en' or 'ta')
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('agrisense_lang');
    return (saved === 'ta' ? 'ta' : 'en');
  });

  const t = TRANSLATIONS[language];

  useEffect(() => {
    localStorage.setItem('agrisense_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  // 2. Navigation Tab
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // 3. User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('agrisense_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'farmer-9842',
      name: 'Murugan Palanisamy',
      email: 'murugan.agri@kisan.in',
      phone: '+91 98423 11090',
      location: 'Ranipet Village',
      district: 'Ranipet',
      state: 'Tamil Nadu',
      preferredLanguage: 'ta' as Language,
      farmCount: 1,
      createdDate: '2026-03-12'
    };
  });

  useEffect(() => {
    localStorage.setItem('agrisense_user', JSON.stringify(user));
  }, [user]);

  // 4. Farms and current active farm
  const [farms, setFarms] = useState<Farm[]>(() => {
    const saved = localStorage.getItem('agrisense_farms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_FARMS as unknown as Farm[];
  });

  useEffect(() => {
    localStorage.setItem('agrisense_farms', JSON.stringify(farms));
  }, [farms]);

  const [currentFarm, setCurrentFarm] = useState<Farm | null>(() => {
    return farms.length > 0 ? farms[0] : null;
  });

  // 5. Weather state
  const [weather, setWeather] = useState<WeatherData>({
    city: 'Ranipet Agro District',
    state: 'Tamil Nadu',
    temperature: 29.4,
    humidity: 72,
    rainfallMm: 4.2,
    windSpeedKmh: 14,
    pressureHpa: 1011,
    uvIndex: 6,
    condition: 'Partly Cloudy',
    forecast: [
      { day: 'Today', date: 'Oct 07', tempMax: 31, tempMin: 22, condition: 'Partly Cloudy', rainProbability: 25 },
      { day: 'Tomorrow', date: 'Oct 08', tempMax: 30, tempMin: 23, condition: 'Light Rain', rainProbability: 60 },
      { day: 'Thursday', date: 'Oct 09', tempMax: 29, tempMin: 22, condition: 'Scattered Rain', rainProbability: 75 },
      { day: 'Friday', date: 'Oct 10', tempMax: 31, tempMin: 23, condition: 'Sunny', rainProbability: 15 },
      { day: 'Saturday', date: 'Oct 11', tempMax: 32, tempMin: 24, condition: 'Sunny', rainProbability: 10 }
    ]
  });

  // Fetch live weather
  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) setWeather(res.data);
      })
      .catch(() => {});
  }, []);

  // 6. Farm Health Score
  const [healthScore, setHealthScore] = useState<FarmHealthScore>({
    farmId: currentFarm?.id || 'farm-1',
    score: 87,
    status: 'Good',
    plantHealth: 90,
    soilHealth: 84,
    waterStatus: 88,
    weatherRisk: 79,
    diseaseRisk: 86,
    pestRisk: 82,
    growthStatus: 91,
    lastUpdated: new Date().toISOString()
  });

  // 7. Recent Disease Scans
  const [recentScans, setRecentScans] = useState<DiseaseDetectionResult[]>(() => {
    const saved = localStorage.getItem('agrisense_scans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'scan-init-1',
        diseaseId: 'tomato_early_blight',
        success: true,
        plant: 'Tomato',
        plant_ta: 'தக்காளி',
        disease: 'Early Blight',
        disease_ta: 'ஆரம்பக்கால இலைக்கருகல் நோய்',
        confidence: 94.2,
        severity: 'Medium',
        symptoms: 'Concentric dark target rings on lower leaflets with chlorotic halo.',
        symptoms_ta: 'முதிர்ந்த கீழ் இலைகளில் இலக்கு பலகை (target board) போன்ற வளைய வடிவ கரும் புள்ளிகள் தோன்றும்.',
        cause: 'Alternaria solani fungal spores triggered by warm humid dew spells.',
        cause_ta: 'ஆல்டர்னேரியா சோலானி பூஞ்சை வித்துக்கள், அதிக பனிப்பொழிவு மற்றும் காற்றில் உள்ள ஈரப்பதத்தால் வேகமாக பரவுகிறது.',
        treatment: 'Prune affected lower leaves. Apply copper soap or Bacillus subtilis bio-fungicide.',
        treatment_ta: 'பாதிக்கப்பட்ட கீழ் இலைகளை கவாத்து செய்து அப்புறப்படுத்தவும். செம்பு சோப் அல்லது பேசிலஸ் சப்டிலிஸ் தெளிக்கவும்.',
        organic_treatment: 'Spray Bacillus subtilis @ 2g/L or Copper Octanoate.',
        organic_treatment_ta: '7-10 நாட்கள் இடைவெளியில் பரிந்துரைக்கப்பட்ட பேசிலஸ் சப்டிலிஸ் (2 கிராம்/லிட்டர்) அல்லது செம்பு சோப் தெளிக்கவும்.',
        chemical_treatment: 'Mancozeb 75% WP @ 2.5g/L. Strictly observe waiting periods.',
        chemical_treatment_ta: 'மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.',
        prevention: 'Maintain drip irrigation and wide plant spacing (50 cm).',
        prevention_ta: 'சொட்டு நீர் பாசனத்தை பராமரித்து 50 செ.மீ இடைவெளியில் காற்றோட்டமாக நடவு செய்யவும்.',
        timestamp: new Date().toISOString(),
        imageQuality: 'Good',
        plantDetection: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('agrisense_scans', JSON.stringify(recentScans));
  }, [recentScans]);

  const [selectedScanForView, setSelectedScanForView] = useState<DiseaseDetectionResult | null>(null);

  // 8. Alerts
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>([
    {
      id: 'alert-1',
      type: 'disease',
      severity: 'warning',
      title: 'Disease Risk: Tomato Early Blight',
      title_ta: 'நோய் அபாயம்: தக்காளி ஆரம்பக்கால இலைக்கருகல்',
      message: 'Cloudy weather and high morning dew (>85% RH) have elevated fungal blight pressure in North Plot.',
      message_ta: 'மேகமூட்டமான வானிலை மற்றும் அதிக பனிப்பொழிவு (>85% RH) வடக்கு நிலப்பிரிவில் பூஞ்சை நோய் அழுத்தத்தை அதிகரித்துள்ளது.',
      action: 'Conduct foliar inspection; apply protective bio-fungicide Bacillus subtilis or copper soap.',
      action_ta: 'இலைகளை ஆய்வு செய்து, பேசிலஸ் சப்டிலிஸ் அல்லது காப்பர் சோப் உயிரியல் பூஞ்சைக் கொல்லியை தெளிக்கவும்.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 'alert-2',
      type: 'water',
      severity: 'warning',
      title: 'Water Stress in South Plot',
      title_ta: 'தெற்கு நிலப்பிரிவில் நீர் பற்றாக்குறை',
      message: 'Chilli field soil moisture has dropped to 35%, below the recommended 55% root threshold.',
      message_ta: 'மிளகாய் வயலில் மண் ஈரப்பதம் 35% ஆக குறைந்துள்ளது, இது வேர்ப்பகுதிக்கு தேவையான 55% அளவை விட குறைவாகும்.',
      action: 'Initiate 45-minute drip cycle during early morning.',
      action_ta: 'அதிகாலை வேளையில் 45 நிமிடங்களுக்கு சொட்டு நீர் பாசனம் செய்யவும்.',
      timestamp: '5 hours ago',
      read: false
    },
    {
      id: 'alert-3',
      type: 'pest',
      severity: 'danger',
      title: 'Whitefly Alert in District',
      title_ta: 'மாவட்டத்தில் வெள்ளை ஈ எச்சரிக்கை',
      message: 'Local agricultural advisory reports surging whitefly nymph counts across neighboring cotton and tomato fields.',
      message_ta: 'அண்டை பருத்தி மற்றும் தக்காளி வயல்களில் வெள்ளை ஈ புழுக்களின் எண்ணிக்கை பெருமளவு அதிகரித்துள்ளதாக வேளாண் ஆலோசனை மையம் எச்சரித்துள்ளது.',
      action: 'Install 20 yellow sticky traps per acre immediately to monitor and capture vectors.',
      action_ta: 'வெள்ளை ஈக்களை கண்காணிக்கவும் அழிக்கவும் ஏக்கருக்கு 20 மஞ்சள் ஒட்டும் பொறிகளை உடனடியாக பொருத்தவும்.',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 'alert-4',
      type: 'rain',
      severity: 'info',
      title: 'Rain Forecast: 15-20 mm Expected Thursday',
      title_ta: 'மழை முன்னறிவிப்பு: வியாழக்கிழமை 15-20 மி.மீ எதிர்பார்க்கப்படுகிறது',
      message: 'Thunderstorm activity predicted in next 48 hours. Postpone foliar pesticide sprays.',
      message_ta: 'அடுத்த 48 மணி நேரத்தில் இடி மின்னலுடன் கூடிய மழை பெய்ய வாய்ப்புள்ளது. இலைவழி பூச்சிக்கொல்லி தெளிப்பதை தள்ளிப்போடவும்.',
      action: 'Clean field drainage furrows to prevent waterlogging.',
      action_ta: 'வயலில் நீர் தேங்குவதைத் தவிர்க்க வடிகால் வாய்க்கால்களை சுத்தம் செய்யவும்.',
      timestamp: '1 day ago',
      read: true
    }
  ]);

  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  // 9. Chatbot initial prompt bridge
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');

  const handleAskChatbot = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setCurrentTab('chat');
  };

  const handleSaveScan = (scanResult: DiseaseDetectionResult) => {
    setRecentScans(prev => [scanResult, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Top Main Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        farms={farms}
        currentFarm={currentFarm}
        setCurrentFarm={setCurrentFarm}
        user={user}
        unreadAlertsCount={alerts.filter(a => !a.read).length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            currentFarm={currentFarm}
            healthScore={healthScore}
            weather={weather}
            recentScans={recentScans}
            alerts={alerts}
            language={language}
            onNavigate={(tab) => setCurrentTab(tab)}
            onScanSelect={(scan) => {
              setSelectedScanForView(scan);
              setCurrentTab('scan');
            }}
          />
        )}

        {currentTab === 'scan' && (
          <DiseaseScannerView
            currentFarm={currentFarm}
            language={language}
            onSaveScan={handleSaveScan}
            onAskChatbot={handleAskChatbot}
            selectedScan={selectedScanForView}
          />
        )}

        {currentTab === 'irrigation' && (
          <IrrigationView
            currentFarm={currentFarm}
            language={language}
          />
        )}

        {currentTab === 'pest' && (
          <PestRiskView
            currentFarm={currentFarm}
            language={language}
          />
        )}

        {currentTab === 'growth' && (
          <PlantGrowthView
            currentFarm={currentFarm}
            language={language}
          />
        )}

        {currentTab === 'farm' && (
          <FarmManagementView
            farms={farms}
            currentFarm={currentFarm}
            setCurrentFarm={setCurrentFarm}
            onUpdateFarms={setFarms}
            language={language}
          />
        )}

        {currentTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            onMarkRead={handleMarkAlertRead}
            language={language}
          />
        )}

        {currentTab === 'chat' && (
          <ChatbotView
            currentFarm={currentFarm}
            language={language}
            setLanguage={setLanguage}
            initialPrompt={chatInitialPrompt}
          />
        )}

        {currentTab === 'schemes' && (
          <GovernmentSchemesView
            language={language}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceView
            language={language}
          />
        )}

        {currentTab === 'reports' && (
          <ReportsView
            currentFarm={currentFarm}
            healthScore={healthScore}
            weather={weather}
            recentScans={recentScans}
            language={language}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onUpdateUser={setUser}
            language={language}
            setLanguage={setLanguage}
            farms={farms}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Section 38: Home, Farm, Scan, AI, Profile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-50 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{t.dashboard}</span>
        </button>

        <button
          onClick={() => setCurrentTab('farm')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentTab === 'farm' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>{t.farmManagement}</span>
        </button>

        {/* Highlighted Scan Button in Center */}
        <button
          onClick={() => {
            setSelectedScanForView(null);
            setCurrentTab('scan');
          }}
          className="flex flex-col items-center -mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-md border-2 border-white transition-transform active:scale-95"
          aria-label={t.scanLeaf}
        >
          <Camera className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentTab('chat')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentTab === 'chat' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" />
          <span>{t.aiAssistant}</span>
        </button>

        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            currentTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{t.profile}</span>
        </button>
      </div>
    </div>
  );
}
