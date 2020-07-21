import * as React from 'react';
import styled from 'styled-components';

import {colors} from '../../core';

const Heading = styled.h1`
    color: ${colors.tertiary};
    margin: auto 0;
`;

const Arrow = styled.span`
    font-size: 2.5rem;
    color: ${colors.redlight};
    `;

const Title: React.FC = () => {
   return (
    <Heading>
        Bird <Arrow>↑</Arrow>
    </Heading>
   );
}

export default Title;