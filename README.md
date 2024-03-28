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

## 開発する方へ

### プラグインのインストール

バージョン管理には[asdf](https://asdf-vm.com)を使うことを想定していますが、[.tool-versions](./.tool-versions)へ記載されたバージョンがインストールされていれば動くと思います。

```bash
$ asdf install
$ corepack enable
$ asdf reshim nodejs
$ asdf reshim java
```

### DB

DockerでPostgreSQLを使います

#### 起動(初回)

```bash
$ docker compose up -d --build
```

#### 起動(2回目以降)

```bash
$ docker compose up -d
```

#### データベースの管理画面を起動

```bash
$ npx prisma studio
```

#### 停止

```bash
$ docker compose down
```

### Storageの起動

Emulatorを使ってFirebase storageをローカルで実行します

#### インストール

```bash
$ npm install -g firebase-tools
```

#### 起動

```bash
$ npm run emu:storage
```

### アプリの起動

**DBとエミュレータが起動していることを確認してください**

[`.env.sample`](./.env.sample)を`.env`となおし、環境変数を書き換えてください。

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

### lint (型チェック等)

```bash
$ npm run lint
```

### format (コード整形)

```bash
$ npm run format
```

### fix (lint & コード整形)

```bash
$ npm run fix
```

### ブランチ命名規則

作業するときは`main`ブランチから新しく`カテゴリ名/タイトル`とブランチを切ってください。カテゴリ名は例えば以下のようなものがあります。(あくまで参考程度です。)

- `feature`: 新しいコードや新機能
- `fix`: バグの修正
- `refactor`: `feature`や`fix`でもないコードの変更
- `docs`: READMEやコメントの変更など
- `build`: 依存関係の変更や新しいパッケージの追加など
- `test`: テストコードの追加 or 変更
- `ci`: GitHub Actions等のCIに関する変更
- `chore`: その他

特定のissueに関係したブランチの場合, `カテゴリ名/#issue番号`としてください。

例えば、新しい機能に関するissueが`#10`の場合, ブランチ名は`feature/#10`となります。

### デプロイ (管理者用)

以下のコマンドを実行

```bash
$ gcloud builds submit --config cloudbuild.yaml
```
