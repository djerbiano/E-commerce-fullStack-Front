import styled from "styled-components";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    position: relative;
  }
`;

const Dd = styled.div`
  position: relative;
  color: white;
  &:hover {
    cursor: pointer;
    color: #fa5;
    font-size: 2rem;
    transition: 0.4s;
  }
`;

const Notification = styled.div`
  position: absolute;
  bottom: 70%;
  left: 80%;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    331deg,
    rgba(255, 255, 255, 1) 1%,
    rgba(9, 121, 44, 1) 50%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: black;
  font-weight: bold;
`;

function Panier({ cart }) {
  const navigate = useNavigate();
  return (
    <Container>
      <Dd
        onClick={() => {
          navigate("/panier");
        }}
      >
        <BsFillCartCheckFill />
        <Notification>{cart.length}</Notification>
      </Dd>
    </Container>
  );
}

export default Panier;
