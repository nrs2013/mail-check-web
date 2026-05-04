// Vercel Serverless Function: Claude API プロキシ
// フロントエンドから直接 Anthropic API を叩くと CORS で弾かれるので、
// このプロキシ経由で呼び出す。API キーはサーバー側に隠す。

import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  try {
    const { prompt, items } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt required" });

    const client = new Anthropic({ apiKey });
    const userMessage = items
      ? prompt + "\n\n--- データ ---\n" + JSON.stringify(items, null, 2)
      : prompt;

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = msg.content?.[0]?.text || "";
    return res.status(200).json({ text });
  } catch (e) {
    console.error("Claude API error:", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
}
