import { DiseaseDetectionResult, EarlyWarningAlert, GovernmentScheme, Language, MarketPrice, MarketplaceProduct, PestRiskPrediction } from '../types';
import { CROP_TRANSLATIONS, SEVERITY_TRANSLATIONS } from '../i18n/translations';

export interface DiseaseKnowledgeItem {
  id: string;
  plant: string;
  plant_ta: string;
  disease: string;
  disease_ta: string;
  scientificName?: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  symptoms: string;
  symptoms_ta: string;
  cause: string;
  cause_ta: string;
  treatment: string;
  treatment_ta: string;
  organic_treatment: string;
  organic_treatment_ta: string;
  chemical_treatment: string;
  chemical_treatment_ta: string;
  prevention: string;
  prevention_ta: string;
  sampleImage: string;
}

export const DISEASE_DATABASE: DiseaseKnowledgeItem[] = [
  // --- High Priority: Tomato ---
  {
    id: 'tomato_early_blight',
    plant: 'Tomato',
    plant_ta: 'தக்காளி',
    disease: 'Early Blight',
    disease_ta: 'ஆரம்பக்கால இலைக்கருகல் நோய்',
    scientificName: 'Alternaria solani',
    severity: 'Medium',
    symptoms: 'Concentric dark rings (target board pattern) on older lower leaves, surrounded by yellow chlorotic halo. Premature defoliation begins from base.',
    symptoms_ta: 'முதிர்ந்த கீழ் இலைகளில் இலக்கு பலகை (target board) போன்ற வளைய வடிவிலான அடர் பழுப்பு நிறப் புள்ளிகள் மற்றும் சுற்றிலும் மஞ்சள் நிற வளையம் தோன்றும். இலைகள் முன்கூட்டியே காய்ந்து உதிரும்.',
    cause: 'Fungal pathogen Alternaria solani. Thrives in warm, humid weather (24-29°C) with frequent rainfall or heavy dew.',
    cause_ta: 'ஆல்டர்னேரியா சோலானி (Alternaria solani) பூஞ்சை நோய்க்கிருமி. மிதமான வெப்பநிலை (24-29°C) மற்றும் அதிக பனிப்பொழிவு / காற்றில் அதிக ஈரப்பதம் இருக்கும்போது வேகமாகப் பரவுகிறது.',
    treatment: 'Prune infected lower foliage immediately. Improve airflow between plants and avoid overhead watering.',
    treatment_ta: 'பாதிக்கப்பட்ட கீழ் இலைகளை உடனடியாக கவாத்து செய்து அப்புறப்படுத்தவும். பயிர்களுக்கு இடையே நல்ல காற்றோட்டத்தை ஏற்படுத்தி, மேல்வழி நீர் தெளிப்பதை தவிர்க்கவும்.',
    organic_treatment: 'Foliar spray with Copper Octanoate (copper soap) or Bacillus subtilis bio-fungicide every 7-10 days. Apply neem cake (50 kg/acre) in root zone.',
    organic_treatment_ta: '7-10 நாட்கள் இடைவெளியில் பரிந்துரைக்கப்பட்ட செம்பு சோப் (Copper Octanoate) அல்லது பேசிலஸ் சப்டிலிஸ் (Bacillus subtilis) உயிரியல் பூஞ்சைக் கொல்லியைத் தெளிக்கவும். வேர்ப்பகுதியில் ஏக்கருக்கு 50 கிலோ வேப்பம்பிண்ணாக்கு இடவும்.',
    chemical_treatment: 'Apply Mancozeb 75% WP @ 2.5 g/L or Chlorothalonil 75% WP @ 2 g/L. Always adhere to local state agriculture department advisories and follow product label safety guidelines.',
    chemical_treatment_ta: 'மேன்கோசெப் (Mancozeb) 75% WP @ 2.5 கிராம்/லிட்டர் அல்லது குளோரோதலோனில் 75% WP @ 2 கிராம்/லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும். வேளாண்மை துறை மற்றும் தயாரிப்பு விவரச்சீட்டு விதிகளை கண்டிப்பாக பின்பற்றவும்.',
    prevention: 'Maintain 3-year crop rotation with non-solanaceous crops. Mulch soil surface to prevent spore splash. Space plants 45-60 cm apart for aeration.',
    prevention_ta: 'தக்காளி அல்லாத பயிர்களுடன் 3 வருட பயிர் சுழற்சி முறையை பின்பற்றவும். மண்ணில் இருந்து பூஞ்சை வித்துக்கள் பரவுவதை தடுக்க நிலப்போர்வை (மல்ச்சிங்) அமைக்கவும். 45-60 செ.மீ இடைவெளியில் நடவு செய்யவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tomato_late_blight',
    plant: 'Tomato',
    plant_ta: 'தக்காளி',
    disease: 'Late Blight',
    disease_ta: 'பின்கால இலைக்கருகல் நோய்',
    scientificName: 'Phytophthora infestans',
    severity: 'Critical',
    symptoms: 'Large, dark water-soaked lesions on leaves and stems. White fluffy fungal growth on leaf undersides in humid mornings. Rapid vine collapse.',
    symptoms_ta: 'இலைகள் மற்றும் தண்டுகளில் பெரிய ஈரப்பதம் நிறைந்த கரும்பச்சை மற்றும் கறுப்பு நிற காயங்கள் தோன்றும். அதிகாலை வேளையில் இலைகளின் அடிப்பகுதியில் வெள்ளை நிற பூஞ்சை படலம் தெரியும். செடிகள் வேகமாக மடிந்துவிடும்.',
    cause: 'Oomycete Phytophthora infestans. Favored by cool, damp weather (15-20°C) with >90% relative humidity.',
    cause_ta: 'பைட்டோப்தோரா இன்ஃபெஸ்டன்ஸ் (Phytophthora infestans) பூஞ்சை. குளிர்ந்த மற்றும் ஈரப்பதமான வானிலை (15-20°C, >90% ஈரப்பதம்) இதற்கு சாதகமானது.',
    treatment: 'Uproot severely diseased vines to arrest rapid spread. Destroy or deeply bury infected residues away from compost piles.',
    treatment_ta: 'தீவிரமாக பாதிக்கப்பட்ட செடிகளை உடனே வேரோடு பிடுங்கி தீயிட்டு அழிக்கவும் அல்லது ஆழமாக புதைத்து அப்புறப்படுத்தவும்.',
    organic_treatment: 'Bordeaux mixture 1% spray at initial symptom appearance. Preventive spray with Trichoderma viride formulation.',
    organic_treatment_ta: 'நோய் ஆரம்ப அறிகுறி தோன்றியதும் 1% போர்டோ கலவை தெளிக்கவும். டிரைகோடெர்மா விரிடி (Trichoderma viride) உயிரியல் கரைசலை முன்னெச்சரிக்கையாக தெளிக்கவும்.',
    chemical_treatment: 'Apply Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L or Cymoxanil 8% + Mancozeb 64% @ 2 g/L. Follow certified agrochemical label directions.',
    chemical_treatment_ta: 'மெட்டலாக்சில் 8% + மேன்கோசெப் 64% WP @ 2 கிராம்/லிட்டர் அல்லது சைமோக்சானில் + மேன்கோசெப் @ 2 கிராம்/லிட்டர் தெளிக்கவும். தயாரிப்பு விவரச்சீட்டு பாதுகாப்பு விதிகளை தவறாது பின்பற்றவும்.',
    prevention: 'Plant certified disease-free transplants. Avoid planting downwind from potato plots. Install drip lines instead of sprinklers.',
    prevention_ta: 'சான்றளிக்கப்பட்ட ஆரோக்கியமான நாற்றுகளை நடவு செய்யவும். உருளைக்கிழங்கு வயல்களுக்கு அருகில் நடுவதை தவிர்க்கவும். தெளிப்பு நீருக்கு பதிலாக சொட்டு நீர் பாசனத்தை பயன்படுத்தவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tomato_yellow_leaf_curl',
    plant: 'Tomato',
    plant_ta: 'தக்காளி',
    disease: 'Yellow Leaf Curl Virus',
    disease_ta: 'இலை சுருட்டல் மற்றும் மஞ்சள் தேமல் வைரஸ்',
    scientificName: 'TYLCV (Begomovirus)',
    severity: 'High',
    symptoms: 'Severe upward curling and cupping of leaflets, pale yellow margins, stunted bushy plant growth, dropping of flower buds.',
    symptoms_ta: 'இலைகள் மேல்நோக்கி கிண்ணம் போல சுருண்டு கொள்ளும், இலை ஓரங்கள் மஞ்சள் நிறமாக மாறும், செடி வளர்ச்சி குன்றி புதர் போல் அடர்ந்து காணப்படும், பூக்கள் உதிரும்.',
    cause: 'Geminivirus transmitted exclusively by sweetpotato whiteflies (Bemisia tabaci).',
    cause_ta: 'வெள்ளை ஈக்கள் (Bemisia tabaci) மூலம் பரவும் ஜெமினிவைரஸ் (Begomovirus).',
    treatment: 'Remove and bag rogue symptomatic plants immediately to prevent whiteflies from feeding and vectoring virus.',
    treatment_ta: 'நோயுற்ற செடிகளை உடனடியாக பிளாஸ்டிக் பைகளில் மூடி அப்புறப்படுத்தவும், வெள்ளை ஈக்கள் பரவுவதை தடுக்கவும்.',
    organic_treatment: 'Yellow sticky traps (15-20 per acre) to trap whitefly vectors. Spray Neem oil (5ml/L) with soap emulsifier at 5-day intervals.',
    organic_treatment_ta: 'ஏக்கருக்கு 15-20 மஞ்சள் நிற ஒட்டும் பொறிகளை அமைக்கவும். வேப்பெண்ணெய் 10,000 ppm @ 3-5 மி.லி/லிட்டர் காதி சோப்பு கரைசலுடன் 5 நாட்கள் இடைவெளியில் தெளிக்கவும்.',
    chemical_treatment: 'Control whitefly vector: Imidacloprid 17.8% SL @ 0.5 ml/L or Thiamethoxam 25% WG @ 0.3 g/L. Wear protective equipment and strictly observe pre-harvest intervals.',
    chemical_treatment_ta: 'வெள்ளை ஈக்களை கட்டுப்படுத்த இமிடாக்ளோப்ரிட் 17.8% SL @ 0.5 மி.லி/லிட்டர் அல்லது தையமீத்தாக்சாம் 25% WG @ 0.3 கிராம்/லிட்டர் தெளிக்கவும். அறுவடை இடைவெளியை தவறாது கடைபிடிக்கவும்.',
    prevention: 'Use 40-50 mesh insect-proof netting in seedling nurseries. Plant resistant/tolerant tomato cultivars (e.g. US-618, Abhinav).',
    prevention_ta: 'நாற்றங்காலில் 40-50 மெஷ் பூச்சி தடுப்பு வலையைப் பயன்படுத்தவும். நோய் எதிர்ப்பு திறன் கொண்ட தக்காளி ரகங்களை (யுஎஸ்-618, அபினவ்) பயிரிடவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1588880331179-bc9b93a0cb5e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tomato_bacterial_spot',
    plant: 'Tomato',
    plant_ta: 'தக்காளி',
    disease: 'Bacterial Spot',
    disease_ta: 'பாக்டீரியா இலைப்புள்ளி நோய்',
    scientificName: 'Xanthomonas perforans',
    severity: 'Medium',
    symptoms: 'Small, circular, dark brown to black spots with greasy margins. Spots may dry and tear, giving a ragged shot-hole appearance.',
    symptoms_ta: 'இலைகளில் சிறிய வட்ட வடிவ அடர் பழுப்பு அல்லது கறுப்பு நிற நீர் ஊறிய புள்ளிகள் தோன்றும். இலை காய்ந்து சல்லடை போன்ற துளைகள் ஏற்படும்.',
    cause: 'Bacterial infection spread via wind-driven rain droplets, overhead irrigation, and contaminated tools.',
    cause_ta: 'சாந்தோமோனாஸ் (Xanthomonas) பாக்டீரியா தொற்று. மழைநீர் தெறித்தல் மற்றும் அசுத்தமான பண்ணைக் கருவிகள் மூலம் பரவுகிறது.',
    treatment: 'Sanitize pruning tools with 10% bleach solution between rows. Avoid working in fields when foliage is wet.',
    treatment_ta: 'கவாத்து கருவிகளை ப்ளீச் கரைசலில் நனைத்து கிருமி நீக்கம் செய்யவும். இலைகள் ஈரமாக இருக்கும் போது களப்பணிகளை தவிர்க்கவும்.',
    organic_treatment: 'Copper hydroxide 77% WP @ 2 g/L combined with Streptomycin sulphate spray as permitted by regional bio-farming norms.',
    organic_treatment_ta: 'செம்பு ஹைட்ராக்சைடு (Copper hydroxide) 77% WP @ 2 கிராம்/லிட்டர் கரைசல் தெளிக்கவும்.',
    chemical_treatment: 'Copper Oxychloride 50% WP @ 2.5 g/L + Streptocycline @ 1 g/10 L water. Follow regional extension advisories.',
    chemical_treatment_ta: 'காப்பர் ஆக்சிகுளோரைடு 50% WP @ 2.5 கிராம்/லிட்டர் + ஸ்ட்ரெப்டோசைக்ளின் @ 1 கிராம்/10 லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.',
    prevention: 'Hot-water seed treatment (50°C for 25 mins) before nursery sowing. Practice deep summer ploughing.',
    prevention_ta: 'விதைகளை 50°C வெந்நீரில் 25 நிமிடங்கள் ஊறவைத்து விதை நேர்த்தி செய்யவும். கோடை உழவு செய்யவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tomato_healthy',
    plant: 'Tomato',
    plant_ta: 'தக்காளி',
    disease: 'Healthy Leaf',
    disease_ta: 'ஆரோக்கியமான இலை',
    severity: 'Low',
    symptoms: 'Vibrant deep green foliage with uniform leaf margins, no discoloration, spots, or insect punctures. Vigorous growth.',
    symptoms_ta: 'அடர் பச்சை நிறத்தில் சீரான இலை ஓரங்களுடன் புள்ளிகளோ அல்லது பூச்சி சேதமோ இன்றி செழிப்பாகவும் வீரியமாகவும் வளரும் பயிர்.',
    cause: 'Optimal nutrition, balanced irrigation, and absence of active pathogen colonies.',
    cause_ta: 'சரியான ஊட்டச்சத்து மேலாண்மை, அளவான சொட்டு நீர் பாசனம் மற்றும் நோய்க்கிருமி தாக்குதல் அற்ற நல்ல சூழல்.',
    treatment: 'None required. Continue standard cultural operations.',
    treatment_ta: 'சிகிச்சை எதுவும் தேவையில்லை. வழக்கமான பராமரிப்பு பணிகளை தொடரவும்.',
    organic_treatment: 'Maintain routine bi-weekly preventive spray of Panchagavya (3%) or Seaweed extract for resilience.',
    organic_treatment_ta: 'இரண்டு வாரங்களுக்கு ஒருமுறை 3% பஞ்சகாவ்யா அல்லது கடற்பாசி சாறு தெளித்து பயிரின் நோய் எதிர்ப்பு திறனை அதிகரிக்கவும்.',
    chemical_treatment: 'None required. Avoid unnecessary pesticide applications to protect beneficial pollinator insects.',
    chemical_treatment_ta: 'இரசாயன மருந்துகள் தேவையில்லை. நன்மை செய்யும் மகரந்த சேர்க்கை பூச்சிகளை பாதுகாக்க பூச்சிக்கொல்லிகளை தவிர்க்கவும்.',
    prevention: 'Continue balanced N-P-K fertigation, regular scouting, and maintaining soil moisture around 60-70% field capacity.',
    prevention_ta: 'சமச்சீர் உர மேலாண்மை மற்றும் 60-70% மண் ஈரப்பதத்தை சீராக பராமரிக்கவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80'
  },

  // --- High Priority: Paddy / Rice ---
  {
    id: 'rice_blast',
    plant: 'Paddy / Rice',
    plant_ta: 'நெல் / நெற்பயிர்',
    disease: 'Rice Blast',
    disease_ta: 'நெல் பிளாஸ்ட் (குலை நோய்)',
    scientificName: 'Magnaporthe oryzae',
    severity: 'Critical',
    symptoms: 'Spindle-shaped elliptical lesions with pointed ends, gray/white center and dark reddish-brown margins. Neck rot causes empty panicles.',
    symptoms_ta: 'இலைகளில் கண் அல்லது கதிர் போன்ற நீள்வட்ட வடிவ புள்ளிகள், சாம்பல் நிற மையம் மற்றும் அடர் பழுப்பு நிற ஓரங்களுடன் தோன்றும். கழுத்துப்பகுதி அழுகி பதர் கதிர்களாக மாறும்.',
    cause: 'Fungus Magnaporthe oryzae. Outbreaks coincide with excessive nitrogen fertilization, high relative humidity (>93%), and night temperatures of 20-24°C.',
    cause_ta: 'மாக்னபோர்தே ஒரைசே (Magnaporthe oryzae) பூஞ்சை. அதிகப்படியான யூரியா தழைச்சத்து, அதிக ஈரப்பதம் (>93%) மற்றும் இரவுக் குளிர்ச்சி (20-24°C) இதன் தீவிரத்தை அதிகரிக்கும்.',
    treatment: 'Drain standing water for 24-48 hours to aerate the soil root zone. Suspend top-dress nitrogen applications.',
    treatment_ta: 'வயலில் தேங்கியுள்ள தண்ணீரை 24-48 மணி நேரம் வடித்து வேர்ப்பகுதிக்கு காற்றோட்டம் அளிக்கவும். யூரியா இடுவதை உடனே நிறுத்தவும்.',
    organic_treatment: 'Pseudomonas fluorescens seed treatment @ 10 g/kg and foliar spray @ 2 g/L at maximum tillering.',
    organic_treatment_ta: 'சூடோமோனாஸ் புளோரசன்ஸ் (Pseudomonas fluorescens) உயிரியல் பாக்டீரியா மருந்தை லிட்டருக்கு 2 கிராம் வீதம் தூர் கட்டும் பருவத்தில் இலைகளில் தெளிக்கவும்.',
    chemical_treatment: 'Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L at initial blast spot appearance. Adhere to mandatory waiting periods.',
    chemical_treatment_ta: 'ட்ரைசைக்ளசோல் (Tricyclazole) 75% WP @ 0.6 கிராம்/லிட்டர் அல்லது ஐசோபுரோதியோலேன் @ 1.5 மி.லி/லிட்டர் தெளிக்கவும். மருந்து விவரச்சீட்டு விதிகளைப் பின்பற்றவும்.',
    prevention: 'Split nitrogen fertilizer into 3-4 applications instead of single heavy doses. Burn or compost stubble after harvest.',
    prevention_ta: 'தழைச்சத்தை ஒரே நேரத்தில் இடாமல் 3-4 பிரிவுகளாக பிரித்து இடவும். அறுவடைக்கு பின் தாள்களை மக்கச் செய்யவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rice_bacterial_leaf_blight',
    plant: 'Paddy / Rice',
    plant_ta: 'நெல் / நெற்பயிர்',
    disease: 'Bacterial Leaf Blight',
    disease_ta: 'பாக்டீரியா இலைக்கருகல் நோய்',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    severity: 'High',
    symptoms: 'Water-soaked wavy lesions starting at leaf tips, turning bleached grayish-white. Amber bacterial ooze droplets visible in early mornings.',
    symptoms_ta: 'இலை நுனியில் இருந்து கீழ்நோக்கி அலை அலையான நீர் ஊறிய கருகல் தோன்றி, பின் வைக்கோல் நிறமாக மாறும். அதிகாலையில் மஞ்சள் நிற பாக்டீரியா திரவத் துளிகள் காணப்படும்.',
    cause: 'Bacterial pathogen Xanthomonas oryzae entering via natural leaf hydathodes and cyclone/hail wind wounds.',
    cause_ta: 'சாந்தோமோனாஸ் ஒரைசே (Xanthomonas oryzae) பாக்டீரியா. காற்று மற்றும் மழைக்கால காயங்கள் வழியாக பயிரில் நுழைகிறது.',
    treatment: 'Regulate field water; avoid flow of irrigation water from infected fields into healthy parcels.',
    treatment_ta: 'பாதிக்கப்பட்ட வயலில் இருந்து நல்ல வயல்களுக்கு நீர் பாய்வதை உடனே தடுக்கவும். வயல் நீரை வடித்து காயவிடவும்.',
    organic_treatment: 'Fresh cow dung water extract (20%) spray or Copper Hydroxide spray at boot leaf stage.',
    organic_treatment_ta: '20% பசுஞ்சாணி தெளிவு கரைசல் அல்லது சூடோமோனாஸ் கரைசலை தூர் மற்றும் கொடி இலை பருவத்தில் தெளிக்கவும்.',
    chemical_treatment: 'Copper Oxychloride @ 2.5 g/L combined with Streptocycline @ 0.15 g/L. Always follow label instructions and local recommendations.',
    chemical_treatment_ta: 'காப்பர் ஆக்சிகுளோரைடு @ 2.5 கிராம்/லிட்டர் + ஸ்ட்ரெப்டோசைக்ளின் @ 1.5 கிராம்/10 லிட்டர் தண்ணீரில் கலந்து தெளிக்கவும்.',
    prevention: 'Grow tolerant varieties (e.g., IR 64, Swarna Sub1). Avoid clipping seedling tips during manual transplantation.',
    prevention_ta: 'நோய் எதிர்ப்பு ரகங்களை பயிரிடவும். நாற்று நடவின் போது இலை நுனிகளைக் கிள்ளுவதை தவிர்க்கவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rice_brown_spot',
    plant: 'Paddy / Rice',
    plant_ta: 'நெல் / நெற்பயிர்',
    disease: 'Brown Spot',
    disease_ta: 'நெல் இலைப்புள்ளி நோய் (செம்புள்ளி)',
    scientificName: 'Bipolaris oryzae',
    severity: 'Medium',
    symptoms: 'Small, circular to oval sesame seed-like brown spots with light yellow halo. Discoloration on grains and panicles.',
    symptoms_ta: 'எள் போன்ற சிறிய வட்ட வடிவ பழுப்பு நிற புள்ளிகள் மஞ்சள் வளையத்துடன் இலைகளில் தோன்றும். தானியங்களிலும் கரும் புள்ளிகள் ஏற்படும்.',
    cause: 'Fungus Bipolaris oryzae, predominantly exacerbated by potassium or micronutrient deficiency and drought stress.',
    cause_ta: 'பைபோலாரிஸ் ஒரைசே (Bipolaris oryzae) பூஞ்சை. சாம்பல் சத்து (பொட்டாஷ்) மற்றும் துத்தநாக குறைபாடுள்ள நிலங்களில் அதிகம் தாக்கும்.',
    treatment: 'Supply missing micronutrients (Zinc, Silicon, Potassium). Maintain adequate standing water depth (2-5 cm).',
    treatment_ta: 'தேவையான பொட்டாஷ் மற்றும் துத்தநாக நுண்ணூட்டங்களை இடவும். வயலில் 2-5 செ.மீ நீர் மட்டத்தை சீராக பராமரிக்கவும்.',
    organic_treatment: 'Seed treatment with Trichoderma harzianum @ 5 g/kg seed. Apply farmyard manure enriched with neem cake.',
    organic_treatment_ta: 'விதை நேர்த்திக்கு டிரைகோடெர்மா ஹார்சியானம் @ 5 கிராம்/கிலோ பயன்படுத்தவும். வேப்பம்பிண்ணாக்கு கலந்த தொழுவுரம் இடவும்.',
    chemical_treatment: 'Spray Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L. Follow product label guidelines.',
    chemical_treatment_ta: 'மேன்கோசெப் 75% WP @ 2 கிராம்/லிட்டர் அல்லது புரோப்பிகோனசோல் 25% EC @ 1 மி.லி/லிட்டர் தெளிக்கவும்.',
    prevention: 'Ensure balanced fertilization with Muriate of Potash (MOP). Test soil fertility before sowing.',
    prevention_ta: 'மண் பரிசோதனை செய்து சாம்பல் சத்தை (பொட்டாஷ்) சமச்சீராக இடவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80'
  },

  // --- High Priority: Sugarcane ---
  {
    id: 'sugarcane_red_rot',
    plant: 'Sugarcane',
    plant_ta: 'கரும்பு',
    disease: 'Red Rot',
    disease_ta: 'செவ்வழுகல் நோய்',
    scientificName: 'Colletotrichum falcatum',
    severity: 'Critical',
    symptoms: 'Third or fourth leaf yellowing and withering from tip downwards. Longitudinal split of cane shows reddened pith with distinctive white transverse bands.',
    symptoms_ta: 'மேலிருந்து மூன்றாவது அல்லது நான்காவது இலை மஞ்சள் நிறமாகி நுனியிலிருந்து காயும். கரும்பை நீளவாக்கில் பிளந்து பார்த்தால் சோறு போன்ற சதைப்பகுதியில் வெள்ளை நிற குறுக்கு பட்டைகளுடன் கூடிய சிவப்பு நிறம் தோன்றும்.',
    cause: 'Colletotrichum falcatum transmitted through infected seed setts, irrigation flow, and root borers.',
    cause_ta: 'கோலிட்டோடிரைக்கம் ஃபால்கேட்டம் பூஞ்சை. பாதிக்கப்பட்ட விதைக்கரணைகள் மற்றும் பாசன நீர் வழியே பரவுகிறது.',
    treatment: 'Immediately rogue out and incinerate diseased clumps. Never ratoon a crop plot afflicted by red rot.',
    treatment_ta: 'நோயுற்ற கரும்பு தூர்களை வேரோடு பிடுங்கி தீயிட்டு அழிக்கவும். செவ்வழுகல் தாக்கிய நிலத்தில் மறுதாம்பு (மறுபயிர்) விடக்கூடாது.',
    organic_treatment: 'Dip seed setts in Trichoderma viride suspension (10 g/L) for 30 minutes before planting.',
    organic_treatment_ta: 'விதைக்கரணைகளை நடுவதற்கு முன் டிரைகோடெர்மா விரிடி (10 கிராம்/லிட்டர்) கரைசலில் 30 நிமிடங்கள் ஊறவைத்து நடவும்.',
    chemical_treatment: 'Sett treatment with Carbendazim 50% WP @ 1 g/L or Thiophanate methyl 70% WP @ 1 g/L prior to planting. Note: standing crop cures are ineffective; prevention is key.',
    chemical_treatment_ta: 'நடுவதற்கு முன் விதைக்கரணைகளை கார்பெண்டாசிம் 50% WP @ 1 கிராம்/லிட்டர் கரைசலில் நனைத்து நடவும். நின்ற பயிருக்கு மருந்து தெளிப்பது பலனளிக்காது.',
    prevention: 'Plant resistant sugarcane cultivars (e.g., Co 0238, Co 86032). Maintain strict crop rotation with paddy or green manure for at least 1 season.',
    prevention_ta: 'செவ்வழுகல் எதிர்ப்பு ரகங்களை (கோ 86032) நடவும். நெல் அல்லது தக்கைப்பூண்டு போன்ற பயிர்களுடன் பயிர் சுழற்சி செய்யவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },

  // --- Cotton ---
  {
    id: 'cotton_leaf_curl_virus',
    plant: 'Cotton',
    plant_ta: 'பருத்தி',
    disease: 'Cotton Leaf Curl Virus (CLCuV)',
    disease_ta: 'பருத்தி இலை சுருட்டல் வைரஸ் நோய்',
    scientificName: 'CLCuD Begomovirus',
    severity: 'Critical',
    symptoms: 'Upward or downward cupping of leaves, thickening of veins, enations (leaf-like outgrowths) on leaf undersides, severe stunting.',
    symptoms_ta: 'இலைகள் மேல்நோக்கி சுருண்டு கொள்ளும், நரம்புகள் தடித்து காணப்படும், இலையின் அடியில் சிறிய இலை போன்ற வளர்ச்சிகள் தோன்றும், பயிர் வளர்ச்சி குன்றும்.',
    cause: 'Virus transmitted by Bemisia tabaci (whitefly vector) during early crop growth stages.',
    cause_ta: 'வெள்ளை ஈக்கள் மூலம் பயிரின் ஆரம்ப வளர்ச்சி நிலைகளில் பரப்பப்படும் பெகோமோவைரஸ்.',
    treatment: 'Uproot early infected plants in young crop stands. Keep perimeter free from weed hosts (Abutilon indicum).',
    treatment_ta: 'ஆரம்பத்தில் தாக்கப்பட்ட செடிகளை பிடுங்கி எரிக்கவும். வரப்புகளில் உள்ள துத்தி போன்ற களைகளை அழிக்கவும்.',
    organic_treatment: 'Yellow sticky traps (20 per acre) + neem seed kernel extract (NSKE 5%) spray.',
    organic_treatment_ta: 'மஞ்சள் ஒட்டும் பொறிகள் (ஏக்கருக்கு 20) அமைக்கவும் + 5% வேப்பங்கொட்டை சாறு (NSKE) தெளிக்கவும்.',
    chemical_treatment: 'Control vector whitefly: Spiromesifen 22.9% SC @ 1 ml/L or Diafenthiuron 50% WP @ 1.2 g/L. Always follow safety labels.',
    chemical_treatment_ta: 'வெள்ளை ஈயை கட்டுப்படுத்த ஸ்பைரோமெசிஃபென் 22.9% SC @ 1 மி.லி/லிட்டர் அல்லது டயாபென்துரான் @ 1.2 கிராம்/லிட்டர் தெளிக்கவும்.',
    prevention: 'Cultivate resistant Bt cotton hybrids recommended for your specific agro-climatic zone.',
    prevention_ta: 'உங்கள் பகுதிக்கு பரிந்துரைக்கப்பட்ட நோய் எதிர்ப்பு பிடி பருத்தி ரகங்களை பயிரிடவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80'
  },

  // --- Chilli ---
  {
    id: 'chilli_anthracnose',
    plant: 'Chilli',
    plant_ta: 'மிளகாய்',
    disease: 'Anthracnose / Fruit Rot',
    disease_ta: 'காய் அழுகல் மற்றும் ஆந்த்ராக்நோஸ் நோய்',
    scientificName: 'Colletotrichum capsici',
    severity: 'High',
    symptoms: 'Circular sunken dark lesions on ripened chilli pods with concentric rings of black acervuli. Die-back on twig tips.',
    symptoms_ta: 'பழுத்த மிளகாய் காய்களில் வட்ட வடிவில் அமுங்கிய கரும் புள்ளிகள் தோன்றும். நுனிக்குருத்து காய்ந்து கீழ்நோக்கி உலர்ந்து போகும் (Die-back).',
    cause: 'Fungus Colletotrichum capsici spread by rain splashes in warm (28-30°C) humid environments.',
    cause_ta: 'கோலிட்டோடிரைக்கம் பூஞ்சை. மிதமான வெப்பம் மற்றும் மழைநீர் துளிகள் தெறிப்பதன் மூலம் பரவுகிறது.',
    treatment: 'Pick and destroy infected pods immediately; do not leave them drying in the field.',
    treatment_ta: 'பாதிக்கப்பட்ட மிளகாய் காய்களை உடனே பறித்து அழிக்கவும். வயலில் காயவிடக்கூடாது.',
    organic_treatment: 'Spray Panchagavya 3% or Trichoderma viride 2 g/L at 10-day intervals during flowering.',
    organic_treatment_ta: 'பூக்கும் தருணத்தில் 3% பஞ்சகாவ்யா அல்லது டிரைகோடெர்மா விரிடி 2 கிராம்/லிட்டர் 10 நாட்கள் இடைவெளியில் தெளிக்கவும்.',
    chemical_treatment: 'Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L. Observe label pre-harvest intervals.',
    chemical_treatment_ta: 'அசோக்சிஸ்ட்ரோபின் 23% SC @ 1 மி.லி/லிட்டர் அல்லது டைபனோகோனசோல் @ 0.5 மி.லி/லிட்டர் தெளிக்கவும்.',
    prevention: 'Seed treatment with Thiram or Captan @ 3 g/kg. Collect seeds only from completely disease-free mature pods.',
    prevention_ta: 'திராம் அல்லது கேப்டான் @ 3 கிராம்/கிலோ கொண்டு விதை நேர்த்தி செய்யவும். நல்ல ஆரோக்கியமான காய்களில் இருந்து மட்டும் விதைகளை எடுக்கவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80'
  },

  // --- Banana ---
  {
    id: 'banana_sigatoka',
    plant: 'Banana',
    plant_ta: 'வாழை',
    disease: 'Sigatoka (Leaf Spot)',
    disease_ta: 'சிகடோகா இலைப்புள்ளி நோய்',
    scientificName: 'Pseudocercospora fijiensis',
    severity: 'High',
    symptoms: 'Small chlorotic streaks on leaves running parallel to secondary veins, progressing into elliptical dark brown spots with dry gray center.',
    symptoms_ta: 'இலை நரம்புகளுக்கு இணையாக சிறிய வெளிர் மஞ்சள் கோடுகள் தோன்றி, பின்னர் சாம்பல் நிற மையத்துடன் கூடிய நீள்வட்ட பழுப்பு நிற புள்ளிகளாக மாறும்.',
    cause: 'Air-borne fungal ascospores favored by high humidity, warm temperature, and dense banana mats.',
    cause_ta: 'சூடோசெர்கோஸ்போரா பூஞ்சை வித்துக்கள். அடர்ந்த வாழைத் தோட்டம் மற்றும் அதிக காற்றில் பரவுகிறது.',
    treatment: 'Deleaf heavily infected leaves (surgery) and lay them flat on ground underside facing down.',
    treatment_ta: 'அதிகம் பாதிக்கப்பட்ட இலைகளை நறுக்கி அப்புறப்படுத்தி நிலத்தில் திருப்பி போடவும் (இலை அறுவை சிகிச்சை).',
    organic_treatment: 'Spray mineral oil / horticultural oil (1%) combined with bio-fungicide Bacillus amyloliquefaciens.',
    organic_treatment_ta: '1% கனிம எண்ணெய் (Mineral oil) உடன் உயிரியல் பூஞ்சைக் கொல்லி கலந்து தெளிக்கவும்.',
    chemical_treatment: 'Propiconazole 25% EC @ 1 ml/L with mineral oil (10 ml/L) or Carbendazim 50% WP @ 1 g/L. Comply with local agrochemical standards.',
    chemical_treatment_ta: 'புரோப்பிகோனசோல் 25% EC @ 1 மி.லி/லிட்டர் உடன் கனிம எண்ணெய் 10 மி.லி கலந்து தெளிக்கவும்.',
    prevention: 'Ensure effective field drainage trenches. De-sucker regularly to allow sunshine penetration.',
    prevention_ta: 'தோட்டத்தில் நல்ல வடிகால் வசதி அமைக்கவும். சூரிய ஒளி ஊடுருவ பக்கக் கன்றுகளை தவறாது நீக்கவும்.',
    sampleImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'
  }
];

export const PEST_DATABASE: Array<{
  id: string;
  name: string;
  name_ta: string;
  scientificName: string;
  crops: string[];
  crops_ta: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  favorableWeather: string;
  favorableWeather_ta: string;
  symptoms: string;
  symptoms_ta: string;
  prevention: string;
  prevention_ta: string;
  biologicalControl: string;
  biologicalControl_ta: string;
}> = [
  {
    id: 'aphids',
    name: 'Aphids',
    name_ta: 'அசுவினி (இலைப்பேன்)',
    scientificName: 'Aphis gossypii',
    crops: ['Cotton', 'Tomato', 'Cabbage', 'Chilli'],
    crops_ta: ['பருத்தி', 'தக்காளி', 'முட்டைக்கோஸ்', 'மிளகாய்'],
    riskLevel: 'High',
    favorableWeather: 'Dry, cloudy weather with temperatures 18-26°C and humidity 60-75%',
    favorableWeather_ta: 'குளிர்ந்த மேகமூட்டமான வானிலை (18-26°C) மற்றும் 60-75% ஈரப்பதம்',
    symptoms: 'Curled and deformed tender leaves, sticky honeydew secretion with black sooty mold growth, stunted shoots.',
    symptoms_ta: 'இளம் இலைகள் சுருங்குதல், தேன் போன்ற பிசுபிசுப்பான திரவம் சுரந்து கரும்பூஞ்சை படர்தல்.',
    prevention: 'Yellow sticky traps (15/acre), avoid excessive nitrogen fertilizers, conserve ladybird beetles.',
    prevention_ta: 'மஞ்சள் ஒட்டும் பொறிகள் (ஏக்கருக்கு 15), அதிக யூரியா தழைச்சத்தை தவிர்த்தல், பொறிவண்டுகளை பாதுகாத்தல்.',
    biologicalControl: 'Spray Verticillium lecanii @ 5 g/L or release Chrysoperla carnea green lacewings @ 20,000/acre.',
    biologicalControl_ta: 'வெர்டிசீலியம் லெக்கானி @ 5 கிராம்/லிட்டர் தெளிக்கவும் அல்லது கிரைசோபெர்லா பொறிவண்டுகளை விடவும்.'
  },
  {
    id: 'whitefly',
    name: 'Whitefly',
    name_ta: 'வெள்ளை ஈ',
    scientificName: 'Bemisia tabaci',
    crops: ['Cotton', 'Tomato', 'Chilli', 'Brinjal'],
    crops_ta: ['பருத்தி', 'தக்காளி', 'மிளகாய்', 'கத்தரிக்காய்'],
    riskLevel: 'Critical',
    favorableWeather: 'Warm dry conditions with temperatures 28-35°C and low rainfall',
    favorableWeather_ta: 'வறண்ட வெயில் காலம் (28-35°C) மற்றும் மழைக்குறைவு',
    symptoms: 'Yellow mosaic patterns, viral transmission (Leaf Curl Virus), chlorotic leaf yellowing, white nymphs on leaf undersides.',
    symptoms_ta: 'இலைகள் மஞ்சள் நிறமாக மாறுதல், இலை சுருட்டல் வைரஸ் பரவுதல், இலையின் அடியில் வெள்ளை நிற பூச்சிகள் காணப்படுதல்.',
    prevention: 'Install yellow sticky traps, maintain border crop of maize/sorghum, destroy weed hosts.',
    prevention_ta: 'மஞ்சள் ஒட்டும் பொறிகள் அமைத்தல், மக்காச்சோளம்/சோளம் போன்ற எல்லைப் பயிர்களை அமைத்தல்.',
    biologicalControl: 'Spray Neem oil 10,000 ppm @ 2-3 ml/L or release Encarsia formosa parasitic wasps.',
    biologicalControl_ta: 'வேப்பெண்ணெய் 10,000 ppm @ 2-3 மி.லி/லிட்டர் காதி சோப்புடன் கலந்து தெளிக்கவும்.'
  },
  {
    id: 'thrips',
    name: 'Thrips',
    name_ta: 'இலைப்பேன் (திரிப்ஸ்)',
    scientificName: 'Scirtothrips dorsalis',
    crops: ['Chilli', 'Onion', 'Garlic', 'Cotton'],
    crops_ta: ['மிளகாய்', 'வெங்காயம்', 'பூண்டு', 'பருத்தி'],
    riskLevel: 'High',
    favorableWeather: 'Warm dry weather with low humidity and delayed monsoon showers',
    favorableWeather_ta: 'குறைந்த ஈரப்பதத்துடன் கூடிய வறண்ட வெயில் சூழல்',
    symptoms: 'Upward curling of leaf margins, silvery patches with black fecal specks, distorted flower buds.',
    symptoms_ta: 'இலை ஓரங்கள் மேல்நோக்கி சுருண்டு படகு போல் ஆகுதல், இலைகளில் வெள்ளி போன்ற பளபளப்பான திட்டுகள் தோன்றுதல்.',
    prevention: 'Blue sticky traps (20/acre), overhead sprinkler irrigation creates microclimate discouraging thrips.',
    prevention_ta: 'நீல நிற ஒட்டும் பொறிகள் (ஏக்கருக்கு 20) அமைத்தல்.',
    biologicalControl: 'Beauveria bassiana @ 5 g/L foliar spray in evening hours.',
    biologicalControl_ta: 'பியூவேரியா பேசியானா (Beauveria bassiana) @ 5 கிராம்/லிட்டர் மாலையில் தெளிக்கவும்.'
  },
  {
    id: 'stem_borer',
    name: 'Stem Borer / Yellow Stem Borer',
    name_ta: 'தண்டு துளைப்பான் (குருத்துப்பூச்சி)',
    scientificName: 'Scirpophaga incertulas',
    crops: ['Paddy / Rice', 'Sugarcane', 'Corn / Maize'],
    crops_ta: ['நெல்', 'கரும்பு', 'மக்காச்சோளம்'],
    riskLevel: 'Critical',
    favorableWeather: 'High humidity (>80%) and temperatures between 25-30°C during tillering',
    favorableWeather_ta: 'தூர் கட்டும் பருவத்தில் அதிக ஈரப்பதம் (>80%) மற்றும் 25-30°C வெப்பம்',
    symptoms: 'Dead heart in vegetative stage (central tiller dries up) and white earhead with empty chaffy grains at heading.',
    symptoms_ta: 'பயிர் வளர்ச்சி பருவத்தில் நடுக்குருத்து காய்ந்து போதல் (வெண்குருத்து), கதிர் வரும் போது பதர் கதிர்களாக மாறுதல்.',
    prevention: 'Pheromone traps (5/acre for monitoring, 12/acre for mass trapping), clip seedling tips prior to planting.',
    prevention_ta: 'இனக்கவர்ச்சி பொறிகள் (ஏக்கருக்கு 5-12) அமைத்தல், நடவுக்கு முன் நாற்று நுனிகளைக் கிள்ளுதல்.',
    biologicalControl: 'Trichogramma japonicum egg parasitoid cards @ 20,000 eggs/acre released 3-4 times at weekly intervals.',
    biologicalControl_ta: 'டிரைக்கோடெர்மா முட்டை ஒட்டுண்ணி அட்டைகளை ஏக்கருக்கு 20,000 வீதம் வாரம் ஒருமுறை வெளியிடவும்.'
  }
];

export const GOVERNMENT_SCHEMES_DATA: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    schemeName: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'Income Support',
    state: 'All States (Central)',
    eligibility: 'All landholding farmer families across India having cultivable agricultural land registered in their name.',
    benefit: 'Direct financial assistance of ₹6,000 per year paid in three equal 4-monthly installments of ₹2,000 into Aadhaar-linked bank accounts.',
    requiredDocuments: ['Aadhaar Card', 'Land Ownership Record (Khatauni / Patta / 7/12)', 'Active Bank Account Passbook', 'Mobile Number'],
    applicationMethod: 'Online via PM-KISAN portal or via local Common Service Centre (CSC) / Revenue Officer.',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    id: 'pmfby',
    schemeName: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    state: 'All States (Central / State)',
    eligibility: 'All farmers growing notified crops in notified areas (both loanee and non-loanee farmers).',
    benefit: 'Comprehensive risk insurance against non-preventable natural risks (drought, flood, unseasonal rain, pests, diseases). Farmers pay low uniform premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops.',
    requiredDocuments: ['Land Possession Certificate', 'Sowing Certificate / Village Patwari Report', 'Aadhaar Card', 'Bank Passbook'],
    applicationMethod: 'National Crop Insurance Portal (NCIP), through designated banks, or via Kisan Call Centre (1800-180-1551).',
    officialLink: 'https://pmfby.gov.in'
  },
  {
    id: 'pmksy-per-drop',
    schemeName: 'Per Drop More Crop (PDMC) - PMKSY',
    category: 'Micro Irrigation',
    state: 'All States',
    eligibility: 'Farmers of all categories with cultivable land and assured source of water for irrigation.',
    benefit: 'Subsidy up to 55% for Small & Marginal farmers and 45% for other farmers for installing Drip and Sprinkler irrigation systems.',
    requiredDocuments: ['Land Ownership Papers', 'Water Source Proof / Pump Electricity Connection', 'Aadhaar Card', 'Soil/Water Test Report'],
    applicationMethod: 'Apply through District Agriculture / Horticulture Officer or State Micro-Irrigation Portal.',
    officialLink: 'https://pmksy.gov.in'
  },
  {
    id: 'smam',
    schemeName: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    category: 'Farm Machinery',
    state: 'All States',
    eligibility: 'Individual farmers, farmer groups, and Farmer Producer Organizations (FPOs).',
    benefit: '40% to 50% subsidy on purchase of agricultural machinery (tractors, power tillers, rotavators, drone sprayers, harvesters).',
    requiredDocuments: ['Aadhaar Card', 'Land Record', 'Bank Passbook', 'Passport Photo', 'Caste Certificate (if applicable)'],
    applicationMethod: 'Online through Farm Machinery Portal (agrimachinery.nic.in).',
    officialLink: 'https://agrimachinery.nic.in'
  },
  {
    id: 'soil-health-card',
    schemeName: 'Soil Health Card Scheme',
    category: 'Soil Testing',
    state: 'All States',
    eligibility: 'All practicing farmers across agricultural districts.',
    benefit: 'Free periodic soil testing for 12 key soil parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) along with customized dosage advisory.',
    requiredDocuments: ['Land Identification / Khasra Number', 'Aadhaar Card', 'Mobile Number'],
    applicationMethod: 'Contact Village Agriculture Extension Officer or local Krishi Vigyan Kendra (KVK).',
    officialLink: 'https://soilhealth.dac.gov.in'
  },
  {
    id: 'pkvy',
    schemeName: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    category: 'Organic Farming',
    state: 'All States',
    eligibility: 'Farmer clusters comprising 20 or more farmers having total land of 20 hectares or 50 acres.',
    benefit: 'Financial assistance of ₹50,000 per hectare over 3 years for organic inputs, PGS certification, labeling, and direct marketing.',
    requiredDocuments: ['Cluster Formation Form', 'Aadhaar Card', 'Land Records', 'Bank Account details'],
    applicationMethod: 'Apply through Regional Council or District Agriculture Department.',
    officialLink: 'https://pgsindia-ncof.gov.in'
  }
];

