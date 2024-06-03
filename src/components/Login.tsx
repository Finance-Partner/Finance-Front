import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
const BigContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 70vw;
  height: 80vh;
`;
const Container = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 30px;
  h1 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const Form = styled.form`
  width: 85%;
  padding-top: 20px;
  p {
    font-weight: 600;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  input {
    padding-left: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
  button {
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    font-weight: bold;
    color: ${(props) => props.theme.buttonTextColor};
    background-color: ${(props) => props.theme.buttonColor};
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<ILoginForm>();
  console.log(localStorage.getItem("token"));
  interface ILoginForm {
    email: string;
    password: string;
  }
  const onValid = () => {
    const url = "http://43.201.7.157:8080/login";
    const { email, password } = getValues();
    axios
      .post("http://43.201.7.157:8080/login", null, {
        params: {
          email: email,
          password: password,
        },
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        //save token in recoilToken
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <BigContainer>
        <Container style={{ borderRight: "1px solid black" }}>
          <h1
            onClick={() => navigate("/preview")}
            style={{
              cursor:"pointer",
              width: "100%",
              height: "100%",
              paddingRight: "3vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{ fontSize: "80px", marginRight: "20px" }}
              className="material-symbols-outlined"
            >
              payments
            </p>
            <p style={{ fontSize: "50px" }}>
              Financial <br />
              Partners
            </p>
          </h1>
        </Container>
        <Container
          style={{
            paddingTop: "17vh",
            paddingLeft: "5vw",
            borderLeft: "1px solid black",
          }}
        >
          <div>
            <h1>로그인</h1>
            <p>
              계정이 없으신가요?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                회원가입
              </span>
            </p>
          </div>
          <Form onSubmit={handleSubmit(onValid)}>
            <p>이메일</p>
            <input {...register("email", { required: true })} />
            <p>비밀번호</p>
            <input
              {...register("password", { required: true })}
              type="password"
            />
            <button>로그인</button>
          </Form>
        </Container>
      </BigContainer>
    </>
  );
};
export default Login;
