import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from "./pages/Demo";

function App() {
  if (localStorage.getItem("currentAccount") !== undefined) {
    global.currentAccount = localStorage.getItem("currentAccount") || "";
  }

  document.body.style = "background: #333333;";
  document.body.style.overflow = "hidden";
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Demo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