export const GOVERNMENT_SCHEMES_DATA_TA: Record<string, Partial<GovernmentScheme>> = {
  'pm-kisan': {
    schemeName: 'பிஎம்-கிசான் (பிரதம மந்திரி கிசான் சம்மான் நிதி)',
    category: 'வருமான ஆதரவு',
    state: 'அனைத்து மாநிலங்கள் (மத்திய அரசு)',
    eligibility: 'சொந்தமாக சாகுபடி செய்யக்கூடிய நிலம் வைத்திருக்கும் அனைத்து விவசாயக் குடும்பங்கள்.',
    benefit: 'ஆண்டுக்கு ₹6,000 நேரடி பண உதவி (4 மாதங்களுக்கு ஒருமுறை ₹2,000 வீதம் 3 தவணைகளில் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில்).',
    requiredDocuments: ['ஆதார் அட்டை', 'பட்டா / சிட்டா / நில உரிமை ஆவணம்', 'வங்கி கணக்குப் புத்தகம்', 'கைபேசி எண்'],
    applicationMethod: 'பிஎம்-கிசான் இணையதளம் அல்லது இ-சேவை மையம் (CSC) வழியாக.'
  },
  'pmfby': {
    schemeName: 'பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    category: 'பயிர் காப்பீடு',
    state: 'அனைத்து மாநிலங்கள்',
    eligibility: 'அறிவிக்கப்பட்ட பகுதியில் அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் கடன் பெற்ற மற்றும் கடன் பெறாத அனைத்து விவசாயிகள்.',
    benefit: 'வறட்சி, வெள்ளம், புயல், பூச்சிகள் போன்ற இயற்கை இடர்பாடுகளுக்கு முழுமையான பயிர் காப்பீடு. குறைந்த பிரீமியம் (காரீப் 2%, ரபி 1.5%).',
    requiredDocuments: ['நில உரிமைச் சான்றிதழ் / அடங்கல்', 'விதைப்புச் சான்றிதழ்', 'ஆதார் அட்டை', 'வங்கி கணக்கு'],
    applicationMethod: 'தேசிய பயிர் காப்பீட்டு போர்ட்டல் (NCIP) அல்லது தொடக்க வேளாண் வங்கிகள் வழியாக.'
  },
  'pmksy-per-drop': {
    schemeName: 'துளி நீரில் அதிக பயிர் (நுண் பாசனத் திட்டம்) - PMKSY',
    category: 'நுண் பாசனம்',
    state: 'அனைத்து மாநிலங்கள்',
    eligibility: 'பாசன நீர் ஆதாரம் மற்றும் சாகுபடி நிலம் கொண்ட அனைத்து வகை விவசாயிகள்.',
    benefit: 'சிறு, குறு விவசாயிகளுக்கு 55% வரையிலும், இதர விவசாயிகளுக்கு 45% வரையிலும் சொட்டு நீர் மற்றும் தெளிப்பு நீர் பாசன மானியம்.',
    requiredDocuments: ['நில ஆவணங்கள்', 'பாசன நீர் ஆதார சான்று / மின் இணைப்பு', 'ஆதார் அட்டை', 'மண்/நீர் பரிசோதனை சான்று'],
    applicationMethod: 'மாவட்ட தோட்டக்கலை / வேளாண்மை துறை அலுவலகம் அல்லது மாநில நுண்பாசன போர்ட்டல் வழியாக.'
  },
  'smam': {
    schemeName: 'வேளாண் இயந்திரமயமாக்கல் துணை இயக்கம் (SMAM)',
    category: 'வேளாண் இயந்திரங்கள்',
    state: 'அனைத்து மாநிலங்கள்',
    eligibility: 'தனிநபர் விவசாயிகள், சுயஉதவி குழுக்கள் மற்றும் உழவர் உற்பத்தியாளர் அமைப்புகள் (FPO).',
    benefit: 'டிராக்டர்கள், பவர் டில்லர்கள், ரோட்டவேட்டர்கள் மற்றும் ட்ரோன் தெளிப்பான்கள் வாங்க 40% முதல் 50% வரை மானியம்.',
    requiredDocuments: ['ஆதார் அட்டை', 'நில ஆவணம்', 'வங்கி கணக்கு புத்தகம்', 'புகைப்படம்'],
    applicationMethod: 'மத்திய வேளாண் இயந்திர போர்ட்டல் (agrimachinery.nic.in) வழியாக.'
  },
  'soil-health-card': {
    schemeName: 'மண் வள அட்டை திட்டம்',
    category: 'மண் பரிசோதனை',
    state: 'அனைத்து மாநிலங்கள்',
    eligibility: 'அனைத்து விவசாய நிலங்களுக்கும் பொருந்தும்.',
    benefit: '12 முக்கிய மண் ஊட்டச்சத்துக்கள் குறித்த இலவச பரிசோதனை மற்றும் அதற்கான துல்லிய உரப் பரிந்துரை அறிக்கை.',
    requiredDocuments: ['நில சர்வே எண் / பட்டா', 'ஆதார் அட்டை', 'கைபேசி எண்'],
    applicationMethod: 'கிராம வேளாண்மை விரிவாக்க அலுவலர் அல்லது உள்ளூர் வேளாண் அறிவியல் மையம் (KVK).'
  },
  'pkvy': {
    schemeName: 'பாரம்பரிய கிருஷி விகாஸ் யோஜனா (PKVY)',
    category: 'இயற்கை விவசாயம்',
    state: 'அனைத்து மாநிலங்கள்',
    eligibility: 'குறைந்தது 20 விவசாயிகள் கொண்ட குழுக்கள் (மொத்த பரப்பளவு 20 ஹெக்டேர் / 50 ஏக்கர்).',
    benefit: 'இயற்கை இடுபொருட்கள், சான்றிதழ் மற்றும் சந்தைப்படுத்துதலுக்கு 3 ஆண்டுகளில் ஹெக்டேருக்கு ₹50,000 நிதி உதவி.',
    requiredDocuments: ['விவசாயிகள் குழு படிவம்', 'ஆதார் அட்டை', 'நில ஆவணங்கள்', 'வங்கி விவரங்கள்'],
    applicationMethod: 'மாவட்ட வேளாண்மைத் துறை அல்லது மண்டல இயற்கை வேளாண் கவுன்சில் வழியாக.'
  }
};

