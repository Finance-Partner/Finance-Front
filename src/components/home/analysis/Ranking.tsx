import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { selectedLedgerState } from "../../../atom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
`;

const Ranking = () => {
  const [spendingRank, setSpendingRank] = useState<number | null>(null);
  const token = localStorage.getItem("token");
  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const fetchSpendingRank = async () => {
      if (flId && flId.id && token) {
        try {
          const response = await axios.get(
            `http://43.201.7.157:8080/fl/rank/${flId.id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSpendingRank(response.data);
        } catch (error) {
          console.error("Error fetching the spending rank", error);
        }
      }
    };

    fetchSpendingRank();
  }, [flId, token]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%", // 홀의 크기를 줄여서 채워진 부분을 더 굵게 보이게 함
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "26px", // 폰트 크기를 더 크게 조정
            show: true,
            formatter: (val: number) => `${val}%`,
            offsetY: -10, // 채워진 부분의 위치를 조정
          },
        },
        track: {
          background: "#000000",
          strokeWidth: "100%", // 트랙의 굵기를 조정
          margin: 5, // margin is in pixels
        },
      },
    },
    fill: {
      colors: ["#0090ff"], // 파란색으로 설정
    },
    labels: ["Spending Rank"],
  };

  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <Title>
          {spendingRank !== null ? `상위 ${spendingRank}%의 지출입니다!` : ""}
        </Title>
      </div>
      {spendingRank !== null ? (
        <ApexCharts
          options={chartOptions}
          series={[spendingRank]}
          type="radialBar"
          height="100%"
        />
      ) : (
        <p></p>
      )}
    </Wrapper>
  );
};

export default Ranking;
