import styled from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";
import { Outlet } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #5144a6, #917fff);
`;

const Auth = () => {
  return (
    <>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
};
export default Auth;
