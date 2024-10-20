import styled from "styled-components";
import { IoChevronBackOutline } from "react-icons/io5";
import OrdersForUser from "./OrdersForUser";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../../Assets/18830882_1200_B.jpg";
import ValidationChoise from "../../Modal/ValidationChoise";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const BackButton = styled.div`
  width: 120px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  background-color: hsl(226.32deg 52.29% 21.37%);
  color: white;
  font-size: 20px;
  margin: 10px 10px;
  border-radius: 10px;
  &:hover {
    background-color: hsl(226.32deg 52.29% 21.37%);
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  button {
    border: none;
    background-color: hsl(226.32deg 52.29% 21.37%);
    color: white;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transition: all 0.3s ease;
    }
  }
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: #e6e6e6;
`;
const InfoContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const Picture = styled.div`
  width: 300px;
  height: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid hsl(226.32deg 52.29% 21.37%);

  div {
    width: 80%;
    aspect-ratio: 1/1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: 5px solid hsl(226.32deg 52.29% 21.37%);
    }
  }
`;
const Info = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 100%;

  h2 {
    margin-bottom: 40px;
  }

  & > :nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px;

    div {
      width: 200px;
      margin-bottom: 20px;
      & > * {
        margin-bottom: 10px;
      }
    }
  }
`;

const ActionButton = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  button {
    width: 200px;
    height: 50px;
    background-color: hsl(226.32deg 52.29% 21.37%);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      opacity: 0.8;
      transition: all 0.3s ease;
    }
  }
`;

const ErrorDiv = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  p {
    width: 100%;
    word-wrap: break-word;
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;

  }
`;

function OneUserDetails() {
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const { email } = useParams();
const [modalValidation ,setModalValidation] = useState(false); 

  //get one user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/users/getOneUser/${email}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();

        if (data.message) {
          setErr(data.message);
        } else {
          setUser(data);
        }
      } catch (error) {
        setErr(error);
        console.error(error);
      }
    };

    fetchData();
  }, [email]);
  return (
    <Container>
      <BackButton onClick={() => window.history.back()}>
        <IoChevronBackOutline />
        <button>Retour</button>
      </BackButton>
      {!err ? (
        <Section>
          <InfoContainer>
            <Picture>
              <div>
                <img
                  src={
                    user.avatar
                      ? `${process.env.REACT_APP_URL_SERVER}/images/${user.avatar}`
                      : Logo
                  }
                  alt=""
                />
              </div>
              <h1>{user.name}</h1>
              <p>UserId: {user._id} </p>
              <p>Inscrit le: {user.createdAt && user.createdAt.toString().slice(0, 10)}</p> 
            </Picture>
            <Info>
              <h2>Informations</h2>
              <div>
                <div>
                  <p>Email:</p>
                  <p>{user.email}</p>
                  <p>Mail vérifié: {user.validateEmail ? "vérifié" : "non vérifié"}</p>
                 
                </div>
                <div>
                  <p>Phone:</p>
                  <p>{user.phone}</p>
                </div>

                <div>
                  <p>Adresse:</p>
                  <p>{user.address}</p>
                </div>
              </div>

              <ActionButton>
                <button onClick={() => setModalValidation(true)}>Supprimer le compte</button>
              </ActionButton>
            </Info>
          </InfoContainer>
          <OrdersForUser user={user} />
        </Section>
      ) : (
        <ErrorDiv>
          <p>{err}</p>
        </ErrorDiv>
      )}

      {modalValidation && <ValidationChoise setModalValidation={setModalValidation} userDeleteByEmail={user.email} />}
    </Container>
  );
}

export default OneUserDetails;
