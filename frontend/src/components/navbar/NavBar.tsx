import * as React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import colors from '../../core/colors';
import {Title} from '../../components';

const FlexContainer = styled.div`
max-width: 120rem;
display: flex;
margin: auto;
padding: 0 2rem;
justify-content: space-between;
height: 5rem;
`;

const NavLinks = styled.ul`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: ${colors.tertiary};
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: ${colors.redlight};
      border-bottom: 1px solid ${colors.redlight};
    }
  }
`;

const NavBar: React.FC = () => {
    return (
        <FlexContainer>
            <Title/>
            <NavLinks>
                <Link to={'/'}>Capture</Link>
                <Link to={'/images'}>Images</Link>
                <Link to={'/birds'}>Birds</Link>
            </NavLinks>
        </FlexContainer>
    );
}


export default NavBar;