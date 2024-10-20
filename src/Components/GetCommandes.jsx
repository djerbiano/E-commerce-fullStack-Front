import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "../Components/Modal/MessageFetch";
import Loader from "../Components/Modal/Loader";

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 850px) {
    font-size: 1rem;
  }
`;

const ContainerCommandes = styled.div`
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Commande = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid black;
  max-width: 800px;
  padding: 5px;

  & > button {
    padding: 10px;
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 10px;

    &:hover {
      background-color: black;
      color: white;
      transition: 0.3s;
    }
  }
`;

const TitleCommande = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 5px;
  background-color: #f5f5f5;
  border-bottom: 1px solid black;

  & > * {
    padding: 10px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 427px) {
      flex-direction: row;
      & > p {
        margin-right: 10px;
        width: 100%;
      }
    }
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    padding: 0;

    & > * {
      display: flex;
      flex-direction: column;

      & > :nth-child(2) {
        word-break: break-all;
      }
    }
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Product = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 490px) {
    justify-content: flex-start;
  }
  & > :nth-child(1) {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;

    & > p {
      margin-bottom: 10px;
    }
  }
`;

function MesInformations() {
  const [email] = useState(localStorage.getItem("email"));
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState(true);
  const [opModal, setOpModal] = useState(false);
  const [contentModal, setContentModal] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/orders/user/${email}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();

        if (data.length > 0) {
          setOrders(data);
        } else {
          setData(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllOrders();
    //eslint-disable-next-line
  }, [email ]); 

  const confirmeReceptionCommande = async (orderId) => {
    setLoader(true);
    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/orders/confirmReception/user/${orderId}`,
      {
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    if (data) {
      setLoader(false);
      setOpModal(true);
      setContentModal(data.message);
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <Container>
      <h3>Mes commandes</h3>

      <ContainerCommandes>
        {data ? (
          orders.map((order) => (
            <Commande key={order._id}>
              <TitleCommande>
                <div>
                  <p>Commandé le</p>
                  <p>{order.createdAt.slice(0, 10)}</p>
                </div>
                <div>
                  <p>Numéro de suivi</p>
                  <p>{order.trackingNumber}</p>
                </div>
                <div>
                  <p>Total:</p>
                  <p>{order.total}$</p>
                </div>
                <div>
                  <p>Statut:</p>
                  <p>{order.status}</p>
                </div>
              </TitleCommande>

              <Details>
                {order.products && order.products.length > 0 ? (
                  order.products.map((pr, index) => (
                    <Product key={index}>
                      <div>
                        <img
                          src={`${process.env.REACT_APP_URL_SERVER}/images/${pr.product.pictures.pic1}`}
                          alt={pr.product.title}
                        />
                      </div>
                      <div>
                        <p>{pr.product.title}</p>
                      </div>
                      <div>
                        <p>price</p>
                        <p>{pr.price}$</p>
                      </div>
                      <div>
                        <p>size</p>
                        <p>{pr.size}</p>
                      </div>
                      <div>
                        <p>color</p>
                        <p>{pr.color}</p>
                      </div>
                      <div>
                        <p>quantity</p>
                        <p>{pr.quantity}</p>
                      </div>
                      <div>
                        <p>total</p>
                        <p>{pr.price * pr.quantity}$</p>
                      </div>
                    </Product>
                  ))
                ) : (
                  <div>
                    <p>Aucun produit</p>
                  </div>
                )}
              </Details>
              <button onClick={() => confirmeReceptionCommande(order._id)}>
                Confirmer la réception
              </button>
            </Commande>
          ))
        ) : (
          <div>
            <p>Aucune commande</p>
          </div>
        )}
      </ContainerCommandes>

      {opModal && <Modal message={contentModal} setOpModal={setOpModal} />}
    </Container>
  );
}

export default MesInformations;
