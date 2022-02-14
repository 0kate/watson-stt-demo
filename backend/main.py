"""Voice recognition API Server.

Todo:
    * Implement for other languages. (models/speech_to_text.py: SpeechRecognizable)
    * Implement handling exception. (API service error, Invalid voice data, ...)
    * Implement logging.
"""

import base64
import os
import typing

from fastapi import FastAPI
from pydantic import BaseModel, Field

from models import WatsonSpeechToText, TextUtils


app = FastAPI()
API_KEY = os.getenv('API_KEY', '')  # API Key for IBM Cloud Speech To Text


class RecognizeBody(BaseModel):
    """Request body for POST /recognize

    Attributes:
        voice (str): Base64でエンコードされた音声データ
        type (str): 音声データのメディアタイプ (例: audio/flac)
    """
    voice: str = Field(..., description='Voice data with base64 encoded.')
    type: str = Field(..., description='Media type of voice data')


@app.post('/recognize')
async def recognize(body: RecognizeBody):
    """POST /recognize
    """
    decoded_voice = base64.b64decode(body.voice)

    stt = WatsonSpeechToText(API_KEY)
    results = stt.recognize(decoded_voice, body.type)

    return {
        'results': results,
    }


class SpotBody(BaseModel):
    """Request body for POST /spot

    Attributes:
        text (str): 検索対象のテキスト
        keywords (list[str]):
    """
    text: str = Field(..., description='Target text to search.')
    keywords: typing.List[str] = Field(..., description='KeyWords to spot.')
    chars: typing.Optional[int] = Field(5, description='Length of chars that include keyword before and after.')


@app.post('/spot')
async def spot(body: SpotBody):
    """POST /spot
    """
    results = TextUtils.spot_keywords(body.text, body.keywords)
    return {
        'results': results,
    }
