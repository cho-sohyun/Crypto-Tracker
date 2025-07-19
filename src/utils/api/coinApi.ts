import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
});

export const fetchCoins = async () => {
  const { data } = await API.get("/coins");
  return data.slice(0, 100);
};

export const fetchTickers = async () => {
  const { data } = await API.get("/tickers");
  return data.slice(0, 100);
};
