import { Link, useLocation, useParams } from "react-router-dom";

interface RouteState {
  name: string;
}
const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as { state: RouteState };
  console.log(state?.name);

  return (
    <div className="min-h-screen flex flex-col">
      Coin : {coinId}
      <main className="flex-1">
        <button className="btn btn-sm">
          <Link to="/">돌아가기</Link>
        </button>
        <h1 className="text-3xl font-bold">{state?.name || "Loading..."}</h1>
      </main>
    </div>
  );
};

export default Coin;
