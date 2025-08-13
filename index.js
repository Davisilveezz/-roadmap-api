const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const roadmap = require("./roadmap.json");

app.get("/roadmap", (req, res) => {
  res.json(roadmap);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
