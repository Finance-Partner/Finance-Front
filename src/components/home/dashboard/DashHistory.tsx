import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
const Container = styled.div`
  padding-top: 10px;
  padding-left: 15px;
`;
const CategoryImg = styled.img`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  margin-top: 5px;
`;
const Price = styled.p<{ isIncome: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isIncome ? "#1ED8AB" : "#7763F4")};
  font-weight: bold;
  margin-bottom: 3px;
`;
const Description = styled.p`
  font-size: 14px;
  color: #7b7f85;
  font-weight: bold;
`;
const DateContainer = styled.div`
  margin-bottom: 10px;
`;
const Date = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: #7b7f85;
`;
const DashHistory = () => {
  return (
    <Wrapper>
      <Title>내역</Title>
      <Container>
        <DateContainer>
          <Date>24.05.02</Date>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <CategoryImg />
            <div style={{ marginLeft: "10px" }}>
              <Price isIncome={false}>-8,000원</Price>
              <Description>친구랑 국밥</Description>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <CategoryImg />
            <div style={{ marginLeft: "10px" }}>
              <Price isIncome={false}>-32,000원</Price>
              <Description>쇼핑</Description>
            </div>
          </div>
        </DateContainer>
        <DateContainer>
          <Date>24.05.01</Date>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <CategoryImg />
            <div style={{ marginLeft: "10px" }}>
              <Price isIncome={true}>+2,320,000원</Price>
              <Description>월급</Description>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <CategoryImg />
            <div style={{ marginLeft: "10px" }}>
              <Price isIncome={false}>-22,000원</Price>
              <Description>큐빅 회식</Description>
            </div>
          </div>
        </DateContainer>
      </Container>
    </Wrapper>
  );
};

export default DashHistory;
