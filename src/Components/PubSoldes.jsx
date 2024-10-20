import styled from "styled-components";
import Logo from "../Assets/soldes.jpg";
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
  margin: 20px 0;
`;

const Content = styled.div`
  margin-left: 10%;
  & > * {
    margin-bottom: 20px;
  }

  & h1 {
    color: white;
    font-size: 2rem;
    font-family: "Gill Sans", "Gill Sans MT", sans-serif;
    text-transform: uppercase;

    animation: rotation 2s infinite linear;

    @keyframes rotation {
      0% {
        transform: translateX(0%);
      }

      50% {
        transform: translateX(5%);
      }

      100% {
        transform: translateX(0%);
      }
    }

    @media (max-width: 400px) {
    }

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
        <h1>Soldes d'hiver -50% !</h1>
        <button type="button" onClick={() => navigate("/produits")}>Achetez dès maintenant</button>
      </Content>
    </Container>
  );
}

export default TopPub;
