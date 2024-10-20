import { useState } from "react";
import styled from "styled-components";
import Modal from "../Components/Modal/MessageFetch";
const Container = styled.div`
  width: 80%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;

  & > h3 {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  & > * {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  & > :nth-child(2),
  & > :nth-child(4) {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    min-width: 50%;
    font-size: 1rem;
    @media (max-width: 360px) {
      width: 100%;
      
    }

    &:hover {
      border: 1px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }
  }
  & > :nth-child(6) {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 70%;
    height: 200px;
    resize: none;
    &:hover {
      border: 1px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }

    @media (max-width: 1500px) {
      width: 100%;
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
`;

function NousContacter() {
  const [opModal, setOpModal] = useState(false);
  const [contentModal, setContentModal] = useState("");
  const sendMessage = async (event) => {
    event.preventDefault();
    const form = event.target;

    const nom = form.nom.value;
    const email = form.email.value;
    const message = form.message.value;

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, email, message }),
      }
    );

    const data = await response.json();

    setOpModal(true);
    setContentModal(data.message);
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };
  return (
    <Container>
      <h3>Nous contacter</h3>

      <Form onSubmit={sendMessage}>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="5" cols="30" required />

        <button type="submit">Envoyer</button>
      </Form>
      {opModal && <Modal message={contentModal} setOpModal={setOpModal} />}
    </Container>
  );
}

export default NousContacter;