export const MARKET_PRICES_DATA: MarketPrice[] = [
  {
    id: 'mkt-1',
    date: 'Today',
    crop: 'Tomato (Hybrid)',
    market: 'Kolar APMC Mandi',
    district: 'Kolar',
    state: 'Karnataka',
    minPrice: 1800,
    maxPrice: 2400,
    averagePrice: 2150,
    unit: '₹ / Quintal',
    priceTrend: 'up'
  },
  {
    id: 'mkt-2',
    date: 'Today',
    crop: 'Paddy (Basmati / Sona Masoori)',
    market: 'Karnal Mandi',
    district: 'Karnal',
    state: 'Haryana',
    minPrice: 3400,
    maxPrice: 4150,
    averagePrice: 3850,
    unit: '₹ / Quintal',
    priceTrend: 'stable'
  },
  {
    id: 'mkt-3',
    date: 'Today',
    crop: 'Cotton (Medium Staple)',
    market: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    minPrice: 6800,
    maxPrice: 7450,
    averagePrice: 7120,
    unit: '₹ / Quintal',
    priceTrend: 'up'
  },
  {
    id: 'mkt-4',
    date: 'Today',
    crop: 'Chilli (Red Dry)',
    market: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    minPrice: 14500,
    maxPrice: 18200,
    averagePrice: 16800,
    unit: '₹ / Quintal',
    priceTrend: 'up'
  },
  {
    id: 'mkt-5',
    date: 'Today',
    crop: 'Sugarcane',
    market: 'Kolhapur Sugar Mandi',
    district: 'Kolhapur',
    state: 'Maharashtra',
    minPrice: 315,
    maxPrice: 345,
    averagePrice: 330,
    unit: '₹ / Quintal (FRP)',
    priceTrend: 'stable'
  },
  {
    id: 'mkt-6',
    date: 'Today',
    crop: 'Onion (Red Nashik)',
    market: 'Lasalgaon Mandi',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: 1450,
    maxPrice: 2100,
    averagePrice: 1820,
    unit: '₹ / Quintal',
    priceTrend: 'down'
  },
  {
    id: 'mkt-7',
    date: 'Today',
    crop: 'Wheat (Sharbati / Lokwan)',
    market: 'Indore Mandi',
    district: 'Indore',
    state: 'Madhya Pradesh',
    minPrice: 2450,
    maxPrice: 2850,
    averagePrice: 2650,
    unit: '₹ / Quintal',
    priceTrend: 'stable'
  },
  {
    id: 'mkt-8',
    date: 'Today',
    crop: 'Banana (Grand Naine)',
    market: 'Theni Mandi',
    district: 'Theni',
    state: 'Tamil Nadu',
    minPrice: 1600,
    maxPrice: 2200,
    averagePrice: 1950,
    unit: '₹ / Quintal',
    priceTrend: 'up'
  }
];

