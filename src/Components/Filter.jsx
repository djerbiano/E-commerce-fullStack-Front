import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  margin-top: 20px;
  font-size: 1.2rem;

  @media (max-width: 1150px) {
    flex-direction: column;

    & .open {
      transform: translateX(0);
      transition: transform 0.3s ease-in-out;
    }

    & .closed {
      transform: translateX(-110%);
      transition: transform 0.3s ease-in-out;
    }
  }
`;

const Sidebar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  min-width: 20%;
  * {
    margin: 5px;
    padding: 5px;
  }
  @media (max-width: 1150px) {
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    width: 90%;
    min-height: 40vh;
    max-height: 80vh;
    transition: transform 0.3s ease-in-out;
    background-color: white;
    position: fixed;
    top: 10;
    left: 0;
  }
  @media (max-width: 513px) {
    height: 50vh;
  }
  @media (max-width: 372px) {
    height: 80vh;
  }
`;

const SidebarClose = styled.div`
  font-size: 1.5rem;
  padding: 5px;
  margin-right: 10px;
  position: absolute;
  top: 10;
  right: 0;
  z-index: 1;

  & > :nth-child(1) {
    cursor: pointer;
    color: #1a2753;
    width: 30px;
    height: 30px;
    display: flex;

    &:hover {
      transform: scale(1.2);
      transition: transform 0.3s ease-in-out;
      color: #fa5;
    }
  }
  @media (min-width: 1150px) {
    display: none;
  }
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    input {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  @media (max-width: 1150px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const PriceFilterContainer = styled.div`
  input {
    width: 80px;
    margin-right: 10px;
    border-radius: 50px;
    text-align: center;
  }
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  @media (max-width: 1150px) {
    width: 100%;
  }

  &:hover {
    background-color: #45a010;
  }
`;
const MainContent = styled.div`
  width: 80vw;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  @media (max-width: 1150px) {
    width: 100vw;
  }
`;
const ProductList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 455px) {
    width: 80vw;
    justify-content: center;
  }

  .no-product {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: grey;
  }
`;

const ProductItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 30%;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  margin: 10px 5px;

  @media (max-width: 465px) {
    width: 40%;
  }
  @media (max-width: 455px) {
    width: 80%;
  }
`;

const ContainerPicture = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  max-height: 70%;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
`;
const ContainerText = styled.div`
  width: 100%;
  p {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
  }
`;

const FilterComponent = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({ start: "", end: "" });
  const [categories, setCategories] = useState({
    Homme: true,
    Femme: true,
    Informatique: true,
    TvSon: true,
    Téléphonie: true,
    ObjetsConnectés: true,
  });

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };

  const handlePriceChange = (event, type) => {
    const value = event.target.value;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };

  const handleSearch = () => {
    if (priceRange.start === "" || priceRange.end === "" || priceRange.end < priceRange.start) {
      setProducts(products);
      setError(true);
    } else {
      setError(false);
      const filteredProductsByPrice = products.filter((product) => {
        const price = product.salePrice || product.regularPrice;
        return price >= priceRange.start && price <= priceRange.end;
      });
      setProducts(filteredProductsByPrice);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // get product
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
          const filteredData = data.filter(
            (product) => categories[product.category]
          );

          setProducts(filteredData);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [categories, priceRange]);

  return (
    <FilterContainer>
      <MainContent>
        <ProductList>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem
                key={product._id}
                onClick={() => {
                  navigate(`/singleProduct/${product._id}`);
                }}
              >
                <ContainerPicture>
                  <img
                    src={`${process.env.REACT_APP_URL_SERVER}/images/${product.pictures.pic1}`}
                    alt={product.title}
                  />
                </ContainerPicture>
                <ContainerText>
                  <p>{product.title}</p>
                  <div>
                    <p
                      style={
                        product.salePrice
                          ? { textDecoration: "line-through" }
                          : null
                      }
                    >
                      {product.regularPrice}
                    </p>
                    <p>{product.salePrice || null}</p>
                  </div>
                </ContainerText>
              </ProductItem>
            ))
          ) : (
            <h2 className="no-product">
              Aucun produit ne correspond à vos critères
            </h2>
          )}
        </ProductList>
      </MainContent>
      <Sidebar className={isSidebarOpen ? "open" : "closed"}>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={categories.Homme}
              onChange={() => handleCategoryChange("Homme")}
            />
            Homme
          </label>

          <label>
            <input
              type="checkbox"
              checked={categories.Femme}
              onChange={() => handleCategoryChange("Femme")}
            />
            Femme
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.Informatique}
              onChange={() => handleCategoryChange("Informatique")}
            />
            Informatique
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.TvSon}
              onChange={() => handleCategoryChange("TvSon")}
            />
            TV & Sound
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.Téléphonie}
              onChange={() => handleCategoryChange("Téléphonie")}
            />
            Smartphones
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.ObjetsConnectés}
              onChange={() => handleCategoryChange("ObjetsConnectés")}
            />
            Objets connectés
          </label>
        </CheckboxContainer>

        <PriceFilterContainer>
          <p>Prix :</p>
          <label>
            <input
              type="number"
              placeholder="Start"
              value={priceRange.start}
              min={0}
              onChange={(e) => handlePriceChange(e, "start")}
            />
            <input
              type="number"
              placeholder="End"
              value={priceRange.end}
              min={priceRange.start}
              onChange={(e) => handlePriceChange(e, "end")}
            />
          </label>
        </PriceFilterContainer>
        {error && (
          <p style={{ color: "red" }}>Veuillez saisir deux valeurs valides</p>
        )}
        <SearchButton onClick={handleSearch}>Trouver</SearchButton>
      </Sidebar>

      <SidebarClose>
        {isSidebarOpen ? (
          <FaWindowClose onClick={toggleSidebar} />
        ) : (
          <IoFilterSharp onClick={toggleSidebar} />
        )}
      </SidebarClose>
    </FilterContainer>
  );
};

export default FilterComponent;
