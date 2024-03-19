import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
`;

const Home = () => {
  return (
    <>
      <Container>
        <div>
          <div>Household Details</div>
          <div>View your household details</div>
        </div>
      </Container>
    </>
  );
};
export default Home;
