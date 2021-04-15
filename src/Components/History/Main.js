import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Input, InputLabel } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import Navigation from "../NavBar/Navigation";
import Add from "./Add";
import History from "./History";
import Select from "react-select";

//PUNTO DE REFERENCIA I

function Main(props) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const options = [
    { value: "PACIENTE 1", label: "PACIENTE 1" },
    { value: "PACIENTE 2", label: "PACIENTE 2" },
    { value: "PACIENTE 3", label: "PACIENTE 3" },
  ];
  
  const MyComponent = () => <Select options={options} />;
  
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navigation />
      <div className="wrapper2">
        <div className="blue2">
          <div className="content11">Buscar o añadir paciente</div>

          <div className="content22">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr ",
                width: "100%",
              }}
            >
              <button
                className="buttonstat2"
                onClick={() => setIsHistoryOpen(true)}
              >
                Buscar Paciente
              </button>
              <button
                className="buttonAñadir"
                onClick={() => setIsHistoryOpen(false)}
              >
                Añadir paciente +
              </button>
            </div>
          </div>
        </div>
        <div className="white">
          {isHistoryOpen == true ? <History /> : <Add />}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Main);
