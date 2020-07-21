import * as React from 'react';
import styled from 'styled-components';

const Center = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const FourZeroFour = styled.h1`
    text-transform: uppercase;
    font-size: 6rem;
`;

const ErrorText = styled.h1`
    text-transform: uppercase;
`;

const CatchAll: React.FC = () => {
    return (
        <Center>
            <FourZeroFour>
                404
            </FourZeroFour>
            <ErrorText>
                Page Not Found
            </ErrorText>
        </Center>
    );
}

export default CatchAll;