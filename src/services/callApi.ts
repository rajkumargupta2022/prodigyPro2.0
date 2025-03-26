import axios from "axios";
import { baseUrl } from "./urls";

export const postRequest = async (endPoint: string, body: object) => {
  try {
   return  await axios.post(baseUrl+endPoint, body);
  } catch (err) {
    console.log("err", err);
    return err
  }
};
