import React, { useState, useContext } from "react";
import { Input, InputLabel } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import UserContext from "../../Context/context";
import "./Register.css";
import Axios from "axios";

// Punto de referencia I
function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
 
  const sendInfo = async (e) => {
  try{
    e.preventDefault();
    const newUser = { email, password, passwordCheck, displayName };
    const response = await Axios.post(
      "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/users/register",
      newUser
    );

    var respuesta = JSON.stringify(response.data)
    if(respuesta.length >50){
      var respuesta = "El usuario se ha registrado con éxito, por favor, revisa tu correo electrónico"
    }
    alert(respuesta)

    console.log(response.data)
  }
  catch(err){
    console.log(err)
  }
  };

  return (
    <div className="body2">
      <div className="square2">
        <div className="content2">REGISTRO</div>
        <div className="form2">


          <div>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black", fontSize: "14.5px" }}
              htmlFor="nombre"
            >
              Nombre de Usuario
            </InputLabel>
            <Input
              id="displayName"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>


          <div style={{ marginTop: "1.5vh" }}>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black", fontSize: "14.5px" }}
              htmlFor="email"
            >
              Correo Electrónico
            </InputLabel>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div style={{ marginTop: "1.5vh" }}>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black", fontSize: "14.5px" }}
              htmlFor="password"
            >
              Contraseña
            </InputLabel>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div style={{ marginTop: "1.5vh" }}>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black", fontSize: "14.5px" }}
              htmlFor="password"
            >
              Confirma tu Contraseña
            </InputLabel>
            <Input
              type="password"
              id="check-password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>


          <Link to={ROUTES.HOMEPAGE}>
            <button className="button2" onClick={sendInfo}>
              REGISTRARSE
            </button>
          </Link>

          <Link to={ROUTES.HOMEPAGE}>
            <button className="button3">IR ATRÁS</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignIn);
