import styled from "styled-components";
import { GrFavorite } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: start;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-height: 900px;
  overflow-x: auto;
  overflow-y: scroll;
  padding: 0px 30px;
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  @media (max-width: 500px) {
    overflow-x: hidden;
  }
`;
const SingleProduct = styled.div`
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
  margin: 20px 0px;

  @media (max-width: 500px) {
    max-width: 90%;
    min-width: 90%;
  }

  &:hover {
    transform: scale(1.03);
    transition: all 0.2s;
  }

  & > h4 {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 20px;
    height: 100%;
  }

  button {
    background-color: #ffaa55;
    color: #ffffff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;

    &:hover {
      background-color: #1a2753;
    }
  }
`;

const ContainerPhoto = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  & > :first-child {
    object-fit: contain;
    border-radius: 10px;
    width: 100%;
    aspect-ratio: 1;
    @media (max-width: 500px) {
      width: 70vw;
    }
  }

  & > :nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 20px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: white;
    rotate: 40deg;
    font-weight: bold;
    border-radius: 0 10px 0 10px;
    margin-top: 20px;

    @media (min-width: 501px) and (max-width: 660px) {
      width: auto;
      padding: 5px;
      font-size: 2vw;
      transition: all 0.5s;
    }
  }

  & > :last-child {
    position: absolute;
    bottom: 5px;
    right: 0;
    font-size: 30px;
    cursor: pointer;

    &:hover {
      scale: 1.2;
      transition: all 0.2s;

      & > * {
        fill: #fa5;
      }
    }

    @media (max-width: 980px) {
      position: absolute;
      top: 5px;
      right: 0;
      font-size: 20px;
    }
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  & > :first-child {
    text-decoration: line-through;
    color: gray;
  }
`;

function Soldes() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  // get product soldé
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();

        if (data.length > 0) {
          const onSaleProducts = data.filter(
            (product) => product.isOnSale === true
          );

          setProduct((prevProduct) => {
            const newProducts = onSaleProducts.filter(
              (newProduct) =>
                !prevProduct.some(
                  (existingProduct) => existingProduct.id === newProduct.id
                )
            );
            return [...prevProduct, ...newProducts];
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  
  // Ajouter au favoris
  const addToFavorite = async (productId) => {
    try {
      const idProduct = productId;

      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/products/addFavoritesProducts/${idProduct}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
   

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      {product &&
        product.map((product) => (
          <SingleProduct key={product._id} >
            <ContainerPhoto>
              <img
                src={`${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`}
                alt={product.title}
              />
              <div>Soldé</div>
              <GrFavorite title="Ajouter aux favoris"  onClick={() => addToFavorite(product._id)} />
            </ContainerPhoto>
            <h4>{product.title}</h4>

            <Price>
              <h4>{product.regularPrice} $</h4>
              <h4>{product.salePrice} $</h4>
              
            </Price>
            <button   onClick={() => {
              navigate(`/singleProduct/${product._id}`);
            }} >Voir</button>
          </SingleProduct>
        ))}
    </Container>
  );
}

export default Soldes;
