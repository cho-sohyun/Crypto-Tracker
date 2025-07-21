import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { OhlcvData } from "../../../hooks/useCoinOhlcvData";

// 일자별 차트
// 그래프 막대 호버시 가격 정보 (고가,저가,종가)
// 그래프 넓이 줄이기

interface CoinChartProps {
  ohlcvData?: OhlcvData[];
}

const CoinChart: React.FC<CoinChartProps> = ({ ohlcvData }) => {
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
      height: 400,
      type: "line", // 차트 전체 타입을 line으로 설정하고, 각 시리즈에 개별 타입 지정
      toolbar: { show: true },
    },
    title: {
      text: "가격 차트",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "가격 ($)",
        },
        tooltip: {
          enabled: true,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#EF4444",
          downward: "#3B82F6",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
  };

  const series = [
    {
      name: "가격 흐름",
      type: "candlestick" as const,
      data: candleSeries,
    },
    {
      name: "종가",
      type: "line" as const,
      data: lineSeries,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={400}
    />
  );
};

export default CoinChart;
