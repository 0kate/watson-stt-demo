# Backend (API)

## 実行

- normal

```
$ pipenv run start
```

- with docker

```
$ docker build -t backend .
$ docker run --rm -p 8000:8000 backend:latest
```

## テスト

```
$ pipenv run tests
```

※ テストコードはtestsディレクトリ内に集約すること

