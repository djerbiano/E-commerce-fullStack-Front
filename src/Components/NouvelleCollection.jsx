import styled from "styled-components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TopVente from "./TopVente";
import { useEffect, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const ContainerTopVente = styled.div`
  width: 30%;
  max-width: 400px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to right, #ffaa55, #fbd2c7);
  border-radius: 10px;
  & > :nth-child(1) {
    & > :nth-child(2) {
      & > * {
        &:hover {
          background-color: transparent;
          color: black;
          transform: scale(1.2);
        }
      }
    }
  }
  @media (max-width: 930px) {
    display: none;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  h2 {
  }

  @media (max-width: 264px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContainerNouvelleCollection = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 930px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: max-content;
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

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SingleProduct = styled.div`
  max-width: 33%;
  min-width: 33%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  h2 {
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }

  div {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
      width: 100vw;
    }

    img {
      object-fit: contain;
      border-radius: 10px;
      width: 70%;
      aspect-ratio: 1;
    }
  }

  &:hover {
    transform: scale(1.03);
    transition: all 0.2s;
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

  & > :last-child {
    position: absolute;
    top: 0px;
    right: 5px;
    font-size: 30px;
    cursor: pointer;

    &:hover {
      scale: 1.2;
      transition: all 0.2s;

      & > * {
        fill: #fa5;
      }
    }
  }

  @media (max-width: 500px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

function NouvelleCollection() {
  const navigate = useNavigate();
  const [productTopVent, setProductTopVent] = useState([]);
  const [totalProduct, setTotalProduct] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(1);
  const [pageNouvelleCollection, setPageNouvelleCollection] = useState(1);
  const [limitNouvelleCollection] = useState(3);
  const [totalProductNouvelleCollection, setTotalProductNouvelleCollection] =
    useState(3);
  const [productNouvelleCollection, setProductNouvelleCollection] = useState(
    []
  );

  const nextProductTopVente = () => {
    const newPage = page + 1;
    const newLimit = limit;
    if (newPage <= Math.ceil(totalProduct / newLimit)) {
      setPage(newPage);
    }
  };

  const previousProductTopVente = () => {
    const newPage = page - 1;
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  const nextProductNouvelleCollection = () => {
    const newPage = pageNouvelleCollection + 1;
    const newLimit = limitNouvelleCollection;
    if (newPage <= Math.ceil(totalProductNouvelleCollection / newLimit)) {
      setPageNouvelleCollection(newPage);
    }
  };

  const previousProductNouvelleCollection = () => {
    const newPage = pageNouvelleCollection - 1;
    if (newPage >= 1) {
      setPageNouvelleCollection(newPage);
    }
  };

  // get one product top vente
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
        setProductTopVent(data.products);
        setTotalProduct(data.totalCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, limit]);

  // get 3 product NouvelleCollection
  useEffect(() => {
    const fetchData = async () => {
   
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/paginationProducts?page=${pageNouvelleCollection}&limit=${limitNouvelleCollection}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();

        setProductNouvelleCollection(data.products);
        setTotalProductNouvelleCollection(data.totalCount);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  
  }, [pageNouvelleCollection, limitNouvelleCollection]);


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
      <ContainerTopVente>
        <Title>
          <h2>Top Vente</h2>
          <ProductNavigation>
            <MdKeyboardArrowLeft onClick={previousProductTopVente} />
            <MdKeyboardArrowRight onClick={nextProductTopVente} />
          </ProductNavigation>
        </Title>
        <TopVente productTopVent={productTopVent} />
      </ContainerTopVente>
      <ContainerNouvelleCollection>
        <Title>
          <h2>Nouvelle Collection</h2>
          <ProductNavigation>
            <MdKeyboardArrowLeft onClick={previousProductNouvelleCollection} />
            <MdKeyboardArrowRight onClick={nextProductNouvelleCollection} />
          </ProductNavigation>
        </Title>
        <ProductsContainer>
          {productNouvelleCollection &&
          
            productNouvelleCollection.map((productNouvelleCollection) => (
           

              <SingleProduct key={productNouvelleCollection._id}>
                <div>
                  <img
                    src={`${process.env.REACT_APP_URL_SERVER}/images/${productNouvelleCollection.pictures.pic1}`}
                    alt={productNouvelleCollection.title}
                  />
                </div>
                <h2>{productNouvelleCollection.title}</h2>
                <h4>{productNouvelleCollection.regularPrice} $</h4>
                <button
                  onClick={() => {
                    navigate(`/singleProduct/${productNouvelleCollection._id}`);
                  }}
                >
                  Voir
                </button>
                <GrFavorite
                  title="Ajouter aux favoris"
                  onClick={() => addToFavorite(productNouvelleCollection._id)}
                />
              </SingleProduct>
            ))}
        </ProductsContainer>
      </ContainerNouvelleCollection>
    </Container>
  );
}

export default NouvelleCollection;
