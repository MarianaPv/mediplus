import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import { withRouter } from "react-router-dom";
import "./Navigation.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

//Punto de referencia 

function Navigation(props) {
  const CerrarSesion = ()=>{
    cookies.remove('id', {path : "/"})
    cookies.remove('displayName',{path : "/"})
    window.location.href="/"
  }
  return (
    <div className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul className="extra">
              <li style={{ marginLeft: "50vw" }}>
                <Link to={ROUTES.STATS}>Estadísticas</Link>
              </li>
              <li>
                <Link to={ROUTES.HISTORIA}>Historia Clínica</Link>
              </li>
              <Link >
                <button className="logout" onClick ={CerrarSesion}>Cerrar Sesión</button>
              </Link>
            </ul>
          </div>
        </header>
      </section>
    </div>
  );
}
export default withRouter(Navigation);
