import React, { useState } from "react";
import visaCardLogo from "../../Assets/vitrophanie-CB-1.jpg";
import paypalLogo from "../../Assets/Paypal_2014_logo.jpg";
import FinishPaiementModal from "./FinishPaiement.jsx";

import styled from "styled-components";

const MainContainer = styled.main`
   max-width: 400px;
  padding: 20px;
  margin-top: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
margin-bottom: 15px;
`;

const Input = styled.input`
 width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Asterisk = styled.span`
  color: red;
  margin-left: 0.25rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const PaymentIcon = styled.img`
  margin: 8px 8px 8px 0;
  width: 100px;
  height: 100px;
  object-fit: contain;
  cursor: pointer;
  //border:2px black solid;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
  border-radius: 5px;
`;

function MainPaiement({ cart }) {
  const [modalFinishPaiement, setModalFinishPaiement] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [conditionsConsent, setConditionsConsent] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const [dataOrder, setDataOrder] = useState(null);

  const total = cart.reduce(
    (acc, product) =>
      acc +
      (product.quant >= 1 ? product.price * product.quant : product.price * 1),

    0
  );

  // Fonction de soumission du formulaire

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation basique
    if (!email || !firstName || !lastName || !address1 || !zipcode || !city) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Collecte des données
    let formData = {
      email,
      firstName,
      lastName,
      address1,
      address2,
      zipcode,
      city,
      phoneNumber,
      conditionsConsent,
      selectedPayment,
    };
    setDataOrder(formData);
    setModalFinishPaiement(true);
  };

  return (
    <MainContainer>
      <Section>
        <SectionHeader>
          <SectionTitle>Contact</SectionTitle>
        </SectionHeader>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="email">
                E-mail<Asterisk>*</Asterisk>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                aria-label="E-mail"
                aria-required="true"
                required
                autoComplete="email"
                maxLength="50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormGroup>
          </FormRow>
          <Section>
            <SectionHeader>
              <SectionTitle>Adresse</SectionTitle>
            </SectionHeader>
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">
                  Prénom<Asterisk>*</Asterisk>
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  aria-label="Prénom"
                  aria-required="true"
                  required
                  autoComplete="given-name"
                  maxLength="15"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Prénom"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">
                  Nom<Asterisk>*</Asterisk>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  aria-label="Nom"
                  aria-required="true"
                  required
                  autoComplete="family-name"
                  maxLength="20"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Nom"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup style={{ flex: "1 1 100%", marginRight: "0" }}>
                <Label htmlFor="address1">
                  Adresse<Asterisk>*</Asterisk>
                </Label>
                <Input
                  type="text"
                  id="address1"
                  name="address1"
                  aria-label="Adresse"
                  aria-invalid={!address1}
                  aria-required="true"
                  required
                  autoComplete="street-address"
                  maxLength="70"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="Adresse postale"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="address2">Complément adr.</Label>
                <Input
                  type="text"
                  id="address2"
                  name="address2"
                  aria-label="Complément adr."
                  autoComplete="address-line2"
                  maxLength="70"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  placeholder="Ex. Société, App., Unité"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="zipcode">
                  Code postal<Asterisk>*</Asterisk>
                </Label>
                <Input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  aria-label="Code postal"
                  aria-required="true"
                  required
                  autoComplete="postal-code"
                  maxLength="10"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="ex : 12345"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="city">
                  Ville<Asterisk>*</Asterisk>
                </Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  aria-label="Ville"
                  aria-required="true"
                  required
                  autoComplete="address-level2"
                  maxLength="25"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ville"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup style={{ flex: "1 1 100%", marginRight: "0" }}>
                <Label htmlFor="phoneNumber">Téléphone (Facultatif)</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  aria-label="Téléphone (Facultatif)"
                  aria-required="false"
                  autoComplete="tel"
                  maxLength="25"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Numéro de téléphone"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <strong>Pays:</strong>&nbsp; <span>France</span>
            </FormRow>
            <CheckboxContainer>
              <CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  checked={conditionsConsent}
                  onChange={(e) => setConditionsConsent(e.target.checked)}
                />
                <p>J'accepte les conditions de vente </p>
              </CheckboxLabel>
            </CheckboxContainer>
          </Section>

          {/* Sections Livraison et Paiement */}

          <Section>
            <SectionHeader>
              <SectionTitle>Paiement</SectionTitle>
            </SectionHeader>
            <PaymentMethods>
              {/* Icônes des méthodes de paiement */}

              <PaymentIcon
                alt="visa"
                src={visaCardLogo}
                selected={selectedPayment === "visa"}
                onClick={() => setSelectedPayment("visa")}
              />
              <PaymentIcon
                alt="PAYPAL"
                src={paypalLogo}
                selected={selectedPayment === "paypal"}
                onClick={() => setSelectedPayment("paypal")}
              />
            </PaymentMethods>

            {/* Bouton Soumettre */}
            <SubmitButton type="submit">Payer</SubmitButton>
          </Section>
        </Form>
      </Section>

      {modalFinishPaiement && (
        <FinishPaiementModal
          totallPrice={total}
          dataOrder={dataOrder}
          cart={cart}
        />
      )}
    </MainContainer>
  );
}

export default MainPaiement;
