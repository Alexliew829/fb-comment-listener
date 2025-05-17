export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { from_id, message, post_id } = req.body;

  if (!from_id || !message || !post_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  return res.status(200).json({
    status: 'Triggered',
    result: 'Accepted',
    from_id,
    message,
    post_id
  });
}
