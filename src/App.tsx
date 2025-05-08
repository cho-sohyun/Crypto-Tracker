import "./App.css";
import { Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Layout from "./layout/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Coins />} />
      </Route>
      <Route path="/:coinId" element={<Coin />} />
    </Routes>
  );
}

export default App;
