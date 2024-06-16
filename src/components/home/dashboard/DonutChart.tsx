import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";
import { formatNumberWithCommas } from "../../utils";

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
  font-size: 12px;
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
    series: [0, 0], // [수입, 지출] 초기값 설정
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
                label: "합계",
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

  const flId = useRecoilValue(selectedLedgerState);

  const getLabel = () => {
    const [income, expenses] = data.series;
    return income > expenses
      ? `+${formatNumberWithCommas(income - expenses)}원`
      : `-${formatNumberWithCommas(expenses - income)}원`;
  };

  const getColor = () => {
    const [income, expenses] = data.series;
    return income > expenses ? "#1ED8AB" : "#7763F4";
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      // Get current year and month
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함

      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/history/${flId.id}/${currentYear}/${currentMonth}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const income = response.data
          .filter((item: any) => item.isIncome === "INCOME")
          .reduce((acc: number, item: any) => acc + item.amount, 0);
        const expenses = response.data
          .filter((item: any) => item.isIncome === "EXPENDITURE")
          .reduce((acc: number, item: any) => acc + item.amount, 0);

        setData((prevData) => ({
          ...prevData,
          series: [income, expenses],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flId]);

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
                    fontSize: "6px", // 폰트 크기 변경 (원하는 크기로 조정)
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