export const MARKET_PRICES_DATA_TA: Record<string, { crop: string; market: string; district: string; state: string }> = {
  'mkt-1': { crop: 'தக்காளி (வீரிய ரகம்)', market: 'கோலார் ஏபிஎம்சி மண்டி', district: 'கோலார்', state: 'கர்நாடகா' },
  'mkt-2': { crop: 'நெல் (சோனா மசூரி / பாசுமதி)', market: 'கர்னால் மண்டி', district: 'கர்னால்', state: 'ஹரியானா' },
  'mkt-3': { crop: 'பருத்தி (நடுத்தர இழை)', market: 'ராஜ்கோட் ஏபிஎம்சி', district: 'ராஜ்கோட்', state: 'குஜராத்' },
  'mkt-4': { crop: 'மிளகாய் (சிவப்பு வத்தல்)', market: 'குண்டூர் மிளகாய் யார்டு', district: 'குண்டூர்', state: 'ஆந்திரப் பிரதேசம்' },
  'mkt-5': { crop: 'கரும்பு', market: 'கோலாப்பூர் சர்க்கரை மண்டி', district: 'கோலாப்பூர்', state: 'மகாராஷ்டிரா' },
  'mkt-6': { crop: 'வெங்காயம் (சிவப்பு நாசிக்)', market: 'லாசல்கான் மண்டி', district: 'நாசிக்', state: 'மகாராஷ்டிரா' },
  'mkt-7': { crop: 'கோதுமை (ஷர்பதி)', market: 'இந்தூர் மண்டி', district: 'இந்தூர்', state: 'மத்திய பிரதேசம்' },
  'mkt-8': { crop: 'வாழை (கிராண்ட் நைன்)', market: 'தேனி மண்டி', district: 'தேனி', state: 'தமிழ்நாடு' }
};

