import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  width: 30vw;
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
      <Container>
        <div>
          <h1>Login</h1>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Register
            </span>
          </p>
        </div>
        <Form onSubmit={handleSubmit(onValid)}>
          <p>Email</p>
          <input {...register("email", { required: true })} />
          <p>Password</p>
          <input
            {...register("password", { required: true })}
            type="password"
          />
          <button>Login</button>
        </Form>
      </Container>
    </>
  );
};
export default Login;
