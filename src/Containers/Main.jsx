import styled from "styled-components";
import AsideBar from "../Components/AsideBar";
import TopPub from "../Components/TopPub";
import TopPubElle from "../Components/TopPubElle";
import Nouveautés from "./Nouveautés";
import Soldes from "../Components/Soldes";
import EditionLimitée from "../Components/EditionLimitée";
import PubSoldes from "../Components/PubSoldes";
const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
  width: 90vw;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

const ContainerAsideBar = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: space-evenly;
  margin-bottom: 20px;

  * {
    margin: 5px;
  }

  & > :nth-child(1) {
    width: 20%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  & > :nth-child(2) {
    width: 100%;
    margin-left: 10%;
  }
  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;

    & > :nth-child(1) {
      width: 100%;
      height: auto;
      min-height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
      flex-direction: row;
    }
    & > :nth-child(2) {
      width: 100%;
      margin-left: 0%;
    }
  }

  @media (max-width: 700px) {
    & > :nth-child(1) {
      display: none;
    }
  }
`;

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 930px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const ContainerAfterMain = styled.div`
  width: 100%;
 height:100%;
  margin-top: 50px;
`;

const ContentAfterMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  height: 100%;

  & > :nth-child(1) {
    width: 100%;
    //min-height: 400px;


    @media (max-width: 660px) {
      width: 100%;
    }
  }
  & > :nth-child(3) {
    flex-direction: row;
    width: 100%;
    height: 100%;

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }
`;

function Main() {
  return (
    <Container1>
      <Container>
        <ContainerAsideBar>
          <AsideBar />
          <TopPub />
        </ContainerAsideBar>
        <ContainerMain>
          <Nouveautés />
        </ContainerMain>
        <ContainerAfterMain>
          <ContentAfterMain>
            <TopPubElle />
            <ProductContainer>
              <EditionLimitée />
              <PubSoldes />
              <Soldes />
            </ProductContainer>
          </ContentAfterMain>
        </ContainerAfterMain>
      </Container>
    </Container1>
  );
}

export default Main;
