import * as React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {Capture, ImageList, CatchAll, Birds} from '../../pages';

const ContentWrapper = styled.main`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Center = styled.div`
    width: 100%;
    height: 100%;
`;

const Content: React.FC = () => {
    return (
        <ContentWrapper>
            <Center>
                <Switch>
                    <Route exact path={'/'} component={Capture}/>
                    <Route path={'/images'} component={ImageList}/>
                    <Route path={'/Birds'} component={Birds}/>
                    <Route component={CatchAll}/>
                </Switch>
            </Center>
        </ContentWrapper>
    );
}

export default Content;