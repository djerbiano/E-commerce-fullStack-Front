import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 10px 0 0 10px;
  color: black;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  p {
    cursor: pointer;
    padding: 20px;
    &:hover {
      transition: 0.3s;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
`;

function ModifierStatus() {
  return (
    <Container>
      <h5>Modifier le statut de la commande:</h5>
      <hr />

      <p>Payée</p>
      <p>En cours de livraison</p>
    </Container>
  );
}

export default ModifierStatus;
