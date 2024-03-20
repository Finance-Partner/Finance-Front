import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CombineContainer = styled.div`
  width: 88vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
    gap:10px;
`;

const Source = () => {
  return (
    <>
      <Wrapper>
        <CombineContainer>
          <Container>sdf</Container>
          <Container>sdf</Container>
        </CombineContainer>
      </Wrapper>
    </>
  );
};
export default Source;
