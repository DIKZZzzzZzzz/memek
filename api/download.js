export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  res.status(200).json({
    status: true,
    message: "Endpoint download masih dummy. Silakan kembangkan.",
    url
  });
}
