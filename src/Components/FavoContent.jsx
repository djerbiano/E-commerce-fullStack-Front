import styled from "styled-components";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
  padding: 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    max-width: 80%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  button {
    background-color: #ffaa55;
    color: #ffffff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1a2753;
    }
  }

  & > :last-child {
    color: #ff0000;
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    top: 2%;
    right: 2%;

    &:hover {
      box-shadow: 0 0 5px black;
      transform: scale(1.1);
      transition: all 0.3s;
      border-radius: 50px;
    }
  }
`;

const FavoContent = () => {
  const [favoriteListe, setFavoriteListe] = useState([]);
  //Get all favorite products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/users/favoritesProducts`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        setFavoriteListe(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // delete favorite product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/products/deleteFavoritesProducts/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FavoritesContainer>
      <h2>Produits Favoris</h2>

      {favoriteListe && favoriteListe.length > 0 ? (
        <ProductContainer>
          {favoriteListe.map((product) => (
            <ProductCard key={product._id}>
              <div>
                <img
                  src={
                    product &&
                    `${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`
                  }
                  alt={product && product.title}
                />
              </div>
              <div>
                <h3>{product && product.title}</h3>
              </div>
              <p>
                {product.salePrice ? product.salePrice : product.regularPrice}€
              </p>
              <div>
                <button onClick={() => window.location.href = `/singleProduct/${product._id}`}>Voir</button>
              </div>

              <MdDeleteForever onClick={() => handleDelete(product._id)} />
            </ProductCard>
          ))}
        </ProductContainer>
      ) : (
        <p>Aucun produit favoris trouvé.</p>
      )}
    </FavoritesContainer>
  );
};

export default FavoContent;
