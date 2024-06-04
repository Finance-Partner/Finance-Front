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
  font-size:12px;
  font-weight: bold;
  height: 10%;
`;
const ChartContainer = styled.div`
  position: relative;
  top: 15px;
  height: 90%;
`;

const DonutChart = () => {
  const [data, setData] = useState({
    series: [5000, 3000], // [수입, 지출]
    options: {
      chart: {
        type: "donut" as const,
      },
      labels: ["수입", "지출"],
      colors: ["#1ED8AB", "#7763F4"], // 수입과 지출의 색상 설정
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false, // 범례 비활성화
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                formatter: function () {
                  return getLabel();
                },
              },
            },
          },
        },
      },
    },
  });
  const getLabel = () => {
    const [income, expenses] = data.series;
    return income > expenses
      ? `+${income - expenses}\u20A9`
      : `-${expenses - income}\u20A9`;
  };
  const getColor = () => {
    const [income, expenses] = data.series;
    return income > expenses ? "#1ED8AB" : "#7763F4";
  };
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "합계",
                  formatter: () => {
                    return getLabel();
                  },
                  style: {
                    fontSize: "6px", // 폰트 크기 변경
                    color: getColor(),
                  },
                },
              },
            },
          },
        },
      },
    }));
  }, [data.series]);

  return (
    <Wrapper>
      <div style={{ width: "100%", height: "100%" }}>
        <TitleContainer>이번 달 정산</TitleContainer>
        <ChartContainer>
          <Chart
            options={data.options}
            series={data.series}
            type="donut"
            width="100%" // 차트 너비를 부모의 너비에 맞춤
            height="100%" // 차트 높이를 부모의 높이에 맞춤
          />
        </ChartContainer>
      </div>
    </Wrapper>
  );
};

export default DonutChart;
