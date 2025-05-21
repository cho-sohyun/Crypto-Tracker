import { useQuery } from "@tanstack/react-query";
import { fetchTickers } from "../api/coinApi";

// export const useTickerData = (coinId: string) => {
//   return useQuery({
//     queryKey: ["ticker", coinId],
//     queryFn: fetchTickers,
//     staleTime: 1000 * 60,
//     enabled: !!coinId,
//   });
// };

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
