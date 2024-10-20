import styled from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
 
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  @media (max-width: 264px) {
    display: flex;
    flex-direction: column;
  }
`;
const ProductNavigation = styled.div`
  & > :nth-child(1),
  & > :nth-child(2) {
    cursor: pointer;
    font-size: 2rem;
    border: 1px solid;
    border-radius: 10px;
    margin: 10px;
    &:hover {
      color: #fff;
      background-color: hsl(226.32deg 52.29% 21.37%);
      transition: 0.5s;
    }
  }
`;

const ProductEditionLimitée = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const SingleProduct = styled.div`
  max-width: 20%;
  min-width: 20%;
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly; 
  padding: 10px;
  position: relative;
  margin-bottom: 30px;

  @media (max-width: 500px) {
    max-width: 90%;
    min-width: 90%;
  }

  &:hover {
    transform: scale(1.03);
    transition: all 0.2s;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: green;
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
 
    @media (max-width: 656px) {
    bottom: 90%;
    font-size: 25px;
  }
  @media (max-width: 500px) {
    bottom: 95%;
  }

    &:hover {
      scale: 1.2;
      transition: all 0.2s;

      & > * {
        fill: #fa5;
      }
    }
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
function EditionLimitée() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);

  const nextProduct = () => {
    const newPage = page + 1;
    const newLimit = limit;
    if (newPage <= Math.ceil(totalProduct / newLimit)) {
      setPage(newPage);
    }
  };

  const previousProduct = () => {
    const newPage = page - 1;
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  // get 4 product edition limitée
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/paginationProducts?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setProduct(data.products);
        setTotalProduct(data.totalCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, limit]);
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
      <Title>
        <h2>Édition Limitée</h2>
        <ProductNavigation>
          <MdKeyboardArrowLeft onClick={previousProduct} />
          <MdKeyboardArrowRight onClick={nextProduct} />
        </ProductNavigation>
      </Title>
      <ProductEditionLimitée>
        {product &&
          product.map((product) => (
            <SingleProduct key={product._id} >
              <ContainerPhoto>
                <img
                  src={`${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`}
                  alt={product.title}
                />
                <div>Limited</div>
                <GrFavorite title="Ajouter aux favoris"  onClick={() => addToFavorite(product._id)} />
              </ContainerPhoto>
              <h3>{product.title}</h3>
              <h4>{product.regularPrice} $</h4>
              <button   onClick={() => {
                navigate(`/singleProduct/${product._id}`);
              }} >Voir</button>
            </SingleProduct>
          ))}
      </ProductEditionLimitée>
    </Container>
  );
}

export default EditionLimitée;
