# Mail-Check! Web版（Gemini版）

Gmail を使ったメール仕分けダッシュボード（独立Webアプリ）。
Cowork 不要、ブラウザだけで動く。

- **対象**: のむさん（nomura@nrs1.jp）専用
- **AI**: Google Gemini 2.0 Flash（**無料枠 1日1500回**）
- **デプロイ**: Vercel（無料）

## 必要な準備

1. **Gemini API キー**（無料・3分）
   - https://aistudio.google.com/apikey で取得
2. **Vercel アカウント**（無料・count-down-studio と同じものでOK）

## デプロイ手順

1. Vercel で GitHub リポジトリ `nrs2013/mail-check-web` を Import
2. 環境変数 `GEMINI_API_KEY` を設定
3. Deploy

## ローカル開発

```bash
npm install
cp .env.example .env  # API キーを記入
vercel dev
```
