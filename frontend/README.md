# Frontend (UI)

## 実行

- normal

```
$ npm run start
```

- with docker

```
$ docker build -t frontend .
$ docker run --rm -p 3000:3000 frontend:latest
```

※ package.json内のproxyについて、docker-composeを用いたbackendとの同時起動を想定しているため、UIのみ単体で起動する場合は、任意のエンドポイントに変更して実行してください

