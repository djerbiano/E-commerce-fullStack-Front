import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/verifInformationSessionStorage`,
        {
          method: "POST",
          headers: {
            token: token,
            idd: userId,
          },
        }
      );
      const result = await response.json();

      setIsAuthenticated(result.message);
    };

    checkTokenValidity();

    window.addEventListener("storage", checkTokenValidity());

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
