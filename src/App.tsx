import "./App.css";
import { Route, Routes } from "react-router-dom";
import Coin from "./routes/coin/Coin";
import Layout from "./layout/Layout";
import Home from "./routes/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":coinId" element={<Coin />} />
      </Route>
    </Routes>
  );
}

export default App;
