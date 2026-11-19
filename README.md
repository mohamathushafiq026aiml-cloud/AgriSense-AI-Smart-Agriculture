# 🌾 AgriSense AI – Smart Agriculture Platform

A complete, farmer-friendly, AI-powered precision agriculture platform designed for smallholders and commercial farm enterprises. AgriSense AI empowers farmers to monitor crop health, scan plant diseases with leaf validation, optimize irrigation, evaluate pest risk, track plant growth, access live mandi prices and government schemes, and converse with a multilingual agronomic AI assistant that natively understands **Tanglish, Tamil, Hindi, and English**.

---

## 🌟 Core Modules

1. **AI Plant Disease Pathology Scanner**:
   - Camera and photo upload with automated non-leaf / image quality rejection guardrails.
   - Comprehensive multi-crop coverage (30+ crops including high-priority Paddy/Rice, Tomato, Sugarcane, Cotton, Chilli, Banana, Apple, Potato, Wheat, Maize, Groundnut).
   - Provides confidence rating, severity level, symptoms, causal pathogen, immediate treatment, certified bio-fungicides/organic remedies, and safety-compliant chemical advisories.
2. **Smart Irrigation Engine**:
   - Grounded in the FAO Penman-Monteith crop evapotranspiration ($ET_c$) methodology.
   - Recommends drip irrigation duration (minutes), daily crop water demand (mm), and estimated water savings.
3. **Pest Risk Monitor & Integrated Pest Management (IPM)**:
   - Evaluates micro-climate triggers (temperature, humidity, rainfall) against 10 major pest vector reproduction thresholds.
   - Focuses on biological controls (Neem oil, Chrysoperla, Trichogramma) and cultural field practices.
4. **Plant Growth & Phenology Tracker**:
   - Tracks Days After Planting (DAP), canopy height progression, leaf count, and physiological growth milestones.
5. **Farm Health Index**:
   - Composite 0–100 score across 7 scientific pillars: Plant Health, Soil Health, Water Status, Weather Risk, Disease Risk, Pest Defense, and Growth Status.
6. **Agro-Meteorological Early Warning System**:
   - Real-time warnings for fungal spore risk, water deficit, pest vector surges, and heavy rain forecasts with actionable recommendations.
7. **Multilingual Agriculture Chatbot**:
   - Server-side Gemini 3.8 Flash AI with Speech-to-Text (microphone input) and Text-to-Speech audio read-out.
   - **Tanglish is a first-class language** (e.g. *"En thakkali ilai yellow ah maaruthu, enna problem?"*).
   - Also supports English, தமிழ் (Tamil), and हिन्दी (Hindi).
8. **Live APMC Mandi Prices & Agricultural Marketplace**:
   - Daily wholesale prices (Min, Max, Modal) across major crops and verified farm equipment/certified bio-inputs.
9. **Government Welfare Schemes**:
   - Official portal links, required document checklists, and eligibility guidelines for PM-KISAN, PMFBY, PMKSY Micro-Irrigation, SMAM, Soil Health Card, and PKVY.
10. **Agronomic Reports Generator**:
    - Print-ready and downloadable PDF-style dossiers for bank crop loan verification and insurance compliance.

---

## 📊 Dataset Statistics Report (Section 32)

| Dataset File | Total Records | Classes / Features | Distribution Balance | Missing Values | Split Ratio |
|---|---|---|---|---|---|
| `data/01_disease_treatment.csv` | 20+ Profiles | 30+ Crops, Organic & Chemical | Balanced | 0 | Curated Baseline |
| `data/02_irrigation_dataset.csv` | 10,000 | 8 Agro-Climatic Features | 50% Yes / 50% No | 0 | 70% Train, 15% Val, 15% Test |
| `data/03_pest_risk_dataset.csv` | 10,000 | 4 Risk Classes (Low/Med/High/Crit) | ~2,500 per class | 0 | 70% Train, 15% Val, 15% Test |
| `data/04_plant_growth_dataset.csv`| 10,000 | 10 Phenological Metrics | Balanced Stages | 0 | 70% Train, 15% Val, 15% Test |
| `data/05_farm_health_dataset.csv` | 10,000 | 8 Pillar Sub-Indices | Gaussian Norm | 0 | 70% Train, 15% Val, 15% Test |
| `data/06_weather_dataset.csv` | 10,000 | 7 Meteorological Fields | Multi-season | 0 | 70% Train, 15% Val, 15% Test |
| `data/07_government_schemes.csv` | 6 National | Central & State Programs | Comprehensive | 0 | Official Portals |
| `data/08_market_prices.csv` | 8 Commodities | APMC Mandi Daily Ticker | Real Benchmarks | 0 | AGMARKNET Synced |
| `data/09_chatbot_knowledge.json` | Multilingual | English, Tamil, Hindi, Tanglish | First-Class | 0 | Natural Dialogue |

---

## 🛠 Local Development Setup

### Windows PowerShell

```powershell
# 1. Clone repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd AgriSense

# 2. Setup Node.js frontend & server (Vite + Express)
npm install
npm run dev

# 3. (Optional) Run Python Flask backend separately
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python backend/app.py
```

Open your browser at `http://localhost:3000` (or `http://127.0.0.1:5000` for standalone Flask).

---

## 🚀 GitHub Push Instructions

```powershell
git init
git add .
git commit -m "Initial AgriSense AI smart agriculture platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

*(Note: Secrets, `.env`, and `venv/` are excluded by `.gitignore`)*.
