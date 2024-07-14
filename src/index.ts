import express from "express";
import cors from "cors";
import { searchRouter } from "./routes/searchRoutes";
import { seriesRouter } from "./routes/seriesRoutes";
import { statusRouter } from "./routes/statusRoutes";

const app = express();
app.use(cors());
const port = process.env.PORT || 6968;
app.use("/search", searchRouter);
app.use("/", seriesRouter);
app.use("/status", statusRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
