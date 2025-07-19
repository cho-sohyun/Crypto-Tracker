import axios from "axios";

// 코인 상세 OHLCV API

const OHLCV_API_URL = import.meta.env.VITE_OHLCV_API;

export const fetchCoinOhlcv = async (coinId: string) => {
  const { data } = await axios.get(OHLCV_API_URL, {
    params: { coinId },
  });
  return data;
};
