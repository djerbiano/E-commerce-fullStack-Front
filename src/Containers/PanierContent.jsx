import styled from "styled-components";
import ProductPanier from "../Components/ProductPanier";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const Container = styled.div`
  width: 95vw;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  h4 {
    margin-bottom: 20px;
  }

  @media (max-width: 730px) {
    flex-direction: column;
  }
`;

const Articles = styled.div`
  width: 60%;
  height: 100%;
  padding: 10px;

  @media (max-width: 730px) {
    width: 100%;
  }
`;

const Products = styled.div`
  width: 100%;
  height: 100%;
`;
const Paiement = styled.div`
  padding: 0 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  position: relative;
  -webkit-box-shadow: 0px 4px 10px -2px #000000;
  box-shadow: 0px 4px 10px -2px #000000;
  height: 100%;
  border-radius: 10px;

  h1 {
    margin: 30px 0px;

    @media (max-width: 188px) {
      font-size: 7vw;
    }
  }

  div {
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
  }
  h4 {
    margin-bottom: 5px;
  }

  button {
    background-color: #1a2753;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    border: 1px solid black;
    width: 50%;
    transition: 0.5s;
    position: absolute;
    right: 50%;
    transform: translateX(50%);

    &:hover {
      background-color: black;

      border: 1px solid black;
      color: white;
      border: none;
      transition: 0.5s;
    }
  }

  & > :last-child {
    margin-bottom: 100px;
  }

  @media (max-width: 730px) {
    width: 100%;
    margin-top: 20px;
    font-size: 0.8rem;
  }
`;

function PanierContent({ cart }) {
  const { isAuthenticated } = useContext(AuthContext);

  const total = cart.reduce(
    (acc, product) =>
      acc +
      (product.quant >= 1 ? product.price * product.quant : product.price * 1),

    0
  );

  // handlePaiemente

  const paiement = () => {
    if (cart.length === 0) {
      alert("Veuillez ajouter des articles au panier");
      window.location.href = "/";
    } else {
      window.location.href = isAuthenticated === "true"  ? "/paiement" : "/monProfile";
    }
  };
  return (
    <Container>
      <Articles>
        <h1>Panier</h1>
        <h4>{cart.length} articles</h4>
        <Products>
          {cart.map((product) => (
            <ProductPanier product={product} key={product.idUnique} />
          ))}
        </Products>
      </Articles>
      <Paiement>
        <h1>Récapitulatif du paiement</h1>

        <div>
          <h4>Expédition</h4>
          <h4>Gratuite</h4>
        </div>

        <div>
          <h4>Total</h4>
          <h4>{total} $</h4>
        </div>
        <div>
          <button onClick={paiement}>Paiement</button>
        </div>
      </Paiement>
    </Container>
  );
}

export default PanierContent;
