import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.h1`
  position: relative;
  top: 10px;
  text-align: center;
  font-weight: bold;
  height: 10%;
`;
const ChartContainer = styled.div`
  position: relative;
  bottom: 0px;
  height: 90%;
`;

const CategoryChart = () => {
  const colors = [
    "#FF6384",
    "#FFCE56",
    "#36A2EB",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];
  const [data] = useState({
    series: [
      {
        data: [21, 22, 10, 28, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar" as const,
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ["식비"],
          ["쇼핑"],
          ["카페 · 간식"],
          "교통",
          ["편의점 · 마트"],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  });

  return (
    <Wrapper>
      <div style={{ width: "100%", height: "100%" }}>
        <TitleContainer>이번 달 정산</TitleContainer>
        <ChartContainer>
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="100%" // 차트 너비를 부모의 너비에 맞춤
            height="100%" // 차트 높이를 부모의 높이에 맞춤
          />
        </ChartContainer>
      </div>
    </Wrapper>
  );
};

export default CategoryChart;
