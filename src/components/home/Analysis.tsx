import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import AnalysisCategoryChart from "./analysis/AnalysisCategoryChart";
import { useRecoilState } from "recoil";
import { householderIdState, selectedLedgerState } from "../../atom";
import Ranking from "./analysis/Ranking";
import WordCloudComponent from "./analysis/WordCloud";

const BigWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: transparent;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: space-between;
  background-color: transparent;
  padding: 0px;
  border-radius: 20px;
`;

const Card = styled.div<{ first?: boolean; last?: boolean }>`
  background-color: white;
  padding: 20px;
  padding-left: ${(props) => (props.first ? "0px" : "20px")};
  padding-right: ${(props) => (props.last ? "0px" : "20px")};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 32%;
`;

interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const Analysis: React.FC = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [incomeSeries, setIncomeSeries] = useState<{ x: string; y: number }[]>(
    []
  );
  const [expenditureSeries, setExpenditureSeries] = useState<
    { x: string; y: number }[]
  >([]);
  const [netSeries, setNetSeries] = useState<{ x: string; y: number }[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenditure, setTotalExpenditure] = useState<number>(0);
  const token = localStorage.getItem("token");
  const [flId, setFlId] = useRecoilState(selectedLedgerState);

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
    const filteredData = data.filter((transaction) =>
      dayjs(transaction.date).isAfter(oneMonthAgo)
    );

    const incomeData = filteredData
      .filter((transaction) => transaction.isIncome === "INCOME")
      .map((transaction) => ({ x: transaction.date, y: transaction.amount }));
    const expenditureData = filteredData
      .filter((transaction) => transaction.isIncome === "EXPENDITURE")
      .map((transaction) => ({ x: transaction.date, y: transaction.amount }));

    const netData: { x: string; y: number }[] = [];
    const allDates = Array.from(
      new Set([
        ...incomeData.map((d) => d.x),
        ...expenditureData.map((d) => d.x),
      ])
    );

    allDates.forEach((date) => {
      const totalIncomeForDate = incomeData
        .filter((d) => d.x === date)
        .reduce((sum, curr) => sum + curr.y, 0);
      const totalExpenditureForDate = expenditureData
        .filter((d) => d.x === date)
        .reduce((sum, curr) => sum + curr.y, 0);
      netData.push({
        x: date,
        y: totalIncomeForDate - totalExpenditureForDate,
      });
    });

    setIncomeSeries(incomeData);
    setExpenditureSeries(expenditureData);
    setNetSeries(netData);
    setTotalIncome(incomeData.reduce((acc, item) => acc + item.y, 0));
    setTotalExpenditure(expenditureData.reduce((acc, item) => acc + item.y, 0));
  }, [data]);

  const incomeOptions: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#dce6ec"],
    stroke: {
      curve: "straight",
    },
    markers: {
      size: incomeSeries.length === 1 ? 5 : 0,
    },
    title: {
      text: `₩ ${totalIncome.toLocaleString()}`,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "수입",
      align: "center",
      style: {
        fontSize: "14px",
        color: "#6c757d",
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const expenditureOptions: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#dce6ec"],
    stroke: {
      curve: "straight",
    },
    markers: {
      size: expenditureSeries.length === 1 ? 5 : 0,
    },
    title: {
      text: `₩ ${totalExpenditure.toLocaleString()}`,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "지출",
      align: "center",
      style: {
        fontSize: "14px",
        color: "#6c757d",
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const netOptions: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#dce6ec"],
    stroke: {
      curve: "straight",
    },
    markers: {
      size: netSeries.length === 1 ? 5 : 0,
    },
    title: {
      text: `₩ ${(totalIncome - totalExpenditure).toLocaleString()}`,
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "(수입-지출)",
      align: "center",
      style: {
        fontSize: "14px",
        color: "#6c757d",
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <BigWrapper>
      <div style={{ height: "30%" }}>
        <Wrapper>
          <Card first>
            <ReactApexChart
              options={incomeOptions}
              series={[{ name: "Income", data: incomeSeries }]}
              type="area"
              height="100%"
            />
          </Card>
          <Card>
            <ReactApexChart
              options={expenditureOptions}
              series={[{ name: "Expenditure", data: expenditureSeries }]}
              type="area"
              height="100%"
            />
          </Card>
          <Card last>
            <ReactApexChart
              options={netOptions}
              series={[{ name: "Net", data: netSeries }]}
              type="area"
              height="100%"
            />
          </Card>
        </Wrapper>
      </div>

      <div style={{ width: "100%", height: "35%", display: "flex" }}>
        <div style={{ width: "50%", height: "100%" }}>
          <AnalysisCategoryChart />
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: "20px",
            marginLeft: "20px",
          }}
        >
          <Ranking />
        </div>
      </div>
      <div style={{ height: "35%", width: "100", paddingTop: "2%" }}>
        <WordCloudComponent />
      </div>
    </BigWrapper>
  );
};

export default Analysis;
