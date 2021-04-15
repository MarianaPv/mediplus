import React, { useState, useEffect } from "react";
import { Input, InputLabel } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../Routes/Routes.js";
import Navigation from "../NavBar/Navigation";
import "./Main.css";
import Axios from "axios";
import Cookies from "universal-cookie";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { set } from "mongoose";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();
//PUNTO DE PRUEBA

function History(props) {
  if (!cookies.get("id")) {
    window.location.href = "/";
  }

  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassword] = useState(null);
  const [sex, setSex] = useState();
  const [ocupation, setOcupation] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pastSurgery, setPastSurgery] = useState(null);
  const [contactName, setContactName] = useState(null);
  const [contactLastName, setContactLastName] = useState(null);
  const [contactPhone, setContactPhone] = useState(null);
  const [docuId, setDocuId] = useState(null);
  const [minPatientSystolicPressure, setMinPatientSystolicPressure] = useState(
    null
  );
  const [maxPatientSystolicPressure, setMaxPatientSystolicPressure] = useState(
    null
  );
  const [
    minPatientDiastolicPressure,
    setMinPatientDiastolicPressure,
  ] = useState(null);
  const [
    maxPatientDiastolicPressure,
    setMaxPatientDiastolicPressure,
  ] = useState(null);

  const [startDate, setStartDate] = useState(new Date());

  const [bornDate, setBornDate] = useState(null);

  useEffect(() => {
    if (startDate) {
      setBornDate(
        startDate.toString().substring(0, startDate.toString().indexOf(":") - 3)
      );
    } else {
      setStartDate(new Date());
    }
  }, [startDate]);

  const sendInfo = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      passwordCheck: password,
      displayName,
      lastName,
      userName: email,
      sex,
      bornDate,
      ocupation,
      country,
      city,
      currentCity,
      address,
      phone,
      pastSurgery,
      contactName,
      contactLastName,
      contactPhone,
      docuId: docuId,
      minPatientDiastolicPressure,
      maxPatientDiastolicPressure,
      minPatientSystolicPressure,
      maxPatientSystolicPressure,
      minDiastolicPressure: "110",
      maxDiastolicPressure: "90",
      minSystolicPressure: "70",
      maxSystolicPressure: "140",
    };

    const response = await Axios.post(
      //Este es mi punto de ref..
      "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/userApps/register",
      newUser
    );
    var respuesta = JSON.stringify(response.data);
    if (respuesta.length > 50) {
      var respuesta =
        "El usuario se ha registrado con éxito, por favor, revisa tu correo electrónico";
    }
    alert(respuesta);

    setEmail(null);
    setLastName(null);
    setMaxPatientDiastolicPressure(null);
    setMaxPatientSystolicPressure(null);
    setMinPatientDiastolicPressure(null);
    setMinPatientSystolicPressure(null);
    setAddress(null);
    setCity(null);
    setContactLastName(null);
    setContactPhone(null);
    setContactName(null);
    setCountry(null);
    setCity(null);
    setCurrentCity(null);
    setDocuId(null);
    setOcupation(null);
    setPastSurgery(null);
    setPhone(null);
  };

  const handleSex = (e) => {
    setSex(e.target.value);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "220vh",
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <div className="nombres1">
          Complete el siguiente formulario de historia clínica para tener
          información detallada del paciente.
        </div>
        <div className="sectionTitle">Información de cuenta:</div>

        <div className="form">
          <div style={{ height: 100 }}>
            <InputLabel
              style={{
                fontFamily: "Jost",
                color: "black",
                fontSize: "14.5px",
                margin: 5,
              }}
              htmlFor="email"
            >
              Correo Electrónico
            </InputLabel>
            <TextField
              id="email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="nombres1"
              style={{ width: 300, marginBottom: 10 }}
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
              htmlFor="password"
              className="nombres1"
            >
              Contraseña
            </InputLabel>
            <TextField
              variant="outlined"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: 300 }}
            />
          </div>
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
              onChange={(e) => setDisplayName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setDocuId(e.target.value)}
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
              onChange={(e) => handleSex(e)}
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
              Fecha de Nacimiento (MM/DD/YY){" "}
            </InputLabel>

            <DatePicker
              selected={startDate}
              placeholderText="MM/DD/YY"
              onChange={(date) => setStartDate(date)}
              style={{ width: 300, marginBottom: 50, height: "5vh" }}
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
              Ocupación{" "}
            </InputLabel>
            <TextField
              variant="outlined"
              onChange={(e) => setOcupation(e.target.value)}
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
              onChange={(e) => setCountry(e.target.value)}
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
              onChange={(e) => setCity(e.target.value)}
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
              onChange={(e) => setCurrentCity(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setPastSurgery(e.target.value)}
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
              onChange={(e) => setContactName(e.target.value)}
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
              onChange={(e) => setContactLastName(e.target.value)}
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
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="form" style={{ justifyContent: "center" }}>
          <button className="buttonstat3" onClick={sendInfo}>
            GUARDAR DATOS
          </button>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "rgb(83, 142, 194)",
            fontFamily: "Jost",
            marginBottom: "3vh",
          }}
        >
          Defina los umbrales de presión para el paciente:
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Jost",
            marginBottom: "3vh",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              fontFamily: "Jost",
              marginBottom: "3vh",
            }}
          >
            Presión Sistólica
          </div>
          <div style={{ marginLeft: "20px", color: "gray" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>mín:</div>{" "}
              <input
                variant="outlined"
                className="smallInput"
                value={minPatientSystolicPressure}
                onChange={(e) => setMinPatientSystolicPressure(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1vh",
              }}
            >
              <div>máx:</div>{" "}
              <input
                variant="outlined"
                className="smallInput"
                value={maxPatientSystolicPressure}
                onChange={(e) => setMaxPatientSystolicPressure(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Jost",
            borderTop: "1px solid lightgray",
            paddingTop: "10px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginBottom: "3vh",
            }}
          >
            Presión Diastólica
          </div>
          <div style={{ marginLeft: "20px", color: "gray" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>mín:</div>{" "}
              <input
                variant="outlined"
                className="smallInput"
                value={minPatientDiastolicPressure}
                onChange={(e) => setMinPatientDiastolicPressure(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1vh",
              }}
            >
              <div>máx:</div>{" "}
              <input
                variant="outlined"
                className="smallInput"
                value={maxPatientDiastolicPressure}
                onChange={(e) => setMaxPatientDiastolicPressure(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(History);