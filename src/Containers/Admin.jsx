import styled from "styled-components";
import HeadersAdmin from "../Components/Admin/HeadersAdmin";
import MainAdmin from "../Components/Admin/MainAdmin";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  background-color: #f5f5f5;
  display: flex;

  & > :nth-child(1) {
    max-height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-80%);
    transform: translateY(-94%);
    transition: all 0.9s ease-in-out;
    & > :nth-child(2) {
        transform: translateX(0);
        transition: all 2s ease-in-out;
      }

    &:hover {
      transform: translateX(0);
      transform: translateY(0);
      transition: all 0.9s ease-in-out;

      & > :nth-child(2) {
        transform: translateX(-100%);
        transition: all 0.1s ease-in-out;
      }
    }

  }

  & > :nth-child(2) {
    width: 100%;
    height: 100%;
  }
`;

function Admin() {
  return (
    <Container>
      <HeadersAdmin />
      <MainAdmin />
    </Container>
  );
}

export default Admin;
