import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  width: 88vw;
  padding: 25px 20px;
`;

const TitleContainer = styled.div`
  font-size: 23px;
  font-weight: bold;
  p {
    font-size: 13px;
    font-weight: 200;
    color: ${(props) => props.theme.subTextColor};
  }
  padding-bottom: 30px;
`;
const SubTitleContainer = styled.div`
  width: 50%;
  font-size: 18px;
  font-weight: bold;
  p {
    padding-top: 5px;
    font-size: 15px;
    font-weight: 200;
    color: ${(props) => props.theme.subTextColor};
  }
`;

const Total = () => {
  return (
    <>
      {" "}
      <Wrapper>
        <Container>
          <TitleContainer>
            <p>Household Details</p>
            <div>View your household details</div>
          </TitleContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginBottom: "10px",
            }}
          >
            <SubTitleContainer>
              <div>Spending</div>
              <p>$2389.00</p>
            </SubTitleContainer>
            <SubTitleContainer>
              <div>Income</div>
              <p>$1454.00</p>
            </SubTitleContainer>
          </div>
          <SubTitleContainer>
            <div>Gross Margin</div>
            <p>$986.00</p>
          </SubTitleContainer>
        </Container>
      </Wrapper>
    </>
  );
};
export default Total;