export const MARKETPLACE_PRODUCTS_DATA: MarketplaceProduct[] = [
  {
    id: 'prod-1',
    name: 'Certified US-618 Hybrid Tomato Seeds (10g)',
    category: 'Seeds',
    price: 340,
    unit: 'Pack (10g)',
    rating: 4.8,
    supplier: 'National Seeds Corporation Certified',
    description: 'High-yield hybrid tomato with exceptional TYLCV and bacterial spot tolerance. Uniform fruit firmness.',
    organic: false,
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Pusa Basmati 1509 Certified Paddy Seeds (10kg)',
    category: 'Seeds',
    price: 950,
    unit: 'Bag (10kg)',
    rating: 4.9,
    supplier: 'IARI Certified Breeder Channel',
    description: 'Short duration (115-120 days), high tillering, slender aroma grain with low water requirement.',
    organic: false,
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Neem Oil 10,000 PPM Cold Pressed Organic (1L)',
    category: 'Organic Farming Products',
    price: 480,
    unit: 'Bottle (1L)',
    rating: 4.7,
    supplier: 'Krishi Bio Organic Co.',
    description: '100% natural cold pressed azadirachtin formulation for organic control of whiteflies, thrips, and aphids.',
    organic: true,
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Trichoderma Viride Bio-Fungicide (1kg)',
    category: 'Plant Protection Products',
    price: 210,
    unit: 'Pack (1kg)',
    rating: 4.9,
    supplier: 'ICAR-BioTech Partner',
    description: 'Beneficial antagonist fungus for seed and soil treatment against root rot, wilt, and damping-off.',
    organic: true,
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Drip Irrigation Inline Lateral Pipe 16mm (400m Roll)',
    category: 'Irrigation Equipment',
    price: 2450,
    unit: 'Roll (400m)',
    rating: 4.8,
    supplier: 'Jain Agro Irrigation Systems',
    description: 'UV stabilized 16mm lateral with cylindrical emitters spaced at 40cm, 2.0 LPH discharge rate.',
    organic: false,
    inStock: true
  },
  {
    id: 'prod-6',
    name: '16L Battery Operated Knapsack Power Sprayer',
    category: 'Agricultural Tools',
    price: 2850,
    unit: 'Piece',
    rating: 4.6,
    supplier: 'Kisan Power Equipment',
    description: '12V 8Ah battery, stainless steel lance with 4 nozzle attachments for efficient uniform foliar spraying.',
    organic: false,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Yellow & Blue Insect Sticky Traps Combo (Pack of 25)',
    category: 'Plant Protection Products',
    price: 320,
    unit: 'Pack (25 pcs)',
    rating: 4.8,
    supplier: 'EcoSafe Pest IPM',
    description: 'Weatherproof UV-resistant sticky sheets for mass trapping of whiteflies, aphids, and thrips without chemical sprays.',
    organic: true,
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Soil Moisture & pH Digital Probe Meter',
    category: 'Equipment',
    price: 890,
    unit: 'Piece',
    rating: 4.5,
    supplier: 'AgriTech Instrumentation',
    description: 'Instant dual-prong meter to verify soil root zone moisture (0-100%) and pH without batteries.',
    organic: false,
    inStock: true
  }
];

