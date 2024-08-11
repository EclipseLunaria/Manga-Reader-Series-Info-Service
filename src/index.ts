import express from "express";
import cors from "cors";
import { searchRouter } from "./routes/searchRoutes";
import { seriesRouter } from "./routes/seriesRoutes";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 6901;

app.use("/search", searchRouter);

app.use("/", seriesRouter);

app.get("/", (req, res) => {
  res.send("Series Info Service is online.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
