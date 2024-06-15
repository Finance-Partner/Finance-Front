import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerIdState } from "../../../atom";

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

const MonthExpense = () => {
  const [data, setData] = useState({
    series: [
      {
        name: "지출",
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
      colors: ["#7763F4"],
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

  const flId = useRecoilValue(selectedLedgerIdState);

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

        const expenseData: number[] = [];
        const categories: string[] = [];

        for (const { year, month } of last3Months) {
          const response = await axios.get(
            `http://43.201.7.157:8080/history/${flId}/${year}/${month}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const expenses = response.data
            .filter((item: any) => item.isIncome === "EXPENDITURE")
            .reduce((acc: number, item: any) => acc + item.amount, 0);

          expenseData.push(expenses);
          categories.push(`${year}-${month}`);
        }

        setData((prevData) => ({
          ...prevData,
          series: [{ name: "지출", data: expenseData }],
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
        <TitleContainer>월별 지출 그래프</TitleContainer>
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

export default MonthExpense;
