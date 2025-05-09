export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const fetchCoins = async (): Promise<CoinInterface[]> => {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  if (!response.ok) {
    throw new Error("Failed to fetch coin list");
  }
  const data = await response.json();
  return data.slice(0, 100);
};
