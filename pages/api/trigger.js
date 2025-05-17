
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST method is allowed' });
    return;
  }

  const { from_id, message, post_id } = req.body;
  console.log("接收到留言：", { from_id, message, post_id });

  res.status(200).json({ status: "Triggered", result: "Accepted" });
}
