import React, { useState, useEffect } from "react";
import "./styles.css";
import HomePage from "./Components/HomePage/index";
import Register from "./Components/Register/Register";
import Stats from "./Components/Stats/Stats";
import History from "./Components/History/Main";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./Context/context";
import Axios from "axios";

//Punto de referencia I
function App(props) {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLogged = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenR = await Axios.post(
        "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenR.data) {
        const userRes = await Axios.get("http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLogged();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/registro" component={Register} />
            <Route exact path="/estadisticas" component={Stats} />
            <Route exact path="/historia-clinica" component={History} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;