import styled from "styled-components";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  position: relative;

  div {
    min-width: 100%;
    min-height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 70%;
    aspect-ratio: 1;
    object-fit: contain;
  }
  & > :last-child {
    position: absolute;
    top: 10px;
    right: 20px;
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

  h3 {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    height: 30px;
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

function TopVente({ productTopVent }) {
  const navigate = useNavigate();
  const Product =
    productTopVent && productTopVent.length > 0 ? productTopVent[0] : null;

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
    <Container
    
    >
      <div>
        <img
          src={
            Product &&
            `${process.env.REACT_APP_URL_SERVER}/images/${Product.pictures.pic1}`
          }
          alt={Product && Product.title}
        />
      </div>
      <h3>{Product && Product.title}</h3>
      <h4>{Product && Product.regularPrice} $</h4>
      <button   onClick={() => {
        navigate(`/singleProduct/${Product._id}`);
      }} >Voir</button>
      <GrFavorite
        title="Ajouter aux favoris"
        onClick={() => addToFavorite(Product._id)}
      />
    </Container>
  );
}

export default TopVente;
