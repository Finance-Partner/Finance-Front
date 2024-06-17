import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";

// 타입 정의
interface RadioLabelProps {
  selected: boolean;
}

// 스타일 컴포넌트 정의
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const Label = styled.label`
  width: 40%;
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
`;
const RadioContainer = styled.div`
  width: 100%;
`;
const RadioGroup = styled.div`
  display: flex;
`;

const RadioInput = styled.input`
  display: none;
`;
const RadioLabelContainer = styled.label`
  display: block;
  margin-bottom: 20px;
`;
const RadioLabel = styled.span<RadioLabelProps>`
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "#6c63ff" : "transparent")};
  border-color: ${(props) => (props.selected ? "#6c63ff" : "#ccc")};
`;

const Select = styled.select`
  width: 100%;
  border: none;
  padding: 7px 0px;
  border-bottom: 1px #ccc solid;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px #ccc solid;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitForm: React.FC = () => {
  // 현재 날짜를 ISO 형식의 문자열로 변환
  const flId = useRecoilValue(selectedLedgerState);
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 상태 관리
  const [form, setForm] = useState({
    date: getCurrentDate(), // 기본 날짜를 현재 날짜로 설정
    amount: "",
    type: "지출",
    category: "",
    memo: "",
  });

  // 라디오 버튼 클릭 시 상태 업데이트
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, type: e.target.value });
  };

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.amount) {
      alert("금액을 입력해주세요.");
      return;
    }

    if (!form.category) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const [year, month, day] = form.date.split("-");
    const amount = parseInt(form.amount);
    const content = form.memo;
    const isCategory = form.category;
    const isIncome = form.type === "수입" ? "INCOME" : "EXPENDITURE";

    const token = localStorage.getItem("token");

    axios
      .post(`http://43.201.7.157:8080/history`, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          flId: flId.id,
          year: year,
          month: month,
          day: day,
          amount: amount,
          content: content,
          isCategory: isCategory,
          isIncome: isIncome,
        },
      })
      .then((response) => {
        alert("추가 완료!");
        console.log("Data saved successfully:", response.data);
        // 폼 상태를 초기화
        setForm({
          date: getCurrentDate(), // 기본 날짜를 현재 날짜로 재설정
          amount: "",
          type: "지출",
          category: "",
          memo: "",
        });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>날짜</Label>
          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="0원"
            style={{
              marginBottom: "40%",
              marginTop: "3%",
              fontWeight: "bold",
              fontSize: "30px",
            }}
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </FormGroup>
        <RadioContainer>
          <RadioGroup>
            <RadioLabelContainer>
              <RadioInput
                type="radio"
                name="type"
                value="지출"
                checked={form.type === "지출"}
                onChange={handleTypeChange}
              />
              <RadioLabel selected={form.type === "지출"}>지출</RadioLabel>
            </RadioLabelContainer>
            <RadioLabelContainer>
              <RadioInput
                type="radio"
                name="type"
                value="수입"
                checked={form.type === "수입"}
                onChange={handleTypeChange}
              />
              <RadioLabel selected={form.type === "수입"}>수입</RadioLabel>
            </RadioLabelContainer>
          </RadioGroup>
        </RadioContainer>
        <FormGroup>
          <Label>카테고리</Label>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="">⭐선택하세요⭐</option>
            <option value="SALARY">💸월급</option>
            <option value="INTEREST">💰이자</option>
            <option value="MEAL">🍽️식사</option>
            <option value="SHOPPING">🛒쇼핑</option>
            <option value="CAFE_SNACK">☕카페 · 간식</option>
            <option value="TRANSPORT">🚌교통</option>
            <option value="CONVSTORE_MART">🏪편의점 · 마트</option>
            <option value="ETC">🎸기타</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>메모</Label>
          <Input
            placeholder="메모를 입력해주세요"
            type="text"
            name="memo"
            value={form.memo}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">작성 완료</Button>
      </form>
    </FormContainer>
  );
};

export default SubmitForm;
