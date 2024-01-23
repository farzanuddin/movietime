import styled from "styled-components";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
const Container = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 5px;
  }
`;
const UserLogo = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: red;
`;
export const Header = () => {
  return (
    <Container>
      <MenuIcon />
      <UserLogo />
    </Container>
  );
};
