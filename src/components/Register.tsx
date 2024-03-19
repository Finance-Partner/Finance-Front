import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<IRegisterForm>();
  interface IRegisterForm {
    name: string;
    email: string;
    password1: string;
    password2: string;
  }
  const onValid = () => {
    const url = "http://43.201.7.157:8080/login";
    const { name, email, password1, password2 } = getValues();
    axios
      .post("http://43.201.7.157:8080/login", null, {
        params: {
          email: email,
          password: password1,
        },
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <Form onSubmit={handleSubmit(onValid)}>
          <p>Name</p>
          <input {...register("name", { required: true })} />
          <p>Password</p>
          <input
            {...register("password1", { required: true })}
            type="password"
          />
          <p>Confirm Password</p>
          <input
            {...register("password2", { required: true })}
            type="password"
          />
          <p>Email</p>
          <input {...register("email", { required: true })} />
          <button>Login</button>
        </Form>
      </Container>
    </>
  );
};
export default Register;
