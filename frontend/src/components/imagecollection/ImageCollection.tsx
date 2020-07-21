import * as React from 'react';
import {useEffect} from 'react';
import { observer } from 'mobx-react'
import styled from 'styled-components';
import {
    Link,
    useRouteMatch
  } from "react-router-dom";


import {useStores, colors} from '../../core';
import SightingModel from '../../core/models/SightingModel';
import ImageItem from './ImageItem';

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageCollection: React.FC = observer(() => {
    let { url } = useRouteMatch();
    const {sightingStore} = useStores();

    const sightings: SightingModel[] = sightingStore.getSightings();
    
    return (
        <FlexContainer>
        {sightings.length > 0 ? sightings.map(sighting => 
        <Link to={`${url}/${sighting.id}`} style={{ textDecoration: 'none' }}>
            <ImageItem sighting={sighting}/>
        </Link>
        ) : null}
        </FlexContainer>
    );
});

export default ImageCollection;