let matches = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    if (!body || !body.opponent_id) {
      return res.status(400).json({ error: 'opponent_id wajib diisi' });
    }
    matches.push({
      timestamp: Date.now(),
      opponent_id: body.opponent_id,
      opponent_name: body.opponent_name || "unknown"
    });
    return res.json({ ok: true, total: matches.length });
  }

  if (req.method === 'GET') {
    if (!matches.length) return res.json({ prediction: null, reason: 'belum ada data' });
    const freq = {};
    matches.forEach(m => freq[m.opponent_id] = (freq[m.opponent_id] || 0) + 1);
    let bestId = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
    const opponent = matches.find(m => m.opponent_id === bestId);
    res.json({
      prediction: opponent,
      probability: freq[bestId] / matches.length,
      total: matches.length
    });
  }
}