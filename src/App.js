import React from "react"
import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Account, Phone, Complete } from "./pages"

function App() {
  return (
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
  )
}

export default App
