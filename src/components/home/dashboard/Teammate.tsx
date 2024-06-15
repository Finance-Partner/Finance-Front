import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerIdState } from "../../../atom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Number = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;
const Img = styled.img`
  position: relative;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7763f4;
  margin-left: 5px;
`;

const Teammate = () => {
  const [teamSize, setTeamSize] = useState(0);
  const [userImages, setUserImages] = useState<string[]>([]);
  const flId = useRecoilValue(selectedLedgerIdState);

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
              flId: flId,
            },
          }
        );
        setTeamSize(response.data.length);
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
          <Number>{teamSize}명</Number>
          <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
            {userImages.map((src, index) => (
              <Img key={index} src={src} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Teammate;
