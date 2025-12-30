export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({
        error: "Parâmetro 'q' é obrigatório"
      });
    }

    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", q);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("apiKey", process.env.NEWS_API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro ao consultar a NewsAPI"
      });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}