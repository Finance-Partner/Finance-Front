import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 20px;
  padding-top: 15px;
  padding-bottom: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const AnalysisCategoryChart: React.FC = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [expenditureSeries, setExpenditureSeries] = useState<number[]>([]);
  const [expenditureLabels, setExpenditureLabels] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Transaction[]>(
          `http://43.201.7.157:8080/history/${flId.id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (flId && flId.id) {
      fetchData();
    }
  }, [flId, token]);

  useEffect(() => {
    const oneMonthAgo = dayjs().subtract(1, "month");
    const filteredData = data.filter(
      (transaction) =>
        dayjs(transaction.date).isAfter(oneMonthAgo) &&
        transaction.isIncome === "EXPENDITURE"
    );

    const categoryMap: { [key: string]: number } = {};
    filteredData.forEach((transaction) => {
      if (categoryMap[transaction.category]) {
        categoryMap[transaction.category] += transaction.amount;
      } else {
        categoryMap[transaction.category] = transaction.amount;
      }
    });

    setExpenditureSeries(Object.values(categoryMap));
    setExpenditureLabels(Object.keys(categoryMap));
  }, [data]);

  const expenditureOptions: ApexOptions = {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    labels: expenditureLabels.map((label) => {
      switch (label) {
        case "MEAL":
          return "식사";
        case "CAFE_SNACK":
          return "카페 · 간식";
        case "TRANSPORT":
          return "교통";
        case "SHOPPING":
          return "쇼핑";
        case "CONVSTORE_MART":
          return "편의점 · 마트";
        case "ETC":
          return "기타";
        default:
          return label;
      }
    }),
    title: {
      text: "카테고리 별 지출",
      align: "left",
      style: {
        fontSize: "22px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "left",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `₩ ${val.toLocaleString()}`,
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Wrapper>
        <Card>
          <ReactApexChart
            options={expenditureOptions}
            series={[{ name: "Expenditure", data: expenditureSeries }]}
            type="radar"
            width="100%"
            height="105%"
          />
        </Card>
      </Wrapper>
    </div>
  );
};

export default AnalysisCategoryChart;
