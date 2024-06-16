import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
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
  font-size: 12px;
  font-weight: bold;
  height: 10%;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 90%;
`;

const MonthIncome = () => {
  const [data, setData] = useState({
    series: [
      {
        name: "수입",
        data: [] as number[],
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        toolbar: {
          show: false,
        },
      },
      colors: ["#1ED8AB"],
      xaxis: {
        categories: [] as string[],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth" as const,
      },
    },
  });

  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const last3Months = Array.from({ length: 3 }, (_, i) => {
          const date = new Date(currentYear, currentMonth - i - 1);
          return { year: date.getFullYear(), month: date.getMonth() + 1 };
        }).reverse();

        const incomeData: number[] = [];
        const categories: string[] = [];

        for (const { year, month } of last3Months) {
          const response = await axios.get(
            `http://43.201.7.157:8080/history/${flId.id}/${year}/${month}`,
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

          incomeData.push(income);
          categories.push(`${year}-${month}`);
        }

        setData((prevData) => ({
          ...prevData,
          series: [{ name: "수입", data: incomeData }],
          options: { ...prevData.options, xaxis: { categories } },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flId]);

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
