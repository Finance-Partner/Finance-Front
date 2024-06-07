import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { formatNumberWithCommas } from "../../utils";
import { householderIdState } from "../../../atom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  font-size: 13px;
  font-weight: bold;
`;
const Income = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #1ED8AB;
  span {
    font-size: 18px;
    color: #1ED8AB;
  }
`;

const FixIncome = () => {
  const [fixedIncome, setFixedIncome] = useState(0);
  const flId = useRecoilValue(householderIdState);

  useEffect(() => {
    const fetchFixedIncome = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/fl/info?flId=${flId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const incomeData = response.data.fixedInfo2;
        const totalIncome = incomeData
          .filter((item: any) => item.isIncome)
          .reduce((acc: number, item: any) => acc + item.amount, 0);

        setFixedIncome(totalIncome);
      } catch (error) {
        console.error("Error fetching fixed income:", error);
      }
    };

    fetchFixedIncome();
  }, [flId]);

  return (
    <Wrapper>
      <div>
        <Title>월 고정 수입</Title>
        <Income>
          {formatNumberWithCommas(fixedIncome)}<span>KR</span>
        </Income>
      </div>
    </Wrapper>
  );
};

export default FixIncome;
