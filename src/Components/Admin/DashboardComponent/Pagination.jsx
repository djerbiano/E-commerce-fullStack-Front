import styled from "styled-components";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
 
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 300px;
  margin-top: -50px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
  }

  p {
    margin: 0 10px;
    cursor: pointer;
    font-size: 1.2rem;

    &.active {
      background-color: hsl(226.32deg 52.29% 21.37%);
      color: #fff;
      border-radius: 50px;
      padding: 5px 15px;
      cursor: pointer;
      font-size: 1.5rem;
    }
  }

  button {
    background-color: transparent;
    cursor: pointer;
    margin: 0px 10px;
    padding: 5px;
    border-radius: 10px;

    svg {
      font-size: 1.5rem;
      color: #000;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #000;
        font-size: 2rem;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

function Pagination() {
  const [active, setActive] = useState(1);

  const handleClick = (e) => {
    setActive(parseInt(e.target.innerText, 10));
  };

  const handlePrevClick = () => {
    setActive((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    const maxPages = 5;
    setActive((prev) => Math.min(prev + 1, maxPages));
  };
  return (
    <Container>
      <Content>
        <div>
          <button onClick={handlePrevClick}>
            <GrPrevious />
          </button>
        </div>
        <p onClick={handleClick} className={active === 1 ? "active" : ""}>
          1
        </p>
        <p onClick={handleClick} className={active === 2 ? "active" : ""}>
          2
        </p>
        <p onClick={handleClick} className={active === 3 ? "active" : ""}>
          3
        </p>
        <p onClick={handleClick} className={active === 4 ? "active" : ""}>
          4
        </p>
        <p onClick={handleClick} className={active === 5 ? "active" : ""}>
          5
        </p>
        <div>
          <button onClick={handleNextClick}>
            <GrNext />
          </button>
        </div>
      </Content>
    </Container>
  );
}

export default Pagination;
