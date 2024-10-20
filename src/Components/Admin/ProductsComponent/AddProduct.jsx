import { useState } from "react";
import styled from "styled-components";
import MessageFetch from "../../../Components/Modal/MessageFetch";

const Container = styled.div`
  position: relative;
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
`;

const Add = styled.div`
  width: 900px;
  min-height: 500px;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  left: 150%;
  top: -200%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  z-index: 1;

  label {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-top: 5px;
    padding: 0 10px;
    font-size: 12px;
    margin-left: 10px;
    &:focus {
      outline: none;
      border: 1px solid rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
      box-shadow: 0 0 10px rgba(0, 128, 0, 0.1);
    }
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  input[type="file"] {
    border: none;
  }
`;

const Category = styled.div`
  select {
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-top: 5px;
    padding: 0 10px;
    font-size: 12px;
    &:focus {
      border: 1px solid rgba(0, 128, 0, 0.8);
      transition: all 0.5s ease;
      box-shadow: 0 0 10px rgba(0, 128, 0, 0.1);
    }
  }
`;

const ContainerCheckAndTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > :nth-child(1) {
    & > * {
      display: flex;
      flex-direction: column;

      & > * {
        margin: 5px 0;
      }
    }
  }

  & > :nth-child(2) {
    display: flex;
    margin: 0 50px;

    input {
      margin-right: 10px;
    }
  }
`;

const Description = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 10px;
  }

  input {
    width: 50%;
    height: 30px;
  }
`;

const Images = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 10px;
  }
`;

const Color = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 10px;

    & > * {
      margin: 10px;
    }
  }
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  & > :last-child {
    background-color: red;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  padding: 10px;

  & > :first-child {
    padding: 20px;
    border-radius: 5px;
    z-index: 2;

    button {
      width: 100px;
      padding: 10px;
    }
  }
`;

function AddProduct() {
  const [addProductDiv, setAddProductDiv] = useState(false);
  const [responseServer, setResponseServer] = useState("");
  const [opModal, setOpModal] = useState(false);

  const sendRequest = async () => {
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
      formData.append("desc1", document.getElementById("desc1").value);
      formData.append("desc2", document.getElementById("desc2").value);
      formData.append("desc3", document.getElementById("desc3").value);
      formData.append("images", document.getElementById("pic1").files[0]);
      formData.append("images", document.getElementById("pic2").files[0]);
      formData.append("images", document.getElementById("pic3").files[0]);
      formData.append(
        "category",
        document.getElementById("addProductCategory").value
      );
      formData.append("color1", document.getElementById("color1").value);
      formData.append("sizes", document.getElementById("sizes").value);
      formData.append("quantity1", document.getElementById("quantity1").value);

      //formData.append("color2", document.getElementById("color2").value);
      //formData.append("sizes2", document.getElementById("sizes2").value);
      //formData.append("quantity2", document.getElementById("quantity2").value);

      let pic1 = document.getElementById("pic1").files[0];
      let pic2 = document.getElementById("pic2").files[0];
      let pic3 = document.getElementById("pic3").files[0];

      if (!pic1 || !pic2 || !pic3) {
        return (
          setOpModal(true),
          setResponseServer("Veuillez renseigner tous les champs du formulaire")
        );
      }
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/products/addProduct`,
        {
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.message) {
        setOpModal(true);
        setResponseServer(data.message);
      } else {
        setAddProductDiv(false);
        setOpModal(true);
        setResponseServer(`Le produit ${data.title} a bien été ajouté`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setOpModal(true);
      setResponseServer(error.message);

      console.error(error);
    }
  };

  return (
    <>
      {opModal && (
        <Modal>
          <MessageFetch message={responseServer} setOpModal={setOpModal} />
        </Modal>
      )}
      <Container>
        <button type="button" onClick={() => setAddProductDiv(!addProductDiv)}>
          Add Product
        </button>
        {addProductDiv && (
          <Add>
            <Category>
              <select id="addProductCategory">
                <option value="">Select Category</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Informatique">Informatique</option>
                <option value="TvSon">Tv - Son</option>
                <option value="Téléphonie">Téléphonie</option>
                <option value="ObjetsConnectés">Objets connectés</option>
              </select>
            </Category>

            <ContainerCheckAndTitle>
              {/* title */}
              <div>
                <div>
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" placeholder="Title" required />
                </div>

                <div>
                  <label htmlFor="regularPrice">Price</label>
                  <input
                    type="number"
                    id="regularPrice"
                    placeholder="Regular Price"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="salePrice">Sale Price</label>
                  <input
                    type="number"
                    id="salePrice"
                    placeholder="Sale Price"
                  />
                </div>
              </div>
              {/* check */}
              <div>
                <div>
                  <input type="checkbox" id="isOnSale" />
                  <label htmlFor="isOnSale">Is On Sale</label>
                </div>

                <div>
                  <input type="checkbox" id="isTopSeller" />
                  <label htmlFor="isTopSeller">Is Top Seller</label>
                </div>

                <div>
                  <input type="checkbox" id="isNewCollection" />
                  <label htmlFor="isNewCollection">Is New Collection</label>
                </div>

                <div>
                  <input type="checkbox" id="isLimitedEdition" />
                  <label htmlFor="isLimitedEdition">Is Limited Edition</label>
                </div>
              </div>
            </ContainerCheckAndTitle>
            <Description>
              <p>Description :</p>
              <label htmlFor="desc1">Desc1</label>
              <input
                type="text"
                id="desc1"
                placeholder="Description 1"
                required
              />
              <label htmlFor="desc2">Desc2</label>
              <input
                type="text"
                id="desc2"
                placeholder="Description 2"
                required
              />
              <label htmlFor="desc3">Desc3</label>
              <input
                type="text"
                id="desc3"
                placeholder="Description 3"
                required
              />
            </Description>

            <Images>
              <p>Images en format jpg, png, gif, bmp</p>
              <label htmlFor="pic1">Image 1</label>
              <input type="file" id="pic1" name="images" required />
              <label htmlFor="pic2">Image 2</label>
              <input type="file" id="pic2" name="images" required />
              <label htmlFor="pic3">Image 3</label>
              <input type="file" id="pic3" name="images" required />
            </Images>

            <Color>
              <p>Colors :</p>
              <div>
                <label htmlFor="color1">Color {/*1*/}</label>
                <input type="text" id="color1" />
                <label htmlFor="sizes">Size</label>
                <select id="sizes">
                  <option value="">Select Size</option>
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
                <input type="number" id="quantity1" placeholder="Quantity" />
              </div>
              {/* si besoin de plusieurs colors*/}
              {/*<div>
                <label htmlFor="color2">Color 2</label>
                <input type="text" id="color2" />
                <label htmlFor="sizes2">Size</label>
                <select id="sizes2">
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                </select>
                <label htmlFor="quantity2">Quantity</label>
                <input type="number" id="quantity2" placeholder="Quantity" />
              </div>*/}
            </Color>

            <ContainerButton>
              <button onClick={() => sendRequest()}>Add</button>
              <button onClick={() => setAddProductDiv(!addProductDiv)}>
                Annuler
              </button>
            </ContainerButton>
          </Add>
        )}
      </Container>
    </>
  );
}

export default AddProduct;
