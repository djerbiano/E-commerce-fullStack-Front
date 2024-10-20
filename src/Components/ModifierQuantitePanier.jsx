import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  button {
    color: #6e6e6e;
    font-size: 12px;
    width: 100px;
    padding: 10px;
    margin: 10px 0px 20px 0px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 94%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 50%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;

  h1 {
    margin: 30px 0px;
    font-size: 20px;
    text-align: center;
  }

  p {
    margin: 10px 0px;
    font-size: 16px;
    text-align: center;
  }

  input {
    margin: 10px 0px;
    padding: 10px;
    border-radius: 5px;
    width: 70px;
    max-width: 100%;
  }

  button {
    margin: 10px 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
    max-width: 100%;
    border: none;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > :nth-child(1) {
      background-color: green;
      color: white;

      &:hover {
        background-color: #1c471c;
      }
    }

    & > :nth-child(2) {
      background-color: red;
      color: white;

      &:hover {
        background-color: #ac2525;
      }
    }

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }
`;
function ModifierQuantitePanier({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quant);
  const [stock, setStock] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(1);

  //get product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/oneProduct/${product.id}`
        );
        const data = await response.json();
        setStock(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [product.id]);

  const handleQTEChange = (e) => {
    const selectedQuantityObject = stock.colors
      .flatMap((color) => color)
      .find((color) => color.color === product.color);
    let item = selectedQuantityObject.sizes.find(
      (size) => size.size === product.size
    );
    setQuantityAvailable(item.quantity);
  };
  const modifierLaQuantite = (product) => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    // Vérifier si le produit existe dans le panier
    let modifyProduct = existingCart.find(
      (item) =>
        item._id === product._id &&
        item.color === product.color &&
        item.size === product.size
    );
    if (modifyProduct) {
      const selected = newQuantity < 1 ? 1 : newQuantity;
      modifyProduct.quant =
        selected <= quantityAvailable ? selected : quantityAvailable;

      sessionStorage.setItem("cart", JSON.stringify(existingCart));

      window.location.href = "/panier";
    }
  };
  return (
    <Container>
      <button onClick={() => setShowModal(true)}>Modifier la quantité</button>

      {showModal && (
        <Modal>
          <ModalContent>
            <h1>Modifier la quantité</h1>
            <p>Quantité actuelle : {product.quant}</p>
            <input
              type="number"
              min="1"
              onChange={(e) => {
                setNewQuantity(e.target.value);
                handleQTEChange(e.target.value);
              }}
            />
            <div>
              <button onClick={() => modifierLaQuantite(product)}>
                Valider
              </button>
              <button onClick={() => setShowModal(false)}>Fermer</button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default ModifierQuantitePanier;
