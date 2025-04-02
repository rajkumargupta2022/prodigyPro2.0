import axios, { AxiosResponse } from "axios";
import { baseUrl } from "./urls";

export const postRequest = async <t>(endPoint: string, body: object) => {
  try {
    const response: AxiosResponse<t> = await axios.post(
      baseUrl + endPoint,
      body
    );
    return response.data;
  } catch (err) {
    console.log(`Error happen in ${endPoint} and error ${err}`);
    throw err;
  }
};

export const getRequest = async <t>(endPoint: string) => {
  try {
    const response: AxiosResponse<t> = await axios.get(baseUrl + endPoint);
    return response.data;
  } catch (err) {
    console.log(`Error happen in ${endPoint} and error ${err}`);
    throw err;
  }
};
