import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedLedgerState } from "../../atom";
import { useState } from "react";
import axios from "axios";
import basicUserImg from "../../img/basicUserImg.png";

const ModalTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%; /* Adjust width based on button width */
  -webkit-appearance: none; /* Remove number input arrow on Chrome/Safari */
  -moz-appearance: textfield; /* Remove number input arrow on Firefox */
`;

const AddButton = styled.button`
  width: 20%;
  padding: 10px;
  font-size: 14px;
  background-color: #7763f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
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
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;

  align-items: center;
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  vertical-align: middle; /* Vertical align center */
`;

const SearchedUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
`;

const SearchedUserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const NoResultMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-weight: bold;
`;

const CurrentMembersTitle = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
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
  isSearch: boolean;
  searchUser: SearchedUserInfo | null;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchUser: React.Dispatch<React.SetStateAction<SearchedUserInfo | null>>;
}

const InviteUserForm: React.FC<EditLedgerFormProps> = ({
  showModal,
  modalType,
  flUserInfo,
  isSearch,
  searchUser,
  setIsSearch,
  setSearchUser,
}) => {
  // 유저 초대 관련 상태
  const [inputEmail, setInputEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [fl, setFl] = useRecoilState(selectedLedgerState);

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
      const response = await axios.get(`http://43.201.7.157:8080/emailtoname`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: inputEmail,
        },
      });

      // Assuming the response contains the new member info
      setSearchUser(response.data);
      setIsSearch(true);
      setInviteEmail(inputEmail);
      setInputEmail("");
    } catch (error) {
      console.error("Error searching member:", error);
    }
  };

  return (
    <>
      <ModalTitle>
        멤버 초대하기 - "{fl.name}" 가계부
        <hr />
      </ModalTitle>
      <div style={{ display: "flex", alignItems: "center" }}>
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
          <SearchedUserContainer>
            <SearchedUserImg
              src={searchUser.photo ? searchUser.photo : basicUserImg}
              alt="유저사진"
            />
            <span>{searchUser.name}</span>
            <AddButton onClick={handleInvite} style={{ marginLeft: "auto" }}>
              초대
            </AddButton>
          </SearchedUserContainer>
        ) : (
          isSearch && <NoResultMessage>검색 결과가 없습니다!</NoResultMessage>
        )}
      </div>
      <hr />
      <CurrentMembersTitle>현재 멤버</CurrentMembersTitle>
      <hr />
      <MemberTable>
        <tbody>
          {flUserInfo.map((member) => (
            <Tr key={member.userId}>
              <Td>
                <img
                  src={member.photo ? member.photo : basicUserImg}
                  alt={member.name}
                  width="20"
                  height="20"
                  style={{ borderRadius: "50%" }}
                />
              </Td>
              <Td>{member.name}</Td>
              <Td>{member.head ? "방장" : "파티원"}</Td>
            </Tr>
          ))}
        </tbody>
      </MemberTable>
    </>
  );
};

export default InviteUserForm;
