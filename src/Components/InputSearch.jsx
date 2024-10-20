import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  position: relative;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: ${(props) =>
    props.$modalsearchcontent ? "10px 10px 0 0" : "10px"};

  & > label {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    * {
      font-size: 1.5rem;
    }
  }

  & > input {
    width: 100%;
    height: 50%;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 20px;
    padding: 0 10px;
  }
`;

const SearchContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  border-bottom: 1px solid gray;
  position: absolute;
  top: 100%;
  left: 0;
  max-height: 300px;
  border-radius: 0 0 10px 10px;
  background-color: white;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
  }
`;

const ProductItem = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  max-height: 50px;
  display: flex;

  p {
    width: 100%;
    font-size: 16px;
  }

  &:hover {
    background-color: #eeeeee;
  }
`;

function InputSearch() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [modalSearchContent, setModalSearchContent] = useState(false);
  const [productItem, setProductItem] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.length < 1) {
      setModalSearchContent(false);
    } else {
      setModalSearchContent(true);
    }
  }, [searchInput, modalSearchContent]);

  // fetch ProductItem

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_SERVER}/api/products`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductItem(data);
      });
  }, []);

  const filteredProducts = productItem.filter((product) => {
    return product.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <Container>
      <SearchBar $modalsearchcontent={modalSearchContent}>
        <label htmlFor="search">
          <BsSearch />
        </label>
        <input
          type="search"
          placeholder="Recherche"
          id="search"
          value={searchInput}
          onChange={handleChange}
        />
      </SearchBar>

      <div>
        {modalSearchContent && (
          <SearchContent>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  onClick={() => {
                    setSearchInput("");

                    navigate(`/singleProduct/${product._id}`);
                  }}
                >
                  <p>{product.title}</p>
                </ProductItem>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>Aucun produit</p>
            )}
          </SearchContent>
        )}
      </div>
    </Container>
  );
}

export default InputSearch;
