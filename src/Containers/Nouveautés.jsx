import styled from "styled-components";
import NouvelleCollection from "../Components/NouvelleCollection";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

`;

function Nouveautés() {
  return (
    <Container>
      <ContentContainer>
        <NouvelleCollection />
      </ContentContainer>
    </Container>
  );
}

export default Nouveautés;
