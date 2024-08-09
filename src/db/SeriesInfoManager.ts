import { MangaSeriesData } from "../models/seriesModels";
import { Connection } from "pg";
import DB_CONFIG from "../../db.config.json";

const createConnection = async () => {
  const connection = new Connection({
    user: DB_CONFIG.DB_USER,
    host: DB_CONFIG.DB_HOST,
    database: DB_CONFIG.DB_NAME,
    password: DB_CONFIG.DB_PASS,
  });
};

const seriesExists = async (seriesId: string): Promise<boolean> => {
  return false;
};

const storeSeriesInfo = async (seriesInfo: MangaSeriesData) => {};

const fetchSeriesInfo = async (seriesId: string) => {};
