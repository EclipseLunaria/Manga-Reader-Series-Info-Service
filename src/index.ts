import express from "express";
import cors from "cors";
import commonRouter from "./routes/shared";
import { searchRouter } from "./routes/searchRoutes";
import { seriesRouter } from "./routes/seriesRoutes";
import { statusRouter } from "./routes/statusRoutes";

const app = express();
app.use(cors());
const port = process.env.PORT || 6901;

app.use("/search", searchRouter);

app.use("/", seriesRouter);

app.use("/status", statusRouter);
app.use("/shared", commonRouter);
app.get("/", (req, res) => {
  res.send("Series Info Service is online.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
