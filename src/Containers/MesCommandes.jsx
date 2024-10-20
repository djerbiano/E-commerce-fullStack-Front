import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import styled from "styled-components";
import AsideMyProfile from "../Components/AsideMyProfile";
import GetCommandes from "../Components/GetCommandes";
import NotUserResponse from "../Components/NotUserResponse";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const Aside = styled.div`
  height: 100%;

  & > * {
    & > :nth-child(3) {
      background-color: #60c660b3;
      border-radius: 5px;

      &:hover {
        background-color: #60c660b3;
      }
    }
  }
  @media (max-width: 850px) {
    width: 100%;
    margin-bottom: 20px;

    & > :nth-child(1) {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;

      height: auto;
      font-size: 1rem;

      & > * {
        border-bottom: none;
      }
    }
  }
`;
const Content = styled.div`
  min-width: 500px;
  height: 100%;
  margin-left: 50px;

  @media (max-width: 850px) {
    width: 100%;
    min-width: auto;
    margin-left: 0;
  }
`;

function MesCommandes() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated === "true" ? (
        <Container>
          <Aside>
            <AsideMyProfile />
          </Aside>
          <Content>
            <GetCommandes />
          </Content>
        </Container>
      ) : (
        <NotUserResponse />
      )}
    </>
  );
}

export default MesCommandes;
