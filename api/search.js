import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query kosong" });

  try {
    const { data } = await axios.get(`https://www.xvideos.com/?k=${encodeURIComponent(query)}`);
    const $ = cheerio.load(data);
    const hasil = [];

    $("div.mozaique > div").each((i, el) => {
      const title = $(el).find("p.title a").text().trim();
      const url = "https://www.xvideos.com" + $(el).find("p.title a").attr("href");
      const thumb = $(el).find("img").attr("data-src") || $(el).find("img").attr("src");
      const duration = $(el).find(".duration").text().trim();

      if (title && url && thumb) {
        hasil.push({ title, url, thumb, duration });
      }
    });

    res.status(200).json({ result: hasil });
  } catch (e) {
    console.error("❌ Gagal ambil data:", e.message);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
}
