export type Language = 'en' | 'ta';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  preferredLanguage: Language;
  farmCount: number;
  createdDate: string;
}

export interface Plant {
  id: string;
  fieldId: string;
  name: string;
  variety: string;
  plantingDate: string;
  daysAfterPlanting: number;
  growthStage: 'Germination' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Maturity';
  heightCm: number;
  leafCount: number;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  areaAcres: number;
  soilType: 'Clay' | 'Loamy' | 'Sandy' | 'Black Soil' | 'Red Soil' | 'Alluvial';
  soilMoisture: number; // percentage
  crop: string;
  variety: string;
  plantingDate: string;
  irrigationType: 'Drip' | 'Sprinkler' | 'Flood' | 'Furrow' | 'Rainfed';
  plants: Plant[];
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  district: string;
  state: string;
  areaAcres: number;
  soilType: 'Clay' | 'Loamy' | 'Sandy' | 'Black Soil' | 'Red Soil' | 'Alluvial';
  mainCrop: string;
  plantingDate: string;
  irrigationType: 'Drip' | 'Sprinkler' | 'Flood' | 'Furrow' | 'Rainfed';
  fields: Field[];
  createdAt: string;
}

export interface DiseaseDetectionResult {
  id?: string;
  diseaseId?: string;
  success: boolean;
  status?: 'success' | 'unknown_or_unsupported' | 'low_confidence';
  plant: string;
  plant_ta?: string;
  disease: string;
  disease_ta?: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  severity_ta?: string;
  symptoms: string;
  symptoms_ta?: string;
  cause: string;
  cause_ta?: string;
  treatment: string;
  treatment_ta?: string;
  organic_treatment: string;
  organic_treatment_ta?: string;
  chemical_treatment: string;
  chemical_treatment_ta?: string;
  prevention: string;
  prevention_ta?: string;
  message?: string;
  message_ta?: string;
  imageUrl?: string;
  timestamp?: string;
  farmId?: string;
  fieldId?: string;
  imageQuality?: 'Good' | 'Fair' | 'Blurry' | 'Dark';
  plantDetection?: boolean;
}

export interface IrrigationPrediction {
  id?: string;
  farmId?: string;
  fieldId?: string;
  timestamp?: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  rainfall: number;
  plantType: string;
  growthStage: string;
  waterRequirement: number; // mm or liters/m2
  irrigationNeed: boolean;
  recommendedDurationMinutes: number;
  waterSavingEstimatePercent: number;
  reason: string;
}

export interface PestRiskPrediction {
  id?: string;
  farmId?: string;
  timestamp?: string;
  pest: string;
  scientificName?: string;
  targetCrops?: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number; // 0-100
  possibleCause: string;
  prevention: string;
  biologicalControl?: string;
  symptoms?: string;
}

export interface FarmHealthScore {
  farmId: string;
  score: number; // 0-100
  status: 'Critical' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  plantHealth: number;
  soilHealth: number;
  waterStatus: number;
  weatherRisk: number;
  diseaseRisk: number;
  pestRisk: number;
  growthStatus: number;
  lastUpdated: string;
}

export interface WeatherData {
  city: string;
  state: string;
  temperature: number;
  humidity: number;
  rainfallMm: number;
  windSpeedKmh: number;
  pressureHpa: number;
  uvIndex: number;
  condition: string;
  forecast: Array<{
    day: string;
    date: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    rainProbability: number;
  }>;
}

export interface EarlyWarningAlert {
  id: string;
  type: 'disease' | 'water' | 'pest' | 'rain' | 'heat' | 'weather' | 'health';
  severity: 'info' | 'warning' | 'danger' | 'critical';
  title: string;
  title_ta?: string;
  message: string;
  message_ta?: string;
  action: string;
  action_ta?: string;
  timestamp: string;
  read: boolean;
  fieldId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: Language;
}

export interface GovernmentScheme {
  id: string;
  schemeName: string;
  category: string;
  state: string;
  eligibility: string;
  benefit: string;
  requiredDocuments: string[];
  applicationMethod: string;
  officialLink: string;
}

export interface MarketPrice {
  id: string;
  date: string;
  crop: string;
  market: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  unit: string;
  priceTrend: 'up' | 'down' | 'stable';
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: 'Seeds' | 'Agricultural Tools' | 'Equipment' | 'Irrigation Equipment' | 'Plant Protection Products' | 'Organic Farming Products';
  price: number;
  unit: string;
  rating: number;
  supplier: string;
  description: string;
  organic: boolean;
  inStock: boolean;
}
