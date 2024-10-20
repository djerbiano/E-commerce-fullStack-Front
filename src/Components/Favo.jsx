import styled from "styled-components";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
const ListItem = styled(Link)`
  text-decoration: none;
  list-style: none;
  color: white;
  &:hover {
    cursor: pointer;
    color: #fa5;
    font-size: 2rem;
    transition: 0.4s;
  }
`;

function Favo() {
  return (
    <Container>
    <ListItem to="/favoris">
      <MdFavorite />
    </ListItem>
    </Container>
  );
}

export default Favo;
