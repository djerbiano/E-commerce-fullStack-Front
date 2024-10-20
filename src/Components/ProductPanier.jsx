import styled from "styled-components";
import ModifierQuantitePanier from "./ModifierQuantitePanier";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
  border-bottom: 1px solid;
  position: relative;

  * {
    transition: all 0.5s ease;
  }

  @media (min-width: 278px) {
    font-size: 1rem;
  }

  @media (max-width: 250px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
      margin: 10px 0;
    }
  }
`;

const ContainerPhoto = styled.div`
  min-width: 100px;
  max-width: 20%;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

const DetailsProduct = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > :first-child {
    &:hover {
      cursor: pointer;
    }
  }
  & > :nth-child(6) {
  }
  & > :last-child {
    color: #000;
    font-size: 12px;
    background-color: transparent;
    border: 0;
    color: #6e6e6e;
    text-decoration: underline;
    cursor: pointer;
    position: absolute;
    bottom: 2px;
    left: 10px;

    @media (max-width: 400px) {
      position: absolute;
      bottom: 2px;
      left: 10px;
    }
  }
`;

const Quantité = styled.div`
  p {
    margin: 10px 0;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;

    @media (max-width: 250px) {
      margin-bottom: 20px;
    }
  }
`;

const Total = styled.div`
  margin: 10px 0;
  position: absolute;
  bottom: 20px;
  right: 20px;

  @media (max-width: 400px) {
    bottom: 10px;
    left: 10px;
  }
`;

function ProductPanier({ product }) {
  const handleRemove = (product) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    // Vérifier si le produit existe dans le panier
    let deleteProduct = existingCart.find(
      (item) =>
        item._id === product._id &&
        item.color === product.color &&
        item.size === product.size
    );
    // Supprimer du panier en fonction de l'ID du produit
    const updatedCart = existingCart.filter((item) => item !== deleteProduct);
    // Mettre a jour le sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    window.location.reload();
  };

  return (
    <Container>
      <ContainerPhoto>
        <img
          src={`${process.env.REACT_APP_URL_SERVER}/images/${
            product ? product.picture : "Chargement"
          }`}
          alt={product ? product.title : "Chargement"}
          onClick={() => {
            window.location.href = `/singleProduct/${product.id}`;
          }}
        />
      </ContainerPhoto>
      <DetailsProduct>
        <h3
          onClick={() => {
            window.location.href = `/singleProduct/${product.id}`;
          }}
        >
          {product ? product.title : "Chargement"}
        </h3>
        <h4>{product ? product.price : "Chargement"} $</h4>
        <p>Couleur: {product ? product.color : "Chargement"}</p>
        <p>Taille: {product ? product.size : "Chargement"}</p>
        <Quantité>
          <p>Qté:</p>
          <select>
            <option value={product.quant < 1 ? 1 : product.quant}>
              {product.quant < 1 ? 1 : product.quant}
            </option>
          </select>
        </Quantité>
        <ModifierQuantitePanier product={product} />
        <Total>
          <p>
            Total:
            {product.quant < 1 ? product.price : product.quant * product.price}$
          </p>
        </Total>
        <button onClick={() => handleRemove(product)}>Supprimer</button>
      </DetailsProduct>
    </Container>
  );
}

export default ProductPanier;
