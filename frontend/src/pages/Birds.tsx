import * as React from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';

import {CenterInPage, BirdCreate, BirdCollection} from '../components';
import {useStores} from '../core';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    & > * {
        margin: 0.25rem;
    }
`;

const Birds: React.FC = () => {
    const {birdStore} = useStores();
    useEffect(() => {
        birdStore.fetchData();
    }, []);

    return (
        <CenterInPage>
            <FlexContainer>
                <BirdCreate/>
                <BirdCollection/>
            </FlexContainer>
        </CenterInPage>
    );
}

export default Birds;