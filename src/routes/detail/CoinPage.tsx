import { Link, useLocation, useParams } from "react-router-dom";
import { useCoinOhlcvData } from "../../hooks/useCoinOhlcvData";

interface RouteState {
  name: string;
}
// 코인 상세
// 실시간 가격, 전일대비 얼마 상승? - 완
// 코인 그래프 (1시간, 1일 ~ 1개월 전체)
// 일별로 가격 정보 ?
// 해당 코인 정보 (현재 가격, 시가총액, 거래량, 최고가)
// 코인 정보 소개 or 거래 상승률 Top10 (부가적인 기능)

const Coin = () => {
  const { coinId } = useParams(); // url에서 coinId 추출
  const { state } = useLocation() as { state: RouteState };

  const {
    data: ohlcvData,
    isLoading,
    isError,
  } = useCoinOhlcvData(coinId || "");

  // 전일 대비 상승률 계산
  let currentPrice = null;
  let priceChangePercent = null;
  let priceChangeValue = null;

  if (ohlcvData && ohlcvData.length >= 2) {
    const todayClose = parseFloat(ohlcvData[ohlcvData.length - 1].close);
    const yesterdayClose = parseFloat(ohlcvData[ohlcvData.length - 2].close);

    currentPrice = todayClose.toFixed(2);

    const diff = todayClose - yesterdayClose;
    priceChangeValue = diff.toFixed(2);
    priceChangePercent = ((diff / yesterdayClose) * 100).toFixed(2);
  }

  const isPositive = priceChangeValue && parseFloat(priceChangeValue) >= 0;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">
        <button className="btn btn-sm">
          <Link to="/">돌아가기</Link>
        </button>
        <h1 className="text-3xl font-bold">{state?.name || "Loading..."}</h1>

        {/* 로딩 중 */}
        {isLoading && <p>데이터를 불러오는 중입니다...</p>}

        {/* 에러 처리 */}
        {isError && <p>데이터를 불러오는 중 오류가 발생했습니다.</p>}

        {!isLoading && !isError && currentPrice && (
          <div className="mt-6 space-y-2">
            <p className="text-4xl font-bold">현재가: $ {currentPrice}</p>
            <p
              className={`text-xl font-semibold ${
                isPositive ? "text-red-500" : "text-blue-500"
              }`}
            >
              전일 대비: {isPositive ? "+" : ""}${priceChangeValue} (
              {priceChangePercent}%)
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Coin;
