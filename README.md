# Mail-Check! Web版（GitHub Pages版）

Gmail を使ったメール仕分けダッシュボード（独立Webアプリ）。
GitHub Pages で完全無料で動く。

## 本番URL（GitHub Pages 有効化後）

`https://nrs2013.github.io/mail-check-web/`

## 機能

- Google でログイン（Gmail OAuth・ブラウザ直接）
- 自分宛・自社・To/Cc メール仕分け
- AI要約（Google Gemini 2.0 Flash・無料枠）
- PIC UP! 案件サマリー

## 使い方

1. 上のURLを開く
2. 初回設定：API キー入力（Gemini と Google OAuth Client ID）
3. 「Googleでログイン」→ Gmail 取得開始

## API キーの取得（無料）

- **Gemini API**: https://aistudio.google.com/apikey
- **Gmail OAuth**: https://console.cloud.google.com/apis/credentials → OAuth 2.0 Client ID 作成（Web application、Authorized JavaScript origins に GitHub Pages の URL を追加）
