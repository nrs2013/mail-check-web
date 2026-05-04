// Vercel Serverless Function: Google Gemini API プロキシ
// フロントから直接Gemini APIを呼ぶとAPIキーが丸見えになるので、
// このプロキシ経由で呼び出す。APIキーはサーバー側に隠す。
// Gemini無料枠：1日1500リクエストまで

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  try {
    const { prompt, items } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt required" });

    const userMessage = items
      ? prompt + "\n\n--- データ ---\n" + JSON.stringify(items, null, 2)
      : prompt;

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
      })
    });
    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: "Gemini API error", detail: errText.slice(0, 500) });
    }
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ text });
  } catch (e) {
    console.error("Gemini API error:", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
}
