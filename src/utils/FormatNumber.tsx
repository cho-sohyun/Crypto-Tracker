export const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`; // 10억 단위
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`; // 100만 단위
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`; // 1000 단위
  }
  return `$${value.toFixed(2)}`; // 1000 미만
};
