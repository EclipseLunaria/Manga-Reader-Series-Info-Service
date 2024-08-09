import axios from "axios";

// MAYBE: allow for dynamic port
const DATA_LAYER_PORT = 6999;
const storeSeriesInfo = async (seriesInfo: any) => {
  try {
    const response = await axios.post(
      `http://localhost:${DATA_LAYER_PORT}/series/upload`,
      seriesInfo
    );
    console.log(response.status);
    console.log(`${seriesInfo} information stored successfully`);
  } catch (error: any) {
    console.log("Unable to store series information");
    console.error(error.message);
  }
};

export { storeSeriesInfo };
