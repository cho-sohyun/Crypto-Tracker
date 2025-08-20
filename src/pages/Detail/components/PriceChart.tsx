import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { OhlcvData } from "../../../hooks/useCoinOhlcvData";

// 일자별 차트
// 그래프 막대 호버시 가격 정보 (고가, 저가, 종가)
// 그래프 넓이 줄이기

interface CoinChartProps {
  ohlcvData?: OhlcvData[];
}

const CoinChart: React.FC<CoinChartProps> = ({ ohlcvData }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.dataset.theme;
    setIsDark(theme === "dark");

    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.dataset.theme;
      setIsDark(newTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!ohlcvData) return <p>차트 데이터를 불러올 수 없습니다.</p>;

  const candleSeries = ohlcvData.map((item) => ({
    x: new Date(item.time_close * 1000),
    y: [
      parseFloat(item.open),
      parseFloat(item.high),
      parseFloat(item.low),
      parseFloat(item.close),
    ],
  }));

  const lineSeries = ohlcvData.map((item) => ({
    x: new Date(item.time_close * 1000),
    y: parseFloat(item.close),
  }));

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      toolbar: { show: true },
      background: isDark ? "#1f2937" : "#ffffff",
    },
    title: {
      text: "가격 차트",
      align: "left",
      style: {
        color: isDark ? "#f9fafb" : "#1f2937",
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: isDark ? "#f9fafb" : "#1f2937" } },
      axisBorder: { color: isDark ? "#f9fafb" : "#1f2937" },
      axisTicks: { color: isDark ? "#f9fafb" : "#1f2937" },
    },
    yaxis: {
      title: {
        text: "가격 ($)",
        style: { color: isDark ? "#f9fafb" : "#1f2937" },
      },
      labels: { style: { colors: isDark ? "#f9fafb" : "#1f2937" } },
      tooltip: { enabled: true },
    },
    tooltip: {
      shared: true,
      theme: isDark ? "dark" : "light",
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const ohlc =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
        const [open, high, low, close] = ohlc;
        return `
          <div style="padding:6px; color:${isDark ? "#f9fafb" : "#1f2937"}">
            <strong>${new Date(
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].x
            ).toLocaleDateString()}</strong><br/>
            시가: $${open.toLocaleString()} <br />
            고가: $${high.toLocaleString()} <br />
            저가: $${low.toLocaleString()} <br />
            종가: $${close.toLocaleString()}
          </div>
        `;
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: isDark ? "#3B82F6" : "#EF4444", // 상승
          downward: isDark ? "#F97316" : "#3B82F6", // 하락
        },
        wick: { useFillColor: true },
      },
    },
  };

  const series = [
    {
      type: "candlestick" as const,
      data: candleSeries,
    },
    {
      type: "line" as const,
      data: lineSeries,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={400}
    />
  );
};

export default CoinChart;
