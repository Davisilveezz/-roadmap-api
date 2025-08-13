const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Lê o arquivo como texto e une arrays sequenciais: `][` -> `,`
function loadRoadmap() {
  const raw = fs.readFileSync("./roadmap.json", "utf8").trim();
  try {
    return JSON.parse(raw); // se já for JSON válido
  } catch {
    const merged = raw.replace(/\]\s*\[/g, ","); // junta arrays
    // garante colchetes de abertura/fechamento
    const normalized =
      merged.startsWith("[") && merged.endsWith("]") ? merged : `[${merged}]`;
    return JSON.parse(normalized);
  }
}

app.get("/roadmap", (req, res) => {
  try {
    const data = loadRoadmap();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "JSON inválido", details: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
