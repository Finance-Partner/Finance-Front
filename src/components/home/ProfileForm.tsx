import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";
import { userInfoState, userInfoType } from "../../atom";
import { useRecoilValue } from "recoil";
import profileImg from "../../img/basicUserImg.png";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* 추가: 폼 컨테이너 내의 모든 요소를 가운데 정렬 */
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* 추가: 입력 필드의 너비를 100%로 설정 */
`;

const AddButton = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: #7763f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* 추가: 버튼의 너비를 100%로 설정 */
`;


const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 20px; /* 추가: 아래쪽 여백 추가 */
`;

interface ProfileFormProps {
  newUserName: string;
  setNewUserName: React.Dispatch<React.SetStateAction<string>>;
  newPwd: string;
  setNewPwd: React.Dispatch<React.SetStateAction<string>>;
  chkNewPwd: string;
  setChkNewPwd: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  getUserInfo: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  newUserName,
  setNewUserName,
  newPwd,
  setNewPwd,
  chkNewPwd,
  setChkNewPwd,
  file,
  handleFileChange,
  setShowModal,
  getUserInfo,
}) => {
  const token = localStorage.getItem("token");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName && newPwd && newPwd === chkNewPwd) {
      const updateResponse = await updateProfile(newUserName, newPwd);

      if (file) {
        await uploadProfilePhoto(file);
      }
      setShowModal(false);
      setNewUserName("");
      setNewPwd("");
      setChkNewPwd("");
    } else {
      console.error("Password mismatch or missing fields");
    }
  };

  const updateProfile = async (name: string, password: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://43.201.7.157:8080/user`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: name,
            password: password,
          },
        }
      );
      getUserInfo();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadProfilePhoto = async (img: File) => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      const token = localStorage.getItem("token");

      await axios.post(`http://43.201.7.157:8080/photo`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      getUserInfo();
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const userInfo = useRecoilValue<userInfoType | null>(userInfoState);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormContainer onSubmit={handleProfileSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <ImagePreview
        src={file ? URL.createObjectURL(file) : userInfo?.photo || profileImg}
        alt="Profile"
        onClick={handleImageClick}
      />
      <Input
        type="text"
        placeholder="이름"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="새 비밀번호"
        value={newPwd}
        onChange={(e) => setNewPwd(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="새 비밀번호 확인"
        value={chkNewPwd}
        onChange={(e) => setChkNewPwd(e.target.value)}
        required
      />
      <AddButton type="submit">수정 완료</AddButton>
    </FormContainer>
  );
};

export default ProfileForm;