export const MARKETPLACE_PRODUCTS_DATA_TA: Record<string, { name: string; category: MarketplaceProduct['category']; description: string; supplier: string }> = {
  'prod-1': {
    name: 'சான்றளிக்கப்பட்ட யுஎஸ்-618 வீரிய தக்காளி விதைகள் (10 கிராம்)',
    category: 'Seeds',
    description: 'இலை சுருட்டல் மற்றும் பாக்டீரியா இலைப்புள்ளி நோய்களை எதிர்க்கும் அதிக விளைச்சல் தரும் வீரிய தக்காளி ரகம்.',
    supplier: 'தேசிய விதைகள் கழகம் சான்றளிக்கப்பட்டது'
  },
  'prod-2': {
    name: 'பூசா பாசுமதி 1509 சான்றளிக்கப்பட்ட நெல் விதைகள் (10 கிலோ)',
    category: 'Seeds',
    description: 'குறுகிய கால ரகம் (115-120 நாட்கள்), அதிக தூர் கட்டும் திறன், வாசனை மிக்க மெல்லிய அரிசி.',
    supplier: 'ஐஏஆர்ஐ (IARI) சான்றளிக்கப்பட்ட விதைப் பிரிவு'
  },
  'prod-3': {
    name: 'வேப்பெண்ணெய் 10,000 PPM இயற்கை மரச்செக்கு தயாரிப்பு (1 லிட்டர்)',
    category: 'Organic Farming Products',
    description: 'வெள்ளை ஈக்கள், அசுவினி மற்றும் இலைப்பேன் பூச்சிகளை இயற்கை முறையில் கட்டுப்படுத்தும் அசாடிராக்டின் கரைசல்.',
    supplier: 'கிருஷி பயோ ஆர்கானிக்'
  },
  'prod-4': {
    name: 'டிரைகோடெர்மா விரிடி உயிரியல் பூஞ்சைக் கொல்லி (1 கிலோ)',
    category: 'Plant Protection Products',
    description: 'வேரழுகல், வாடல் நோய் மற்றும் நாற்றழுகலைத் தடுக்கும் நன்மை செய்யும் உயிரியல் பூஞ்சை.',
    supplier: 'ஐசிஏஆர்-பயோடெக் கூட்டாளர்'
  },
  'prod-5': {
    name: 'சொட்டு நீர் குழாய் 16மி.மீ (400 மீட்டர் சுருள்)',
    category: 'Irrigation Equipment',
    description: 'சூரிய வெப்பத்தைத் தாங்கும் 16மி.மீ குழாய், 40 செ.மீ இடைவெளியில் சீராக நீர் சொட்டும் துளைகள்.',
    supplier: 'ஜெயின் அக்ரோ இரிகேஷன்'
  },
  'prod-6': {
    name: '16 லிட்டர் பேட்டரி பவர் தெளிப்பான் (ஸ்ப்ரேயர்)',
    category: 'Agricultural Tools',
    description: '12V 8Ah பேட்டரி, துருப்பிடிக்காத எஃகு குழாய் மற்றும் 4 வகையான நாசில்களுடன் கூடிய எளிதான தெளிப்பான்.',
    supplier: 'கிசான் பவர் எக்யூப்மென்ட்'
  },
  'prod-7': {
    name: 'மஞ்சள் & நீல நிற ஒட்டும் பூச்சிப் பொறிகள் (25 எண்ணிக்கை)',
    category: 'Plant Protection Products',
    description: 'வெள்ளை ஈக்கள் மற்றும் இலைப்பேன்களை இரசாயனம் இன்றி கவர்ந்து அழிக்கும் மழைநீரைத் தாங்கும் ஒட்டும் அட்டைகள்.',
    supplier: 'ஈகோசேஃப் பெஸ்ட் ஐபிஎம்'
  },
  'prod-8': {
    name: 'மண் ஈரப்பதம் & கார அமிலத்தன்மை (pH) டிஜிட்டல் அளவி',
    category: 'Equipment',
    description: 'மண்ணின் வேர்ப்பகுதி ஈரப்பதம் (0-100%) மற்றும் அமில காரத்தன்மையை உடனடியாக காட்டும் இருமுனை கருவி.',
    supplier: 'அக்ரிடெக் இன்ஸ்ட்ரூமென்டேஷன்'
  }
};

