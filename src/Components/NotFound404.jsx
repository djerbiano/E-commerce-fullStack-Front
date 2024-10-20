import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  width: 100%;
  background-color: transparent;
  color: #1a2753;

  @media (max-width: 560px) {
    & > * {
      font-size: 1.5rem !important;
      padding: 20px;
    }
  }
`;

const NotFoundTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const NotFoundMessage = styled.p`
  font-size: 1.5rem;
`;

const LinkItem = styled(Link)`
  margin-top: 30px;
  max-width: 70%;
  font-size: 1.5rem;
  color: #1a2753;
  text-decoration: none;
  border: 1px solid #1a2753;
  padding: 10px 20px;
  border-radius: 5px;
  animation: identifier 1s infinite ease;

  @keyframes identifier {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05);
    }

    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: #ffffff;
    color: #1a2753;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  @media (max-width: 208px) {
    font-size: 1rem !important;
    
  }
`;

const NotFound404 = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 Not Found</NotFoundTitle>
      <NotFoundMessage>
        Désolé, la page que vous recherchez n'a pas été trouvée.
      </NotFoundMessage>
      <LinkItem to="/">
        <p>Retournez à la page d'accueil</p>
      </LinkItem>
    </NotFoundContainer>
  );
};

export default NotFound404;
