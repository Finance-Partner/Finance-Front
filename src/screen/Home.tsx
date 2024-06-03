import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #7763f4;
  position: relative;
  overflow: hidden;
`;

const Circle = styled.div`
  position: absolute;
  right: -10vw;
  top: -10vw;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background-color: #f1956f;
  z-index: 1;
`;

const SecondCircle = styled.div`
  position: absolute;
  left: -55vw;
  top: -85vw;
  width: 140vw;
  height: 140vw;
  border-radius: 50%;
  background-color: none;
  border: 2px white solid;
  z-index: 1;
`;

const ThirdCircle = styled.div`
  position: absolute;
  right: -50vw;
  top: -75vw;
  width: 100vw;
  height: 100vw;
  border-radius: 50%;
  background-color: none;
  border: 2px solid white;
  z-index: 1;
`;

const Container = styled.div`
  display: grid;
  padding: 30px 30px;
  gap: 30px;
  grid-template-columns: 2fr 7fr;
  width: 90vw;
  height: 90vh;
  background-color: rgb(240, 240, 240);
  position: relative;
  border-radius: 30px;
  z-index: 2;
`;
const NavBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 30px;
`;
const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const DoubleIconContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;
const IconContaienr = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isActive ? "white" : "#7b7f85")};
  width: 6vw;
  height: 6vw;
  background-color: ${(props) => (props.isActive ? "#7763F4" : "white")};
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
`;
const Icon = styled.span<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: ${(props) => (props.isActive ? "white" : "#7b7f85")};
`;
const IconP = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  position: relative;
  top: 1px;
  width: 100%;
`;
const UserContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const UserImg = styled.img`
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
  background-color: black;
`;
const Home = () => {
  const dashboardMatch = useMatch("/dashboard");
  const householderdMatch = useMatch("/householder/:select");
  const budgetMatch = useMatch("/budget");
  const anaylsisMatch = useMatch("/analysis");
  const navigate = useNavigate();
  return (
    <div style={{ overflow: "hidden" }}>
      <Wrapper>
        <Circle />
        <SecondCircle />
        <ThirdCircle />
        <Container>
          <NavBar>
            {" "}
            <p
              style={{
                width: "100%",
                fontSize: "35px",
                textAlign: "center",
                marginTop: "15px",
                color: "#7763f4",
              }}
              className="material-symbols-outlined"
            >
              payments
            </p>
            <p
              style={{
                width: "100%",
                fontSize: "23px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Financial
              <br />
              Partners
            </p>
            <DoubleIconContainer>
              <IconContaienr
                onClick={() => navigate("/dashboard")}
                isActive={dashboardMatch != null}
              >
                <div>
                  <Icon
                    isActive={dashboardMatch != null}
                    className="material-symbols-outlined"
                  >
                    home
                  </Icon>
                  <IconP>대시보드</IconP>
                </div>
              </IconContaienr>
              <IconContaienr
                onClick={() => navigate("/householder/overview")}
                isActive={householderdMatch != null}
              >
                <div>
                  <Icon
                    isActive={householderdMatch != null}
                    className="material-symbols-outlined"
                  >
                    credit_card
                  </Icon>
                  <IconP>가계부</IconP>
                </div>
              </IconContaienr>
            </DoubleIconContainer>
            <DoubleIconContainer>
              <IconContaienr
                onClick={() => navigate("/budget")}
                isActive={budgetMatch != null}
              >
                <div>
                  <Icon
                    isActive={budgetMatch != null}
                    className="material-symbols-outlined"
                  >
                    savings
                  </Icon>
                  <IconP>예산</IconP>
                </div>
              </IconContaienr>
              <IconContaienr
                onClick={() => navigate("/analysis")}
                isActive={anaylsisMatch != null}
              >
                <div>
                  <Icon
                    isActive={anaylsisMatch != null}
                    className="material-symbols-outlined"
                  >
                    bar_chart
                  </Icon>
                  <IconP>분석</IconP>
                </div>
              </IconContaienr>
            </DoubleIconContainer>
            <UserContainer>
              <UserImg />
            </UserContainer>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              김웹소
            </p>
            <div
              style={{
                marginTop: "5px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#7B7F85",
                      fontSize: "32px",
                    }}
                    className="material-symbols-outlined"
                  >
                    settings
                  </p>
                  <p style={{ fontSize: "10px", textAlign: "center" }}>설정</p>
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#7B7F85",
                      fontSize: "32px",
                    }}
                    className="material-symbols-outlined"
                  >
                    logout
                  </p>
                  <p style={{ fontSize: "10px", textAlign: "center" }}>
                    로그아웃
                  </p>
                </div>
              </div>
            </div>
          </NavBar>
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Home;
