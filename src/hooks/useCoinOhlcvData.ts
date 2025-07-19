import { useQuery } from "@tanstack/react-query";
import { fetchCoinOhlcv } from "../utils/api/ohlcvApi";

export interface OhlcvData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export const useCoinOhlcvData = (coinId: string) => {
  return useQuery<OhlcvData[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinOhlcv(coinId),
    enabled: !!coinId, // coinId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};
