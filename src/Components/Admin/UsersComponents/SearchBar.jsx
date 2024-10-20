import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  padding: 20px;

  input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid gray;
    outline: none;
    padding: 10px;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      background-color: #1a2753;
      color: white;
    }
  }

  svg {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid gray;
    border-radius: 5px;

    &:hover {
      color: white;
      background-color: #1a2753;
    }
  }
`;
const SearchByMailContainer = styled.div``;

function SearchBar({ setSearchUser, search }) {
  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };
  return (
    <Container>
      <SearchByMailContainer>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Recherche par Email"
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <button  type="submit">Trouver</button>
      </form>
      </SearchByMailContainer>
    </Container>
  );
}

export default SearchBar;
