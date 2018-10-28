import "./App.css";

import * as React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import News from "./pages/news";
import Poems from "./pages/poems";

import Sidebar from "./components/sidebar";
import Publications from "./pages/publications";
// https://www.library.wisc.edu/parallelpress/pp-catalog/poetry-series/2006-2/the-discovery-of-heaven/

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Sidebar />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/poems" component={Poems} />
            <Route exact={true} path="/news" component={News} />
            <Route exact={true} path="/publications" component={Publications} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
