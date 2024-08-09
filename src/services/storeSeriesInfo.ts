import axios from "axios";


const storeSeriesInfo = async (seriesInfo: any) => {
  try {
    const response = await axios.post(
      `http://localhost:${6999}/series/upload`,
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
