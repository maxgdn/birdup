import * as React from 'react';
import {useEffect} from 'react';
import { observer } from 'mobx-react'
import styled from 'styled-components';

import {Button, CenterInPage} from '../components';
import {useStores} from '../core';

import { Camera } from 'grommet-icons';

//capture images notify when if it worked or failed.

//capture button
//latest image taken (imagecard)


const Capture: React.FC = observer(() => {
    const {sightingStore} = useStores();
    sightingStore.fetchData();

    const captureImage = async () => {
        console.log("Capture Page Clicked");
        sightingStore.snap();
    }

    const sightings = sightingStore.toJS();
    return (
        <CenterInPage>
            <Button name={'Capture'} icon={<Camera/>} onClick={() => captureImage()}/>
            {sightings.length > 0 ? <ImageCard> : <p>No Images Found</p>}
        </CenterInPage>
    );
});

export default Capture;