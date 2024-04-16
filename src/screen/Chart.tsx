import AnalisysChart from "../components/AnalysisChart";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0px 250px;
`;
const Chart = () => {
  return (
    <>
      <Wrapper>
        <AnalisysChart />
      </Wrapper>
    </>
  );
};
export default Chart;
