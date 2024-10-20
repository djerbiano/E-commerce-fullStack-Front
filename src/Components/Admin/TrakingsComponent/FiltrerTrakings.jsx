import styled from "styled-components";

const Container = styled.div`
  position: relative;
 

  & > :last-child {
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: 1px solid;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      transition: all 0.5s ease;
    }
  }
`;

function FiltrerTrakings({ orders, setFiltredOrders }) {
  const handleCategory = (status) => {
    if (status === "All") {
      setFiltredOrders(orders);
    } else {

      if (!orders.message){
      const filtered = orders.filter((order) => order.status === status);
      setFiltredOrders(filtered);
      } else {
        alert(orders.message);
      }
    }
  };
  return (
    <Container>
      <select
        id="selectCategory"
        onChange={(e) => handleCategory(e.target.value)}
      >
        <option value="All">Select Category</option>
        <option value="payée">payée</option>
        <option value="expédiée">expédiée</option>
        <option value="reçue">reçue</option>
      </select>
    </Container>
  );
}

export default FiltrerTrakings;
