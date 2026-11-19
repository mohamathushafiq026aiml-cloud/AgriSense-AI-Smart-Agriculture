import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Irrigation Dataset (10,000 records)
// Columns: Temperature,Humidity,Soil_Moisture,Rainfall,Plant_Type,Growth_Stage,Water_Requirement,Irrigation_Need
console.log('Generating data/02_irrigation_dataset.csv...');
const crops = ['Tomato', 'Paddy', 'Sugarcane', 'Cotton', 'Chilli', 'Banana', 'Wheat', 'Maize', 'Onion', 'Groundnut'];
const stages = ['Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];
const irrigationRows = ['Temperature,Humidity,Soil_Moisture,Rainfall,Plant_Type,Growth_Stage,Water_Requirement,Irrigation_Need'];

for (let i = 0; i < 10000; i++) {
  const temp = (18 + Math.random() * 22).toFixed(1); // 18-40 C
  const hum = (35 + Math.random() * 55).toFixed(1);  // 35-90 %
  const moisture = (20 + Math.random() * 70).toFixed(1); // 20-90 %
  const rain = (Math.random() < 0.75 ? 0 : Math.random() * 35).toFixed(1);
  const crop = crops[i % crops.length];
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const waterReq = (2.0 + Math.random() * 6.5).toFixed(2);
  const need = (Number(moisture) < 55 && Number(rain) < 10) ? 'Yes' : 'No';
  irrigationRows.push(`${temp},${hum},${moisture},${rain},${crop},${stage},${waterReq},${need}`);
}
fs.writeFileSync(path.join(DATA_DIR, '02_irrigation_dataset.csv'), irrigationRows.join('\n'));

// 2. Pest Risk Dataset (10,000 records, balanced across Low, Medium, High, Critical)
// Columns: Temperature,Humidity,Rainfall,Soil_Moisture,Plant_Type,Growth_Stage,Pest,Risk_Level,Risk_Score,Prevention
console.log('Generating data/03_pest_risk_dataset.csv...');
const pests = ['Aphids', 'Whitefly', 'Thrips', 'Stem_Borer', 'Mealybug', 'Leaf_Miner', 'Armyworm'];
const riskLevels = ['Low', 'Medium', 'High', 'Critical'];
const pestRows = ['Temperature,Humidity,Rainfall,Soil_Moisture,Plant_Type,Growth_Stage,Pest,Risk_Level,Risk_Score,Prevention'];

for (let i = 0; i < 10000; i++) {
  const temp = (20 + Math.random() * 18).toFixed(1);
  const hum = (40 + Math.random() * 55).toFixed(1);
  const rain = (Math.random() * 25).toFixed(1);
  const moist = (30 + Math.random() * 50).toFixed(1);
  const crop = crops[i % crops.length];
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const pest = pests[i % pests.length];
  const risk = riskLevels[i % riskLevels.length];
  const score = risk === 'Critical' ? Math.floor(80 + Math.random() * 20) :
                risk === 'High' ? Math.floor(65 + Math.random() * 15) :
                risk === 'Medium' ? Math.floor(40 + Math.random() * 25) :
                Math.floor(10 + Math.random() * 30);
  const prev = 'Install sticky traps, spray Neem oil 10000ppm or bio-agent';
  pestRows.push(`${temp},${hum},${rain},${moist},${crop},${stage},${pest},${risk},${score},"${prev}"`);
}
fs.writeFileSync(path.join(DATA_DIR, '03_pest_risk_dataset.csv'), pestRows.join('\n'));

// 3. Plant Growth Dataset (10,000 records)
// Columns: Plant,Days_After_Planting,Plant_Height,Leaf_Count,Leaf_Size,Soil_Moisture,Temperature,Humidity,Growth_Stage,Health_Status
console.log('Generating data/04_plant_growth_dataset.csv...');
const healthStatuses = ['Excellent', 'Good', 'Fair', 'Poor'];
const growthRows = ['Plant,Days_After_Planting,Plant_Height,Leaf_Count,Leaf_Size,Soil_Moisture,Temperature,Humidity,Growth_Stage,Health_Status'];

for (let i = 0; i < 10000; i++) {
  const crop = crops[i % crops.length];
  const dap = Math.floor(5 + Math.random() * 115);
  const height = (dap * (0.6 + Math.random() * 0.4)).toFixed(1);
  const leaves = Math.floor(dap * (0.4 + Math.random() * 0.5));
  const leafSize = (4 + Math.random() * 12).toFixed(1);
  const moist = (35 + Math.random() * 45).toFixed(1);
  const temp = (22 + Math.random() * 14).toFixed(1);
  const hum = (50 + Math.random() * 35).toFixed(1);
  const stage = dap < 15 ? 'Germination' : dap < 45 ? 'Vegetative' : dap < 70 ? 'Flowering' : dap < 95 ? 'Fruiting' : 'Maturity';
  const status = healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
  growthRows.push(`${crop},${dap},${height},${leaves},${leafSize},${moist},${temp},${hum},${stage},${status}`);
}
fs.writeFileSync(path.join(DATA_DIR, '04_plant_growth_dataset.csv'), growthRows.join('\n'));

// 4. Farm Health Dataset (10,000 records)
// Columns: Plant_Health,Soil_Health,Water_Status,Weather_Risk,Disease_Risk,Pest_Risk,Growth_Status,Farm_Health_Score
console.log('Generating data/05_farm_health_dataset.csv...');
const farmHealthRows = ['Plant_Health,Soil_Health,Water_Status,Weather_Risk,Disease_Risk,Pest_Risk,Growth_Status,Farm_Health_Score'];

for (let i = 0; i < 10000; i++) {
  const pHealth = Math.floor(60 + Math.random() * 38);
  const sHealth = Math.floor(55 + Math.random() * 42);
  const wStatus = Math.floor(60 + Math.random() * 38);
  const wRisk = Math.floor(50 + Math.random() * 45);
  const dRisk = Math.floor(55 + Math.random() * 40);
  const peRisk = Math.floor(50 + Math.random() * 45);
  const gStatus = Math.floor(65 + Math.random() * 33);
  const score = Math.round((pHealth * 0.2 + sHealth * 0.15 + wStatus * 0.15 + wRisk * 0.1 + dRisk * 0.15 + peRisk * 0.15 + gStatus * 0.1));
  farmHealthRows.push(`${pHealth},${sHealth},${wStatus},${wRisk},${dRisk},${peRisk},${gStatus},${score}`);
}
fs.writeFileSync(path.join(DATA_DIR, '05_farm_health_dataset.csv'), farmHealthRows.join('\n'));

// 5. Weather Dataset (10,000 records)
// Columns: Date,Temperature,Humidity,Rainfall,Wind_Speed,Pressure,Weather
console.log('Generating data/06_weather_dataset.csv...');
const weatherTypes = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm'];
const weatherRows = ['Date,Temperature,Humidity,Rainfall,Wind_Speed,Pressure,Weather'];

const baseDate = new Date('2024-01-01');
for (let i = 0; i < 10000; i++) {
  const d = new Date(baseDate.getTime() + i * 24 * 3600 * 1000 * 0.25).toISOString().split('T')[0];
  const temp = (20 + Math.random() * 18).toFixed(1);
  const hum = (40 + Math.random() * 55).toFixed(1);
  const rain = (Math.random() < 0.7 ? 0 : Math.random() * 30).toFixed(1);
  const wind = (6 + Math.random() * 24).toFixed(1);
  const press = Math.floor(1004 + Math.random() * 18);
  const w = Number(rain) > 15 ? 'Thunderstorm' : Number(rain) > 2 ? 'Light Rain' : weatherTypes[Math.floor(Math.random() * 3)];
  weatherRows.push(`${d},${temp},${hum},${rain},${wind},${press},${w}`);
}
fs.writeFileSync(path.join(DATA_DIR, '06_weather_dataset.csv'), weatherRows.join('\n'));

console.log('All 5 structured ML datasets generated successfully (10,000 records each)!');
