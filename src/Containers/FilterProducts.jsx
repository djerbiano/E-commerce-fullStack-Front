import styled from "styled-components";
import Filter from "../Components/Filter";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  height: 100%;
`;

function FilterProducts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Filter />
    </Container>
  );
}

export default FilterProducts;
