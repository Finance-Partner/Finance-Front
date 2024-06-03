import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GridItem = styled.div`
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

const Overview = () => {
  return (
    <>
      <Wrapper>
        <Item1>1행 1열</Item1>
        <Item2>1행 2열</Item2>
        <Item3>1행 3열</Item3>
        <Item4>1행 4열</Item4>
        <Item5>1행 4열</Item5>
      </Wrapper>
    </>
  );
};
export default Overview;
