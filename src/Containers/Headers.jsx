import styled from "styled-components";
import Logo from "../Components/Logo";
import InputSearch from "../Components/InputSearch";
import Contact from "../Components/Contact";
import Panier from "../Components/Panier";
import Favo from "../Components/Favo";
import MyCompte from "../Components/MyCompte";
import MenuHamb from "../Components/MenuHamb";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 10vh;
  background-color: hsl(226.32deg 52.29% 21.37%);
  padding: 0 20px;
  z-index: 1000;
  position: relative;

  & > :nth-child(2) {
    display: none;
    
  }
  & > :nth-child(3) {
    width: 40%;

    
  
  }
  & > :nth-child(4) {
    height: 100%;
    width: 20%;
    
  }

  @media (max-width: 700px) {
    justify-content: space-around;
    & > :nth-child(2) {
      display: block;
      height: 100%;
      width: 10%;
      & {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
      }
    }
    & > :nth-child(3) {
      display: none;
    }
    & > :nth-child(4) {
      display: none;
    }
  }
  @media (max-width: 300px) {
    & > :nth-child(1) {
      font-size: 10vw;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;

  & > :nth-child(1),
  & > :nth-child(2),
  & > :nth-child(3),
  & > :nth-child(4) {
    color: white;
    & > * {
      &:hover {
        cursor: pointer;
        color: #fa5;
        font-size: 2rem;
        transition: 0.4s;
      }
    }
  }
`;

function Headers( {cart}) {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo />
      <MenuHamb />
      <InputSearch />
      <IconContainer>
        <p
          style={{ cursor: "pointer", color: "#fa5" }}
          onClick={() =>
          
            navigate("/admin")
          }
        >
          Admin
        </p>
        <Contact />
        <Panier cart={cart} />
        <Favo />
        <MyCompte />
      </IconContainer>
    </Container>
  );
}

export default Headers;
