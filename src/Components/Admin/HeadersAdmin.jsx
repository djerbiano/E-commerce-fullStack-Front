import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdOutlineEuroSymbol } from "react-icons/md";
import { FaStarHalfAlt } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";

const Container = styled.div`
  min-height: 500px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  background-color: hsl(226.32deg 52.29% 21.37%);
  border-radius: 0px 0px 10px 0px;
  position: relative;
  z-index: 1;

  & > div {
    width: 50px;

    & > * {
      & > p {
        color: transparent;
      }
    }

    &:hover {
      width: 100%;
      transition: all 0.9s ease;

      & > * {
        & > p {
          color: white !important;
        }
      }
    }
  }

  & > :nth-child(2) {
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    position: absolute;
    bottom: 5px;

    & > svg {
      animation: menuHamburger 3s linear infinite;

      @keyframes menuHamburger {
        0% {
          transform: translateY(0%);
        }

        50% {
          transform: translateY(30%);
        }

        100% {
          transform: translateY(0%);
        }
      }
    }
  }
`;

const LinkItems = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 10px;
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  width: 150px;

  &:hover {
    background-color: #fa5;
    color: white;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  & > svg {
    font-size: 30px;
  }
`;

function HeadersAdmin() {
  return (
    <Container>
      <div>
        <LinkItems to="/admin/dashboard">
          <AiOutlineDashboard />
          <p>Dashboard</p>
        </LinkItems>
        <LinkItems to="/admin/users">
          <FaRegUser />
          <p>Users</p>
        </LinkItems>
        <LinkItems to="/admin/products">
          <BsCartCheck />
          <p>Products</p>
        </LinkItems>
        <LinkItems to="/admin/stocks">
          <GiCardboardBoxClosed />
          <p>Stocks</p>
        </LinkItems>
        <LinkItems to="/admin/trackings">
          <GiCommercialAirplane />
          <p>Trackings</p>
        </LinkItems>
        <LinkItems to="/admin/orders">
          <MdOutlineEuroSymbol />
          <p>Orders</p>
        </LinkItems>
        <LinkItems to="/admin/reclamations">
          <FaStarHalfAlt />
          <p>Réclamations</p>
        </LinkItems>
      </div>
      <div>
        <RiMenu3Fill />
      </div>
    </Container>
  );
}

export default HeadersAdmin;
