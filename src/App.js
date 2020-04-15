import React, { createContext } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Account, Phone, Complete } from "./pages";
import Loading from "./reducer/Loading";

const LoadingContext = createContext();

function App() {
  const loading = {
    status: false,
  };
  return (
    <LoadingContext.Provider value={loading}>
      <div className="App">
        <div className="contentBody">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Account} />
              <Route path="/phone/:name/:code/:account" component={Phone} />
              <Route path="/success" component={Complete} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </LoadingContext.Provider>
  );
}

export default App;
