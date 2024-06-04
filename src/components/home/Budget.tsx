import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
`;
const GridItem1 = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left:30px;
  border-radius: 20px;
`;
const GridItem2 = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const Item1 = styled(GridItem1)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;
const Item2 = styled(GridItem1)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;
const Item3 = styled(GridItem2)`
  grid-column: 1 / 2;
  grid-row: 2 / 5;
`;
const Item4 = styled(GridItem2)`
  grid-column: 2 / 3;
  grid-row: 2 / 5;
`;
const Title = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Price = styled.p<{ isIncome: boolean }>`
  font-size: 45px;
  font-weight: bold;
  color: ${(props) => (props.isIncome ? "#1ED8AB" : "#7763F4")};
  span {
    font-size: 20px;
  }
`;
const Budget = () => {
  return (
    <Wrapper>
      <Item1>
        <div>
          <Title>이번 달 지출</Title>
          <Price isIncome={false}>
            450,000<span>원</span>
          </Price>
        </div>
      </Item1>
      <Item2>
        <div>
          <Title>예산</Title>
          <Price isIncome={true}>
            1,000,000<span>원</span>
          </Price>
        </div>
      </Item2>
      <Item3>1행 3열</Item3>
      <Item4>1행 4열</Item4>
    </Wrapper>
  );
};
export default Budget;
