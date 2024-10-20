import styled from "styled-components";
import { ImArrowUp } from "react-icons/im";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 30px 30px 5px 5px;
  background-color: #f49395;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  animation: up 4s ease-in-out infinite;
  @keyframes up {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

function ArrowUpPage() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container onClick={handleClick}>
      <ImArrowUp />
    </Container>
  );
}

export default ArrowUpPage;
