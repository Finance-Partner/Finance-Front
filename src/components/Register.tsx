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

// Properly typing the media queries helper function
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (first: TemplateStringsArray, ...interpolations: any[]) => css`
    @media (max-width: ${sizes[label as keyof Sizes]}px) {
      ${css(first, ...interpolations)};
    }
  `;
  return acc;
}, {} as Record<string, (first: TemplateStringsArray, ...interpolations: any[]) => ReturnType<typeof css>>);

const BigContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 70vw;
  height: 80vh;
  ${media.desktop`width: 80vw; height: 90vh;`}
  ${media.tablet`flex-direction: column; width: 90vw; height: auto; padding: 20px;`}
  ${media.phone`flex-direction: column; width: 95vw; padding: 10px;`}
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 30px;
  ${media.tablet`width: 100%; height: auto; padding-left: 0; padding: 20px;`}
  ${media.phone`width: 100%; padding: 10px;`}
`;

const Form = styled.form`
  width: 85%;
  padding-top: 20px;
  ${media.tablet`width: 100%;`}
  ${media.phone`width: 100%; padding-top: 10px;`}
`;

const ContextInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid
    ${(props: { theme: { borderColor: string } }) => props.theme.borderColor};
  ${media.phone`height: 35px;`}
`;

const SubmitBtn = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: ${(props: { theme: { buttonTextColor: string } }) =>
    props.theme.buttonTextColor};
  background-color: ${(props: { theme: { buttonColor: string } }) =>
    props.theme.buttonColor};
  ${media.phone`height: 35px;`}
`;

const EmailButton = styled.button`
  background-color: ${(props: { theme: { buttonColor: string } }) =>
    props.theme.buttonColor};
  color: ${(props: { theme: { buttonTextColor: string } }) =>
    props.theme.buttonTextColor};
  width: 50%;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  ${media.phone`height: 25px; width: 60%;`}
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [emailToggle, setEmailToggle] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IRegisterForm>();

  interface IRegisterForm {
    name: string;
    email: string;
    password1: string;
    password2: string;
    birthday: string;
    certification: string;
  }
  const onEmailHandler = () => {
    const { email } = getValues();
    axios
      .post("http://43.201.7.157:8080/email/sending", "", {
        params: {
          email: email,
        },
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        alert("이메일 전송");
        setEmailToggle(true);
        setErrorMessage(""); // 이메일 전송 성공 시 에러 메시지 초기화
      })
      .catch((error) => {
        console.error("이메일 전송 실패:", error);
        setErrorMessage("이메일 전송에 실패했습니다. 다시 시도해주세요."); // 에러 발생 시 에러 메시지 설정
      });
  };
  const onEmailCheck = () => {
    const { email, certification } = getValues();
    axios
      .post("http://43.201.7.157:8080/email/verify", null, {
        params: {
          email: email,
          verifyCode: certification,
        },
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("응답 데이터:", response.data);
        if (response.data.result === "true") {
          setIsCertificate(true);
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };
  const onValid = async (data: IRegisterForm) => {
    const { name, email, password1, password2, birthday } = getValues();
    if (password1 !== password2) {
      alert("비밀번호가 같지 않습니다.");
      //setError 사용코드
      return;
    }
    if (isCertificate === false) {
      alert("이메일 인증을 완료하셔야 합니다.");
      //setError 사용코드
      return;
    }
    const params = {
      email: email,
      password: password1,
      name: name,
      birthday: birthday,
    };
    try {
      await axios.post("http://43.201.7.157:8080/user", null, {
        params: params,
        headers: {
          accept: "application/json",
        },
      });
      console.log("회원가입 성공");

      // 로그인 요청
      const loginResponse = await axios.post(
        "http://43.201.7.157:8080/login",
        null,
        {
          params: {
            email: email,
            password: password1,
          },
          headers: {
            accept: "application/json",
          },
        }
      );
      console.log("로그인 성공:", loginResponse.data);

      // 토큰을 localStorage에 저장
      localStorage.setItem("token", loginResponse.data.token);

      // 대시보드로 이동
      navigate("/home/dashboard");
      setErrorMessage(""); // 에러 메시지 초기화
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("유효하지 않은 회원가입입니다."); // 에러 발생 시 에러 메시지 설정
    }
  };
  const onError = (errors: Object) => {
    console.log("error has occured", errors);
  };
  return (
    <>
      <BigContainer>
        <Container style={{ borderRight: "1px solid black" }}>
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
            <img
              src={logo}
              alt=""
              style={{ marginRight: "10px", width: "100px" }}
            />
            <p style={{ fontSize: "50px" }}>MOAYO</p>
          </h1>
        </Container>
        <Container
          style={{
            paddingTop: "6vh",
            paddingLeft: "5vw",
            paddingRight: "2vw",
            borderLeft: "1px solid black",
          }}
        >
          <div>
            <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>회원가입</h1>
            <p>
              이미 계정이 있으십니까?{" "}
              <span
                onClick={() => navigate("/auth/login")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                로그인
              </span>
            </p>
          </div>
          <Form onSubmit={handleSubmit(onValid, onError)}>
            <p style={{ fontWeight: "bold" }}>이름</p>
            <ContextInput
              style={{ marginTop: "5px" }}
              {...register("name", { required: true })}
            />
            <p style={{ fontWeight: "bold" }}>비밀번호</p>
            <ContextInput
              style={{ marginTop: "5px" }}
              {...register("password1", { required: true })}
              type="password"
            />
            <p style={{ fontWeight: "bold" }}>비밀번호 확인</p>
            <ContextInput
              style={{ marginTop: "5px" }}
              {...register("password2", { required: true })}
              type="password"
            />
            <p style={{ fontWeight: "bold" }}>이메일</p>
            <ContextInput
              style={{ marginTop: "5px" }}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "유효하지 않은 이메일 형식입니다",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <EmailButton type="button" onClick={() => onEmailHandler()}>
              인증 메일 보내기
            </EmailButton>
            <br />
            {emailToggle && (
              <div style={{ marginTop: "10px" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "black",
                    marginBottom: "10px",
                  }}
                >
                  이메일 전송 완료!
                </span>
                <br />
                <ContextInput {...register("certification")} />
                <EmailButton type="button" onClick={() => onEmailCheck()}>
                  인증하기
                </EmailButton>
                {isCertificate && (
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "green",
                    }}
                  >
                    이메일 인증 성공!
                  </span>
                )}
              </div>
            )}
            <SubmitBtn>회원가입</SubmitBtn>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </Container>
      </BigContainer>
    </>
  );
};
export default Register;
