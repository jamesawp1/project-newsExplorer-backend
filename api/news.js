export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro na NewsAPI" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
}