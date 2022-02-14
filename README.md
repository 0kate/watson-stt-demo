# 音声認識API課題
## 実行準備

- IBM Cloud上に、Speech To Textサービスのインスタンスを作成
- docker-composeをインストール
- docker-compose.yamlの環境変数(environment)を設定
  - API_KEYにSpeech To TextのAPIキーを設定

## 実行

- コンテナのビルド & 起動

  ```
  $ docker-compose up
  ```
  
  ※ ホットリロード対応のため、起動したままでコードの追加・修正可能です

## 接続情報

- backend (API)
  - http://localhost:8000/
- API Document
  - http://localhost:8000/docs
- frontend (UI)
  - http://localhost:3000/