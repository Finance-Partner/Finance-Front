import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "../img/moayoLogo2.png";

interface Sizes {
  [key: string]: number;
}

const sizes: Sizes = {
  desktop: 1024,
  tablet: 768,
  phone: 576,
};

// Define the media queries helper with proper TypeScript types
const media = Object.keys(sizes).reduce((acc, key) => {
  acc[key] = (
    style: TemplateStringsArray | string,
    ...interpolations: any[]
  ) => css`
    @media (max-width: ${sizes[key as keyof Sizes]}px) {
      ${css(style as TemplateStringsArray, ...interpolations)}
    }
  `;
  return acc;
}, {} as Record<string, (style: TemplateStringsArray | string, ...interpolations: any[]) => ReturnType<typeof css>>);

const BigContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 70vw;
  height: 80vh;
  ${media.tablet`
    flex-direction: column;
    width: 90vw;
    height: auto;
    padding: 20px;
  `}
  ${media.phone`
    width: 100vw;
    padding: 10px;
  `}
`;

const Container = styled.div<{ borderRight?: boolean }>`
  width: 50%;
  height: 100%;
  padding-left: 30px;
  border-right: ${(props) => props.borderRight ? "1px solid black" : "none"};
  h1 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  ${media.tablet`
    width: 100%;
    padding: 20px 10px;
    border-right: none;
  `}
  ${media.phone`
    width: 100%;
    padding: 20px 10px;
    border-right: none;
  `}
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
  ${media.tablet`
    width: 100%;
  `}
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<ILoginForm>();
  const [errorMessage, setErrorMessage] = useState("");

  const onValid = () => {
    const { email, password } = getValues();
    axios.post("http://43.201.7.157:8080/login", null, {
      params: {
        email: email,
        password: password,
      },
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      navigate("/home/dashboard");
      localStorage.setItem("token", response.data.token);
      setErrorMessage(""); // 로그인 성공 시 에러 메시지 초기화
    })
    .catch((error) => {
      console.error("Error:", error);
      setErrorMessage("유효하지 않은 로그인입니다"); // 에러 발생 시 에러 메시지 설정
    });
  };

  return (
    <>
      <BigContainer>
        <Container borderRight={true}>
          <h1
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              paddingRight: "3vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="" style={{ marginRight: "10px", width: "100px" }}/>
            <p style={{ fontSize: "50px" }}>MOAYO</p>
          </h1>
        </Container>
        <Container>
          <div style={{marginTop:"18vh"}}>
            <h1>로그인</h1>
            <p>
              계정이 없으신가요? <span onClick={() => navigate("/auth/register")} style={{ textDecoration: "underline", cursor: "pointer" }}>
                회원가입
              </span>
            </p>
          </div>
          <Form onSubmit={handleSubmit(onValid)}>
            <p>이메일</p>
            <input {...register("email", { required: true })} />
            <p>비밀번호</p>
            <input {...register("password", { required: true })} type="password"/>
            <button>로그인</button>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </Container>
      </BigContainer>
    </>
  );
};

export default Login;
