import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings"""

    # App Config
    app_name: str = "Quote Zen - AI Chatbot"
    app_version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True

    # API Config
    api_prefix: str = "/api"
    api_port: int = 8000
    api_host: str = "0.0.0.0"

    # CORS
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
    ]

    # Database
    database_url: str = "sqlite:///./data.db"
    database_echo: bool = False

    # Rasa
    rasa_server_url: str = "http://localhost:5005"
    rasa_model_path: str = "./rasa_nlu/models"

    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-3.5-turbo"
    openai_temperature: float = 0.7
    openai_max_tokens: int = 500

    # Sentiment Analysis
    sentiment_threshold_positive: float = 0.1
    sentiment_threshold_negative: float = -0.1

    # Cache
    cache_ttl: int = 300  # 5 minutes

    # Logging
    log_level: str = "INFO"
    log_file: str = "./logs/app.log"

    # Session
    session_timeout: int = 3600  # 1 hour

    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings"""
    return Settings()

# Initialize settings
settings = get_settings()
