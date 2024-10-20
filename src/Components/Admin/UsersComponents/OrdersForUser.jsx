import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
`;

const ContainerInfo = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  p {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: gray;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  cursor: pointer;
  transition: all 0.5s ease;
  p {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
  }
`;
function OrdersForUser({ user }) {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  //get orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.email) {
          const response = await fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/orders/user/${user.email}`,
            {
              method: "GET",
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          const data = await response.json();
          if (data.message || data.length === 0) {
            setErr(data.message);
          } else {
            setOrders(data);
          }
        }
      } catch (error) {
        setErr(error);
        console.error(error);
      }
    };

    fetchData();
  }, [user]);
  return (
    <Container>
      <h2>Liste des commandes</h2>
      <ContainerInfo>
        <Header>
          <p>TrackingNumber</p>
          <p>Date</p>
          <p>Paiement</p>
          <p>Status</p>
          <p>Total</p>
        </Header>

        {!err ? (
          orders.map((order) => (
            <Content
              key={order._id}
              onClick={() =>
                window.open(
                  `/admin/trackings/oneTracking/${order.trackingNumber}`,
                  "_blank"
                )
              }
            >
              <p>{order.trackingNumber}</p>
              <p>{order.createdAt.toString().slice(0, 10)}</p>
              <p>**** **** **** 7852</p>
              <p>{order.status}</p>
              <p>{order.total} $</p>
            </Content>
          ))
        ) : (
          <p>{err}</p>
        )}
      </ContainerInfo>
    </Container>
  );
}

export default OrdersForUser;
