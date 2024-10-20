import styled from "styled-components";
import ArrowUpPage from "../Components/ArrowUpPage";

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #1a2753f5, #ffaa55c9, #f05769a8);
  color: #fff;
  padding: 100px;
  width: 100vw;
  min-height: 50vh;
  margin-top: 100px;
  position: relative;
  display: flex;
  flex-direction: column;

  * {
    color: black;
    font-family: "Raleway", sans-serif;
  }

  & > :nth-child(1) {
    position: absolute;
    top: -5px;
    left: 50%;
    right: 50%;
    font-size: 1.5rem;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-wrap: wrap;
    width: 50vw;
  }
`;

const FooterSection = styled.div`
  width: 30%;

  @media (max-width: 800px) {
    width: auto;
    margin: 10px;
  }
`;

const SectionTitle = styled.h3``;

const SectionList = styled.ul`
  list-style: none;
`;

const SectionListItem = styled.li`
  margin-bottom: 10px;
`;

const SectionLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  @media (max-width: 800px) {
    margin-top: 50px;
    width: 100%;
  }
`;
const AboutTitle = styled.h3`
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  text-align: center;
  line-height: 2;
`;
const FooterBottom = styled.div`
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
`;

const CopyrightText = styled.p``;

const Footer = () => {
  return (
    <FooterContainer>
      <ArrowUpPage />
      <FooterContent>
        <FooterSection>
          <SectionTitle>Nos Produits</SectionTitle>
          <SectionList>
            <SectionListItem>
              <SectionLink href="#">Catégorie 1</SectionLink>
            </SectionListItem>
            <SectionListItem>
              <SectionLink href="#">Catégorie 2</SectionLink>
            </SectionListItem>
            <SectionListItem>
              <SectionLink href="#">Catégorie 3</SectionLink>
            </SectionListItem>
          </SectionList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Service Client</SectionTitle>
          <SectionList>
            <SectionListItem>
              <SectionLink href="#">Contactez-nous</SectionLink>
            </SectionListItem>
            <SectionListItem>
              <SectionLink href="#">Livraison et Retours</SectionLink>
            </SectionListItem>
            <SectionListItem>
              <SectionLink href="#">FAQ</SectionLink>
            </SectionListItem>
          </SectionList>
        </FooterSection>

        <AboutSection>
          <AboutTitle>À Propos de ShopingDigital</AboutTitle>
          <AboutText>
            ShopingDigital est votre destination en ligne ultime pour une
            expérience de magasinage exceptionnelle. Découvrez notre vaste
            collection de vêtements tendance, de télévisions de pointe, de
            smartphones de dernière génération, d'objets connectés innovants et
            de produits informatiques de haute qualité. Notre mission est de
            vous offrir des produits de qualité, un service client exceptionnel
            et une expérience de magasinage sans tracas.
          </AboutText>
        </AboutSection>
      </FooterContent>

      <FooterBottom>
        <CopyrightText>
          Copyright &copy; {new Date().getFullYear()} ShopingDigital. Tous
          droits réservés.
        </CopyrightText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
