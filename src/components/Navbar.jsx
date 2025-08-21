import React, { useState } from 'react';
import styled from 'styled-components';
import MyLogo from '../assets/mylogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Container = styled.div`
  height: 80px;
  padding: 20px 40px;
  margin: 40px 80px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgb(201, 218, 237);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 950px) {
    padding: 15px 24px;
    margin: 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 30px;
`;

const LogoTitle = styled.p`
  color: black;
  font-size: 1.3rem;
  font-weight: 520;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 950px) {
    display: none;
  }
`;

const RouterLink = styled(Link)`
  text-decoration: none;
  color: #111;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 0.6rem 0;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #0467d5;
    border-bottom: 1px solid #0467d5;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 950px) {
    display: none;
  }
`;

const ResumeButton = styled.button`
  padding: 10px 24px;
  border-radius: 30px;
  background: #0467d5;
  cursor: pointer;
  color: white;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: #0467d5;
    border-color: #0467d5;
  }
`;

const HamBurgerContainer = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 950px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(18px);
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  padding: 90px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 999;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: transform 0.3s ease;

  @media (max-width: 360px) {
    width: 60%;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 998;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: #111;
  font-weight: 500;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.6rem 0;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #0467d5;
    border-bottom: 1px solid #0467d5;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navigate = useNavigate();

  const menuItems = ['Home', 'Recent', 'Projects', 'Experience', 'Contact'];
  const getLinkHref = (item) => {
    const anchor = item.toLowerCase();
    return anchor === 'home' ? '/' : isHome ? `#${anchor}` : `/#${anchor}`;
  };

  return (
    <>
      <Container>
        <Logo onClick={() => navigate('/')}>
          <LogoImage src={MyLogo} />
          <LogoTitle>Sahil Raza</LogoTitle>
        </Logo>

        <NavMenu>
          {menuItems.map((item) => (
            <RouterLink key={item} to={getLinkHref(item)} onClick={() => setIsMenuOpen(false)}>
              {item}
            </RouterLink>
          ))}
        </NavMenu>

        <HamBurgerContainer onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </HamBurgerContainer>

        <ActionGroup>
          <Link to="/my-resume" style={{ textDecoration: 'none' }}>
            <ResumeButton>Resume</ResumeButton>
          </Link>
        </ActionGroup>
      </Container>

      {isMenuOpen && (
        <>
          <Backdrop onClick={() => setIsMenuOpen(false)} />
          <MobileMenu>
            <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>
              <X size={28} />
            </div>
            {menuItems.map((item) => (
              <MenuLink key={item} href={getLinkHref(item)} onClick={() => setIsMenuOpen(false)}>
                {item}
              </MenuLink>
            ))}
            <Link to="/my-resume" style={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
              <ResumeButton style={{ width: '100%', justifyContent: 'center' }}>Resume</ResumeButton>
            </Link>
          </MobileMenu>
        </>
      )}
    </>
  );
};

export default Navbar;
