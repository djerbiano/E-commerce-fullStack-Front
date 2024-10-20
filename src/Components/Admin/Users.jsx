import styled from "styled-components";
import SearchBar from "./UsersComponents/SearchBar";
import OneUser from "./UsersComponents/OneUser";
import Pagination from "./DashboardComponent/Pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;

  & > :last-child {
    position: absolute;
    top: 105% !important;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: 100vh;

  .erreur {
    color: red;
    text-align: center;
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 2rem;
  }
`;

const Div1 = styled.div`
  background-color: white;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  & > * {
    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &:hover {
    background-color: hsl(226.32deg 52.29% 21.37%);
    color: white;

    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
`;
//eslint-disable-next-line
const Div2 = styled.div`
  background-color: #f0f0f0;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  & > * {
    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &:hover {
    background-color: hsl(226.32deg 52.29% 21.37%);
    color: white;

    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;

  padding: 20px;
  background-color: #f0f0f0;

  p {
    width: 16.66%;
    text-align: center;
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchUser, setSearchUser] = useState("");

  //Get all users
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_URL_SERVER}/api/users/allUsers`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setUsers(data);
            setError("");
          } else {
            setError(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [ searchUser]);

  const search = async () => {
    if (searchUser) {
      fetch(
        `${process.env.REACT_APP_URL_SERVER}/api/users/search/${searchUser}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data);
          } else {
            setUsers(data);
          }
        });
    } else {
      setError("Veuillez entrer un email");
    }
  };

  return (
    <Container>
      <SearchBar setSearchUser={setSearchUser} search={search} />
      <Content>
        <Header>
          <p>Name</p>
          <p>LastName</p>
          <p>Phone</p>
          <p>Email</p>
          <p>Adress</p>
          <p>Validate email</p>
        </Header>
        {error && error.message ? (
          <div className="erreur">{error.message}</div>
        ) : (
          users.map((user) => {
            return (
              <LinkItem
                to={`/admin/users/oneuser/${user.email}`}
                key={user._id}
              >
                <Div1 className="kj">
                  <OneUser user={user} />
                </Div1>
              </LinkItem>
            );
          })
        )}
      </Content>
      <Pagination />
    </Container>
  );
}

export default Users;
