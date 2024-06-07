import styled from "styled-components";
import ReactCalendar from "./ReactCalendar";
import SubmitForm from "./SubmitForm";
import { formatNumberWithCommas } from "../../utils";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const Item1 = styled(GridItem)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;
const Item2 = styled(GridItem)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;
const Item3 = styled(GridItem)`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
`;
const Item4 = styled(GridItem)`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
`;

const Item5 = styled(GridItem)`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
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
const Overview = () => {
  return (
    <>
      <Wrapper>
        <Item1>
          <div>
            <Title>이번 달 수입</Title>
            <Price isIncome={true}>
              {formatNumberWithCommas(820000)}<span>원</span>
            </Price>
          </div>
        </Item1>
        <Item2>
          <div>
            <Title>이번 달 지출</Title>
            <Price isIncome={false}>
            {formatNumberWithCommas(450000)}<span>원</span>
            </Price>
          </div>
        </Item2>
        <Item3>
          <div>
            <Title>이번 달 정산</Title>
            <Price isIncome={true}>
              +{formatNumberWithCommas(320000)}<span>원</span>
            </Price>
          </div>
        </Item3>
        <Item4>
          <ReactCalendar />
        </Item4>
        <Item5>
          <SubmitForm />
        </Item5>
      </Wrapper>
    </>
  );
};
export default Overview;
