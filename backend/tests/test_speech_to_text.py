import unittest
from unittest import mock

from ibm_watson import SpeechToTextV1

from models import RecognizeResult, WatsonSpeechToText


class TestSpeechToText(unittest.TestCase):
    """Tests for SpeechToText.
    """

    @mock.patch.object(SpeechToTextV1, 'recognize')
    def test_recognize_with_watson_stt(self, mock_recognize):
        class MockRecognizeResponse:
            @classmethod
            def get_result(cls):
                return {
                    'results': [
                        {
                            'alternatives': [
                                {
                                    'transcript': 'recognized text',
                                },
                            ],
                        },
                    ],
                }
        mock_recognize.return_value = MockRecognizeResponse
        stt = WatsonSpeechToText('')
        actual = stt.recognize(b'voice data', 'media type')
        expected = [
            RecognizeResult(text='recognized text'),
        ]
        self.assertEqual(actual, expected)
