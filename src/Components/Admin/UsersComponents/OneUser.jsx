import styled from "styled-components";

const OneUserr = styled.div`
  width: 100%;
  min-height: 90px;
  display: flex;
  padding: 10px;

  div {
    width: 16.66%;
  }
`;

function OneUser({ user }) {
  return (
    <OneUserr>
      <div>
        <p>{user.name}</p>
      </div>
      <div>
        <p>{user.lastName}</p>
      </div>
      <div>
        <p>{user.phone}</p>
      </div>
      <div>
        <p>{user.email}</p>
      </div>
      <div>
        <p>{user.address}</p>
      </div>
      <div>
        <p>{user.validateEmail ? "Valide" : "Invalide"}</p>
      </div>
    </OneUserr>
  );
}

export default OneUser;
