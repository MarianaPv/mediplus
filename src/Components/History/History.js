import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Input, InputLabel } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import Navigation from "../NavBar/Navigation";
import "./Main.css";
import Select from "react-select";
import axios from "axios";
import { set } from "mongoose";
import "./History.css";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// PUNTO DE REFERENCIA
function History(props) {
  //TRAYENDO PACIENTES {Inicio}
  useEffect(() => {
    if (!cookies.get("id")) {
      window.location.href = "/";
    }

    const traigoPacientes = async () => {
      try {
        const res = await axios.get(
          "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/userapps/clinica"
        );

        setUserData(res.data);
      } catch (err) {
        alert(err);
      }
    };
    if (userData) {
      traigoPacientes();
    }
  }, []);
  //TRAYENDO PACIENTES {Final}

  const [Paciente, setPaciente] = useState("");
  const [userData, setUserData] = useState([]);
  const [Pacienteseleccionado, setPacienteseleccionado] = useState();
  const [email, setEmail] = useState();
  const [displayName, setDisplayName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState();
  const [sex, setSex] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pastSurgery, setPastSurgery] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [docuId, setDocuId] = useState();
  const [laid, setLaid] = useState("");
  const userInfo = useSelector((state) => state);
  const [doctorData, setDoctorData] = useState(null);

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userInfo.userInfo.token,
        },
      };
      const res = await axios.get(
        "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/users/",
        config
      );
      setDoctorData(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getUserInfo();
    }
  }, []);

  //MARCA XII

  //DECLARANDO OPTIONS {INICIO}

  const options = userData.map((elemento) => {
    return {
      value: `${elemento._id}`,
      label: `${elemento.displayName} ${elemento.lastName}`,
    };
  });
  //console.log(options)
  //DECLARANDO OPTIONS {FIN}

  // const prueba = userData.map(elemento=>elemento._id)
  // console.log(prueba)

  //Función para mostrar pacientes {Inicio}
  const PacienteAmostrar = (e) => {
    try {
      setPacienteseleccionado(userData.filter((x) => x._id === `${Paciente}`));
      console.log(Pacienteseleccionado[0]);
      setDisplayName(Pacienteseleccionado[0].displayName);
      setLastName(Pacienteseleccionado[0].lastName);
      setDocuId(Pacienteseleccionado[0].docuId);
      setSex(Pacienteseleccionado[0].sex);
      setBornDate(Pacienteseleccionado[0].bornDate);
      setOcupation(Pacienteseleccionado[0].ocupation);
      setCountry(Pacienteseleccionado[0].country);
      setCity(Pacienteseleccionado[0].city);
      setCurrentCity(Pacienteseleccionado[0].currentCity);
      setAddress(Pacienteseleccionado[0].address);
      setPhone(Pacienteseleccionado[0].phone);
      setPastSurgery(Pacienteseleccionado[0].pastSurgery);
      setContactName(Pacienteseleccionado[0].contactName);
      setContactLastName(Pacienteseleccionado[0].contactLastName);
      setContactPhone(Pacienteseleccionado[0].contactPhone);
    } catch (err) {
      console.log("Intenta de nuevo");
    }
  };
  //Función para mostrar pacientes {Final}

  //Marca XX

  //Marco

  const Add = options.map((Add) => Add);
  const handleAddrTypeChange = (e) => setPaciente(e.target.value);

  //Hasta aquí todo bien....
  //Marca de Agua
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
          {/* < select
          onChange={e => handleAddrTypeChange(e)}>
          {
          Add.map((address, key) => <option value={key}>{address}</option>)
          }
          </select >) */}
          <div className="El-buscador">
            <select
              className="Seleccion-Paciente"
              onChange={(e) => handleAddrTypeChange(e)}
            >
              {Add.map((elemento) => (
                <option value={elemento.value}>{elemento.label}</option>
              ))}
            </select>
            <button className="Boton" onClick={PacienteAmostrar}>
              BUSCAR PACIENTE
            </button>
          </div>

      </div>
      <div>
      <div>
        <div className="nombres1">
          Conozca historia clínica del paciente.
        </div>

        <div className="sectionTitle">Datos personales:</div>
        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              htmlFor="email"
              className="nombres1"
            >
              Nombres
            </InputLabel>
            <TextField
              variant="outlined"
              value={displayName}

              style={{ width: 300, marginBottom: 20 }}
            />
          </div>
          <div>
            <div>
              <InputLabel
                style={{
                  fontFamily: "Jost",
                  color: "black",
                  fontSize: "14.5px",
                  margin: 5,
                }}
                className="nombres1"
              >
                Apellidos
              </InputLabel>

              <TextField
                variant="outlined"
                value={lastName}

                style={{ width: 300, marginBottom: 50 }}
              />
            </div>
          </div>
        </div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Documento de identidad (sin puntos){" "}
            </InputLabel>
            <TextField
              variant="outlined"
              value={docuId}

              style={{ width: 300, marginBottom: 50 }}
            />
          </div>
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Sexo
            </InputLabel>
            <Select
              native
              value={sex}

              style={{ width: 300, marginBottom: 50 }}
            >
              <option aria-label="Seleccionar" value="Seleccionar" />
              <option value={"Femenino"} style={{ cursor: "pointer" }}>
                Femenino
              </option>
              <option value={"Masculino"} style={{ cursor: "pointer" }}>
                Masculino
              </option>
            </Select>
          </div>
        </div>

        <div className="form">
          

          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Ocupación{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              value={ocupation}
              style={{ width: 300, marginBottom: 50 }}
            />
          </div>
        </div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              País de Nacimiento
            </InputLabel>

            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={country}

            />
          </div>
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Ciudad de Nacimiento
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={city}

            />
          </div>
        </div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Ciudad Actual
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={currentCity}

            />
          </div>

          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Dirección de Domicilio
            </InputLabel>

            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={address}

            />
          </div>
        </div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Teléfono / Celular
            </InputLabel>

            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={phone}

            />
          </div>
        </div>

        <div className="sectionTitle">Antecedentes del paciente:</div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Cirugías Anteriores{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={pastSurgery}

            />
          </div>
        </div>

        <div className="sectionTitle">Datos de contacto:</div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Nombres{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={contactName}

            />
          </div>
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Apellidos
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={contactLastName}

            />
          </div>
        </div>

        <div className="form">
          <div>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              className="nombres1"
            >
              Teléfono / Celular{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              style={{ width: 300, marginBottom: 50 }}
              value={contactPhone}

            />
          </div>
        </div>
        <div className="form" style={{ justifyContent: "center" }}>

        </div>
      </div>
    </div>
    </div>
  );
}
/* <select name="selección">
          {userData.map(elemento=>(
            <option key={elemento.id} value={elemento.id}>{elemento.displayName + " " + elemento.lastName}</option>
          ))}
          
        </select> */
export default withRouter(History);
