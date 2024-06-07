import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState } from "../../../atom";

// Define the expected data type
interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const categoryDisplayNames: { [key: string]: string } = {
  SALARY: "월급",
  INTEREST: "이자",
  MEAL: "식사",
  SHOPPING: "쇼핑",
  CAFE_SNACK: "카페 · 간식",
  TRANSPORT: "교통",
  CONVSTORE_MART: "편의점 · 마트",
  ETC: "기타",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  overflow: auto; /* Add this line */
`;

const Table = styled.table`
  width: 95%;
  margin-top: 20px;
  border-collapse: collapse;
  overflow: auto; /* Add this line */
`;

const Th = styled.th`
  text-align: center;
  border-bottom: 1px solid black;
  padding: 8px;
  background-color: white;
  font-weight: bold;
  padding-bottom: 15px;
`;

const Td = styled.td`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  vertical-align: middle;
`;

const BtnTd = styled.td`
  text-align: center;
  padding-top: 5px;
  font-size: 30px;
  vertical-align: middle;
`;

const Button = styled.span`
  color: black;
  cursor: pointer;
  background-color: white;
  border: none;
`;

const EditInput = styled.input`
  text-align: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  padding-bottom: 5px;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
`;
const EditSelect = styled.select`
  text-align: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  padding-bottom: 5px;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
`;

const Detail = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Transaction | null>(null);
  const flId = useRecoilValue(householderIdState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://43.201.7.157:8080/history/${flId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const sortedData = response.data.sort(
            (a: Transaction, b: Transaction) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setData(sortedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token, flId]);

  const handleDelete = (historyId: number) => {
    axios
      .delete(`http://43.201.7.157:8080/history`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          historyId: historyId,
        },
      })
      .then((response) => {
        setData((prevData) => prevData.filter((item) => item.id !== historyId));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleEdit = (item: Transaction) => {
    setEditId(item.id);
    setEditFormData({ ...item });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editFormData) {
      const { id, date, amount, content, category, isIncome } = editFormData;
      const [year, month, day] = date.split("-");
      axios
        .patch(`http://43.201.7.157:8080/history`, null, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            historyId: id,
            year: year,
            month: month,
            day: day,
            amount: amount,
            content: content,
            category: category,
            isIncom: isIncome,
          },
        })
        .then((response) => {
          setData((prevData) =>
            prevData.map((item) => (item.id === id ? editFormData : item))
          );
          setEditId(null);
          setEditFormData(null);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  return (
    <>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <Th>분류</Th>
              <Th>날짜</Th>
              <Th>금액</Th>
              <Th>카테고리</Th>
              <Th>작성자</Th>
              <Th>메모</Th>
              <Th>수정</Th>
              <Th>삭제</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <Td>
                  {editId === item.id ? (
                    <EditSelect
                      name="isIncome"
                      value={editFormData?.isIncome}
                      onChange={handleEditChange}
                    >
                      <option value="INCOME">수입</option>
                      <option value="EXPENDITURE">지출</option>
                    </EditSelect>
                  ) : (
                    <span
                      style={{
                        color:
                          item.isIncome === "INCOME" ? "#1ED8AB" : "#7763F4",
                      }}
                    >
                      {item.isIncome === "INCOME" ? "수입" : "지출"}
                    </span>
                  )}
                </Td>
                <Td>
                  {editId === item.id ? (
                    <EditInput
                      type="date"
                      name="date"
                      value={editFormData?.date}
                      onChange={handleEditChange}
                    />
                  ) : (
                    new Date(item.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )}
                </Td>
                <Td>
                  {editId === item.id ? (
                    <EditInput
                      type="number"
                      name="amount"
                      value={editFormData?.amount}
                      onChange={handleEditChange}
                    />
                  ) : (
                    `${item.amount.toLocaleString()}원`
                  )}
                </Td>
                <Td>
                  {editId === item.id ? (
                    <EditSelect
                      name="category"
                      value={editFormData?.category}
                      onChange={handleEditChange}
                    >
                      {Object.entries(categoryDisplayNames).map(
                        ([key, displayName]) => (
                          <option key={key} value={key}>
                            {displayName}
                          </option>
                        )
                      )}
                    </EditSelect>
                  ) : (
                    categoryDisplayNames[item.category]
                  )}
                </Td>
                <Td>김웹소</Td> {/* Static author name as in the example */}
                <Td>
                  {editId === item.id ? (
                    <EditInput
                      type="text"
                      name="content"
                      value={editFormData?.content}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item.content
                  )}
                </Td>
                <BtnTd>
                  {editId === item.id ? (
                    <Button
                      className="material-symbols-outlined"
                      onClick={handleSave}
                    >
                      save
                    </Button>
                  ) : (
                    <Button
                      className="material-symbols-outlined"
                      onClick={() => handleEdit(item)}
                    >
                      edit
                    </Button>
                  )}
                </BtnTd>
                <BtnTd>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="material-symbols-outlined"
                  >
                    delete
                  </Button>
                </BtnTd>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
};

export default Detail;
