import * as React from "react";
import {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { css } from 'styled-components';
import { hot } from "react-hot-loader";
import {Content, GlobalStyle, Header} from "./components";
import {history, colors, useStores} from './core';


const background = css`
    background: ${colors.greydark};
    background: linear-gradient(${colors.greydark}, #e2ebf0);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100vw;
    ${background}
`;

const App: React.FC = () => {
    const {sightingStore, birdStore} = useStores();
    useEffect(() => {
        sightingStore.fetchData();
        birdStore.fetchData();
    }, []);
    
    return (
        <Router history={history}>
            <Container>
                <GlobalStyle/>
                <Header/>
                <Content/>
            </Container>
        </Router>
    );
}
declare let module: object;

export default hot(module)(App);
