import styled from "styled-components";

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
  background-color: #7763F4;
  margin-left:5px;
`;
const Teammate = () => {
  return (
    <Wrapper>
      <div>
        <Title>팀원 명단</Title>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Number>4명</Number>
          <div style={{ gap: "10px", marginLeft: "10px" }}>
            <Img />
            <Img />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Teammate;
