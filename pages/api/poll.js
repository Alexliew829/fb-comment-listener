
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST method is allowed' });
    return;
  }

  const { from_id, message, post_id } = req.body;

  if (!from_id || !message || !post_id) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const targetUserIds = ['101411206173416', '100001418128376']; // 主页和助理 ID
  const keywords = ['Close', '关'];

  const shouldTrigger = targetUserIds.includes(from_id) && keywords.includes(message);

  if (shouldTrigger) {
    try {
      const response = await fetch('https://hook.us2.make.com/yjkpp72c8jlrsgsqcs8u87r2shn7fyoo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id })
      });

      const result = await response.text();
      res.status(200).json({ status: 'Triggered', result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to trigger Make webhook', details: error.message });
    }
  } else {
    res.status(200).json({ status: 'Ignored', reason: 'Not from allowed user or keyword' });
  }
}
