import styled from "styled-components";
import { IoClose } from "react-icons/io5";
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 94%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & > :first-child {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: 10px;
    background-color: red;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: rgb(255, 0, 0, 0.5);
    }
    svg {
      color: white;
      font-size: 40px;
      transition: all 0.3s ease-in-out;
    }
  }

  & > :nth-child(2) {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

function PicturesView({ setOpModal, pictures }) {
  return (
    <Container>
      <Content>
        <div onClick={() => setOpModal(false)}>
          <IoClose />
        </div>
        <div>
          <img src={pictures} alt="" />
        </div>
      </Content>
    </Container>
  );
}

export default PicturesView;
