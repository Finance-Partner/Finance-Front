import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import image from "../img/mainimage.png";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 10px 27px;
  margin-bottom: 20px;
  height: 10%;
`;
const NavTitle = styled.h1`
  font-size: 15px;
  font-weight: bold;
  padding-top: 5px;
`;
const NavTitleLogo = styled.span`
  color: #917fff;
  padding-top: 5px;
  padding-right: 20px;
  font-size: 40px;
`;
const LoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6e5fce;
  color: white;
  border: none;
  width: 90px;
  height: 35px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
  margin-right: 15px;
  cursor: pointer;
`;
const FContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 690px;
  background-image: linear-gradient(to right, #5144a6, #917fff);
`;
const SContainer = styled.div`
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Title = styled.h1`
  color: white;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 70px;
`;
const SubTitle = styled.h2`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;
const MoveToTopBtn = styled.button`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  bottom: 10px;
  right: 10px;
  border: 2px solid #917fff;
`;
const Main = () => {
  const navigate = useNavigate();
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };
  return (
    <>
      <MoveToTopBtn
        onClick={handleScrollToTop}
        className="material-symbols-outlined"
      >
        arrow_upward
      </MoveToTopBtn>
      <NavBar>
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <NavTitleLogo className="material-symbols-outlined">
            payments
          </NavTitleLogo>
          <NavTitle>
            Financial
            <br />
            Partners
          </NavTitle>
        </div>
        <div>
          <LoginBtn onClick={() => navigate("/auth/login")}>로그인</LoginBtn>
        </div>
      </NavBar>
      <FContainer>
        <div>
          <Title>
            고객 만족 1위
            <br /> 공유 가계부 플랫폼
          </Title>
          <SubTitle>
            나 혼자 쓰는 가계부? NO!
            <br />
            다 함께 가계부를 관리하세요.
            <br />
            내일부터는 나도 재벌 1세
          </SubTitle>
        </div>
        <div>
          <img
            style={{ paddingLeft: "10vw", position: "relative", top: "30px" }}
            src={image}
          />
        </div>
      </FContainer>
      <SContainer>
        <div style={{ width: "100%" }}>
          <h2
            style={{
              marginTop: "50px",
              color: "#0047FF",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            공유기능
          </h2>
          <h3
            style={{
              marginTop: "10px",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Finance Partner에서
            <br /> 다양한 사람들과 가계부를 작성해보세요.
          </h3>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "27vw",
                height: "300px",
                borderRadius: "20px",
                backgroundColor: "violet",
              }}
            ></div>
            <div
              style={{
                width: "57vw",
                height: "300px",
                borderRadius: "20px",
                backgroundColor: "lightblue",
              }}
            ></div>
          </div>
          <div
            style={{
              margin: "0 auto",
              marginTop: "20px",
              width: "85vw",
              height: "300px",
              borderRadius: "20px",
              backgroundColor: "darkviolet",
            }}
          ></div>
        </div>
      </SContainer>
    </>
  );
};

export default Main;
