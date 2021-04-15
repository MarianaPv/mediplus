import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Navigation from "../NavBar/Navigation";
import "./Stats.css";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchField from "react-search-field";
import UserStats from "./userStats";
import { LineChart, PieChart } from "react-chartkick";
import {Line, Pie, Doughnut} from 'react-chartjs-2';
import Cookies from 'universal-cookie';
import { set } from "mongoose";
import { red } from "@material-ui/core/colors";
import {Slider} from "@material-ui/core"


function Atipicos(props){
const EstadisticosDeUsuarioSeleccionado = props.data
const LaIdDelPaciente = EstadisticosDeUsuarioSeleccionado._id

const LimDiastolico = parseInt(EstadisticosDeUsuarioSeleccionado.maxPatientDiastolicPressure)
const LimSistolico = parseInt(EstadisticosDeUsuarioSeleccionado.maxPatientSystolicPressure)

  const [indexShower, setIndexShower] = useState(5);
  const [showMore, setShowMore] = useState(true);
  const [allEvents, setAllEvents] = useState();
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
  const [currentUserWeightChartData, setCurrentUserWeightChartData] = useState(
    {}
  );
  const [
    currentUserPressureChartData,
    setCurrentUserPressureChartData,
  ] = useState({})


                                useEffect(() => {
                               
                                    const selected = EstadisticosDeUsuarioSeleccionado
                                    console.log(selected)
                                    console.log(LimDiastolico,LimSistolico)

                                    let allEvents = selected.historicPressure.map((e, index) => {

                                        return (
                                        <div>
                                            {e.diastolicPressure > LimDiastolico
                                             || e.systolicPressure > LimSistolico? (
                                            <div className="event">
                                                <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    fontWeight: "bold",
                                                }}
                                                >
                                                Evento:
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div>Fecha:</div>
                                                <div>{e.date.substring(0, e.date.indexOf("T"))}</div>
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div>Hora:</div>
                                                <div>
                                                    {e.date.substring(
                                                    e.date.indexOf("T") + 1,
                                                    e.date.indexOf(".")
                                                    )}
                                                </div>
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div>Presión sistólica:</div>
                                                <div>{e.systolicPressure}</div>
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div>Presión diastólica:</div>
                                                <div>{e.diastolicPressure}</div>
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                {e.symptoms
                                                    ? e.symptoms.map((symptoms, i) => {
                                                        return (
                                                        <div
                                                            style={{ display: "flex", flexDirection: "row" }}
                                                        >
                                                            <div>Síntomas:</div>
                                                            <div>{symptoms}</div>
                                                        </div>
                                                        );
                                                    })
                                                    : null}
                                                </div>
                                
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                {e.condition ? (
                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div>Condiciones:</div>
                                
                                                    {Array.isArray(e.condition) ? (
                                                        e.condition.map((conditions, i) => {
                                                        return (
                                                            <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                            }}
                                                            >
                                                            <div>{conditions}</div>
                                                            </div>
                                                        );
                                                        })
                                                    ) : (
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                        <div>En reposo</div>
                                                        </div>
                                                    )}
                                                    </div>
                                                ) : null}
                                                </div>
                                            </div>
                                            ) : null}
                                        </div>
                                        );
                                    });
                                    setAllEvents(allEvents);
                                    console.log(allEvents, "eventos");
                                    // }
                                }, []);


                            const handleShowMore = () => {
                                const newIndexShower = indexShower + 4;
                                if (newIndexShower >= allEvents.length) {
                                setIndexShower(allEvents.length);
                                setShowMore(false);
                                } else {
                                setIndexShower(newIndexShower);
                                }
                            };
                            
                            useEffect(() => {
                                if (allEvents) {
                                if (allEvents.length > 5) {
                                    setShowMore(true);
                                } else {
                                    setShowMore(false);
                                }
                                }
                            }, [allEvents]);

                            //Aquí hago el post para guardar los datos

                            const valores= {
                                minPatientSystolicPressure,
                                maxPatientSystolicPressure,
                                minPatientDiastolicPressure,
                                maxPatientDiastolicPressure,
                                LaIdDelPaciente                               
                            }

                            const RegistroDelimites = async() =>{
                                try{
                                    const response = await axios.post(
                                        //Este es mi punto de ref..
                                        "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/userApps/ActualizandoLimites",valores
                                      );
                                      alert(response.data.users)

                            }catch (err) {
                                alert("Lo siento, por el momento no puede actualizar datos")
                            }
                        }

                            //Aquí hago el post para guardar los datos
    return (
                    <div>
                        <div className="card2">
                            <div className="titleEvent">EVENTOS ATÍPICOS:</div>
                            <div style={{ overflow: "auto", height: "30vh" }}>
                                {" "}
                                {allEvents
                                ? allEvents.slice(0, indexShower)
                                : "Aún no hay eventos"}
                            </div>
                            {showMore && (
                                <div onClick={handleShowMore} className="showMore">
                                Mostrar más{" "}
                                </div>
                            )}
                            </div>
                            <div className="card2" style={{ height: "40vh" }}>
                            <div className="titleEvent" style={{ marginTop: "3vh" }}>
                                MODIFICAR UMBRALES DE PACIENTE:
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
                                    fontSize: "13px",
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
                                    onChange={(e) =>
                                        setMinPatientSystolicPressure(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setMaxPatientSystolicPressure(e.target.value)
                                    }
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
                                    fontSize: "13px",
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
                                    onChange={(e) =>
                                        setMinPatientDiastolicPressure(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setMaxPatientDiastolicPressure(e.target.value)
                                    }
                                    />
                                </div>
                                </div>
                            </div>
                            <button onClick={()=>RegistroDelimites()}>Guardar</button>
                            </div>
                    </div>
    )

}

export default Atipicos;