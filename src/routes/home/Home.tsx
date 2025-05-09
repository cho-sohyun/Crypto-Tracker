import { Link } from "react-router-dom";
import { useCoinData } from "../../hooks/useCoinData";

const Home = () => {
  const { data: coins = [], isLoading, isError } = useCoinData();

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
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => (
                  <tr key={coin.id} className="hover:bg-base-300">
                    <th>{index + 1}</th>

                    <td className="flex items-center gap-2">
                      <img
                        src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                        className="w-6 h-6 flex items-center justify-center"
                      />

                      {coin.name}
                    </td>
                    <td>
                      <Link
                        to={`/${coin.id}`}
                        state={{ name: coin.name }}
                        className="text-blue-500 hover:underline"
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
