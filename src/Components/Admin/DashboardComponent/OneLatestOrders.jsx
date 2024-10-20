import styled from "styled-components";
import { useRef } from "react";
import OneLatestOrdersMenu from "./OneLatestOrdersMenu";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f4f4f4;
  margin: 10px 0px;
  border-radius: 5px;

  p {
    font-weight: bold;
  }

  & > :nth-child(5) {
    min-width: 70px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    background-color: ${(props) => {
      if (props.$status === "En cours") {
        return "#0077febf";
      } else if (props.$status === "Livré") {
        return "#00800061";
      } else {
        return "#ff000073";
      }
    }};
    color: black;
  }
`;

function OneLatestOrders(props) {
  const ref = useRef();

  return (
    <Container $status={props.status}>
      <p>54fds28dfg</p>
      <p>Franck DUPONT</p>
      <p>franck.d@gmail.com</p>
      <p>89 $</p>
      <p ref={ref}>{props.status}</p>
      <p>10/05/2022</p>
      <OneLatestOrdersMenu />
    </Container>
  );
}

export default OneLatestOrders;
