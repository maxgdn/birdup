import * as React from 'react';
import styled from 'styled-components';

import {CenterInPage} from '../components';
import {ImageCollection} from '../components';

import {
    Route,
    Link,
    Switch,
    useRouteMatch
  } from "react-router-dom";
import { ImageView } from '.';

const ImageList: React.FC = () => {
    let { path, url } = useRouteMatch();

    return (
        <CenterInPage>
            <Switch>
                <Route exact path={path}>
                    <ImageCollection/>
                </Route>
                <Route path={`${path}/:id`}>
                    <ImageView/>
                </Route>
            </Switch>
           
        </CenterInPage>
    );
}

export default ImageList;