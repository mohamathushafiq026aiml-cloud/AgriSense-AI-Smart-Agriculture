import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'agrisense-secret-key-2026')
    SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
    SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
    WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY', '')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
