import styled from "styled-components";
import NewOrders from "./DashboardComponent/Commandes";
import TotalOrders from "./DashboardComponent/Ventes";
import Users from "./DashboardComponent/Users";
import Reclamation from "./DashboardComponent/Reclamation";
import GraphYear from "./DashboardComponent/GraphYear";
import GraphVisitors from "./DashboardComponent/GraphVisitors";
import GraphMonth from "./DashboardComponent/GraphMonth";
import GraphWeekly from "./DashboardComponent/GraphWeekly";
import OneLatestOrders from "./DashboardComponent/OneLatestOrders";
import { useState } from "react";
import Pagination from "./DashboardComponent/Pagination";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 10px 50px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  & > * {
    transition: 0.3s ease;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      transition: 0.3s ease-in-out;
    }
  }
`;

const MainSection = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: space-between;
`;

const Chart1 = styled.div`
  background-color: #fff;
  width: 60%;
  min-height: 500px;
  border-radius: 10px;
  padding: 10px;
`;
const Chart2 = styled.div`
  background-color: #fff;
  width: 30%;
  min-height: 400px;
  border-radius: 10px;
  padding: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;
  margin-right: 50px;

  button {
    border: none;
    padding: 10px;
    border-radius: 10px;
    background-color: #e5d1bc4a;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      transition: 0.3s ease-in-out;
      background-color: #e5d1bc;
      transform: translateY(2px);
    }
  }
`;

const LatestOrders = styled.div`
  background-color: #fff;
  width: 100%;
  min-height: 530px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  position: relative;

  & > :last-child {
    position: absolute;
    bottom: 0;
    right: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function Dashboard() {
  const [component, setComponent] = useState(<GraphYear />);
 
  const handelGraphComponent = (periode) => {
    switch (periode) {
      case "year":
        setComponent(<GraphYear />);
        break;
      case "month":
        setComponent(<GraphMonth />);
        break;
      case "weekly":
        setComponent(<GraphWeekly />);
        break;

      default:
        setComponent(<GraphYear />);
        break;
    }
  };
  return (
    <Container>
      <TopSection>
        <TotalOrders />
        <NewOrders />
        <Users />
        <Reclamation />
      </TopSection>

      <MainSection>
        <Chart1>
          <h2>Statistique</h2>
          <hr />
          <ButtonSection>
            <button onClick={() => handelGraphComponent("year")}>Année</button>
            <button onClick={() => handelGraphComponent("month")}>Mois</button>
            <button onClick={() => handelGraphComponent("weekly")}>
              Semaine
            </button>
          </ButtonSection>
          {component}
        </Chart1>
        <Chart2>
          <h2>Visiteurs</h2>
          <hr />
          <GraphVisitors />
        </Chart2>
      </MainSection>

      <LatestOrders>
        <h2>Dernières Commandes</h2>
        <hr />
        <div>
          <OneLatestOrders status="Livré" />
          <OneLatestOrders status="En cours" />
          <OneLatestOrders status="Annulée" />
          <OneLatestOrders status="Livré" />
          <OneLatestOrders status="Livré" />
          
        </div>
        <Pagination />
      </LatestOrders>
    </Container>
  );
}

export default Dashboard;
