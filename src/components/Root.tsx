import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;
const TitleLogo = styled.span`
  padding-top: 5px;
  padding-right: 10px;
  font-size: 30px;
`;
const UserIcon = styled.span`
  font-size: 30px;
`;
const Root = () => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 27px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TitleLogo className="material-symbols-outlined">payments</TitleLogo>
          <Title>Financial Partners</Title>
        </div>
        <div>
          <UserIcon className="material-symbols-outlined">person</UserIcon>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Root;
