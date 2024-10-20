import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 54%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  width: 90%;
  position: relative;
  overflow-y: auto;
  max-height: 80vh;
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    button {
      padding: 10px;
      border-radius: 5px;
      border: none;
      color: white;
      background-color: green;
      cursor: pointer;
      width: 100px;
      align-self: flex-end;
      transition: 0.3s;
      &:hover {
        background-color: darkgreen;
        transition: 0.3s;
      }
    }

    .modal11 {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      margin-top: 20px;
    }
  }
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  select {
    padding: 10px;
    border-radius: 5px;
    appearance: none;
    cursor: pointer;
  }

  & > :nth-child(2) {
    gap: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    input {
      cursor: pointer;
      width: 20px;
      height: 20px;
      accent-color: #000;
      margin-right: 5px;
    }
  }
`;
const Checkbox = styled.div``;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  min-width: 300px;
  min-height: 300px;
  border-radius: 5px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    width: 100%;
    font-size: 16px;
    &:focus {
      border-color: green;
    }
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  min-height: 300px;
  border-radius: 5px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    width: 100%;
    font-size: 16px;
    &:focus {
      border-color: green;
    }
  }
`;
const Pictures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  padding: 20px;
  min-height: 300px;
  border-radius: 5px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    width: 100%;
    font-size: 16px;
    &:focus {
      border-color: green;
    }
  }
`;
const Colors = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  margin: 20px 0;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    font-size: 16px;
    &:focus {
      border-color: green;
    }
  }
  & > :nth-child(2) {
    & > * {
      margin: 5px;
    }
  }
`;

const Containers = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 5px;
`;

function PatchProduct({ setPatchProduct, patchProductDetails }) {
  const [opModal, setOpModal] = useState(true);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({});
  const [dataReady, setDataReady] = useState(false);

  //Get Product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_SERVER}/api/products/oneProduct/${patchProductDetails}`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setProduct(data);
        setDataReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [patchProductDetails]);

  //Patch Product
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", document.getElementById("title").value);
      formData.append(
        "regularPrice",
        document.getElementById("regularPrice").value
      );
      formData.append("isOnSale", document.getElementById("isOnSale").checked);
      formData.append("salePrice", document.getElementById("salePrice").value);
      formData.append(
        "isTopSeller",
        document.getElementById("isTopSeller").checked
      );
      formData.append(
        "isNewCollection",
        document.getElementById("isNewCollection").checked
      );
      formData.append(
        "isLimitedEdition",
        document.getElementById("isLimitedEdition").checked
      );
      formData.append("stock", document.getElementById("stock").checked);

      formData.append("desc1", document.getElementById("desc1").value);
      formData.append("desc2", document.getElementById("desc2").value);
      formData.append("desc3", document.getElementById("desc3").value);
      formData.append("images", document.getElementById("pic1").files[0]);
      formData.append("images", document.getElementById("pic2").files[0]);
      formData.append("images", document.getElementById("pic3").files[0]);
      formData.append(
        "category",
        document.getElementById("partchProductCategory").value
      );
      formData.append("color1", document.getElementById("color01").value);
      formData.append("sizes", document.getElementById("sizes").value);
      formData.append("quantity1", document.getElementById("quantity1").value);
     
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/products/updateProduct/${patchProductDetails}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", 

            token: localStorage.getItem("token"),
          },
          body: new URLSearchParams(formData).toString(),
          
          
        }
      );
      if (!response.ok) {
        const error = await response.json();
        setOpModal(true);
        setMessage(error.message);
      }
      const data = await response.json();
      console.log(data);
      setOpModal(true);
      setMessage("Produit modifié avec succès");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  if (!dataReady) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Content>
        <div className="form">
          <Category>
            <select id="partchProductCategory" name="category">
              <option value={product.category}>
                {product.category || "Selectionner la catégorie"}
              </option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Informatique">Informatique</option>
              <option value="Tv - Son">Tv - Son</option>
              <option value="Téléphonie">Téléphonie</option>
              <option value="Objets connectés">Objets connectés</option>
            </select>
            <Checkbox>
              <label htmlFor="isOnSale">IsOnSale</label>
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                defaultChecked={product.isOnSale}
              />
              <label htmlFor="isTopSeller">isTopSeller</label>
              <input
                type="checkbox"
                id="isTopSeller"
                name="isTopSeller"
                defaultChecked={product.isTopSeller}
              />
              <label htmlFor="isNewCollection">isNewCollection</label>
              <input
                type="checkbox"
                id="isNewCollection"
                name="isNewCollection"
                defaultChecked={product.isNewCollection}
              />
              <label htmlFor="isLimitedEdition">isLimitedEdition</label>
              <input
                type="checkbox"
                id="isLimitedEdition"
                name="isLimitedEdition"
                defaultChecked={product.isLimitedEdition}
              />
              <label htmlFor="stock">stock</label>
              <input
                type="checkbox"
                id="stock"
                name="stock"
                defaultChecked={product.stock}
              />
            </Checkbox>
          </Category>
          <Containers>
            <Details>
              <p>Détails:</p>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={product.title || ""}
              />
              <label htmlFor="regularPrice">Price</label>
              <input
                type="number"
                id="regularPrice"
                name="regularPrice"
                defaultValue={product.regularPrice || ""}
              />
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                name="salePrice"
                defaultValue={product.salePrice || ""}
              />
            </Details>

            <Description>
              <p>Description:</p>
              <label htmlFor="desc1">desc1</label>
              <input
                type="text"
                id="desc1"
                name="desc1"
                defaultValue={
                  product.description ? product.description.desc1 : ""
                }
              />
              <label htmlFor="desc2">desc2</label>
              <input
                type="text"
                id="desc2"
                name="desc2"
                defaultValue={
                  product.description ? product.description.desc2 : ""
                }
              />
              <label htmlFor="desc3">desc3</label>
              <input
                type="text"
                id="desc3"
                name="desc3"
                defaultValue={
                  product.description ? product.description.desc3 : ""
                }
              />
            </Description>
            <Pictures>
              <p>Pictures:</p>
              <label htmlFor="pic1">pic1</label>
              <input type="file" id="pic1" name="pic1" />
              <label htmlFor="pic2">pic2</label>
              <input type="file" id="pic2" name="pic2" />
              <label htmlFor="pic3">pic3</label>
              <input type="file" id="pic3" name="pic3" />
            </Pictures>
          </Containers>
          <Colors>
            <p>Colors :</p>
            <div>
              <label htmlFor="color01">Color 1</label>
              <input
                type="text"
                id="color01"
                name="color"
                defaultValue={product.colors ? product.colors[0].color : ""}
              />
              <label htmlFor="sizes">Size</label>
              <select id="sizes" name="size">
                <option value="">
                  {product.colors ? product.colors[0].sizes[0].size : ""}
                </option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
                <option value="4XL">4XL</option>
              </select>
              <label htmlFor="quantity1">Quantity</label>
              <input
                type="number"
                id="quantity1"
                name="quantity"
                defaultValue={
                  product.colors ? product.colors[0].sizes[0].quantity : ""
                }
              />
            </div>
          </Colors>
          {opModal && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}

          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
          <button type="button" onClick={() => setPatchProduct(false)}>
            Cancel
          </button>
        </div>
      </Content>
    </Container>
  );
}

export default PatchProduct;
