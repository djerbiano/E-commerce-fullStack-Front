import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ede8e8f7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Content = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    padding: 10px;
    fieldset {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      font-size: 20px;
    }

    input {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid gray;
      margin-top: 5px;
      padding: 0 10px;
      font-size: 14px;
    }

    p {
      margin-top: 5px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
const ButtonForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 0;

  button {
    border: none;
    border-radius: 5px;
    background-color: green;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    margin: 10px;
    width: 100px !important;
    height: 40px !important;
    &:hover {
      background-color: rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
    }
  }

  a {
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    margin: 10px;
    width: 100px !important;
    height: 40px !important;
    display: flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgba(128, 0, 0, 0.8);
      transition: all 0.5s ease;
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  div {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  p {
    font-size: 40px;
    font-weight: bold;
    color: white;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

function FinishPaiement({ totallPrice, dataOrder, cart }) {
  const [typePaiement, setTypePaiement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validatePaiement, setValidatePaiement] = useState(false);

  useEffect(() => {
    if (dataOrder.selectedPayment === "paypal") {
      setTypePaiement(true);
    } else {
      setTypePaiement(false);
    }
  }, [dataOrder]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    let formData = {
      products: [],
    };

    cart.forEach((product) => {
      formData.products.push({
        product: product.id,
        color: product.color,
        size: product.size,
        quantity: product.quant,
        price: product.price,
      });
    });

    let order = {
      products: formData.products,
      user: userId,
      total: totallPrice,
      billingAddress: dataOrder.address1,
      shippingAddress: dataOrder.address1,
    };

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/orders/addOrder/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(order),
      }
    );

    

    setLoading(true);
    setTimeout(() => {
      if (!response.ok === true) {
        setLoading(true);
      } else {
        setValidatePaiement(true);
        setTimeout(() => {
          window.location.href = "/";
          sessionStorage.clear();
        }, 4000);
      }
    }, 3000);

  };

  return typePaiement ? (
    <Container>
      <Content>
        {loading && (
          <Loading>
            {validatePaiement ? (
              <p>Votre commande a bien ete enregistrée</p>
            ) : (
              <div></div>
            )}
          </Loading>
        )}
        <form>
          <div>
            <h1>Paiement sécurisé par PayPal</h1>
          </div>

          <fieldset>
            <section>
              <div>
                <label htmlFor="PaypalAdress">Adresse paypal</label>
              </div>

              <div>
                <input
                  id="PaypalAdress"
                  name="PaypalAdress"
                  placeholder="123@gmail.com"
                  type="text"
                />
              </div>
            </section>

            <p>Total : {totallPrice} €</p>
            <ButtonForm>
              <button type="button" onClick={handleSubmit}>
                Payer
              </button>
              <Link to="/panier">Annuler</Link>
            </ButtonForm>
          </fieldset>
        </form>
      </Content>
    </Container>
  ) : (
    <Container>
      <Content>
        {loading && (
          <Loading>
            {validatePaiement ? (
              <p>Votre commande a bien ete enregistrée</p>
            ) : (
              <div></div>
            )}
          </Loading>
        )}
        <form>
          <div>
            <h1>Paiement sécurisé par carte</h1>
          </div>

          <fieldset>
            <section>
              <div>
                <label htmlFor="CardNumber">Numéro de carte</label>
              </div>

              <div>
                <input
                  id="CardNumber"
                  name="CardNumber"
                  placeholder="0000 0000 0000 0000"
                  type="tel"
                />
              </div>

              <div>
                <label htmlFor="DateExp">Date d'expiration</label>
              </div>
              <div>
                <input
                  id="DateExp"
                  name="DateExp"
                  placeholder="MM / YY"
                  type="tel"
                />
              </div>

              <div>
                <div>
                  <label htmlFor="SecurityNumber">CVV</label>
                </div>
                <div>
                  <input
                    id="SecurityNumber"
                    name="SecurityNumber"
                    placeholder="***"
                    type="tel"
                  />
                </div>
              </div>
            </section>

            <div>
              <label htmlFor="CardOwner">Titulaire de la carte</label>
            </div>
            <div>
              <input
                id="CardOwner"
                name="CardOwner"
                type="text"
                placeholder="Titulaire de la carte"
              />
            </div>
            <p>Total : {totallPrice} €</p>
            <ButtonForm>
              <button type="button" onClick={handleSubmit}>
                Payer
              </button>
              <Link to="/panier">Annuler</Link>
            </ButtonForm>
          </fieldset>
        </form>
      </Content>
    </Container>
  );
}

export default FinishPaiement;
