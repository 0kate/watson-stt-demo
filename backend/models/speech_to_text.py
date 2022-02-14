import abc
import dataclasses
import io
import typing

from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


@dataclasses.dataclass
class RecognizeResult:
    """音声認識結果を格納するためのクラス

    認識精度などの情報が必要となる場合は、このクラスを拡張することで対応可能。

    Attributes:
        text (str): 認識結果の文字列
    """
    text: str


class SpeechRecognizable(metaclass=abc.ABCMeta):
    """音声認識用のインターフェース

    音声認識を行う処理を実装する際は、このインターフェースを実装することで対応可能。
    他の音声認識APIへの拡張が必要な場合も、呼び出し方法の統一が可能。
    """

    @abc.abstractmethod
    def recognize(self, voice: bytes, madia_type: str, lang: str = 'ja-JP') -> typing.List[RecognizeResult]:
        """音声認識を行う処理

        実際に音声認識を行う処理を実装する関数。

        Args:
            voice (bytes): 音声データのバイナリ。
            media_type (str): 音声データの形式。 (ex. audio/flac)
            lang (str): 音声データの言語。default: 'ja-JP'.

        Returns:
            list[RecognizeResult]: 認識結果の配列。認識結果が複数ある場合を想定。
        """
        ...


class WatsonSpeechToText(SpeechRecognizable):
    """IBM Watson Speech To Textを用いて音声認識を行うクラス

    Attributes:
        stt (ibm_watson.SpeechToTextV1):
    """

    def __init__(self, apikey: str):
        self.stt = SpeechToTextV1(
            authenticator=IAMAuthenticator(apikey),
        )

    def recognize(self, voice: bytes, media_type: str, lang: str = 'ja-JP') -> typing.List[RecognizeResult]:
        """IBM Speech To Textを用いて音声認識を行う処理

        Args:
            voice (bytes): 音声データのバイナリ。
            media_type (str): 音声データの形式。 (ex. audio/flac)
            lang (str): 音声データの言語。 default: 'ja-JP'

        Returns:
            typing.List[RecognizeResult]: 認識結果の配列。認識結果が複数ある場合を想定。
        """
        results = self.stt.recognize(
            audio=io.BytesIO(voice),
            content_type=media_type,
            model=f'{lang}_BroadbandModel',
        ).get_result().get('results', [])

        recognize_results = []
        for result in results:
            recognize_results.extend([
                RecognizeResult(text=alt.get('transcript', ''))
                for alt in result.get('alternatives', [])
            ])
        return recognize_results
