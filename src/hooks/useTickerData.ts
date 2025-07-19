import { useQuery } from "@tanstack/react-query";
import { fetchTickers } from "../utils/api/coinApi";

// 코인 정보

export interface TickerUSD {
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  market_cap: number;
}

export interface Ticker {
  id: string;
  name: string;
  symbol: string;
  quotes: {
    USD: TickerUSD;
  };
}

export const useTickersData = () => {
  return useQuery<Ticker[]>({
    queryKey: ["tickers"],
    queryFn: fetchTickers,
    staleTime: 1000 * 60,
  });
};