export const INITIAL_FARMS = [
  {
    id: 'farm-1',
    name: 'Green Meadows Organic Farm',
    name_ta: 'பசுமை பண்ணை (இயற்கை சாகுபடி)',
    location: 'Vellore Road, Ranipet',
    location_ta: 'வேலூர் சாலை, ராணிப்பேட்டை',
    district: 'Ranipet',
    district_ta: 'ராணிப்பேட்டை',
    state: 'Tamil Nadu',
    state_ta: 'தமிழ்நாடு',
    areaAcres: 6.5,
    soilType: 'Red Soil' as const,
    mainCrop: 'Tomato',
    plantingDate: '2026-08-15',
    irrigationType: 'Drip' as const,
    createdAt: '2026-08-10',
    fields: [
      {
        id: 'field-1',
        farmId: 'farm-1',
        name: 'North Plot (Tomato Hybrid)',
        name_ta: 'வடக்கு நிலப்பிரிவு (வீரிய தக்காளி)',
        areaAcres: 3.5,
        soilType: 'Red Soil' as const,
        soilMoisture: 42,
        crop: 'Tomato',
        variety: 'US-618 Hybrid',
        plantingDate: '2026-08-15',
        irrigationType: 'Drip' as const,
        plants: [
          {
            id: 'plant-1',
            fieldId: 'field-1',
            name: 'Tomato Row A',
            variety: 'US-618',
            plantingDate: '2026-08-15',
            daysAfterPlanting: 53,
            growthStage: 'Flowering' as const,
            heightCm: 68,
            leafCount: 42,
            healthStatus: 'Good' as const
          }
        ]
      },
      {
        id: 'field-2',
        farmId: 'farm-1',
        name: 'South Plot (Chilli & Brinjal)',
        name_ta: 'தெற்கு நிலப்பிரிவு (மிளகாய் & கத்தரி)',
        areaAcres: 3.0,
        soilType: 'Loamy' as const,
        soilMoisture: 35,
        crop: 'Chilli',
        variety: 'Guntur Hope',
        plantingDate: '2026-09-01',
        irrigationType: 'Drip' as const,
        plants: [
          {
            id: 'plant-2',
            fieldId: 'field-2',
            name: 'Chilli Plot B',
            variety: 'Guntur Hope',
            plantingDate: '2026-09-01',
            daysAfterPlanting: 36,
            growthStage: 'Vegetative' as const,
            heightCm: 44,
            leafCount: 28,
            healthStatus: 'Good' as const
          }
        ]
      }
    ]
  }
];

