import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  padding: 20px;
  margin-top: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
function RegisterNewUser() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
    password: "",
    confirmationPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmationPassword, ...rest } = formData;

    if (rest.name.length < 4) {
      setError("Le prénom doit contenir au moins 4 caractères.");
      return;
    }

    if (rest.lastName.length < 4) {
      setError("Le nom doit contenir au moins 4 caractères.");
      return;
    }

    if (rest.phone.length < 10) {
      setError("Le numéro de téléphone doit contenir au moins 10 caractères.");
      return;
    }

    if (rest.address.length < 5) {
      setError("L'adresse doit contenir au moins 5 caractères.");
      return;
    }

    if (password !== confirmationPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const dataSend = { password, ...rest };
    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      }
    );

    const data = await response.json();

    if (response.ok === true) {
      setError(data[0].message);
      setTimeout(() => {
        localStorage.setItem("token", data[2].token);
        localStorage.setItem("userId", data[1]._id);
        localStorage.setItem("email", data[1].email);
        localStorage.setItem("name", data[1].name);
        localStorage.setItem("lastName", data[1].lastName);
        localStorage.setItem("phone", data[1].phone);
        localStorage.setItem("address", data[1].address);
        window.location.href = "/monProfile";
      }, 2000);
      return;
    }
    setError(data.message);
  };

  return (
    <FormContainer>
      <FormTitle>Inscription</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Email :</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Prénom :</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Nom :</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Numéro de téléphone :</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Numéro de portable"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Adresse postale :</Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Adresse postale"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Mot de passe :</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Confirmer le mot de passe :</Label>
          <Input
            type="password"
            name="confirmationPassword"
            value={formData.confirmationPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            required
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">S'inscrire</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default RegisterNewUser;
