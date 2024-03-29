import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const Container = styled.div`
  width: 30vw;
  margin-top: 80px;
  h1 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const Form = styled.form`
  width: 100%;
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
    const response = axios.post("http://43.201.7.157:8080/email/verify", "", {
      params: {
        email: email,
        verifyCode: certification,
      },
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
  };
  const onValid = (data: IRegisterForm) => {
    const { name, email, password1, password2, birthday } = getValues();
    if (password1 !== password2) {
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
      <Container>
        <div>
          <h1>Register</h1>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/login")}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </div>
        <Form onSubmit={handleSubmit(onValid, onError)}>
          <p>Name</p>
          <ContextInput {...register("name", { required: true })} />
          <p>Password</p>
          <ContextInput
            {...register("password1", { required: true })}
            type="password"
          />
          <p>Confirm Password</p>
          <ContextInput
            {...register("password2", { required: true })}
            type="password"
          />
          <p>Email</p>
          <ContextInput {...register("email", { required: true })} />
          <EmailButton type="button" onClick={() => onEmailHandler()}>
            Send verification email
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
          <p>Birthday</p>
          <SDatePicker
            {...register("birthday", { required: true })}
            selected={date}
            onChange={(date: Date) => {
              setDate(date);
              const formattedDate = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`;
              setValue("birthday", formattedDate, { shouldValidate: true });
            }}
            locale={ko}
            maxDate={new Date()}
          />
          <SubmitBtn>Register</SubmitBtn>
        </Form>
      </Container>
    </>
  );
};
export default Register;
