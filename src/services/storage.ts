import axios from "axios";

const hasSeriesInfo = async (seriesId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:${6999}/series/${seriesId}`
    );
    return response.status === 200;
  } catch (error: any) {
    console.log("Unable to check series information");
    console.error(error.message);
  }
};

const getSeriesInfo = async (seriesId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:${6999}/series/${seriesId}`
    );
    return response.data;
  } catch (error: any) {
    console.log("Unable to retrieve series information");
    console.error(error.message);
  }
};

const fetchSeriesField = async (seriesId: string, field: string) => {
  // MAYBE: Optimize this function to fetch only the requested field
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
    console.log(response.status);
  } catch (error: any) {
    console.log("Unable to store series information");
    console.error(error.message);
  }
};

export { storeSeriesInfo, getSeriesInfo, hasSeriesInfo, fetchSeriesField };
