import axios from "axios";



const getSeriesInfo = async (seriesId: string) => {
  const url = `http://localhost:${6999}/series/${seriesId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log("Unable to retrieve series information");
    console.error(error.message);
  }
};

const fetchSeriesField = async (seriesId: string, field: string) => {
  try {
    const response = await axios.get(
      `http://localhost:${6999}/series/${seriesId}/${field}`
    );

    return response.data;
  } catch (error: any) {
    console.log("Unable to retrieve series information");
    console.error(error.message);
  }
};

const storeSeriesInfo = async (seriesInfo: any) => {
  try {
    const response = await axios.post(
      `http://localhost:${6999}/series/upload`,
      seriesInfo
    );
  } catch (error: any) {
    console.log("Unable to store series information");
    console.error(error.message);
  }
};

export { storeSeriesInfo, getSeriesInfo, fetchSeriesField };
