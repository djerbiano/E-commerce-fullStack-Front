import styled from "styled-components";
import Logo from "../Assets/18830882_1200_B.jpg";
import { GrFavorite } from "react-icons/gr";
const SingleProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    transition: all 0.2s;
  }
`;

const ContainerPhoto = styled.div`
  position: relative;
  & > :first-child {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  & > :nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 20px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: white;
    rotate: 40deg;
    font-weight: bold;
    border-radius: 0 10px 0 10px;
    margin-top: 20px;

    @media (min-width: 501px) and (max-width: 660px) {
      width: auto;
      padding: 5px;
      font-size: 2vw;
      transition: all 0.5s;
    }
  }

  
  & > :last-child {
    position: absolute;
    bottom: 20px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;

    &:hover {
      scale: 1.2;
      transition: all 0.2s;

      & > * {
        fill: #fa5;
      }
    }
  }
`;

function ProductLimited() {
  return (
    <SingleProduct>
      <ContainerPhoto>
        <img src={Logo} alt="" />
        <div>Limited</div>
        <GrFavorite title="Ajouter aux favoris" />
      </ContainerPhoto>
      <h3>CHEMISE AJUSTEE</h3>
      <h4>200 $</h4>
    </SingleProduct>
  );
}

export default ProductLimited;
