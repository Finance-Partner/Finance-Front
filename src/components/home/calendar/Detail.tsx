import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the expected data type
interface Transaction {
  id: number; // Ensure the id field is present
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
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
  font-size: 30px; /* Adjust size to match icons */
  vertical-align: middle; /* Ensure vertical alignment */
`;

const Button = styled.span`
  color: black;
  cursor: pointer;
  background-color: white;
  border: none;
`;

const Detail = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const token = localStorage.getItem("token");
  const flId = 1;

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
        // Update the state to remove the deleted item
        console.log("Delete successful:", response.data);
        setData((prevData) => prevData.filter((item) => item.id !== historyId));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

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
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [token, flId]); // Add dependencies

  return (
    <>
      <Wrapper>
        <div style={{ width: "94%" }}>
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
                  <Td
                    style={{
                      color: item.isIncome === "INCOME" ? "#1ED8AB" : "#7763F4",
                    }}
                  >
                    {item.isIncome === "INCOME" ? "수입" : "지출"}
                  </Td>
                  <Td>
                    {new Date(item.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Td>
                  <Td>{item.amount.toLocaleString()}원</Td>
                  <Td>{item.category}</Td>
                  <Td>김웹소</Td> {/* Static author name as in the example */}
                  <Td>{item.content}</Td>
                  <BtnTd>
                    <Button className="material-symbols-outlined">edit</Button>
                  </BtnTd>
                  <BtnTd>
                    <Button
                      onClick={() => {
                        handleDelete(item.id);
                        console.log(item.id);
                      }}
                      className="material-symbols-outlined"
                    >
                      delete
                    </Button>
                  </BtnTd>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Wrapper>
    </>
  );
};

export default Detail;
