import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
`;
const GridItem = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:20px;
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
  grid-column: 4 / 5;
  grid-row: 1 / 2;
`;

const Item5 = styled(GridItem)`
  grid-column: 1 / 4;
  grid-row: 2 / 3;
`;
const Item6 = styled(GridItem)`
  grid-column: 4 / 5;
  grid-row: 2 / 4;
`;

const Item7 = styled(GridItem)`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
`;
const Item8 = styled(GridItem)`
  grid-column: 2 / 4;
  grid-row: 3 / 4;
`;
const DashBoard = () => {
  return (
    <Wrapper>
      <Item1>1행 1열</Item1>
      <Item2>1행 2열</Item2>
      <Item3>1행 3열</Item3>
      <Item4>1행 4열</Item4>
      <Item5>2행 1~3열</Item5>
      <Item6>2~3행 4열</Item6>
      <Item7>3행 1~1.5열</Item7>
      <Item8>3행 1.5~3열</Item8>
    </Wrapper>
  );
};
export default DashBoard;
