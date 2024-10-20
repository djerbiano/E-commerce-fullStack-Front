import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "../Admin/Dashboard";
import Users from "../Admin/Users";
import Products from "../Admin/Products";
import Stocks from "../Admin/Stocks";
import Trackings from "../Admin/Trackings";
import Orders from "../Admin/Orders";
import Reclamations from "./ReclamationComponent/Reclamations";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function MainAdmin() {
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // get admin
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          navigate("/");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/auth/verifIsAdmin`,
          {
            method: "GET",
            headers: {
              token: token,
              iduser: userId,
            },
          }
        );

        const result = await response.json();

        if (result.message === true) {
          switch (path) {
            case "/admin/dashboard":
              setComponent(<Dashboard />);
              break;
            case "/admin/users":
              setComponent(<Users />);
              break;
            case "/admin/products":
              setComponent(<Products />);
              break;
            case "/admin/stocks":
              setComponent(<Stocks />);
              break;
            case "/admin/trackings":
              setComponent(<Trackings />);
              break;
            case "/admin/orders":
              setComponent(<Orders />);
              break;
            case "/admin/reclamations":
              setComponent(<Reclamations />);
              break;
            default:
              setComponent(<Dashboard />);
              break;
          }
        } else {
          console.log("Not admin");
          navigate("/");
        }
      } catch (error) {
        console.error("Error catch:", error);
        navigate("/");
      }
    };

    checkAdmin();
    // eslint-disable-next-line
  }, [path]);
  return <Container>{component}</Container>;
}

export default MainAdmin;
