import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";

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
  font-size: 13px;
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

  const [data, setData] = useState({
    series: [
      {
        data: [] as number[],
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
          "식사",
          "쇼핑",
          "카페 · 간식",
          "교통",
          "편의점 · 마트",
          "기타",
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

  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const token = localStorage.getItem("token");
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

        const expenditures = response.data.filter(
          (item: any) => item.isIncome === "EXPENDITURE"
        );

        const categoryTotals: { [key: string]: number } = {
          "식비": 0,
          "쇼핑": 0,
          "카페 · 간식": 0,
          "교통": 0,
          "편의점 · 마트": 0,
          "기타": 0,
        };

        expenditures.forEach((item: any) => {
          switch (item.category) {
            case "MEAL":
              categoryTotals["식비"] += item.amount;
              break;
            case "SHOPPING":
              categoryTotals["쇼핑"] += item.amount;
              break;
            case "CAFE_SNACK":
              categoryTotals["카페 · 간식"] += item.amount;
              break;
            case "TRANSPORT":
              categoryTotals["교통"] += item.amount;
              break;
            case "CONVSTORE_MART":
              categoryTotals["편의점 · 마트"] += item.amount;
              break;
            case "ETC":
              categoryTotals["기타"] += item.amount;
              break;
            default:
              break;
          }
        });

        setData((prevData) => ({
          ...prevData,
          series: [
            {
              data: Object.values(categoryTotals),
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoryData();
  }, [flId]);

  return (
    <Wrapper>
      <div style={{ width: "100%", height: "100%" }}>
        <TitleContainer>이번 달 정산</TitleContainer>
        <ChartContainer>
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="100%"
            height="100%"
          />
        </ChartContainer>
      </div>
    </Wrapper>
  );
};

export default CategoryChart;
