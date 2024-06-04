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
  color: #1ED8AB;
  span {
    font-size: 18px;
    color: #1ED8AB;
  }
`;

const FixIncome = () => {
  return (
    <Wrapper>
      <div>
        <Title>월 고정 수입</Title>
        <Income>
          79,000<span>KR</span>
        </Income>
      </div>
    </Wrapper>
  );
};
export default FixIncome;
