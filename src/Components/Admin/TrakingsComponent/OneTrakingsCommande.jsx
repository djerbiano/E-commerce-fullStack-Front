import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ValidationChoise from "../../Modal/ValidationChoise";
import PatchOrder from "./PatchOrder";

const Container = styled.div`
  width: 100%;
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
  flex-direction: column;
  align-items: flex-start;
  & > * {
    margin-bottom: 20px;
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  & > * {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

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
    margin-bottom: 10px;
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  & > * {
    margin-bottom: 10px;
  }
`;
const Products = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  & > * {
    width: 100%;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    & > * {
      padding: 10px;
    }
  }
`;
const Menu = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  button {
    padding: 20px;
    border-radius: 5px;
    border: none;
    background-color: green;
    color: white;
    cursor: pointer;
    margin: 10px 10px;
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

const Status = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  & > * {
    margin-bottom: 10px;
  }
`;

function OneTrakingsCommande() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [err, setErr] = useState("");
  const [orderDeleteTrackingNumber, setOrderDeleteTrackingNumber] =
    useState("");
  const [modalValidation, setModalValidation] = useState(false);
  const [modalPatchOrder, setModalPatchOrder] = useState(false);

  // patch order
  const patchThisOrder = (trackingNumber) => {
    setModalPatchOrder(true);
    setOrderDeleteTrackingNumber(trackingNumber);
  };

  // delete order
  const deleteThisOrder = (trackingNumber) => {
    setModalValidation(true);
    setOrderDeleteTrackingNumber(trackingNumber);
  };

  // get one order
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/orders/${id}`,
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
        }
      } catch (error) {
        setErr(error);
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [id]);

  /*---------------convert date-----------*/
  const Création = productDetails.createdAt
    ? new Date(productDetails.createdAt)
    : null;
  const DerrnièreMiseAJour = productDetails.updatedAt
    ? new Date(productDetails.updatedAt)
    : null;
  /*---------------convert date----------- */

  return (
    <Container>
      <DetailsContainer>
        {productDetails ? (
          <>
            <Details>
              <Detail>
                <h3>Email: {productDetails.email}</h3>
                <p>UserId: {productDetails.user}</p>
                <p>Commande Id: {productDetails._id}</p>
                <p>TrackingNumber: {productDetails.trackingNumber}</p>
                <p>Créer le: {Création ? Création.toLocaleString() : "N/D"}</p>
                <p>Etat: {productDetails.status}</p>
                <p>
                  Nombre de produit:
                  {productDetails.products
                    ? productDetails.products.length
                    : "N/D"}
                </p>

                <p>
                  Derrnière modification:
                  {DerrnièreMiseAJour
                    ? DerrnièreMiseAJour.toLocaleString()
                    : "N/D"}
                </p>
                <p>Adresse postale: {productDetails.shippingAddress}</p>
                <p>
                  Adresse de livraison:
                  {productDetails.billingAddress
                    ? productDetails.billingAddress
                    : productDetails.shippingAddress}
                </p>
              </Detail>
              <Products>
                <h2>Produits</h2>
                {productDetails.products ? (
                  productDetails.products.map((product) => {
                    return (
                      <div key={product._id}>
                        <p
                          style={{
                            textTransform: "uppercase",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            window.open(
                              `/admin/products/oneProduct/${product.product}`,
                              "_blank"
                            )
                          }
                        >
                          {product.product}
                        </p>
                        <p>{product.color}</p>
                        <p>{product.price} €</p>
                        <p>Quantité: {product.quantity}</p>
                        <p>{product.size}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>N/D</p>
                )}
                <h3>Total: {productDetails.total} €</h3>
              </Products>
              <Status>
                {productDetails.statusHistory ? (
                  productDetails.statusHistory.map((product) => {
                    return (
                      <div key={product._id}>
                        <p>Commander le: {product.startDate.slice(0, 10)}</p>
                        <p>Etat: {product.status}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>N/D</p>
                )}
              </Status>
            </Details>

            <Menu>
              <button
                onClick={() => patchThisOrder(productDetails.trackingNumber)}
              >
                Modifier le statut
              </button>
              <button
                onClick={() => {
                  deleteThisOrder(productDetails.trackingNumber);
                }}
              >
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

      {modalValidation && (
        <ValidationChoise
          setModalValidation={setModalValidation}
          orderDeleteTrackingNumber={orderDeleteTrackingNumber}
        />
      )}

      {modalPatchOrder && (
        <PatchOrder
          setModalPatchOrder={setModalPatchOrder}
          patchOrderDetails={productDetails.trackingNumber}
        />
      )}
    </Container>
  );
}

export default OneTrakingsCommande;