// Localization helper functions
export function getLocalizedDisease(item: DiseaseKnowledgeItem, lang: Language) {
  if (lang === 'ta') {
    return {
      ...item,
      plant: item.plant_ta || CROP_TRANSLATIONS['ta'][item.plant] || item.plant,
      disease: item.disease_ta || item.disease,
      symptoms: item.symptoms_ta || item.symptoms,
      cause: item.cause_ta || item.cause,
      treatment: item.treatment_ta || item.treatment,
      organic_treatment: item.organic_treatment_ta || item.organic_treatment,
      chemical_treatment: item.chemical_treatment_ta || item.chemical_treatment,
      prevention: item.prevention_ta || item.prevention
    };
  }
  return item;
}

export function getLocalizedScan(scan: DiseaseDetectionResult | null, lang: Language): DiseaseDetectionResult | null {
  if (!scan) return null;
  if (lang === 'ta') {
    const dbItem = DISEASE_DATABASE.find(d =>
      (scan.diseaseId && d.id === scan.diseaseId) ||
      d.disease.toLowerCase() === scan.disease.toLowerCase() ||
      d.disease_ta === scan.disease ||
      (d.plant.toLowerCase() === scan.plant.toLowerCase() && d.disease.toLowerCase() === scan.disease.toLowerCase())
    );

    return {
      ...scan,
      plant: scan.plant_ta || (dbItem ? dbItem.plant_ta : (CROP_TRANSLATIONS['ta'][scan.plant] || scan.plant)),
      disease: scan.disease_ta || (dbItem ? dbItem.disease_ta : scan.disease),
      severity: scan.severity,
      severity_ta: SEVERITY_TRANSLATIONS['ta'][scan.severity] || scan.severity,
      symptoms: scan.symptoms_ta || (dbItem ? dbItem.symptoms_ta : scan.symptoms),
      cause: scan.cause_ta || (dbItem ? dbItem.cause_ta : scan.cause),
      treatment: scan.treatment_ta || (dbItem ? dbItem.treatment_ta : scan.treatment),
      organic_treatment: scan.organic_treatment_ta || (dbItem ? dbItem.organic_treatment_ta : scan.organic_treatment),
      chemical_treatment: scan.chemical_treatment_ta || (dbItem ? dbItem.chemical_treatment_ta : scan.chemical_treatment),
      prevention: scan.prevention_ta || (dbItem ? dbItem.prevention_ta : scan.prevention),
      message: scan.message_ta || scan.message
    };
  } else {
    const dbItem = DISEASE_DATABASE.find(d =>
      (scan.diseaseId && d.id === scan.diseaseId) ||
      d.disease_ta === scan.disease ||
      d.disease.toLowerCase() === scan.disease.toLowerCase()
    );

    return {
      ...scan,
      plant: dbItem ? dbItem.plant : (CROP_TRANSLATIONS['en'][scan.plant] || scan.plant),
      disease: dbItem ? dbItem.disease : scan.disease,
      symptoms: dbItem ? dbItem.symptoms : scan.symptoms,
      cause: dbItem ? dbItem.cause : scan.cause,
      treatment: dbItem ? dbItem.treatment : scan.treatment,
      organic_treatment: dbItem ? dbItem.organic_treatment : scan.organic_treatment,
      chemical_treatment: dbItem ? dbItem.chemical_treatment : scan.chemical_treatment,
      prevention: dbItem ? dbItem.prevention : scan.prevention,
      message: scan.message
    };
  }
}

export function getLocalizedPest(pest: typeof PEST_DATABASE[0], lang: Language) {
  if (lang === 'ta') {
    return {
      ...pest,
      name: pest.name_ta || pest.name,
      crops: pest.crops_ta || pest.crops,
      favorableWeather: pest.favorableWeather_ta || pest.favorableWeather,
      symptoms: pest.symptoms_ta || pest.symptoms,
      prevention: pest.prevention_ta || pest.prevention,
      biologicalControl: pest.biologicalControl_ta || pest.biologicalControl
    };
  }
  return pest;
}

export function getLocalizedScheme(scheme: GovernmentScheme, lang: Language): GovernmentScheme {
  if (lang === 'ta' && GOVERNMENT_SCHEMES_DATA_TA[scheme.id]) {
    const ta = GOVERNMENT_SCHEMES_DATA_TA[scheme.id];
    return {
      ...scheme,
      schemeName: ta.schemeName || scheme.schemeName,
      category: ta.category || scheme.category,
      state: ta.state || scheme.state,
      eligibility: ta.eligibility || scheme.eligibility,
      benefit: ta.benefit || scheme.benefit,
      requiredDocuments: ta.requiredDocuments || scheme.requiredDocuments,
      applicationMethod: ta.applicationMethod || scheme.applicationMethod
    };
  }
  return scheme;
}

export function getLocalizedMarketPrice(price: MarketPrice, lang: Language): MarketPrice {
  if (lang === 'ta' && MARKET_PRICES_DATA_TA[price.id]) {
    const ta = MARKET_PRICES_DATA_TA[price.id];
    return {
      ...price,
      crop: ta.crop,
      market: ta.market,
      district: ta.district,
      state: ta.state
    };
  }
  return price;
}

export function getLocalizedProduct(prod: MarketplaceProduct, lang: Language): MarketplaceProduct {
  if (lang === 'ta' && MARKETPLACE_PRODUCTS_DATA_TA[prod.id]) {
    const ta = MARKETPLACE_PRODUCTS_DATA_TA[prod.id];
    return {
      ...prod,
      name: ta.name,
      description: ta.description,
      supplier: ta.supplier
    };
  }
  return prod;
}

export function getLocalizedAlert(alert: EarlyWarningAlert, lang: Language): EarlyWarningAlert {
  if (lang === 'ta') {
    const alertTranslations: Record<string, { title: string; message: string; action: string; timestamp?: string }> = {
      'alert-1': {
        title: 'நோய் அபாயம்: தக்காளி ஆரம்பக்கால இலைக்கருகல்',
        message: 'மேகமூட்டமான வானிலை மற்றும் அதிக பனிப்பொழிவு (>85% RH) வடக்கு நிலப்பிரிவில் பூஞ்சை நோய் அழுத்தத்தை அதிகரித்துள்ளது.',
        action: 'இலைகளை ஆய்வு செய்து, பேசிலஸ் சப்டிலிஸ் அல்லது காப்பர் சோப் உயிரியல் பூஞ்சைக் கொல்லியை தெளிக்கவும்.',
        timestamp: '2 மணி நேரத்திற்கு முன்'
      },
      'alert-2': {
        title: 'தெற்கு நிலப்பிரிவில் நீர் பற்றாக்குறை',
        message: 'மிளகாய் வயலில் மண் ஈரப்பதம் 35% ஆக குறைந்துள்ளது, இது வேர்ப்பகுதிக்கு தேவையான 55% அளவை விட குறைவாகும்.',
        action: 'அதிகாலை வேளையில் 45 நிமிடங்களுக்கு சொட்டு நீர் பாசனம் செய்யவும்.',
        timestamp: '5 மணி நேரத்திற்கு முன்'
      },
      'alert-3': {
        title: 'மாவட்டத்தில் வெள்ளை ஈ எச்சரிக்கை',
        message: 'அண்டை பருத்தி மற்றும் தக்காளி வயல்களில் வெள்ளை ஈ புழுக்களின் எண்ணிக்கை பெருமளவு அதிகரித்துள்ளதாக வேளாண் ஆலோசனை மையம் எச்சரித்துள்ளது.',
        action: 'வெள்ளை ஈக்களை கண்காணிக்கவும் அழிக்கவும் ஏக்கருக்கு 20 மஞ்சள் ஒட்டும் பொறிகளை உடனடியாக பொருத்தவும்.',
        timestamp: '1 நாளுக்கு முன்'
      },
      'alert-4': {
        title: 'மழை முன்னறிவிப்பு: வியாழக்கிழமை 15-20 மி.மீ எதிர்பார்க்கப்படுகிறது',
        message: 'அடுத்த 48 மணி நேரத்தில் இடி மின்னலுடன் கூடிய மழை பெய்ய வாய்ப்புள்ளது. இலைவழி பூச்சிக்கொல்லி தெளிப்பதை தள்ளிப்போடவும்.',
        action: 'வயலில் நீர் தேங்குவதைத் தவிர்க்க வடிகால் வாய்க்கால்களை சுத்தம் செய்யவும்.',
        timestamp: '1 நாளுக்கு முன்'
      }
    };

    const found = alertTranslations[alert.id];
    return {
      ...alert,
      title: alert.title_ta || (found ? found.title : alert.title),
      message: alert.message_ta || (found ? found.message : alert.message),
      action: alert.action_ta || (found ? found.action : alert.action),
      timestamp: found?.timestamp || alert.timestamp
    };
  }
  return alert;
}

