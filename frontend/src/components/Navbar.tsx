import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: linear-gradient(to right, #2c3e50, #3498db);
  padding: 1rem var(--spacing-lg);
  box-shadow: var(--shadow-md);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Brand to="/home">SSSN</Brand>
        <NavLinks>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/myprofile">My Profile</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
