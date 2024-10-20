import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  width: 90vw;

  * > img {
    cursor: pointer;
    border-radius: 10px;

    @media (max-width: 300px) {
      width: 80vw !important;
    }
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 20px;
  padding: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ContainerPhoto = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    justify-content: space-evenly;
  }

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;

    & > :nth-child(1) {
      display: flex;
      flex-direction: row;
      margin: 20px;

      & > img {
        margin-right: 5px;
      }
    }
  }
`;
const AllPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  & img {
    width: 100px;
    aspect-ratio: 1;
    margin-bottom: 10px;
    object-fit: contain;
    &:hover {
      border: 1px solid black;
    }

    @media (max-width: 300px) {
      width: 25vw !important;
      margin-right: 10px;
    }
  }
`;
const SinglePicture = styled.div`
  width: 400px;
  height: 300px;
  margin-left: 20px;
  & img {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
  }
`;
const ContainerByProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 30%;
  min-height: 400px;
  font-size: 1.2rem;
  margin-bottom: 20px;

  & > :nth-child(2) {
    min-width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    & > :nth-child(1) {
      margin-right: 20px;
    }
  }

  & > :nth-child(4),
  & > :nth-child(6) {
    padding: 5px;
    border-radius: 10px;
  }
  & > :nth-child(7) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    & > :nth-child(2) {
      margin-top: 10px;
      text-align: center;
      padding: 5px;
      border-radius: 5px;
    }
  }

  @media (max-width: 800px) {
    font-size: 1rem;
    width: 100%;
    align-items: center;

    h2 {
      font-size: 1.2rem;
    }

    & > * {
      display: flex;
      & > * {
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 360px) {
    & > :nth-child(1) {
      font-size: 8vw;
    }
  }
  @media (max-width: 200px) {
    & > :nth-child(4),
    & > :nth-child(6) {
      width: 100%;
    }

    & > :nth-child(7) {
      & > :nth-child(2) {
        width: 100%;
        text-align: center;
      }
    }
  }
  & > :nth-child(8) {
    padding: 10px;
    border-radius: 10px;
    margin: 0 0 20px 20px;
    &:hover {
      cursor: pointer;
      background-color: black;
      color: white;
      font-weight: bold;
    }
  }
`;

const ProductDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
  padding: 10px;

  & > * {
    width: 40%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

const DetailsProduct = styled.div`
  padding: 10px;
  * {
    margin-bottom: 10px;
  }

  & h3 {
    margin-left: -20px;
  }
`;
const EntretienProduct = styled.div`
  padding: 10px;
  * {
    margin-bottom: 10px;
  }
  & h3 {
    margin-left: -20px;
  }
`;
function SingleProduct() {
  const { id } = useParams();
  const [pictureView, setPictureView] = useState("");
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(""); // eslint-disable-line
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedQuantityClient, setSelectedQuantityClient] = useState(1);
  const [selectedColorClient, setSelectedColorClient] = useState("");
  const [selectedSizeClient, setSelectedSizeClient] = useState("");
  const [error, setError] = useState(false);
  const changePictureView = (e) => {
    setPictureView(e.target.src);
  };
  //get product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/oneProduct/${id}`
        );
        const data = await response.json();
        setProduct(data);

        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSelectedSize(selectedSize);
    const selectedSizeObject = product.colors
      .flatMap((color) => color.sizes)
      .find((size) => size.size === selectedSize);
    setSelectedQuantity(selectedSizeObject ? selectedSizeObject.quantity : 0);
  };

  //add product to session storage
  const addToCart = () => {
    let stock = product.colors[0].sizes[0].quantity;

    if (stock < 1 || product.stock === false) {
      alert("Ce produit n'est plus en stock");
      return;
    }

    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (selectedColorClient !== "" && selectedSizeClient !== "") {
      let existProduct = existingCart.find(
        (item) =>
          item.id === product._id &&
          item.color === selectedColorClient &&
          item.size === selectedSizeClient
      );
      if (existProduct) {
        existProduct.quant =
          selectedQuantityClient <= selectedQuantity
            ? Number(selectedQuantityClient) + Number(existProduct.quant)
            : selectedQuantity;

        sessionStorage.setItem("cart", JSON.stringify(existingCart));

        window.location.href = "/panier";
      } else {
        const productToAdd = {
          title: product.title,
          size: selectedSizeClient,
          quant:
            selectedQuantityClient <= selectedQuantity
              ? selectedQuantityClient
              : selectedQuantity,
          color: selectedColorClient,
          id: product._id,
          idUnique: product._id + Date.now(),
          price: product.salePrice || product.regularPrice,
          picture: product.pictures.pic1,
        };

        // Ajouter le produit au panier existant
        existingCart.push(productToAdd);

        // Mettre à jour le panier dans le sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(existingCart));

        window.location.href = "/panier";
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      {!product.message ? (
        <Container>
          <ProductContainer>
            <ContainerPhoto>
              <AllPicture>
                <img
                  src={
                    product.pictures &&
                    `${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`
                  }
                  alt={product && product.title}
                  onClick={changePictureView}
                />
                <img
                  src={
                    product.pictures &&
                    `${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic2}`
                  }
                  alt={product && product.title}
                  onClick={changePictureView}
                />
                <img
                  src={
                    product.pictures &&
                    `${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic3}`
                  }
                  alt={product && product.title}
                  onClick={changePictureView}
                />
              </AllPicture>
              <SinglePicture>
                <img
                  src={
                    pictureView
                      ? pictureView
                      : product.pictures &&
                        `${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`
                  }
                  alt={product && product.title}
                />
              </SinglePicture>
            </ContainerPhoto>

            <ContainerByProduct>
              <h1>{product.title}</h1>
              <div>
                <h2
                  style={{
                    textDecoration: product.salePrice ? "line-through" : "none",
                  }}
                >
                  {product.regularPrice} $
                </h2>
                {product.salePrice && <h2>{product.salePrice}$</h2>}
              </div>

              <label htmlFor="color-select">Couleur :</label>
              <select
                name="couleur"
                id="color-select"
                onChange={(e) => {
                  handleSizeChange(e);
                  setSelectedColorClient(e.target.value || "");
                  setError(false);
                }}
              >
                <option value="">--Sélectionnez la couleur--</option>
                {product.colors
                  ? product.colors.map((color) => (
                      <option value={color.color} key={color.color}>
                        {color.color}
                      </option>
                    ))
                  : null}
              </select>
              <label htmlFor="taille-select">Taille :</label>
              <select
                name="taille"
                id="taille-select"
                onChange={(e) => {
                  handleSizeChange(e);
                  setSelectedSizeClient(e.target.value);
                  setError(false);
                }}
                disabled={selectedColorClient === "" ? "disabled" : ""}
              >
                <option value="">--Sélectionnez la taille--</option>
                {product.colors
                  ? product.colors
                      .filter((color) => color.color === selectedColorClient)
                      .map((filteredColor) =>
                        filteredColor.sizes.map((size) => (
                          <option key={size.size} value={size.size}>
                            {size.size}
                          </option>
                        ))
                      )
                      .flat()
                  : null}
              </select>

              <div>
                <p>Sélectionner la quantité</p>
                <input
                  type="number"
                  min="1"
                  max={selectedQuantity}
                  defaultValue={1}
                  onChange={(e) => {
                    setSelectedQuantityClient(e.target.value);
                  }}
                />

                {selectedQuantity > 0 ? (
                  <p
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    Quantité disponible {selectedQuantity}
                  </p>
                ) : null}
              </div>

              <button type="button" onClick={addToCart}>
                Ajouter au panier
              </button>
            </ContainerByProduct>
          </ProductContainer>
          <div style={{ height: "20px" }}>
            {error && (
              <p style={{ color: "red", fontSize: "1.5rem" }}>
                Veuillez selectionner la couleur et la taille !
              </p>
            )}
          </div>
          <ProductDescription>
            <DetailsProduct>
              <h3>Détail du produit</h3>

              <ul>
                {product.description ? (
                  <>
                    <li>{product.description.desc1}</li>
                    <li>{product.description.desc2}</li>
                    <li>{product.description.desc3}</li>
                  </>
                ) : (
                  <li>Aucune description disponible</li>
                )}
              </ul>
            </DetailsProduct>
            <EntretienProduct>
              <h3>Matière et entretien</h3>
              <ul>
                {product.description ? (
                  <>
                    <li>{product.description.desc1}</li>
                    <li>{product.description.desc2}</li>
                    <li>{product.description.desc3}</li>
                  </>
                ) : (
                  <li>Aucune description disponible</li>
                )}
              </ul>
            </EntretienProduct>
          </ProductDescription>
        </Container>
      ) : (
        <p>Chargement</p>
      )}
    </>
  );
}

export default SingleProduct;
