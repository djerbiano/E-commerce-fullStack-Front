import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  & > :nth-child(2),
  & > :nth-child(3),
  & > :nth-child(4) {
    &:hover {
      background-color: #e5e5e5;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
  }

  & > * {
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
  }

  & > :last-child {
    background-color: #000;
    color: white;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.1rem;

    &:hover {
      background-color: red;
      cursor: pointer;
    }
  }
`;

const Bienvenue = styled.div``;

const LinkItems = styled(Link)`
  text-decoration: none;
  color: black;
`;

function AsideMyProfile() {
  const [name] = useState(localStorage.getItem("name") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");

    window.location.href = "/";
  };

  return (
    <Container>
      <Bienvenue>
        <h3>Bienvenue {name}</h3>
      </Bienvenue>
      <LinkItems to="/monProfile">Mon Profile </LinkItems>
      <LinkItems to="/mesCommandes">Mes Commandes</LinkItems>
      <LinkItems to="/réclamations">Reclamations</LinkItems>
      <LinkItems to="/" onClick={handleLogout}>
        <AiOutlineLogout />
        Se déconnecter
      </LinkItems>
    </Container>
  );
}

export default AsideMyProfile;
