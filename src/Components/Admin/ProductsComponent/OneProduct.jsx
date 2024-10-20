import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PicturesView from "../../Modal/PicturesView";
import PatchProduct from "./PatchProduct";
import ValidationChoise from "../../Modal/ValidationChoise";

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 10px;
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  @media (max-width: 616px) {
    flex-direction: column;
  }
`;
const DetailsContainer = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;

  @media (max-width: 616px) {
    flex-direction: column;
    align-items: center;
    & > * {
      margin-bottom: 20px;
    }
  }
`;

const Details = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 616px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    & > * {
      margin-bottom: 10px;
    }
  }
`;
const Menu = styled.div`
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  button {
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 20px;
    &:hover {
      color: black;
    }
  }

  & > :last-child {
    background-color: red;

    &:hover {
      background-color: #ff0000;
    }
  }
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-right: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    }
  }

  @media (max-width: 616px) {
    flex-direction: column;
    align-items: center;
    & > * {
      margin-bottom: 20px;
    }
  }
`;
function OneProduct() {
  const [opModal, setOpModal] = useState(false);
  const [pictures, setPictures] = useState(null);
  const { id} = useParams();
  const [productDetails, setProductDetails] = useState("");
  const [err, setErr] = useState("");
  const [patchProduct, setPatchProduct] = useState(false);
  const [patchProductDetails, setPatchProductDetails] = useState("");
  const [modalValidation, setModalValidation] = useState(false);

  const handlePicture = (e) => {
    setOpModal(true);
    setPictures(e.target.src);
  };
//   patch product
  const patchThisProduct = (productId) => {
    setPatchProduct(true);
    setPatchProductDetails(productId);
  };

  // delete product
  const deleteThisProduct = (productId) => {
    setModalValidation(true);
    setPatchProductDetails(productId);
  };

  //get one product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/oneProduct/${id}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Une erreur s'est produite");
        }

        const data = await response.json();

        setProductDetails(data);
      } catch (error) {
        setErr(error);
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [id]);
  const Création = productDetails.createdAt
    ? new Date(productDetails.createdAt)
    : null;

  return (
    <Container>
    <DetailsContainer>
    {productDetails ? (
          <>
            <Details>
              <h2>{productDetails.title}</h2>
              <p>Prix: {productDetails.regularPrice} $</p>
              <p>En promotion: {productDetails.isOnSale.toString()}</p>
              <p>
                Prix promotion:{" "}
                {productDetails.salePrice
                  ? productDetails.salePrice
                  : Number(productDetails.salePrice)}
              </p>
              <p>Top vente: {productDetails.isTopSeller.toString()}</p>
              <p>
                Nouvelle collection: {productDetails.isNewCollection.toString()}
              </p>
              <p>
                Edition limitée: {productDetails.isLimitedEdition.toString()}
              </p>
              <p>Description 1: {productDetails.description.desc1}</p>
              <p>Description 2: {productDetails.description.desc2}</p>
              <p>Description 3: {productDetails.description.desc3}</p>

              <p>Catégorie: {productDetails.category}</p>
              <p>Stock: {productDetails.stock.toString()}</p>
              <p>Couleurs : {productDetails.colors[0].color}</p>
              <p>Tailles : {productDetails.colors[0].sizes[0].size}</p>
              <p>Quantité : {productDetails.colors[0].sizes[0].quantity}</p>
              <p>Id : {productDetails._id}</p>
              <p>Créer le : {Création ? Création.toLocaleString() : "N/D"}</p>
            </Details>
            <Image>
              <img
                src={`${process.env.REACT_APP_URL_SERVER}/images/${productDetails.pictures.pic1}`}
                alt="Product"
                onClick={handlePicture}
              />
              <img
                src={`${process.env.REACT_APP_URL_SERVER}/images/${productDetails.pictures.pic2}`}
                alt="Product"
                onClick={handlePicture}
              />
              <img
                src={`${process.env.REACT_APP_URL_SERVER}/images/${productDetails.pictures.pic3}`}
                alt="Product"
                onClick={handlePicture}
              />
            </Image>
            <Menu>
              <button onClick={() => patchThisProduct(productDetails._id)}>
                Modifier le produit
              </button>
              <button onClick={() => deleteThisProduct(productDetails._id)}>
                Supprimer
              </button>
            </Menu>
          </>
        ) : err ? (
          <p>{err.message}</p>
        ) : (
          <p> Chargement...</p>
        )}
      </DetailsContainer>

      {opModal && <PicturesView setOpModal={setOpModal} pictures={pictures} />}
      {patchProduct && (
        <PatchProduct
          setPatchProduct={setPatchProduct}
          patchProductDetails={patchProductDetails}
        />
      )}
      {modalValidation && (
        <ValidationChoise
          setModalValidation={setModalValidation}
          patchProductDetails={patchProductDetails}
        />
      )}
    </Container>
  );
}

export default OneProduct;
