import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

const app = express();

// Config
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/ping", (_req, res) => res.send("pong"));
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});
