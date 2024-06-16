import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedLedgerState } from "../../atom";
import { useState } from "react";
import axios from "axios";
import basicUserImg from "../../img/basicUserImage.png";
import { error } from "console";

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  -webkit-appearance: none; /* Remove number input arrow on Chrome/Safari */
  -moz-appearance: textfield; /* Remove number input arrow on Firefox */
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

const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

interface TeammateInfo {
  userId: number;
  name: string;
  photo: string;
  head: boolean;
}

interface SearchedUserInfo {
  name: string;
  photo: string;
}

interface EditLedgerFormProps {
  showModal: boolean;
  modalType: string;
  flUserInfo: TeammateInfo[];
}


const InviteUserForm:React.FC<EditLedgerFormProps> = ({showModal, modalType, flUserInfo}) => {
  // 유저 초대 관련 상태
  const [inputEmail, setInputEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [fl, setFl] = useRecoilState(selectedLedgerState);
  const [searchUser, setSearchUser] = useState<SearchedUserInfo | null>();
  const [members, setMembers] = useState<TeammateInfo[]>(flUserInfo);
  const token = localStorage.getItem("token");

  const handleInvite = async () => {
    try {
      const response = await axios.post(
        `http://43.201.7.157:8080/fl/invite`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            email: inviteEmail,
            flId: fl.id,
          },
        }
      );

      // Assuming the response contains the new member info
      setInviteEmail("");
      alert("성공했습니다!");
    } catch (error) {
      console.error("Error inviting member:", error);
    }
  };

  const handleSearch = async () => {
    setSearchUser(null);
    try {
      const response = await axios.get(
        `http://43.201.7.157:8080/emailtoname`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            email: inputEmail,
          },
        }
      );
      
      // Assuming the response contains the new member info
      setSearchUser(response.data);
      setInviteEmail(inputEmail);
      setInputEmail("");
    } catch (error) {
      console.error("Error inviting member:", error);
    }
  };

  return (
    <>
      <ModalTitle>
        멤버 초대하기 - "{fl.name}" 가계부
        <hr />
      </ModalTitle>
      <div>
        <Input
          type="email"
          value={inputEmail}
          placeholder="초대할 유저의 이메일을 검색하세요"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <AddButton onClick={handleSearch}>검색</AddButton>
      </div>
      <div>
        {searchUser ? (
          <>
            <MemberTable>
                <Tr>
                  <Td>
                    <img style={{width: "50px", borderRadius: "50%"}} src={searchUser.photo ? searchUser.photo : basicUserImg} alt="유저사진" />
                  </Td>
                  <Td>
                    {searchUser.name}
                  </Td>
                  <Td>
                    <AddButton onClick={handleInvite}>초대</AddButton>
                  </Td>
                </Tr>

            </MemberTable>
          </>
        ) : (
          <>
            검색 결과가 없습니다!
          </>
        )}
      </div>
      <hr />
      <h3>현재 멤버</h3>
      <MemberTable>
      <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>사진</Th>
            <Th>역할</Th>
          </Tr>
        </Thead>
        <tbody>
          {flUserInfo.map((member) => (
            <Tr key={member.userId}>
              <Td>{member.name}</Td>
              <Td>
                <img src={member.photo ? member.photo : basicUserImg} alt={member.name} width="50" height="50" style={{ borderRadius: "50%" }} />
              </Td>
              <Td>
                {member.head ? "방장" : "파티원"}
              </Td>
            </Tr>
          ))}
        </tbody>
      </MemberTable>
      

    </>
  );
};

export default InviteUserForm;
