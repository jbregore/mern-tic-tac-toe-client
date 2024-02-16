import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";

export function AuthApi() {
  const signin = async (payload: any) => {
    const res = await axios.post(`${ENDPOINTS.auth}/signin`, payload);

    return res.data;
  };

  return {
    signin,
  };
}
