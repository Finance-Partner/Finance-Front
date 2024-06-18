import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 10px 27px;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;
const TitleLogo = styled.span`
  padding-top: 5px;
  padding-right: 10px;
  font-size: 30px;
`;
const Icon = styled.span`
  font-size: 30px;
  padding-top: 5px;
  padding-right: 10px;
  cursor: pointer;
`;
const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default Root;
