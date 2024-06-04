import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

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
  // 상태 관리
  const [form, setForm] = useState({
    date: "2024년 5월 23일",
    amount: "",
    type: "지출",
    category: "",
    merchant: "",
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
    console.log(form);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <div>{form.date}</div>
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="0원"
            style={{ marginBottom: "20%" }}
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
            <option value="">선택하세요</option>
            <option value="식비">식비</option>
            <option value="쇼핑">쇼핑</option>
            <option value="카페">카페</option>
            <option value="교통">교통</option>
            <option value="편의점">편의점</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>거래처</Label>
          <Input
            placeholder="거래처를 입력해주세요"
            type="text"
            name="merchant"
            value={form.merchant}
            onChange={handleChange}
          />
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
