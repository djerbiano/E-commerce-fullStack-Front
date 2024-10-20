import styled from "styled-components";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { ImArrowDown2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 300px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Picture = styled.div`
  font-size: 30px;
  background-color: green;
  padding: 10px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  & > * {
    margin-bottom: 5px;
  }


  h3 {
    color: #8e8e8e;
    text-transform: uppercase;
  }

  p {
    text-transform: uppercase;

    span {
      color: red;
      margin-right: 5px;
      font-weight: bold;

      & > svg {
        animation: plus infinite 2s linear;

        @keyframes plus {
          0% {
            transform: translateY(0%);
          }

          50% {
            transform: translateY(30%);
          }

          100% {
            transform: translateY(0%);
          }
        }
      }
    }
  }
`;

function NewOrders() {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/admin/orders")}>
      <Content>
        <Picture>
          <HiOutlineShoppingCart />
        </Picture>
        <Title>
          <h3>commandes</h3>
          <h4>3500 $</h4>
          <p>
            <span>
              <ImArrowDown2 />
            </span>
            -5% (7 jours)
          </p>
        </Title>
      </Content>
    </Container>
  );
}

export default NewOrders;
