// import { Link } from "react-router-dom";
import { useCoinData } from "../../hooks/useCoinData";
import { useTickersData } from "../../hooks/useTickerData";

// 코인 리스트
// 가격, 24시간 변동률, 거래량
// 코인 검색

const Home = () => {
  const { data: coins = [], isLoading, isError } = useCoinData();
  const { data: tickers = [] } = useTickersData();
  console.log(tickers);

  const getTickerById = (coinId: string) =>
    tickers.find((t) => t.id === coinId);

  return (
    <main className="flex-1">
      <section className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">코인 리스트</h1>
            <p className="text-sm mt-2">
              실시간 가격, 시가총액, 거래량 등 암호화폐 시장 정보를 확인하세요.
            </p>
          </div>
          <div className="w-full md:w-auto relative">
            <button className="absolute left-2.5 top-2.5 h-4 w-4" />
            <input
              type="search"
              placeholder="코인 검색..."
              className="w-full md:w-[250px] pl-8"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          {isLoading && (
            <span className="loading loading-spinner text-primary"></span>
          )}
          {isError && <p>데이터 로딩 실패</p>}

          {!isLoading && !isError && (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>코인</th>
                  <th>가격</th>
                  <th>24시간 변동률</th>
                  <th>시가총액</th>
                  <th>거래량(24h)</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => {
                  const ticker = getTickerById(coin.id);
                  const price = ticker?.quotes?.USD?.price?.toFixed(2) ?? "N/A";
                  const change =
                    ticker?.quotes?.USD?.percent_change_24h?.toFixed(2) ??
                    "N/A";
                  const volume =
                    ticker?.quotes?.USD?.volume_24h?.toFixed(2) ?? "N/A";
                  const marketCap =
                    ticker?.quotes?.USD.market_cap?.toFixed(2) ?? "N/A";

                  return (
                    <tr key={coin.id}>
                      <td>{index + 1}</td>
                      <td className="flex items-center gap-2">
                        <img
                          src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                          alt={coin.name}
                          className="w-6 h-6"
                        />
                        {coin.name}
                      </td>
                      <td>${price}</td>
                      <td>{change}%</td>
                      <td>{marketCap}</td>
                      <td>{volume}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
