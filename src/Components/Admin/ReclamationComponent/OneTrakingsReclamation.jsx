import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ValidationChoise from "../../Modal/ValidationChoise";
import PatchReclamation from "./PatchReclamation"

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
  const [reclamationDetails, setReclamationDetails] = useState({});
  const [err, setErr] = useState("");
  const [reclamationDeleteById, setReclamationDeleteById] =
    useState("");
  const [modalValidation, setModalValidation] = useState(false);
  const [modalPatchReclamation, setModalPatchReclamationr] = useState(false);

  // patch reclamation
  const patchThisReclamation = (trackingNumber) => {
    setModalPatchReclamationr(true);
    setReclamationDeleteById(trackingNumber);
  };

  // delete reclamation
  const deleteThisReclamation = (trackingNumber) => {
    setModalValidation(true);
    setReclamationDeleteById(trackingNumber);
  };

  // get one reclamation
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/contact/suivi/oneReclamation/${id}`,
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
          setReclamationDetails(data);
        }
      } catch (error) {
        setErr(error);
        console.error("Une erreur s'est produite:", error); 
      }
    };

    fetchData();
    
    
  }, [id]);

  /*---------------convert date-----------*/
  const Création = reclamationDetails.createdAt
    ? new Date(reclamationDetails.createdAt)
    : null;
  const DerrnièreMiseAJour = reclamationDetails.updatedAt
    ? new Date(reclamationDetails.updatedAt)
    : null;
  /*---------------convert date----------- */

  return (
    <Container>
      <DetailsContainer>
        {reclamationDetails.order ? (
          <>
            <Details>
              <Detail>
            
                <h3>Email: {reclamationDetails.order.email}</h3>
                <p>UserId: {reclamationDetails.messages[0].userId}</p>
                <p>Commande Id: {reclamationDetails.order._id}</p>
                <p>TrackingNumber: {reclamationDetails.order.trackingNumber}</p>
                <p>Date de réclamation: {Création ? Création.toLocaleString() : "N/D"}</p>
                <p>Etat: {reclamationDetails.status}</p>
                <p>
                  Nombre de produit:
                  {reclamationDetails
                    ? reclamationDetails.order.products.length
                    : "N/D"}
                </p>

                <p>
                  Derrnière modification:
                  {DerrnièreMiseAJour
                    ? DerrnièreMiseAJour.toLocaleString()
                    : "N/D"}
                </p>
                <p>Adresse postale: {reclamationDetails.order.shippingAddress}</p>
                <p>
                  Adresse de livraison:
                  {reclamationDetails.billingAddress
                    ? reclamationDetails.order.billingAddress
                    : reclamationDetails.order.shippingAddress}
                </p>
              </Detail>
              <Products>
                <h2>Produits</h2>
                {reclamationDetails.order ? (
                  reclamationDetails.order.products.map((product) => {
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
                <h3>Total: {reclamationDetails.order.total} €</h3>
              </Products>
              <Status>
                {reclamationDetails.messages ? (
                  reclamationDetails.messages.map((reclamation) => {
                    return (
                      <div key={reclamation._id}>
                        <p>Envoyer le: {new Date(reclamation.startDate).toLocaleString()}</p>
                        <p>Message: {reclamation.message}</p>
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
                onClick={() => patchThisReclamation(reclamationDetails._id)}
              >
                Modifier le statut
              </button>
              <button
                onClick={() => {
                  deleteThisReclamation(reclamationDetails._id);
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
          reclamationDeleteById={reclamationDeleteById}
        />
      )}

      {modalPatchReclamation && (
        <PatchReclamation
        setModalPatchReclamationr={setModalPatchReclamationr}
          patchReclamationDetails={reclamationDetails._id}
        />
      )}
    </Container>
  );
}

export default OneTrakingsCommande;
