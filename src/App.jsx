import { useState } from "react";
import "./App.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import OrderPizza from "./Iteration-1/OrderPizza/OrderPizza";
import Home from "./Iteration-1/Home/Home";
import Success from "./Iteration-1/Success/Success";
import { Switch,Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/orderpizza">
          <OrderPizza />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  );
}

export default App;
