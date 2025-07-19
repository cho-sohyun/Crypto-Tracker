import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../utils/api/coinApi";

// 코인 리스트

export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const useCoinData = () => {
  return useQuery<CoinInterface[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    staleTime: 1000 * 60,
  });
};
