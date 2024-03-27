import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CombineContainer = styled.div`
  width: 88vw;
  display: grid;
  grid-template-columns: 1fr 30px 1fr;
  margin-bottom: 30px;
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  gap: 10px;
  h1 {
    padding: 20px 20px;
    font-size: 23px;
    font-weight: bold;
  }
  button {
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 20px;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    font-size: 15px;
  }
`;
const DetailsContainer = styled.div`
  width: 100%;
  padding: 0px 30px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
const SubTitle = styled.p`
  color: ${(props) => props.theme.subTextColor};
  font-weight: bold;
  padding-top: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;
const SourceContent = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  padding-top: 15px;
`;
const AmountContent = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
`;
const Icon = styled.span`
  padding-right: 20px;
  padding-top: 5px;
  font-size: 25px;
  font-weight: 250;
  cursor: pointer;
`;
const Source = () => {
  return (
    <>
      <Wrapper>
        <CombineContainer>
          <Container>
            <h1>Income Sources</h1>
            <button style={{ cursor: "pointer" }}>Add Income</button>
            <DetailsContainer>
              <SubTitle>Source</SubTitle>
              <SubTitle>Amount</SubTitle>
              <SourceContent>Salary</SourceContent>
              <AmountContent>
                <span>$5000</span>
                <div>
                  <Icon className="material-symbols-outlined">edit</Icon>
                  <Icon className="material-symbols-outlined">delete</Icon>
                </div>
              </AmountContent>
              <SourceContent>Salary</SourceContent>
              <AmountContent>
                <span>$5000</span>
                <div>
                  <Icon className="material-symbols-outlined">edit</Icon>
                  <Icon className="material-symbols-outlined">delete</Icon>
                </div>
              </AmountContent>
            </DetailsContainer>
          </Container>
          <div></div>
          <Container>
            <h1>Spending</h1>
            <button style={{ cursor: "pointer" }}>Add Spending</button>
            <DetailsContainer>
              <SubTitle>Item</SubTitle>
              <SubTitle>Amount</SubTitle>
              <SourceContent>Groceries</SourceContent>
              <AmountContent>
                <span>$200</span>
                <div>
                  <Icon className="material-symbols-outlined">edit</Icon>
                  <Icon className="material-symbols-outlined">delete</Icon>
                </div>
              </AmountContent>
              <SourceContent>Groceries</SourceContent>
              <AmountContent>
                <span>$200</span>
                <div>
                  <Icon className="material-symbols-outlined">edit</Icon>
                  <Icon className="material-symbols-outlined">delete</Icon>
                </div>
              </AmountContent>
            </DetailsContainer>
          </Container>
        </CombineContainer>
      </Wrapper>
    </>
  );
};
export default Source;
