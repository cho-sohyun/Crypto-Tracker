import { Link, useLocation, useParams } from "react-router-dom";

interface RouteState {
  name: string;
}

// 해당 코인 정보 (현재 가격, 시가총액, 거래량, 최고가)
// 실시간 가격, 전일대비 얼마 상승?
// 가격 차트 (1시간, 1일 ~ 1개월 전체)
// 일별로 가격 정보 ?
// 코인 정보 소개 or 거래 상승률 Top10 (부가적인 기능)

const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as { state: RouteState };
  console.log(state?.name);
  console.log(coinId);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">
        <button className="btn btn-sm">
          <Link to="/">돌아가기</Link>
        </button>
        <h1 className="text-3xl font-bold">{state?.name || "Loading..."}</h1>
      </main>
    </div>
  );
};

export default Coin;
