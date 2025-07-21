import "./App.css";
import { Route, Routes } from "react-router-dom";
import CoinPage from "./pages/Detail/CoinPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
      </Route>
    </Routes>
  );
}

export default App;
