import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { GiVibratingSmartphone } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { useContext } from "react";
import { MenuHambContext } from "../Context/MenuHambContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;

  @media (max-width: 930px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vw;
    font-weight: bold;
    padding: 0;
    width: auto;
  }

  @media (max-width: 700px) {
    display: none;
  }

`;

const ListItem = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
    font-weight: bold;
    transition: 0.3s;
  }

  @media (max-width: 930px) {
    gap: 0px;
    padding: 5px;
  }

  @media (max-width: 260px) {
    font-size: 1rem !important;
  }
`;

function AsideBar() {
  const { open, setOpen } = useContext(MenuHambContext);

  const CloseMenu = () => {
    if (open) {
      setOpen(!open);
    }
  };

  return (
    <Container>
      <ListItem to="/monProfile" onClick={CloseMenu}>
        <FaUserAlt />
        Bienvenue
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <GiClothes />
        Homme
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <GiClothes />
        Femme
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <FaComputer /> Informatique
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <MdOutlinePersonalVideo /> Tv - Son
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <GiVibratingSmartphone /> Téléphonie
      </ListItem>
      <ListItem to="/produits" onClick={CloseMenu}>
        <BsSmartwatch /> Objets connectés
      </ListItem>
    </Container>
  );
}

export default AsideBar;
