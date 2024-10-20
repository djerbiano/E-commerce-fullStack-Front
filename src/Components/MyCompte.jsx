import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListItem = styled.a`
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
function MyCompte() {
  const navigate = useNavigate();
  return (
    <Container>
      <ListItem onClick={() => navigate("/monProfile")} >
        <FaUserAlt />
      </ListItem>
    </Container>
  );
}

export default MyCompte;
