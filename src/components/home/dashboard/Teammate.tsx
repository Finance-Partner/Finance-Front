import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";
import profileImg from "../../../img/basicUserImg.png";
import crownImg from "../../../img/crownImg.png";
import moreBtn from "../../../img/moreBtn.png";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-left: 2.5em;
`;

const NumberWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: flex-end;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Number = styled.h1<{ isFour: boolean }>`
  font-size: 60px;
  font-weight: bold;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Img = styled.img<{ size: number }>`
  position: relative;
  top: 10px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin-left: 5px;
`;

const CrownWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: 55%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Crown = styled.img`
  width: 20px;
  height: 20px;
`;


interface TeammateInfo {
  userId: number;
  name: string;
  photo: string;
  head: boolean;
}

const Teammate = () => {
  const [flUserInfo, setFlUserInfo] = useState<TeammateInfo[]>([]);
  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const fetchTeamData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/fl/users`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              flId: flId.id,
            },
          }
        );
        setFlUserInfo(response.data);
        // Assuming you have user images, you can set them here
        // setUserImages(response.data.map(user => user.imageUrl)); // If user has imageUrl property
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [flId]);

  return (
    <Wrapper>
      <div>
        <Title>팀원 명단</Title>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <NumberWrapper>
            <Number isFour={flUserInfo.length >= 4}>{flUserInfo.length}</Number>
            <span style={{ fontSize: "20px", fontWeight: "bold", marginBottom:"0.5em" }}>명</span>
          </NumberWrapper>

          <ImgWrapper>
            {flUserInfo.slice(0, 3).map((ledger, index) => (
              <div key={index} style={{ position: "relative" }}>
                {index === 0 && ledger.head && (
                  <CrownWrapper>
                    <Crown src={crownImg} alt="crown" />
                  </CrownWrapper>
                )}
                <Img
                  src={ledger.photo ? ledger.photo : profileImg}
                  size={40 - index * 6}
                />
              </div>
            ))}
            {flUserInfo.length >= 4 && (
              <Img size={40} src={moreBtn} />
            )}
          </ImgWrapper>
        </div>
      </div>
    </Wrapper>
  );
};

export default Teammate;
