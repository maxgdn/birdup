import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { css } from 'styled-components';
import { hot } from "react-hot-loader";
import {Content, GlobalStyle, Header} from "./components";
import {history} from './core';


const background = css`
    background: #cfd9df;
    background: linear-gradient(#cfd9df, #e2ebf0);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100vw;
    ${background}
`;

const App: React.FC = () => {
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
