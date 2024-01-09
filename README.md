# Full Stack

エンジニア専用のポートフォリオ作成サービス。

## 機能

以下のことをポートフォリオで公開できます。

- 技術スタック
- 制作物 (WIP)
- 外部サイトで執筆した記事

執筆記事はユーザー名(またはトークン)を登録して連携させることで自動取得。

## 技術構成(仮)

Next.jsのApp Routerで構成。認証機能はAuth.js。

### フロントエンド

- Material UI (UIコンポーネント)
- tiptap (エディタ)

### バックエンド

- Prisma (ORM)
- node-html-parser (urlからOGP画像を取得するため)

## テスト

- Storybook
- Vitest

### その他

- PostgreSQL (データベース)
- Firebase Storage (オブジェクトストレージ)

## Dev

### Dockerの起動

```bash
$ docker-compose up
```

### アプリの起動

```bash
$ npm install
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

### データベース管理

マイグレーション

```bash
$ npx prisma migrate dev
```

データベースの管理画面を起動

```bash
$ npx prisma studio
```
