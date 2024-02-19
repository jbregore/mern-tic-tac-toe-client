import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";

export function GameApi() {
  const getGames = async (token: string) => {
    const res = await axios.get(`${ENDPOINTS.games}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const createGame = async (payload: any, token: string) => {
    const res = await axios.post(`${ENDPOINTS.games}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  return {
    getGames,
    createGame,
  };
}
