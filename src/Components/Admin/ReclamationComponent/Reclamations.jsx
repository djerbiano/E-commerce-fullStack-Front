import styled from "styled-components";
import { IoIosRefresh } from "react-icons/io";
import { useState, useEffect } from "react";
import FiltrerReclamation from "../ReclamationComponent/FiltrerReclamation";

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 20px;
  .errorMessage {
    display: ${({ err }) => (err ? "flex" : "none")};
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;

  button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: green;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background-color: rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
    }
  }

  & > :nth-child(2) {
    display: flex;
    align-items: center;

    svg {
      cursor: pointer;
      font-size: 25px;
      border: 1px solid black;
      transition: all 0.5s ease;
      border-radius: 5px;
      &:hover {
        transform: scale(1.3);
        transition: all 0.5s ease;
        background-color: green;
        color: white;
      }
    }
  }
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 16px;
  border-bottom: 1px solid gray;
  color: gray;
  p {
    text-align: center;
    font-weight: bold;
    width: 150px;
  }
`;

const SearchByNameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    padding: 10px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      background-color: #1a2753;
      color: white;
    }
  }
`;
const Order = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid gray;
  p {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    width: 150px;
  }

  button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: hsl(226.32deg 52.29% 21.37%);
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background-color: hsl(226.32deg 52.29% 21.37% / 65%);
      transition: all 0.5s ease;
    }
  }
`;
function Reclamations() {
  const [reclamations, setReclamations] = useState([]);
  const [filtredReclamations, setFiltredReclamations] = useState([]);
  const [finded, setFinded] = useState(false);
  const [searchReclamations, setSearchReclamations] = useState([]);
  const [reclamId, setReclamId] = useState("");
  const [err, setErr] = useState(false);
  const handleChange = (e) => {
    setReclamId(e.target.value);
  };

  const getOneReclamation = () => {
    if (!reclamId) {
      setFinded(false);
      setErr(false);
      setSearchReclamations([]);
    } else {
      fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/contact/suivi/oneReclamation/${reclamId}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFinded(true);
          setSearchReclamations(data);
          setErr(true);
        });
    }
  };
  // get all Reclamations
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_SERVER}/api/contact/suivi`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setFinded(false);
          setReclamations(data);
          setFiltredReclamations(data);
        } else {
          setErr(false);
          setReclamations(data);
        }
      });
  }, []);

  return (
    <Container>
      <Title>
        <h2>Réclamations</h2>
        <div onClick={() => window.location.reload()}>
          <IoIosRefresh />
        </div>
      </Title>
      <FiltrerReclamation
        reclamations={reclamations}
        setFiltredReclamations={setFiltredReclamations}
      />
      <SearchByNameContainer>
        <div>
          <input
            type="text"
            placeholder="Réclamation ID"
            onChange={handleChange}
          />
          <button type="button" onClick={getOneReclamation}>
            Trouver
          </button>
        </div>
      </SearchByNameContainer>
      <Header>
        <p>Réclamation ID</p>
        <p>Commande ID</p>
        <p>User ID</p>
        <p>Email</p>
        <p>Status</p>
        <p>Créer</p>
        <p>Consulter</p>
      </Header>
   
      {!finded && reclamations.length > 0 ? (
        filtredReclamations.map((reclamation) => {
          const Création = reclamation.createdAt
            ? new Date(reclamation.createdAt)
            : null;
          return (
          
            <Order key={reclamation._id}>
              <p>{reclamation._id}</p>
              <p>{reclamation.order._id}</p>
              <p>{reclamation.order.user}</p>
              <p>{reclamation.order.email}</p>
              <p>{reclamation.status}</p>
              <p>{Création ? Création.toLocaleString() : "N/D"}</p>
              <p>
                <button
                  onClick={() =>
                    window.open(
                      `/admin/réclamations/oneReclamation/${reclamation._id}`,
                      "_blank"
                    )
                  }
                >
                  Voir
                </button>
              </p>
            </Order>
          );
        })
      ) : (
        <p
          style={{
            textAlign: "center",
            padding: "10px",
            marginTop: "10px",
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          className={err ? "errorMessage" : ""}
        >
          {reclamations.message}
        </p>
      )}
      {finded && !searchReclamations.message ? (
        <Order key={searchReclamations._id}>
          <p>{searchReclamations._id}</p>
          <p>{searchReclamations.order._id}</p>
          <p>{searchReclamations.order.user}</p>
          <p>{searchReclamations.order.email}</p>
          <p>{searchReclamations.status}</p>
          <p>
            {searchReclamations
              ? searchReclamations.createdAt.toLocaleString()
              : "N/D"}
          </p>

          <p>
            <button
              onClick={() =>
                window.open(
                  `/admin/réclamations/oneReclamation/${searchReclamations._id}`,
                  "_blank"
                )
              }
            >
              Voir
            </button>
          </p>
        </Order>
      ) : (
        <p
          style={{
            textAlign: "center",
            padding: "10px",
            marginTop: "10px",
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {searchReclamations.message}
        </p>
      )}
    </Container>
  );
}

export default Reclamations;
