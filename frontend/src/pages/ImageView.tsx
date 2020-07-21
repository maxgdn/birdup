import * as React from 'react';
import styled from 'styled-components';
import {useStores} from '../core';
import { LinkPrevious } from 'grommet-icons';
import { ImageCard, Button } from '../components';
import { observer } from 'mobx-react'

import {
    useParams,
    Link
  } from "react-router-dom";

const FlexboxContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  & > * {
      margin-bottom: 1rem;
  }
`;

const ImageView: React.FC = observer(() => {
    let { id } = useParams();

    const {sightingStore} = useStores();

    let sighting = sightingStore.get(id);

    return (
        <FlexboxContainer>
            <Link to={'/images'} style={{ textDecoration: 'none' }}>
            <Button name={'Back'}icon={<LinkPrevious/>} />
            </Link>
            <ImageCard sighting={sighting}/>
        </FlexboxContainer>
    );
});

export default ImageView;