import express from "express";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
const PORT = 3003;

// Middleware
app.use(express.json());

// API Endpoints
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  return res.json(bmiCalculator(req.query));
});

app.post("/exercises", (req, res) => {
  return res.json(exerciseCalculator(req.body));
});

// Server
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
