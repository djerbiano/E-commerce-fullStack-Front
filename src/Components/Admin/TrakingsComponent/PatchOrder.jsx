import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 54%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  width: 50%;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    & > :first-child {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      
    }
    select {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid gray;
      outline: none;
      width: 100%;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10px;
    }

    button {
      padding: 10px;
      margin-left: 20px;
      border-radius: 5px;
      border: none;
      color: white;
      background-color: green;
      cursor: pointer;
      width: 100px;
      transition: 0.3s;
      &:hover {
        background-color: darkgreen;
        transition: 0.3s;
      }
    }
  }
`;

function PatchOrder({ setModalPatchOrder, patchOrderDetails }) {
  const [opModal, setOpModal] = useState(true);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState({});
  const [dataReady, setDataReady] = useState(false);

  //Get order details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/orders/${patchOrderDetails}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setOrder(data);
        setDataReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [patchOrderDetails]);

  //Patch order
  const handleSubmit = async () => {
    try {
      const dataform = document.getElementById("patchOrderStatus").value;

      const requestData = {
        status: dataform,
        statusHistory: [{ status: dataform }],
      };

      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/orders/updateOrder/${patchOrderDetails}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setOpModal(true);
        setMessage(error.message);
      }
      const data = await response.json();
      console.log(data);
      setOpModal(true);
      setMessage("Le statut a été modifiée avec succès");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  if (!dataReady) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Content>
        <div className="form">
          <p>Status actuel : {order.status}</p>
          <select
            id="patchOrderStatus"
            name="status"
            defaultValue={order.status}
          >
            <option value="Veuillez choisir un statut">
              Modifier le status
            </option>
            <option value="payée">payée</option>
            <option value="expédiée">expédiée</option>
            <option value="reçue">reçue</option>
          </select>
          {opModal && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
          <div>
            <button
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>

            <button type="button" onClick={() => setModalPatchOrder(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default PatchOrder;
