import styled from "styled-components";
import Logo from "../Assets/pexels-photo-837140.jpeg";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  background-image: url(${Logo});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
`;

const Content = styled.div`
  margin-left: 10%;
  & > * {
    margin-bottom: 20px;
  }
  & h2 {
    color: #fa5;
    @media (max-width: 300px) {
      font-size: 1rem;
    }
  }
  & h1 {
    color: white;
    @media (max-width: 310px) {
      font-size: 1rem;
    }
  }

  & button {
    background-color: #fa5;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: black;
      color: #fa5;
      transition: 0.3s;
      transform: scale(1.1);
    }
    @media (max-width: 300px) {
      font-size: 0.8rem;
    }
  }
`;

function TopPub() {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <h2>Explorer la derrnière tendance</h2>
        <h1>Découvrez notre toute nouvelle collection</h1>
        <button type="button" onClick={() => navigate("/produits")}>Achetez dès maintenant</button>
      </Content>
    </Container>
  );
}

export default TopPub;
