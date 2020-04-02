import * as React from "react";
import * as ReactDOM from "react-dom";

// import { ChartPage } from './containers/ChartPage';
import Routes from "./routes/root";
import "./index.scss";
import { rootStore, Provider } from "./mobx";

const App = () => <Provider value={rootStore}><Routes /></Provider>;

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
