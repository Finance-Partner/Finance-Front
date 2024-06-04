import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  font-size: 13px;
  font-weight: bold;
`;
const Income = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #7763f4;
  span {
    font-size: 18px;
    color: #7763f4;
  }
`;

const FixExpense = () => {
  return (
    <Wrapper>
      <div>
        <Title>월 고정 지출</Title>
        <Income>
          69,000<span>KR</span>
        </Income>
      </div>
    </Wrapper>
  );
};
export default FixExpense;
