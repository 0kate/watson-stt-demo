import unittest

from models import TextUtils


class TestTextUtils(unittest.TestCase):
    """Tests for TextUtils.
    """
    def test_spot_keywords_without_include_chars(self):
        test_text = '音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います '
        test_keywords = ['音声', 'に']

        actual = TextUtils.spot_keywords(test_text, test_keywords)
        expected = [
            {
                'keyword': '音声',
                'substrings': [
                    { 'text': ' 音声 認識の現状', 'position': 0 },
                    { 'text': 'い最近では 音声 認識でもデ', 'position': 31 },
                ],
            },
            {
                'keyword': 'に',
                'substrings': [
                    { 'text': '認識の現状 に ついて教え', 'position': 7 },
                    { 'text': 'ょうか簡単 に 言えば脳の', 'position': 78 },
                    { 'text': 'みをモデル に した技術で', 'position': 91 },
                    { 'text': '超えるまで に なっていま', 'position': 123 },
                ],
            },
        ]
        self.assertEqual(actual, expected)

    def test_spot_keywords_without_chars(self):
        test_text = '音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います '
        test_keywords = ['音声', 'に']

        actual = TextUtils.spot_keywords(test_text, test_keywords, include_chars=3)
        expected = [
            {
                'keyword': '音声',
                'substrings': [
                    { 'text': ' 音声 認識の', 'position': 0 },
                    { 'text': '近では 音声 認識で', 'position': 31 },
                ],
            },
            {
                'keyword': 'に',
                'substrings': [
                    { 'text': 'の現状 に ついて', 'position': 7 },
                    { 'text': 'か簡単 に 言えば', 'position': 78 },
                    { 'text': 'モデル に した技', 'position': 91 },
                    { 'text': 'るまで に なって', 'position': 123 },
                ],
            },
        ]
        self.assertEqual(actual, expected)
