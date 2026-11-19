import React, { useRef, useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldAlert, 
  Leaf, 
  Sparkles, 
  FileText, 
  Bot, 
  HelpCircle,
  XCircle,
  Eye,
  Info
} from 'lucide-react';
import { DiseaseDetectionResult, Farm, Language } from '../types';
import { TRANSLATIONS, SEVERITY_TRANSLATIONS } from '../i18n/translations';
import { getLocalizedScan } from '../data/agriData';
import confetti from 'canvas-confetti';

interface DiseaseScannerViewProps {
  currentFarm: Farm | null;
  language: Language;
  onSaveScan: (result: DiseaseDetectionResult) => void;
  onAskChatbot: (diseaseContext: string) => void;
  selectedScan: DiseaseDetectionResult | null;
}

export const DiseaseScannerView: React.FC<DiseaseScannerViewProps> = ({
  currentFarm,
  language,
  onSaveScan,
  onAskChatbot,
  selectedScan,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(selectedScan?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(selectedScan);
  const [errorStatus, setErrorStatus] = useState<{ status: string; message: string; message_ta?: string; supportedCrops?: string[] } | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');

  // If a scan was clicked from the dashboard or history, set it
  React.useEffect(() => {
    if (selectedScan) {
      setResult(selectedScan);
      if (selectedScan.imageUrl) setPreviewImage(selectedScan.imageUrl);
      setErrorStatus(null);
    }
  }, [selectedScan]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setResult(null);
        setErrorStatus(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setErrorStatus(null);
      setCameraActive(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Unable to access camera device:', err);
      // Fallback: trigger file input with capture
      if (fileInputRef.current) {
        fileInputRef.current.setAttribute('capture', 'environment');
        fileInputRef.current.click();
      }
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  // Take Snapshot from Camera
  const captureSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPreviewImage(dataUrl);
        stopCamera();
      }
    }
  };

  // Analyze Image via Server Endpoint
  const handleAnalyzeImage = async () => {
    if (!previewImage) return;

    setLoading(true);
    setErrorStatus(null);
    setResult(null);

    try {
      const response = await fetch('/api/disease/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: previewImage,
          farmId: currentFarm?.id,
          plantHint: currentFarm?.mainCrop || 'Tomato',
          language
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorStatus({
          status: data.status || 'unknown_or_unsupported',
          message: data.message || 'Only plant leaves, crops, and trees can be scanned. Please upload a clear leaf, plant, or tree photo.',
          message_ta: data.message_ta || 'தாவர இலைகள், பயிர்கள் மற்றும் மரங்களை மட்டுமே ஸ்கேன் செய்ய முடியும். தெளிவான இலை, செடி அல்லது மரத்தின் புகைப்படத்தை பதிவேற்றவும்.',
          supportedCrops: data.supportedCrops
        });
      } else {
        const detectionResult: DiseaseDetectionResult = {
          ...data,
          imageUrl: previewImage
        };
        setResult(detectionResult);
        onSaveScan(detectionResult);

        // Friendly celebration if healthy
        if (detectionResult.disease.toLowerCase().includes('healthy') || (detectionResult.disease_ta && detectionResult.disease_ta.includes('ஆரோக்கிய'))) {
          try { confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } }); } catch (e) {}
        }
      }
    } catch (err: any) {
      console.error('Scan error:', err);
      setErrorStatus({
        status: 'error',
        message: 'Could not connect to the diagnostic server. Please try again.',
        message_ta: 'நோயறிதல் சேவையகத்துடன் இணைக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Localized sample leaf images for 1-click testing
  const samplePresets = [
    {
      title: t.sampleTomatoEarlyBlight || 'Tomato Early Blight',
      plant: language === 'ta' ? 'தக்காளி' : 'Tomato',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=500&q=80',
      hint: 'Tomato'
    },
    {
      title: t.sampleRiceBlast || 'Rice Blast',
      plant: language === 'ta' ? 'நெல்' : 'Paddy / Rice',
      url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=500&q=80',
      hint: 'Rice'
    },
    {
      title: t.sampleChilliAnthracnose || 'Chilli Anthracnose',
      plant: language === 'ta' ? 'மிளகாய்' : 'Chilli',
      url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80',
      hint: 'Chilli'
    },
    {
      title: t.sampleTomatoHealthy || 'Tomato Healthy Leaf',
      plant: language === 'ta' ? 'தக்காளி' : 'Tomato',
      url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=500&q=80',
      hint: 'Tomato'
    },
    {
      title: t.sampleNonLeaf || 'Non-Leaf Test (Car/Building)',
      plant: language === 'ta' ? 'வாகனம்' : 'Vehicle',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80',
      hint: 'Non-leaf'
    }
  ];

  const handleSelectSample = (sample: typeof samplePresets[0]) => {
    setPreviewImage(sample.url);
    setResult(null);
    setErrorStatus(null);
  };

  const localizedResult = result ? getLocalizedScan(result, language) : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <Leaf className="w-4 h-4" />
              <span>{t.plantPathologyBadge}</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              {t.scannerTitle}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              {t.scannerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.supports30CropsBadge}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 spans): Image Upload & Camera Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center justify-between">
              <span>{t.leafImageInput}</span>
              {previewImage && (
                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setResult(null);
                    setErrorStatus(null);
                  }}
                  className="text-xs text-stone-400 hover:text-rose-600 transition-colors"
                >
                  {t.clearButton}
                </button>
              )}
            </h2>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            {/* Viewport: Camera Video or Image Preview or Placeholder */}
            <div className="relative aspect-4/3 w-full bg-stone-100 rounded-xl overflow-hidden border-2 border-dashed border-stone-300 flex items-center justify-center">
              {cameraActive ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-emerald-400/80 m-4 rounded-lg pointer-events-none flex items-center justify-center">
                    <span className="text-[11px] bg-black/60 text-emerald-200 px-2 py-1 rounded">
                      {t.alignLeafInsideFrame}
                    </span>
                  </div>
                </div>
              ) : previewImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImage}
                    alt="Uploaded leaf preview"
                    className="w-full h-full object-cover"
                  />
                  {loading && (
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                      <p className="text-sm font-semibold">{t.analyzingLeaf}</p>
                      <p className="text-xs text-stone-300 mt-1 text-center">
                        {t.inspectingVeins}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-6 text-stone-400">
                  <Leaf className="w-12 h-12 mx-auto text-stone-300 mb-2" />
                  <p className="text-sm font-medium text-stone-600">{t.noLeafLoaded}</p>
                  <p className="text-xs text-stone-400 mt-1">
                    {t.uploadLeafPrompt}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {cameraActive ? (
              <div className="flex gap-2">
                <button
                  onClick={captureSnapshot}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.takeSnapshot}</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium px-4 py-2.5 rounded-xl text-xs"
                >
                  {t.closeCamera}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs border border-stone-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>{t.uploadImage}</span>
                  </button>

                  <button
                    onClick={startCamera}
                    className="bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs border border-stone-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span>{t.useCamera}</span>
                  </button>
                </div>

                {previewImage && !loading && (
                  <button
                    onClick={handleAnalyzeImage}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>{t.runAiScan}</span>
                  </button>
                )}
              </div>
            )}

            {/* Sample Images Quick Select */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                {t.sampleLeaves}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(preset)}
                    className="px-2.5 py-1 text-[11px] font-medium bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 rounded-lg border border-stone-200/80 transition-colors cursor-pointer"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 spans): Diagnostic Results or Rejection Warning */}
        <div className="lg:col-span-7">
          {errorStatus ? (
            /* Guardrail rejection message */
            <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-900">
                    {errorStatus.status === 'unknown_or_unsupported'
                      ? t.invalidLeafTitle
                      : (language === 'ta' ? 'பரிசோதனை பிழை' : 'Scan Error')}
                  </h3>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                    {language === 'ta'
                      ? (errorStatus.message_ta || errorStatus.message)
                      : errorStatus.message}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                <h4 className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.howToTakeLeafPhoto}</span>
                </h4>
                <ul className="list-disc list-inside text-stone-600 space-y-1 pl-1">
                  <li>{t.photoTip1}</li>
                  <li>{t.photoTip2}</li>
                  <li>{t.photoTip3}</li>
                  <li>{t.photoTip4}</li>
                </ul>
              </div>

              <div className="pt-2">
                <span className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.supportedCropFamilies}
                </span>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {t.supportedCropFamiliesList}
                </p>
              </div>
            </div>
          ) : localizedResult ? (
            /* Successful Diagnosis Result (Localized) */
            <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
              {/* Top Banner: Plant & Disease Name */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    <span>{localizedResult.plant}</span>
                    <span>·</span>
                    <span className="text-stone-400">{t.diagnosisReport}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    {localizedResult.disease}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Severity Badge */}
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    localizedResult.severity === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    localizedResult.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    localizedResult.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {SEVERITY_TRANSLATIONS[language][localizedResult.severity] || localizedResult.severity} {t.severity}
                  </span>

                  {/* Confidence Badge */}
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200">
                    {localizedResult.confidence}% {t.confidence}
                  </span>
                </div>
              </div>

              {/* Symptoms & Cause */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                  <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] block mb-1">
                    {t.symptoms}
                  </span>
                  <p className="text-stone-700 leading-relaxed">{localizedResult.symptoms}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                  <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] block mb-1">
                    {t.cause}
                  </span>
                  <p className="text-stone-700 leading-relaxed">{localizedResult.cause}</p>
                </div>
              </div>

              {/* Treatment Tabs: Organic vs Chemical vs Prevention */}
              <div className="space-y-3">
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveTreatmentTab('organic')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      activeTreatmentTab === 'organic'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🌿 {t.organicTreatment}
                  </button>

                  <button
                    onClick={() => setActiveTreatmentTab('chemical')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      activeTreatmentTab === 'chemical'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🧪 {t.chemicalTreatment}
                  </button>

                  <button
                    onClick={() => setActiveTreatmentTab('prevention')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      activeTreatmentTab === 'prevention'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🛡 {t.prevention}
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs leading-relaxed">
                  {activeTreatmentTab === 'organic' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.recommendedBioRemedies}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{localizedResult.organic_treatment}</p>

                      {localizedResult.treatment && (
                        <div className="pt-2 border-t border-stone-200/60 mt-2">
                          <span className="font-bold text-emerald-900 block mb-0.5">{t.treatment}:</span>
                          <p className="text-stone-700">{localizedResult.treatment}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTreatmentTab === 'chemical' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-900 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{t.registeredChemicalAdvisory}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{localizedResult.chemical_treatment}</p>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 mt-2">
                        <strong>{t.mandatorySafetyNotice}</strong> {t.chemicalDisclaimer}
                      </div>
                    </div>
                  )}

                  {activeTreatmentTab === 'prevention' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-900 font-bold">
                        <ShieldAlert className="w-4 h-4 text-blue-600" />
                        <span>{t.culturalFieldPractices}</span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{localizedResult.prevention}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  {t.scannedOnDate} {new Date(localizedResult.timestamp || Date.now()).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onAskChatbot(language === 'ta' 
                      ? `நான் எனது ${localizedResult.plant} பயிரை ஸ்கேன் செய்தேன், அதில் ${localizedResult.disease} கண்டறியப்பட்டுள்ளது. இதற்கு இயற்கை மற்றும் உயிரியல் தீர்வுகளை எவ்வாறு பயன்படுத்துவது மற்றும் இது குணமடைய எத்தனை நாட்கள் ஆகும்?`
                      : `I just scanned my ${localizedResult.plant} and it was diagnosed with ${localizedResult.disease}. Can you explain how to apply the organic remedies and how long it takes to heal?`
                    )}
                    className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-4 py-2.5 rounded-xl border border-emerald-200 text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <span>{t.askAboutDisease}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standby State with Guide */
            <div className="bg-white rounded-2xl border border-stone-200/80 p-8 shadow-sm text-center flex flex-col items-center justify-center min-h-[380px] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                <Leaf className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-stone-900">
                  {t.readyForAnalysisTitle}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {t.readyForAnalysisDesc}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full max-w-sm pt-4 border-t border-stone-100 text-stone-600">
                <div className="text-center p-2 rounded-lg bg-stone-50">
                  <span className="text-base font-bold text-emerald-700 block">30+</span>
                  <span className="text-[10px] text-stone-500">{t.cropTypesStat}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-stone-50">
                  <span className="text-base font-bold text-emerald-700 block">94%</span>
                  <span className="text-[10px] text-stone-500">{t.modelPrecisionStat}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-stone-50">
                  <span className="text-base font-bold text-emerald-700 block">{language === 'ta' ? 'இயற்கை' : 'Organic'}</span>
                  <span className="text-[10px] text-stone-500">{t.ipmTreatmentsStat}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
