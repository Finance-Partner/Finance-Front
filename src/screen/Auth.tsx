import styled from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";
import { Outlet } from "react-router-dom";
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 70vh;
  justify-content: center;
  align-items: center;
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
