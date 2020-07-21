import * as React from 'react';
import styled from 'styled-components';
import {NavBar} from '../../components';

import colors from '../../core/colors';

const HeaderWrapper = styled.header`
    min-height: 4rem;
    background-color: ${colors.primary};
`;

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <NavBar/>
        </HeaderWrapper>
    );
}

export default Header;