import React, { useState, useContext } from "react";
import { Input, InputLabel } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import * as ROUTES from "../../Routes/Routes.js";
import UserContext from "../../Context/context";
import Axios from "axios";
import submit from "./GetUser";
import Cookies from 'universal-cookie';


function HomePage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();


  const { setUserData } = useContext(UserContext);
  const cookies = new Cookies();

  
//PUNTO DE REFERENCIA II
const Ingreso = async (e)=>{
  try{
    e.preventDefault();
    if (!email || !password)
    return alert("faltan campos por llenar");

//PUNTO DE REFERENCIA III
    const Usuario = {email,password};
    const loginRes = await Axios.post(
      "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/users/login",
      Usuario
    )
    //Verificación de usuario y contraseña

    if(loginRes.data._id){
      console.log("Entraste")
      console.log(loginRes.data)
      cookies.set('id',loginRes.data._id, {path : "/"})
      cookies.set('displayName',loginRes.data.displayName, {path : "/"})
      alert("bienvenido " + loginRes.data.displayName)
      if(cookies.get('id')){
        window.location.href="./estadisticas";
      }
    }else{
      alert("Usuario o contraseña incorrectos")
    }

    // console.log(email)
    // console.log(password)
  }catch(err){
    console.log(err)
  }
}

  //Punto de referencia I
  return ( 
    <div className="body">
      <div className="square">
        <div className="content">BIENVENIDO</div>
        <div className="form22">


          <div>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black" }}
              htmlFor="email"
            >
              Correo Electrónico
            </InputLabel>
            <Input
              id="email"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div style={{ marginTop: "2.5vh" }}>
            <InputLabel
              style={{ fontFamily: "Jost", color: "black" }}
              htmlFor="password"
            >
              Contraseña
            </InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


     
            <button
              className="button" onClick={Ingreso}
            >
              {" "}
              INGRESAR
            </button>



          <div className="member">
            ¿No eres miembro?
            <Link to={ROUTES.REGISTER}>
              <button className="link">Registrate aquí</button>
            </Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
