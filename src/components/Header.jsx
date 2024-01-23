import styled from "styled-components";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";

export const Header = ({ setLeftMenuOpen }) => {
  return (
    <Container>
      <MenuIcon onClick={() => setLeftMenuOpen()} />
      <UserLogo />
    </Container>
  );
};

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
