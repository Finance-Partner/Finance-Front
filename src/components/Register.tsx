import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

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
`;
const ContextInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const SubmitBtn = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.buttonTextColor};
  background-color: ${(props) => props.theme.buttonColor};
`;
const EmailButton = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.buttonTextColor};
  width: 50%;
  height: 30px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
const SDatePicker = styled(DatePicker)`
  width: 30vw;
  padding-left: 10px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const Register = () => {
  const navigate = useNavigate();
  const [emailToggle, setEmailToggle] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isCertificate, setIsCertificate] = useState(false);
  const { register, handleSubmit, getValues, setValue } =
    useForm<IRegisterForm>();

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
    const response = axios.post("http://43.201.7.157:8080/email/sending", "", {
      params: {
        email: email,
      },
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    alert("이메일 전송");
    setEmailToggle((prev) => true);
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
  const onValid = (data: IRegisterForm) => {
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
    axios
      .post("http://43.201.7.157:8080/user", null, {
        params: params,
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onError = (errors: Object) => {
    console.log("error has occured", errors);
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
            paddingTop: "6vh",
            paddingLeft: "5vw",
            paddingRight: "2vw",
            borderLeft: "1px solid black",
          }}
        >
          <div>
            <h1>회원가입</h1>
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
            <p>이름</p>
            <ContextInput {...register("name", { required: true })} />
            <p>비밀번호</p>
            <ContextInput
              {...register("password1", { required: true })}
              type="password"
            />
            <p>비밀번호 확인</p>
            <ContextInput
              {...register("password2", { required: true })}
              type="password"
            />
            <p>이메일</p>
            <ContextInput {...register("email", { required: true })} />
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
                  Email sent completed!
                </span>
                <br />
                <ContextInput {...register("certification")} />
                <EmailButton type="button" onClick={() => onEmailCheck()}>
                  Submit certification
                </EmailButton>
              </div>
            )}
            <SubmitBtn>회원가입</SubmitBtn>
          </Form>
        </Container>
      </BigContainer>
    </>
  );
};
export default Register;
