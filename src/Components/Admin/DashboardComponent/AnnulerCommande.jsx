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
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  h5 {
    margin-bottom: 10px;
  }
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

function AnnulerCommande({ setOpen }) {
  const handleNonClick = () => {
    setOpen(false);
  };
  return (
    <Container>
      <h5>Vous voulez vraiment annuler la commande:</h5>
      <p>Oui</p>
      <p onClick={handleNonClick}>Non</p>
    </Container>
  );
}

export default AnnulerCommande;
