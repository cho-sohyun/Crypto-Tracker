import { Link, useLocation, useParams } from "react-router-dom";
import { useCoinOhlcvData } from "../../hooks/useCoinOhlcvData";
import CoinChart from "./components/PriceChart";
import { useTickersData } from "../../hooks/useTickerData";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const {
    data: ohlcvData,
    isLoading,
    isError,
  } = useCoinOhlcvData(coinId || "");

  // 상승률 top 10용
  const { data: tickers } = useTickersData();

  const top10 =
    tickers
      ?.sort(
        (a, b) =>
          b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h
      )
      .slice(0, 10) || [];

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
        <h1 className="mt-4 text-3xl font-bold flex items-center">
          <img
            src={`https://static.coinpaprika.com/coin/${coinId}/logo.png`}
            alt={state?.name || "coin logo"}
            className="w-8 h-8 mr-2"
          />
          {state?.name || "Loading..."}
        </h1>

        {/* 로딩 중 */}
        {isLoading && (
          <p className="mt-6 text-gray-500">데이터를 불러오는 중입니다...</p>
        )}

        {/* 에러 처리 */}
        {isError && (
          <p className="mt-6 text-gray-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}

        {!isLoading && !isError && currentPrice && (
          <div className="mt-2 space-y-2">
            <p className="text-4xl font-bold"> $ {currentPrice}</p>
            <p
              className={`text-sm font-semibold ${
                isPositive ? "text-red-500" : "text-blue-500"
              }`}
            >
              전일 대비: {isPositive ? "+" : ""}${priceChangeValue} (
              {priceChangePercent}%)
            </p>

            {/* 차트 렌더링 */}
            <div className="mt-8">
              <CoinChart ohlcvData={ohlcvData} />
            </div>

            {/* 시세 테이블 + 상승률 TOP10 */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 일자별 시세 테이블 */}
              <div className="lg:col-span-2">
                <table className="w-full text-sm border-t border-b border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-gray-500 font-medium">
                        날짜
                      </th>
                      <th className="px-2 py-1  text-gray-500 font-medium">
                        시가
                      </th>
                      <th className="px-2 py-1  text-gray-500 font-medium">
                        등락폭
                      </th>
                      <th className="px-2 py-1  text-gray-500 font-medium">
                        변동률
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ohlcvData
                      ?.slice()
                      .sort(
                        (a, b) =>
                          new Date(b.time_open).getTime() -
                          new Date(a.time_open).getTime()
                      )
                      .map((d, i) => {
                        const open = parseFloat(d.open);
                        const close = parseFloat(d.close);
                        const changeValue = close - open;
                        const changePercent = (changeValue / open) * 100;

                        const date = new Date(d.time_open * 1000);
                        const dateStr = `${
                          date.getMonth() + 1
                        }/${date.getDate()}`;

                        return (
                          <tr key={i} className="border-b border-gray-200">
                            <td className="px-2 py-4 text-center">{dateStr}</td>

                            <td className="px-2 py-4 text-center">
                              {open.toFixed(2)}
                            </td>
                            <td
                              className={`px-2 py-4 text-center ${
                                changeValue >= 0
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {changeValue >= 0 ? "+" : ""}
                              {changeValue.toFixed(2)}
                            </td>
                            <td
                              className={`px-2 py-4 text-center ${
                                changePercent >= 0
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {changePercent >= 0 ? "+" : ""}
                              {changePercent.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* 상승률 top 10 */}
              <div>
                <div className="bg-gray-50 p-4">
                  <h2 className="p-4 text-lg font-semibold">
                    코인 상승률 TOP 10
                  </h2>
                  <ul>
                    {top10.map((coin) => (
                      <li
                        key={coin.id}
                        onClick={() =>
                          navigate(`/coin/${coin.id}`, {
                            state: { name: coin.name },
                          })
                        }
                        className="flex items-center justify-between py-4 px-2 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <img
                            src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                            alt={state?.name || "coin logo"}
                            className="w-8 h-8 mr-2"
                          />
                          <span className="font-medium">{coin.name}</span>
                        </div>

                        <span
                          className={`font-semibold  ${
                            coin.quotes.USD.percent_change_24h > 0
                              ? "text-red-500"
                              : "text-blue-500"
                          }`}
                        >
                          {coin.quotes.USD.percent_change_24h.toFixed(2)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Coin;
