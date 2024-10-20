import { useContext } from "react";
import styled from "styled-components";
import { RiMenu3Line } from "react-icons/ri";
import AsideBar from "./AsideBar";
import { MenuHambContext } from "../Context/MenuHambContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MenuIcon = styled.div`
  position: relative;
  color: white;
  display: flex;
`;

const MenuContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: linear-gradient(5deg, #fa5, hsl(226.32deg 52.29% 21.37%));

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    top: 5px;
    width: 100%;
    min-height: 100%;
    background: transparent;

    & > * {
      min-width: 200px;
      padding: 10px;
      margin: 10px;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      & > * {
        margin: 10px;
      }
    }

    @media (max-width: 400px) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

function MenuHamb() {
  const { open, setOpen } = useContext(MenuHambContext);

  return (
    <Container>
      <MenuIcon>
        <RiMenu3Line onClick={() => setOpen(!open)} />
      </MenuIcon>
      {open && (
        <MenuContent>
          <AsideBar />
        </MenuContent>
      )}
    </Container>
  );
}

export default MenuHamb;
