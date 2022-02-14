import dataclasses
import re
import typing


@dataclasses.dataclass
class SpotSubstring:
    """spot_keywordsによって見つかった位置と、その前後の文字を含む文字列を格納するクラス

    Attributes:
        text (str): キーワードと、見つかった位置の前後の文字を含む文字列
        position (int): 見つかった位置
    """
    text: str
    position: int


@dataclasses.dataclass
class SpotResult:
    """spot_keywordsの結果を、キーワードごとに格納するクラス

    Attribute:
        keyword (str): 検索したキーワード
        substrings (list[SpotSubstring]): 見つかった位置と、その前後の文字を含む文字列のリスト
    """
    keyword: str
    substirngs: typing.List[SpotSubstring]


class TextUtils(object):
    """テキスト処理を行うユーティリティー群
    """
    @classmethod
    def spot_keywords(cls, text: str, keywords: typing.List[str], include_chars: int = 5):
        """テキスト中から、指定されたキーワードごとにその前後の文字を含めて返す関数

        テキスト中から、指定されたキーワードを検索。
        見つかった位置、見つかった位置の前後の文字を含む文字列を返す。

        Args:
            text (str): 検索対象のテキスト
            keywords (list[str]): 検索するキーワードのリスト
            include_chars (int): 前後に含める文字数, default: 5

        Returns:
            list[SpotResult]: 検索結果のリスト
        """
        text = text.replace(' ', '')
        results = []
        for keyword in keywords:
            keyword_length = len(keyword)
            substrings = []
            for match in re.finditer(keyword, text):
                position = match.start()
                prev = text[0:position] if position - include_chars < 0 else text[position - include_chars:position]
                next = text[position + keyword_length:] if len(text) <= position + keyword_length else text[position + keyword_length:position + keyword_length + include_chars]
                substrings.append({
                    'text': f'{prev} {keyword} {next}',
                    'position': position
                })
            results.append({
                'keyword': keyword,
                'substrings': substrings,
            })
        return results
