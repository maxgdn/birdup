import * as React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom';

import SightingModel from '../../core/models/SightingModel';
import { colors } from '../../core';
import Sighting from '../../core/domain/Sighting';
import { format } from 'date-fns'

import {fetchImage} from '../../core/client';

interface ImageItemProps {
    sighting: SightingModel;
}

const Container = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: ${colors.primary};
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;

    &:hover {
        cursor:pointer;
        transform: scale(1.05);
    }
`;

const Item = styled.div`
    color: ${colors.tertiary};
`;

const Image = styled.img`
    max-width: 10vw;
    max-height: 10vh;
    object-fit: contain;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
`;

const Shared = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;

    & > * {
        margin-top: 1rem;
    }
`;

interface ImageState {
    image: string
}

const ImageItem: React.FC<ImageItemProps> = observer((props) => {
    const [data, setData] = useState<ImageState>({image: ""});
    
    useEffect(() => {
        let getData = async () => {
            const d = await fetchImage(props.sighting.id + '.jpeg');
            setData({image: d});
        }
        
        getData();
    },[props.sighting]);
    
    const sighting: Sighting = props.sighting.toJS();

    return (
        <Container>
            <Item>
                <Shared>
                <div>ID: {sighting.id}</div>
                <div>Date: {format(new Date(sighting.capturedDate),"yyyy-MM-dd' 'HH:mm:ss")}</div>
                </Shared>
            </Item>
            <Item><Image src={"data:image/jpg;base64," + data.image}/></Item>
        </Container>

    );
});

export default ImageItem;