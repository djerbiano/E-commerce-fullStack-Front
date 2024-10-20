import styled from "styled-components";
import { useState, useEffect } from "react";
import Modal from "../Components/Modal/MessageFetch";
const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 850px) {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-top: 20px;
  & > * {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  & > :nth-child(2),
  & > :nth-child(4),
  & > :nth-child(6) {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:hover {
      border: 1px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }
  }
  & > :nth-child(8) {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    height: 100px;
    resize: none;
    &:hover {
      border: 1px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }
  }

  & > button {
    margin-left: auto;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #60c660b3;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: all 0.1s ease-in-out;
      border-radius: 0px;
    }
  }

  @media (max-width: 348px) {
    input {
      width: 100%;
    }
  }
`;

function SetReclamation() {
  const [email] = useState(localStorage.getItem("email"));
  const [commande, setCommande] = useState([]);
  const [data, setData] = useState(true);
  const [opModal, setOpModal] = useState(false);
  const [contentModal, setContentModal] = useState("");

  // Récuperation des numéros de commande
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
          setCommande(data);
        } else {
          setData(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllOrders();
    //eslint-disable-next-line
  }, [email]);

  // Envoi de la réclamation
  const sendReclamation = async (event) => {
    event.preventDefault();
    const form = event.target;

    const nom = form.nom.value;
    const email = form.email.value;
    const message = form.message.value;
    const commande = form.commande.value;

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/contact/reclamation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ nom, email, message, commande }),
      }
    );

    const data = await response.json();

    setOpModal(true);
    setContentModal(data.message);
  };

  return (
    <Container>
      <h3>Réclamation</h3>

      <Form onSubmit={sendReclamation}>
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          defaultValue={localStorage.getItem("name")}
          disabled
        />

        <label htmlFor="commande">Numéro de commande:</label>
        <select id="commande" required>
          {data ? (
            commande.map((numero) => (
              <option key={numero.trackingNumber} value={numero.trackingNumber}>
                {numero.trackingNumber}
              </option>
            ))
          ) : (
            <option disabled>Aucune commande</option>
          )}
          <option value="Autre">Autre</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          defaultValue={localStorage.getItem("email")}
          disabled
        />

        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="5" cols="30" required />

        <button type="submit"> Envoyer</button>
      </Form>
      {opModal && <Modal message={contentModal} setOpModal={setOpModal} />}
    </Container>
  );
}

export default SetReclamation;
