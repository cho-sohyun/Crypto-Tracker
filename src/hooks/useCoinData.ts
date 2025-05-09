import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api/coinApi";

export const useCoinData = () => {
  return useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    staleTime: 1000 * 60,
  });
};
