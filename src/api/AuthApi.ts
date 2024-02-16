import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";

export function AuthApi() {
  const signin = async (payload: any) => {
    const res = await axios.post(`${ENDPOINTS.auth}/signin`, payload);

    return res.data;
  };

  const signup = async (payload: any) => {
    const res = await axios.post(`${ENDPOINTS.auth}/signup`, payload);

    return res.data;
  };

  const me = async (token: string) => {
    const res = await axios.get(`${ENDPOINTS.auth}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  return {
    signin,
    signup,
    me,
  };
}
