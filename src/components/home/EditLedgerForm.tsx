import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Ledger, myManageFlListsState } from "../../atom";
import { useRecoilState } from "recoil";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const Input = styled.input`
//   padding: 10px;
//   font-size: 14px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

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

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f5f5f5;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
`;

const Button = styled.button<{ color?: string }>`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ color }) => color || "#7763f4"};
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px;
`;


interface EditLedgerFormProps {
  getUserInfo: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditLedgerForm:React.FC<EditLedgerFormProps> = ({ getUserInfo, setShowModal }) => {
  const [editFlName, setEditFlName] = useState("");
  const [editFlId, setEditFlId] = useState<number | null>(null);
  const token = localStorage.getItem("token");
  const [myManageFlLists, setMyManageFlLists] = useRecoilState(myManageFlListsState);

  const handleEditClick = (ledger: Ledger) => {
    setEditFlId(ledger.id);
    setEditFlName(ledger.name);
  };

  const handleSaveClick = async (ledger: Ledger) => {
    try {
      await axios.patch(
        `http://43.201.7.157:8080/fl`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            flId: ledger.id,
            title: editFlName,
          },
        }
      );

      setMyManageFlLists((prev) =>
        prev.map((item) =>
          item.id === ledger.id ? { ...item, name: editFlName } : item
        )
      );
      setEditFlId(null);
      getUserInfo();
    } catch (error) {
      console.error("Error editing fixed expense:", error);
    }
  };

  const handleDeleteClick = async (ledgerId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://43.201.7.157:8080/fl`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            flId: ledgerId,
          },
        });

        setMyManageFlLists((prev) => prev.filter((item) => item.id !== ledgerId));
        getUserInfo();
      } catch (error) {
        console.error("Error deleting fixed expense:", error);
      }
    }
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>수정</Th>
            <Th>삭제</Th>
          </Tr>
        </Thead>
        <tbody>
          {myManageFlLists.map((fl) => (
            <Tr key={fl.id}>
              <Td>
                {editFlId === fl.id ? (
                  <Input
                    type="text"
                    value={editFlName}
                    onChange={(e) => setEditFlName(e.target.value)}
                  />
                ) : (
                  fl.name
                )}
              </Td>
              <Td>
                {editFlId === fl.id ? (
                  <Button color="#4CAF50" onClick={() => handleSaveClick(fl)}>
                    저장
                  </Button>
                ) : (
                  <Button onClick={() => handleEditClick(fl)}>수정</Button>
                )}
              </Td>
              <Td>
                <Button color="#f44336" onClick={() => handleDeleteClick(fl.id)}>
                  삭제
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>

  );
};

export default EditLedgerForm;
