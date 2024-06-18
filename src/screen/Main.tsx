import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import image from "../img/mainimage.png";
import logo from "../img/moayoLogo2.png";
import img1 from "../img/pre1.png";
import img2 from "../img/pre2.png";
import img3 from "../img/pre3.png";
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 10px 27px;
  margin-bottom: 20px;
  height: 10%;
`;
const NavTitle = styled.h1`
  font-size: 20px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background-image: linear-gradient(to right, #5144a6, #917fff);
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 690px;
  }
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

  @media (max-width: 768px) {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
  }
  @media (max-width: 968px) {
    font-size: 33px;
    font-weight: bold;
    margin-bottom: 50px;
  }
`;
const SubTitle = styled.h2`
  color: white;
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
  @media (max-width: 968px) {
    font-size: 24px;
  }
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

const Img = styled.img`
  width: 350px;
  margin-left: 10vw;
  position: relative;
  top: 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 300px;
    top: 20px;
    margin-left: 0vw;
    margin-bottom: 5vw;
  }
  @media (max-width: 968px) {
    width: 300px;
    top: 20px;
    margin-left: 5vw;
    margin-bottom: 5vw;
  }
`;

const STitle = styled.h2`
  margin-top: 30px;
  color: #0047ff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const SSubTitle = styled.h3`
  margin-top: 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const SContent = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

`;

const SImgContainer = styled.div`
  width: 27vw;
  height: 300px;
  border-radius: 20px;
  background-color: violet;

  @media (max-width: 768px) {
    height: 170px;
  }
  @media (max-width: 968px) {
    height: 240px;
  }
`;

const SImgContainerTwo = styled.div`
  width: 57vw;
  height: 300px;
  border-radius: 20px;
  background-color: lightblue;

  
  @media (max-width: 768px) {
    height: 170px;
  }
  @media (max-width: 968px) {
    height: 240px;
  }

`;

const SImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const SImgSecondContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 85vw;
  height: 300px;
  border-radius: 20px;
  background-color: darkviolet;

  
  @media (max-width: 768px) {
    height: 200px;
  }

@media (max-width: 968px) {
    height: 280px;
  }
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
          <NavTitleLogo>
            <img src={logo} alt="logo" style={{ width: "100px" }} />
          </NavTitleLogo>

          <NavTitle>MOAYO</NavTitle>
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
          <Img src={image} />
        </div>
      </FContainer>
      <SContainer>
        <div style={{ width: "100%" }}>
          <STitle>공유 가계부</STitle>
          <SSubTitle>
            모아요에서
            <br /> 다양한 사람들과 가계부를 작성해보세요.
          </SSubTitle>
          <SContent>
            <SImgContainer>
              <SImg src={img3} />
            </SImgContainer>
            <SImgContainerTwo>
              <SImg src={img1} />
            </SImgContainerTwo>
          </SContent>
          <SImgSecondContainer>
            <SImg src={img2} />
          </SImgSecondContainer>
        </div>
      </SContainer>
    </>
  );
};

export default Main;
