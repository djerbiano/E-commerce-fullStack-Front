import { useEffect, useState } from "react";
import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import ModifierStatus from "./ModifierStatus";
import AnnulerCommande from "./AnnulerCommande";
const Container = styled.div`
  position: relative;
  & > :first-child {
    & > svg {
      font-size: 20px;
      color: black;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        transform: scale(1.5);
        transition: 0.3s;
      }
    }
  }
`;

const Menu = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  position: absolute;
  top: 0px;
  right: 20px;
  background-color: white;
  border-radius: 0px 5px 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;

  & > p {
    cursor: pointer;
    padding: 20px;
    &:hover {
      transition: 0.3s;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
`;

const Modi = styled.div``;

function OneLatestOrdersMenu() {
  const [open, setOpen] = useState(false);
  const [modifier, setModifier] = useState(false);
  const [annuler, setAnnuler] = useState(false);

  useEffect(() => {
    if (open === false) {
      setModifier(false);
      setAnnuler(false);
    }
  }, [open]);

  return (
    <Container>
      <p>
        <CiMenuKebab onClick={() => setOpen(!open)} />
      </p>

      {open && (
        <Menu>
          <p
            onClick={() => {
              setModifier(!modifier);
              setAnnuler(false);
            }}
          >
            Modifier
          </p>
          <p
            onClick={() => {
              setAnnuler(!annuler);
              setModifier(false);
            }}
          >
            Annulée
          </p>

          {modifier && (
            <Modi>
              <ModifierStatus />
            </Modi>
          )}
          {annuler && (
            <Modi>
              <AnnulerCommande setOpen={setOpen} />
            </Modi>
          )}
        </Menu>
      )}
    </Container>
  );
}

export default OneLatestOrdersMenu;
