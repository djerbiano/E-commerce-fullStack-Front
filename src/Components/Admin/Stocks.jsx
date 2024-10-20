import { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "./ProductsComponent/Filter";
import { IoIosRefresh } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 20px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;

  button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: green;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background-color: rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
    }
  }

  & > :nth-child(2) {
    display: flex;
    align-items: center;

    svg {
      cursor: pointer;
      font-size: 25px;
      border: 1px solid black;
      transition: all 0.5s ease;
      border-radius: 5px;
      &:hover {
        transform: scale(1.3);
        transition: all 0.5s ease;
        background-color: green;
        color: white;
      }
    }
  }
`;
const ShortSelect = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  select {
    min-width: 100px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    &:hover {
    }
  }
`;
const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 16px;
  border-bottom: 1px solid gray;
  color: gray;
  p {
    text-align: center;
    font-weight: bold;
    width: 150px;
  }
`;
const Product = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid gray;
  p {
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    width: 150px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
function Stocks() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkboxProducts, setCheckboxProducts] = useState({
    isOnSale: false,
    isTopSeller: false,
    isNewCollection: false,
    isLimitedEdtion: false,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_SERVER}/api/products`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const stock = data.filter((product) => product.stock === false);
          setProducts(stock);
          setFilteredProducts(stock);
        } else {
          setProducts(data);
        }
      });
  }, []);

  // handle category
  const handleCategory = (category) => {
    setCheckboxProducts({
      isOnSale: false,
      isTopSeller: false,
      isNewCollection: false,
      isLimitedEdtion: false,
    });
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  //handle checkbox
  const selectByCheckbox = () => {
    const selectKey = Object.keys(checkboxProducts).filter(
      (key) => checkboxProducts[key] === true
    );

    if (selectKey.length > 0) {
      const filtered = filteredProducts.filter((product) =>
        selectKey.every((key) => product[key] === true)
      );

      if (filtered.length > 0) {
        setFilteredProducts(filtered);
      } else {
        window.alert("Aucun produit ne répond à vos critères");
        window.location.reload();
      }
    } else {
      setFilteredProducts(products);
      window.location.reload();
    }
  };

  return (
    <Container>
      <Title>
        <h2>Stocks</h2>
        <div onClick={() => window.location.reload()}>
          <IoIosRefresh />
        </div>
      </Title>
      <ShortSelect>
        <select
          id="selectCategory"
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="All">Select Category</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Informatique">Informatique</option>
          <option value="TvSon">Tv - Son</option>
          <option value="Téléphonie">Téléphonie</option>
          <option value="ObjetsConnectés">Objets connectés</option>
        </select>
        <Filter
          setCheckboxProducts={setCheckboxProducts}
          selectByCheckbox={selectByCheckbox}
        />
      </ShortSelect>

      <Header>
        <p>Id</p>
        <p>Category</p>
        <p>Name</p>
        <p>Price</p>
        <p>OnSale</p>
        <p>SalePrice</p>
        <p>TopSeller</p>
        <p>NewCollection</p>
        <p>LimitedEdtion</p>
      </Header>

      {products.length > 0 ? (
        filteredProducts.map((product) => {
          return (
            <Product
              key={product._id}
              onClick={() =>
                window.open(
                  `/admin/products/oneProduct/${product._id}`,
                  "_blank"
                )
              }
            >
              <p>{product._id}</p>
              <p>{product.category}</p>
              <p>{product.title}</p>
              <p>{product.regularPrice}</p>
              <p>{product.isOnSale.toString()}</p>
              <p>{product.salePrice}</p>
              <p>{product.isTopSeller.toString()}</p>
              <p>{product.isNewCollection.toString()}</p>
              <p>{product.isLimitedEdition.toString()}</p>
            </Product>
          );
        })
      ) : (
        <p
          style={{
            textAlign: "center",
            padding: "10px",
            marginTop: "10px",
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Aucun produit en rupture de stock
        </p>
      )}
    </Container>
  );
}

export default Stocks;
