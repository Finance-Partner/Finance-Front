import React, { useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

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
  font-size:12px;
  font-weight: bold;
  height: 10%;
`;
const ChartContainer = styled.div`
  position: relative;
  height: 90%;
`;
const MonthIncome = () => {
  const [data] = useState({
    series: [
      {
        name: "수입",
        data: [30, 40, 35],
      },
    ],
    options: {
      chart: {
        type: "line" as const, // 문자열 리터럴로 지정
        toolbar: {
          show: false,
        },
      },
      colors: ["#1ED8AB"], // 선 색깔 설정 (예: 주황색)
      xaxis: {
        categories: ["Mar", "Apr", "May"],
      },
      yaxis: {
        labels: {
          show: false, // y축 레이블 숨기기
        },
      },
      stroke: {
        curve: "smooth" as const, // 문자열 리터럴로 지정
      },
    },
  });

  return (
    <Wrapper>
      <div style={{ width: "100%", height: "100%" }}>
        <TitleContainer>월별 수입 그래프</TitleContainer>
        <ChartContainer>
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            width="100%"
            height="100%"
          />
        </ChartContainer>
      </div>
    </Wrapper>
  );
};

export default MonthIncome;
