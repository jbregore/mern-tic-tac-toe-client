import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";

export function RankApi() {
  const getRanks = async (token: string, params: any) => {
    const query = new URLSearchParams(params).toString();

    const res = await axios.get(`${ENDPOINTS.ranks}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  return {
    getRanks,
  };
}
