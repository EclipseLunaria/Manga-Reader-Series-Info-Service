import { Client } from "pg";
import DB_CONFIG from "../config/db";

const getClient = () => new Client(DB_CONFIG);

const getRandomSeries = async () => {
  const client = getClient();
  await client.connect();
  console.log("connected");
  const results = await client.query(
    "select manga_id from manga_metadata order by random() limit 1;"
  );
  console.log("manga_id: ", results.rows[0]);
  return results.rows[0];
};

export { getRandomSeries };
