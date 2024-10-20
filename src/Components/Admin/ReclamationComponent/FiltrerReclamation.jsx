import styled from "styled-components";

const Container = styled.div`
  position: relative;
 

  & > :last-child {
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: 1px solid;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      transition: all 0.5s ease;
    }
  }
`;

function FiltrerReclamation({ reclamations, setFiltredReclamations }) {
  const handleCategory = (status) => {
    if (status === "All") {
      setFiltredReclamations(reclamations);
    } else {
      const filtered = reclamations.filter((reclamation) => reclamation.status === status);
      setFiltredReclamations(filtered);
    }
  };
  return (
    <Container>
      <select
        id="selectCategory"
        onChange={(e) => handleCategory(e.target.value)} 
      >
        <option value="All">Select Category</option>
        <option value="En attente">En attente</option>
        <option value="Traitement">Traitement</option>
        <option value="Cloturer">Cloturer</option>
      </select>
    </Container>
  );
}

export default FiltrerReclamation;
