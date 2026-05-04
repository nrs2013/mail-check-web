# Mail-Check! Web版

Gmail を使ったメール仕分けダッシュボード（独立Webアプリ）。
Cowork 不要、ブラウザだけで動く。

- **本番URL**: （Vercel デプロイ後に追記）
- **対象**: のむさん（nomura@nrs1.jp）専用
- **技術**: Node.js + Express + Vanilla JS フロントエンド
- **デプロイ**: Vercel（無料）

## 機能（Cowork版から移植）

- 野村宛・自社・To/Cc メール仕分け
- AI要約（Claude API 経由）
- PIC UP! 案件サマリー
- Dropbox/Google Drive リンク抽出

## ローカル起動

```bash
npm install
cp .env.example .env  # API キーを記入
npm run dev
```

## 環境変数

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Gmail OAuth
- `ANTHROPIC_API_KEY` — Claude API
- `SESSION_SECRET` — セッション暗号化用ランダム文字列

## デプロイ手順（Vercel）

1. Vercel ダッシュボードで「Import Project」
2. このリポジトリを選択
3. 環境変数を Vercel に設定
4. Deploy
