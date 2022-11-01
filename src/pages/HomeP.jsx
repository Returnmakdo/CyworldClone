import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Main from "../components/main/Main";
import Diary from "../components/diaries/Diary";
import Guestbook from "../components/guestbooks/GuestBook";
import Profile from "../components/profile/Profile";
import { useState, React } from "react";

function HomeP() {
  // 홈피 컴포넌트 상태관리
  const [content, setContent] = useState("main");

  // 버튼의 이름으로 setContent
  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name);
  };

  // 선택될 컴포넌트 명단
  const selectComponent = {
    main: <Main />,
    diary: <Diary />,
    guestbook: <Guestbook />,
  };

  return (
    <Layout>
      <Outline>
        <Dot>
          <Page>
            <Profile />
            <div>
              <Domain>
                <UserTitle>안치영님의 미니홈피</UserTitle>
                <Userdomain>www.cyworld/3조.com</Userdomain>
              </Domain>
              {content && <div>{selectComponent[content]}</div>}
            </div>
            <Menu>
              <MenuButton className={content === "main" ? "active" : ""} onClick={handleClickButton} name="main">
                홈
              </MenuButton>
              <MenuButton style={{ marginTop: "2px" }} className={content === "diary" ? "active" : ""} onClick={handleClickButton} name="diary">
                다이어리
              </MenuButton>
              <MenuButton style={{ marginTop: "2px" }} className={content === "guestbook" ? "active" : ""} onClick={handleClickButton} name="guestbook">
                방명록
              </MenuButton>
            </Menu>
          </Page>
        </Dot>
      </Outline>
    </Layout>
  );
}
export default HomeP;

//미니홈피 다이어리 표지
const Outline = styled.div`
  background-color: #aed2dd;
  border-radius: 9px;
  border: 1px solid #738186;
  width: 960px;
  height: 660px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  display: block;
`;

//점선테두리
const Dot = styled.div`
  border: 2px dashed white;
  border-radius: 9px;
  position: absolute;
  top: 15px;
  left: 15px;
  bottom: 15px;
  right: 15px;
  display: block;
`;

//회색 박스
const Page = styled.div`
  background-color: #f0f0f0;
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  border-radius: 9px;
  display: flex;
`;

//메뉴 묶는 박스
const Menu = styled.div`
  flex: 0.2;
  margin-top: 70px;
  left: 47.4%;
  display: flex;
  position: relative;
  flex-direction: column;
`;

//메뉴버튼
const MenuButton = styled.button`
  width: 80px;
  height: 35px;
  background-color: #238db4;
  border: 1px solid #cdd5d8;
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;

  &.active {
    background-color: #ffffff;
    color: #000000;
  }
`;

//유저정보 정렬
const Domain = styled.div`
  margin-top: 10px;
  padding: 7px;
`;

//유저도메인
const Userdomain = styled.div`
  position: absolute;
  left: 75%;
  font-size: 0.9rem;
`;

//유저홈피
const UserTitle = styled.div`
  position: absolute;
  left: 30%;
  font-size: 1rem;
  font-weight: 700;
  color: #2b4484;
`;
