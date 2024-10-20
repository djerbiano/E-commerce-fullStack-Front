import styled from "styled-components";
import { IoIosRefresh } from "react-icons/io";
import { useState } from "react";
const Container = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 20px;
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
    cursor: pointer;
    font-size: 14px;
    width: 150px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

function Trackings() {
  const [finded, setFinded] = useState(false);
  const [searchOrder, setSearchOrder] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const getOneOrder = () => {
    if (!trackingNumber) {
      setFinded(false);
      setSearchOrder([]);
    } else {
      fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/orders/${trackingNumber}`,
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
          setSearchOrder(data);
        });
    }
  };

  return (
    <Container>
      <Title>
        <h2>Trackings</h2>
        <div onClick={() => window.location.reload()}>
          <IoIosRefresh />
        </div>
      </Title>

      <SearchByNameContainer>
        <div>
          <input
            type="text"
            placeholder="Tracking number"
            onChange={handleChange}
          />
          <button type="button" onClick={getOneOrder}>
            Trouver
          </button>
        </div>
      </SearchByNameContainer>
      <Header>
        <p>Order ID</p>
        <p>Traking number</p>
        <p>User ID</p>
        <p>Status</p>
        <p>BillingAddress</p>
        <p>ShippingAddress</p>
        <p>CreatedAt</p>
        <p>Total</p>
      </Header>

      {finded && !searchOrder.message ? (
        <Order
          onClick={() =>
            window.open(
              `/admin/trackings/oneTracking/${searchOrder.trackingNumber}`,
              "_blank"
            )
          }
        >
          <p>{searchOrder._id}</p>
          <p>{searchOrder.trackingNumber}</p>
          <p>{searchOrder._id}</p>
          <p>{searchOrder.status}</p>
          <p>{searchOrder.billingAddress}</p>
          <p>{searchOrder.shippingAddress}</p>
          <p>{searchOrder.createdAt}</p>
          <p>{searchOrder.total}</p>
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
          {searchOrder.message || "Veuillez entrer un numero de tracking"}
        </p>
      )}
    </Container>
  );
}

export default Trackings;
