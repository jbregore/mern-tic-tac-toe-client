"use client";
import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";
import Cookies from "js-cookie";

const useUser = () => {
  const token = Cookies.get("token");

  const isAuthenticated = async (): Promise<boolean> => {
    if (token) {
      try {
        const result = await axios.get(`${ENDPOINTS.auth}/me`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        if (result.status === 200) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  return { isAuthenticated };
};

export default useUser;
