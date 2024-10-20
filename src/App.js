import { AuthProvider } from "./Context/AuthContext";
import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuHambContext } from "./Context/MenuHambContext";
import styled from "styled-components";
import Headers from "./Containers/Headers";
import Footer from "./Containers/Footer";
import Main from "./Containers/Main";
import FilterProducts from "./Containers/FilterProducts";
import SingleProduct from "./Containers/SingleProduct";
import MyProfile from "./Containers/MyProfile";
import MesCommandes from "./Containers/MesCommandes";
import Reclamations from "./Containers/Reclamations";
import OneTrakingsReclamation from "./Components/Admin/ReclamationComponent/OneTrakingsReclamation.jsx";
import NousContacter from "./Components/NousContacter";
import PanierContent from "./Containers/PanierContent";
import NotFound404 from "./Components/NotFound404";
import FavoContent from "./Components/FavoContent";
import Admin from "./Containers/Admin";
import OneUserDetails from "./Components/Admin/UsersComponents/OneUserDetails";
import OneProduct from "./Components/Admin/ProductsComponent/OneProduct";
import OneTrakingsCommande from "./Components/Admin/TrakingsComponent/OneTrakingsCommande";
import MainPaiement from "./Components/paiement/MainPaiement";
import RegisterNewUser from "./Components/Register/RegisterNewUser.jsx";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const handleStorageChange = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    sessionStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
    // eslint-disable-next-line
  }, []);

  //get cart
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuHambContext.Provider value={{ open, setOpen }}>
          <AppContainer>
            <Headers cart={cart} />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/produits" element={<FilterProducts />} />
              <Route path="/singleProduct/:id" element={<SingleProduct />} />
              <Route path="/monProfile" element={<MyProfile />} />
              <Route path="/register" element={<RegisterNewUser />} />
              <Route path="/mesCommandes" element={<MesCommandes />} />
              <Route path="/réclamations" element={<Reclamations />} />
              <Route path="/nousContacter" element={<NousContacter />} />
              <Route path="/panier" element={<PanierContent cart={cart} />} />
              <Route path="/paiement" element={<MainPaiement cart={cart} />} />
              <Route path="/favoris" element={<FavoContent />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<Admin />} />
              <Route path="/admin/users" element={<Admin />} />
              <Route
                path="/admin/réclamations/oneReclamation/:id"
                element={<OneTrakingsReclamation />}
              />
              <Route
                path="/admin/users/oneUser/:email"
                element={<OneUserDetails />}
              />
              <Route path="/admin/products" element={<Admin />} />
              <Route
                path="/admin/products/oneProduct/:id"
                element={<OneProduct />}
              />
              <Route path="/admin/stocks" element={<Admin />} />
              <Route path="/admin/trackings" element={<Admin />} />
              <Route
                path="/admin/trackings/oneTracking/:id"
                element={<OneTrakingsCommande />}
              />
              <Route path="/admin/orders" element={<Admin />} />
              <Route path="/admin/reclamations" element={<Admin />} />

              <Route path="*" element={<NotFound404 />} />
            </Routes>
            <Footer />
            <Analytics />
          </AppContainer>
        </MenuHambContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
