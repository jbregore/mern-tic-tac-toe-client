import { ENDPOINTS } from "@/utils/endpoints";
import axios from "axios";

export function GameApi() {
  const getGames = async (token: string, params: any) => {
    const query = new URLSearchParams(params).toString();

    const res = await axios.get(`${ENDPOINTS.games}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const getGamesWith = async (
    token: string,
    opponentId: string,
    params: any
  ) => {
    const query = new URLSearchParams(params).toString();

    const res = await axios.get(
      `${ENDPOINTS.games}?${query}&opponent_id=${opponentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    getGamesWith,
    createGame,
  };
}
