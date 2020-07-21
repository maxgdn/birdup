import * as React from 'react';
import styled from 'styled-components';
import {useStores} from '../core';
import { ImageCard } from '../components';
import { observer } from 'mobx-react'

import {
    useParams
  } from "react-router-dom";

const FlexboxContainer = styled.div`
  margin-top: 2rem;
`;

const ImageView: React.FC = observer(() => {
    let { id } = useParams();

    const {sightingStore} = useStores();

    let sighting = sightingStore.get(id);

    return (
        <FlexboxContainer>
            <ImageCard sighting={sighting}/>
        </FlexboxContainer>
    );
});

export default ImageView;