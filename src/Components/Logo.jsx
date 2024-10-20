import styled from "styled-components";
import { Link } from "react-router-dom";
const Title = styled.h1`
  color: white;
  & span {
    color: #fa5;
  }

  @media (max-width: 300px) {
    font-size:8vw;
    margin-right: 10px;
    
  }
`;
const ListItem = styled(Link)`
  text-decoration: none;
`;

function Logo() {
  return (
    <ListItem to="/">
      <Title>
        Shoping<span>Digital</span>
      </Title>
    </ListItem>
  );
}

export default Logo;
