import { config } from "dotenv";
import { ClientConfig } from "pg";
config();

`CONTENT_DB_HOST=localhost
CONTENT_DB_PORT=5432
CONTENT_DB_USER=backend_deployer
CONTENT_DB_PASS=password
CONTENT_DB_NAME=backend_deploy`;
const DB_CONFIG: ClientConfig = {
  host: process.env.CONTENT_DBHOST,
  port: Number(process.env.CONTENT_DB_PORT),
  user: process.env.CONTENT_DB_USER,
  password: process.env.CONTENT_DB_PASS,
  database: process.env.CONTENT_DB_NAME,
};

export default DB_CONFIG;
