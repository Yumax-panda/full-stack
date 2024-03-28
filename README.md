# Full Stack

全ての人のためのポートフォリオ作成サービス。

## 機能

以下のことをポートフォリオで公開できます。

- 技術スタック
- 制作物
- 外部サイトで執筆した記事

執筆記事はユーザー名(またはトークン)を登録して連携させることで自動取得。

## 技術構成

Next.jsのApp Routerで構成。認証機能はAuth.js。

### フロントエンド

- Material UI (UIコンポーネント)
- tiptap (エディタ)
- react-toastify (トースト表示)

### バックエンド

- Prisma (ORM)
- node-html-parser (urlからOGP画像を取得するため)

### テスト

- Storybook
- Vitest

### その他

- PostgreSQL (データベース)
- Firebase Storage (オブジェクトストレージ)

## Dev

DockerでPostgreSQLを使います

### 起動(初回)

```bash
$ docker compose up -d --build
```

### 起動(2回目移行)

```bash
$ docker compose up
```

### データベースの管理画面を起動

```bash
$ npx prisma studio
```

### 停止

```bash
$ docker compose down
```

### アプリの起動

**DBが起動していることを確認してください**

```bash
$ npm install
$ npx prisma generate
$ npm run dev
```

キャッシュなしで実行する場合は2つめのコマンドを以下に置き換えてください。

```bash
$ npm run dev:nocache
```

### StorybookでUIのテスト

```bash
$ npm run storybook
```

## デプロイ

以下のコマンドを実行

```bash
$ gcloud builds submit --config cloudbuild.yaml
```
