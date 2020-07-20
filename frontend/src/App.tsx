import * as React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(App);
