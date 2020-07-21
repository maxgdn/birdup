import * as React from 'react';
import {useEffect} from 'react';
import { observer } from 'mobx-react'
import styled from 'styled-components';

import {Button, CenterInPage, ImageCard} from '../components';
import {useStores, colors} from '../core';

import { Camera } from 'grommet-icons';
import SightingModel from '../core/models/SightingModel';

//capture images notify when if it worked or failed.

//capture button
//latest image taken (imagecard)

const RecentImage = styled.h1`
    font-style: bold;
    font-size: 1rem;
    color: ${colors.redlight}
`;

const CaptureFlexBox = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > * {
        margin: 0.5rem;
    }
`;

const Capture: React.FC = observer(() => {
    const {sightingStore} = useStores();
    useEffect(() => {
        sightingStore.fetchData();
    }, []);

    const captureImage = async () => {
        sightingStore.snap();
    }

    const sightings: SightingModel[] = sightingStore.sightings;
    return (
        <CenterInPage>
            <CaptureFlexBox>
                <div>
                    <Button name={'Capture'} icon={<Camera/>} onClick={captureImage}/>
                </div>
                <div>
                    <RecentImage>Most Recent Image :</RecentImage>
                </div>
                {sightings.length > 0 ? <ImageCard sighting={sightings[0]}/> : <p>No Images Found</p>}
            </CaptureFlexBox>
        </CenterInPage>
    );
});

export default Capture;