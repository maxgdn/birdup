import * as React from 'react';
import {useEffect, useState} from 'react';
import { observer } from 'mobx-react'
import styled from 'styled-components';
import {base64ToArrayBuffer} from '../../core/util'
import { format } from 'date-fns'
import * as ExifReader from 'exifreader';

import Sighting from '../../core/domain/Sighting';

import {colors} from '../../core';

import {fetchImage} from '../../core/client';
import SightingModel from '../../core/models/SightingModel';
import Bird from '../../core/domain/Bird';
import { AddRemove } from '..';

interface ImageCardProps {
    sighting: SightingModel
}

const Card = styled.div`
    border-color: ${colors.secondary};
    border-width: 0.1rem;
    border-style: solid;
    background-color: ${colors.primary};
    text-align: center;
`;

const Image = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
`;

const Item = styled.div`
    margin: 0.5rem;
    color: ${colors.tertiary};
`;

const AddRemoveContainer = styled.div`
    margin: auto;
`;

const Tag = styled.span`
    background-color: ${colors.white};
    color: ${colors.primary};
`;

interface ImageState {
    image: string;
    tags: any;
}

const ImageCard: React.FC<ImageCardProps> = observer((props) => {
    const [data, setData] = useState<ImageState>({image: "", tags: {}});
    const sighting = props.sighting.toJS();
    useEffect(() => {
        let getData = async () => {
            const d = await fetchImage(sighting.id + '.jpeg');
            const meta = ExifReader.load(base64ToArrayBuffer(d));
            setData({image: d, tags:meta});
        }
        
        getData();
    },[sighting.id]);

   return (
    <Card>
        <Image src={"data:image/jpg;base64," + data.image}/>
        <Item>ID: {sighting.id}</Item>
        <Item>Captured Date: {format(new Date(sighting.capturedDate),"yyyy-MM-dd' 'HH:mm:ss")}</Item>
        <Item>
            Tags: {sighting.birds.length > 0 ? sighting.birds.map((bird: Bird) => {
                return <Tag>{bird.name}</Tag>
            }) : "No bird tags"}
        </Item>
        {Object.keys(data.tags).length > 0 ?
            <>
            <Item>Model : {data.tags.Model.description}</Item>
            <Item>Aperture : {data.tags.ApertureValue.description}</Item>
            <Item>Exposure Time : {data.tags.ExposureTime.description}</Item>
            <Item>Height : {data.tags['Image Height'].description}</Item>
            <Item>Width : {data.tags['Image Width'].description}</Item>
            </>
            : null}
        <Item>
            <AddRemoveContainer>
            <AddRemove sighting={props.sighting}/>
            </AddRemoveContainer>
        </Item>
            
    </Card>
   );
});

export default ImageCard;