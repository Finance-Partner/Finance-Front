import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Ledger } from "../../atom";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddButton = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: #7763f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

interface CreateLedgerFormProps {
  getUserInfo: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateLedgerForm:React.FC<CreateLedgerFormProps> = ({ getUserInfo, setShowModal }) => {
  const [newFlName, setNewFlName] = useState("");
  const [newBudget, setNewBudget] = useState(0);
  const token = localStorage.getItem("token");

  const handleAddFlList = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://43.201.7.157:8080/fl`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            budget: newBudget,
            title: newFlName,
          },
        }
      );

      setNewFlName("");
      setNewBudget(0);
      setShowModal(false);
      getUserInfo();
    } catch (error) {
      console.error("Error adding fixed expense:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleAddFlList}>
      <Input
        type="text"
        placeholder="이름"
        value={newFlName}
        onChange={(e) => setNewFlName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="가계부 예산"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
        required
      />
      <AddButton type="submit">가계부 생성</AddButton>
    </FormContainer>
  );
};

export default CreateLedgerForm;
