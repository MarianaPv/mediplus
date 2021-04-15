import React, { useState, useEffect } from "react";
import "./Stats.css";
import { LineChart, PieChart } from "react-chartkick";
import {Line, Pie, Doughnut} from 'react-chartjs-2';
import {Slider} from "@material-ui/core"
import Atipicos from "./atipicos"

//Marco

function Grafica(props){

    const [GraficaDePresionGeneral, setraficaDePresionGeneral] = useState([]);
  const [
    GraficandoFrecuenciaCardiaca,
    setGraficandoFrecuenciaCardiaca,
  ] = useState([]);
  const [GraficandoPeso, setGraficandoPeso] = useState([]);
  const [LimiteSliderPresion, setLimiteSliderPresion] = useState(100);
  const [LimiteSliderFrecuencia, setLimiteSliderFrecuencia] = useState(100);
  const [LimiteSliderPeso, setLimiteSliderPeso] = useState(100);

  const EstadisticosDeUsuarioSeleccionado = props.selecto[0]
//   console.log( props.selecto[0])
  const prueba = props.selecto[0].displayName + " " +props.selecto[0].lastName
  
const [PermitirSlider,setPermitirSlider] = useState("")

const [ValorPresion,setValorPresion] = useState(0)
const [LimitePresion, setLimitePresion] = useState("");

const LargoDeLosDatosPresion = EstadisticosDeUsuarioSeleccionado.historicPressure.length
const LargoDeLosDatosPeso = EstadisticosDeUsuarioSeleccionado.historicWeight.length

useEffect(()=>{
    if(LargoDeLosDatosPresion>16){
        setValorPresion(LargoDeLosDatosPresion - 15 )
        
    }else{
        setLimitePresion(LargoDeLosDatosPresion/2)
    }
    setLimitePresion(LargoDeLosDatosPresion - 15 )

},[])

useEffect(()=>{

    GraficaFrecuenciaCardiaca()
    GraficaPeso()

},[])

const [MarcaPresion,setMarcaPresion] = useState([])
useEffect(()=>{

    GraficaPresion()
    setPermitirSlider(1)
    if(ValorPresion>0 && LargoDeLosDatosPresion>16){
        setMarcaPresion(marksPresion[0])
    }else{
        setMarcaPresion(marksPresion[1])
    }

},[LimitePresion])

                                        const GraficaPresion = () => {

                                            let DatosPresionDiastolica = [];
                                            let DatosPresionSistolica = [];
                                            let Fechas = [];
                                            let Sintomas = [];
                                            let LimiteSistolica = [];
                                            let LimiteDiastolica = [];

                                            try {
                                                if(LargoDeLosDatosPresion>1){
                                                    setLimiteSliderPresion(
                                                        LargoDeLosDatosPresion 
                                                    );
                                                }else{
                                                    setLimiteSliderPresion(
                                                        100
                                                    );
                                                }

                                            } catch (err) {
                                            console.log("No se definen límites aun ");
                                            }

                                            try {
                                            DatosPresionDiastolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(
                                                (valor) => {
                                                return valor.diastolicPressure;
                                                }
                                            );
                                            DatosPresionSistolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(
                                                (valor) => {
                                                return valor.systolicPressure;
                                                }
                                            );
                                            Fechas = EstadisticosDeUsuarioSeleccionado.historicPressure.map(
                                                (valor) => {
                                                return valor.date;
                                                }
                                            );

                                            for (let x in Fechas) {
                                                let numero = Fechas[x].indexOf("T");
                                                let Hora = Fechas[x].slice(numero + 1, numero + 3);
                                                let tiempo = "AM";
                                                if (parseInt(Hora, 10) > 12) {
                                                tiempo = "PM";
                                                }
                                                Fechas[x] = Fechas[x].substr(0, numero) + " " + tiempo;
                                            }

                                            DatosPresionDiastolica = DatosPresionDiastolica.slice(
                                                LimitePresion,
                                                DatosPresionDiastolica.length
                                            );
                                            DatosPresionSistolica = DatosPresionSistolica.slice(
                                                LimitePresion,
                                                DatosPresionSistolica.length
                                            );
                                            Fechas = Fechas.slice(LimitePresion, Fechas.length);
                                            } catch (err) {
                                            console.log("No se puudo");
                                            }
                                            for (let i = 0; i < DatosPresionDiastolica.length; i++) {
                                            LimiteSistolica.push(EstadisticosDeUsuarioSeleccionado.maxPatientSystolicPressure);
                                            LimiteDiastolica.push(EstadisticosDeUsuarioSeleccionado.maxPatientDiastolicPressure);
                                            }

                                            try {
                                            setraficaDePresionGeneral({
                                                labels: Fechas,
                                                datasets: [
                                                {
                                                    label: "PRESIÓN DIASTÓLICA",
                                                    data: DatosPresionDiastolica,
                                                    borderWidth: 2,
                                                    borderColor: "rgba(0,66,63,0.6)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    lineTension: 0,
                                                    pointBackgroundColor: "rgba(0,66,63,0.6)",
                                                },
                                                {
                                                    label: "PRESIÓN SISTÓLICA",
                                                    data: DatosPresionSistolica,
                                                    borderWidth: 2,
                                                    borderColor: "rgba(0,3,58,0.6)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    pointBackgroundColor: "rgba(0,3,58,0.6)",
                                                    lineTension: 0,
                                                },
                                                {
                                                    label: "LÍMITE SISTÓLICA",
                                                    data: LimiteSistolica,
                                                    borderWidth: 1,
                                                    borderColor: "rgba(117,0,0,0.51)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    pointBorderColor: "rgba(255,255,255,1)",
                                                    lineTension: 0.1,
                                                },
                                                {
                                                    label: "LÍMITE DIASTÓLICA",
                                                    data: LimiteDiastolica,
                                                    borderWidth: 1,
                                                    borderColor: "rgba(0,0,0,0.5)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    pointBorderColor: "rgba(255,255,255,1)",
                                                    lineTension: 0.1,
                                                },
                                                ],
                                            });
                                            } catch (err) {
                                            setraficaDePresionGeneral({
                                                labels: [],
                                                datasets: [
                                                {
                                                    label: "GRÁFICA PRESIÓN VS TIEMPO",
                                                    data: [],
                                                    backgroundColor: ["rgba(75,102,103,0.5)"],
                                                    borderWidth: 4,
                                                },
                                                ],
                                            });
                                            }
                                        };
                                        //Slider {ORIGEN}
                                        const marksPresion = [[
                                            {
                                            value: 0,
                                            label: "Mostrar mas datos",
                                            },
                                            {
                                            value: LimiteSliderPresion,
                                            label: "Mostrar menos datos",
                                            },
                                            {
                                                value: ValorPresion,
                                                label: "Ultima Semana",
                                                },
                                            
                                        ],[
                                            {
                                            value: 0,
                                            label: "Mostrar mas datos",
                                            },
                                            {
                                            value: LimiteSliderPresion,
                                            label: "Mostrar menos datos",
                                            },
                                            
                                        ]];



                                        const getValue = (e, value) => {
                                            //console.log(value)
                                            setLimitePresion(value);
                                            try {
                                            setLimiteSliderPresion(
                                                EstadisticosDeUsuarioSeleccionado.historicPressure.length
                                            );
                                            } catch (err) {
                                            setLimiteSliderPresion(100);
                                            }

                                            GraficaPresion();
                                            //TraigoDatosDePacienteSeleccionado()
                                        };
                                        //Slider {FIN}
                                        //GRÁFICO DE PRESIÓN {fIN}

                                        //GRÁFICO DE FRECUENCIA CARDIACA {ORIGEN}

                                        const GraficaFrecuenciaCardiaca = () => {
                                            let DatosFrecuenciaCardiaca = [];
                                            let Fechas = [];

                                            try {
                                            DatosFrecuenciaCardiaca = EstadisticosDeUsuarioSeleccionado.historicHeartFreq.map(
                                                (valor) => {
                                                return valor.heartFreq;
                                                }
                                            );
                                            Fechas = EstadisticosDeUsuarioSeleccionado.historicHeartFreq.map(
                                                (valor) => {
                                                return valor.date;
                                                }
                                            );

                                            for (let x in Fechas) {
                                                let numero = Fechas[x].indexOf("T");
                                                let Hora = Fechas[x].slice(numero + 1, numero + 3);
                                                let tiempo = "AM";
                                                if (parseInt(Hora, 10) > 12) {
                                                tiempo = "PM";
                                                }
                                                Fechas[x] = Fechas[x].substr(0, numero) + " " + tiempo;
                                            }
                                            DatosFrecuenciaCardiaca = DatosFrecuenciaCardiaca.slice(
                                                LimiteFrecuencia,
                                                DatosFrecuenciaCardiaca.length
                                            );
                                            Fechas = Fechas.slice(LimiteFrecuencia, Fechas.length);
                                            } catch (err) {
                                            console.log("No se puudo");
                                            }

                                            try {
                                            setGraficandoFrecuenciaCardiaca({
                                                labels: Fechas,
                                                datasets: [
                                                {
                                                    label: "FRECUENCIA CARDIACA",
                                                    data: DatosFrecuenciaCardiaca,
                                                    borderWidth: 2,
                                                    borderColor: "rgba(0,66,63,0.88)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    lineTension: 0,
                                                    pointBackgroundColor: "rgba(0,66,63,0.88)",
                                                },
                                                ],
                                            });
                                            } catch (err) {
                                            setGraficandoFrecuenciaCardiaca({
                                                labels: [],
                                                datasets: [
                                                {
                                                    label: "FRECUENCIA CARDIACA",
                                                    data: [],
                                                    backgroundColor: ["rgba(75,102,103,0.5)"],
                                                    borderWidth: 4,
                                                },
                                                ],
                                            });
                                            }
                                        };

                                        //GRÁFICO DE FRECUENCIA CARDIACA {FIN}

                                        //GRÁFICO DE PESO {ORIGEN}

                                        const GraficaPeso = () => {
                                            let DatosPeso = [];
                                            let Fechas = [];
                                            
                                            try {
                                            DatosPeso = EstadisticosDeUsuarioSeleccionado.historicWeight.map(
                                                (valor) => {
                                                return valor.weight;
                                                }
                                            );
                                            Fechas = EstadisticosDeUsuarioSeleccionado.historicWeight.map((valor) => {
                                                return valor.date;
                                            });

                                            for (let x in Fechas) {
                                                let numero = Fechas[x].indexOf("T");
                                                let Hora = Fechas[x].slice(numero + 1, numero + 3);
                                                let tiempo = "AM";
                                                if (parseInt(Hora, 10) > 12) {
                                                tiempo = "PM";
                                                }
                                                Fechas[x] = Fechas[x].substr(0, numero) + " " + tiempo;
                                            }
                                            DatosPeso = DatosPeso.slice(LimitePeso, DatosPeso.length);
                                            Fechas = Fechas.slice(LimitePeso, Fechas.length);
                                            } catch (err) {
                                            console.log("No se puudo");
                                            }

                                            try {
                                            setGraficandoPeso({
                                                labels: Fechas,
                                                datasets: [
                                                {
                                                    label: "PESO",
                                                    data: DatosPeso,
                                                    borderWidth: 2,
                                                    borderColor: "rgba(0,3,58,0.7)",
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                    lineTension: 0,
                                                    pointBackgroundColor: "rgba(0,3,58,0.7)",
                                                },
                                                ],
                                            });
                                            } catch (err) {
                                            setGraficandoPeso({
                                                labels: [],
                                                datasets: [
                                                {
                                                    label: "PESO",
                                                    data: [],
                                                    backgroundColor: ["rgba(75,102,103,0.5)"],
                                                    borderWidth: 4,
                                                },
                                                ],
                                            });
                                            }
                                        };

                                        //GRÁFICO DE PESP {FIN}

                                        

                                        //SliderFrecuencia {ORIGEN}

                                        const marksFrecuencia = [
                                            {
                                            value: 0,
                                            label: "Mostrar mas datos",
                                            },
                                            {
                                            value: LimiteSliderFrecuencia,
                                            label: "Mostrar menos datos",
                                            },
                                        ];

                                        const [LimiteFrecuencia, setLimiteFrecuencia] = useState("");

                                        const getValueFrecuencia = (e, value) => {
                                            //console.log(value)
                                            setLimiteFrecuencia(value);
                                            try {
                                            setLimiteSliderFrecuencia(
                                                EstadisticosDeUsuarioSeleccionado.historicHeartFreq.length
                                            );
                                            } catch (err) {
                                            setLimiteSliderFrecuencia(100);
                                            }

                                            GraficaFrecuenciaCardiaca();
                                            //TraigoDatosDePacienteSeleccionado()
                                        };
                                        //SliderPeso {FIN}

                                        //SliderFrecuencia {ORIGEN}

                                        const marksPeso = [
                                            {
                                            value: 0,
                                            label: "Mostrar mas datos",
                                            },
                                            {
                                            value: LimiteSliderPeso,
                                            label: "Mostrar menos datos",
                                            },
                                        ];

                                        const [LimitePeso, setLimitePeso] = useState("");

                                        const getValuePeso = (e, value) => {
                                            //console.log(value)
                                            setLimitePeso(value);
                                            try {
                                                setLimiteSliderPeso(
                                                EstadisticosDeUsuarioSeleccionado.historicWeight.length
                                                );
                                            } catch (err) {
                                            setLimiteSliderPeso(100);
                                            }

                                            GraficaPeso();
                                            //TraigoDatosDePacienteSeleccionado()
                                        };
                                        //SliderPeso {FIN}

                                        





                                        //AHORA, VOY A HACER LO QUE CREO QUE SE DEBE HACER PARA QUE SE HAGA {INICIO}
                                    
    return(
        <div>
            <div style={{marginLeft: "30px", padding:"4px", background:"white",borderRadius:"8px",webkitBoxShadow: "0 0 10px lightgray", width:"30%", border:"solid RGBA(0,0,0,0.29) 2px"}}><h2>Paciente: {prueba} </h2></div>
            <div className="chartContainer">
                <div style={{ width: "90%", marginBottom: "5vh" }}>
                    <div className="Intento">
                        <div className="Estadisticos">

                            <div className="DePresion">
                                {PermitirSlider && <Line
                                    data={GraficaDePresionGeneral}
                                    options={{
                                    responsive: true,
                                    title: { text: "ESTADÍSTICAS DE PRESION", display: true },
                                    scales: {
                                        yAxes: [
                                        {
                                            ticks: {
                                            beginAtZero: true,
                                            },
                                        },
                                        ],
                                        xAxes: [
                                        {
                                            ticks: {
                                            minRotation: 0,
                                            fontSize: 10,
                                            },
                                        },
                                        ],
                                    },
                                    }}
                                />}
                                <div style={{ width: "70%", margin: "auto" }}>
                                    {PermitirSlider && <Slider
                                    defaultValue={ValorPresion}
                                    max={LimiteSliderPresion}
                                    step={2}
                                    marks={MarcaPresion}
                                    onChange={getValue}
                                    ></Slider>}
                                </div>
                        </div>
                        <div className="Segundos">
                            <Line
                            data={GraficandoFrecuenciaCardiaca}
                            options={{
                                responsive: true,
                                title: { text: "FRECUENCIA CARDIACA", display: true },
                                scales: {
                                yAxes: [
                                    {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    },
                                ],
                                },
                            }}
                            />
                            <div style={{ width: "60%", margin: "auto" }}>
                            <Slider
                                max={LimiteSliderFrecuencia}
                                step={2}
                                marks={marksFrecuencia}
                                onChange={getValueFrecuencia}
                            ></Slider>
                            </div>
                        </div>
                        <div className="Segundos">
                            <Line
                            data={GraficandoPeso}
                            options={{
                                responsive: true,
                                title: { text: "PESO", display: true },
                                scales: {
                                yAxes: [
                                    {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    },
                                ],
                                },
                            }}
                            />

                            <div style={{ width: "60%", margin: "auto" }}>
                            <Slider
                                max={LimiteSliderPeso}
                                step={2}
                                marks={marksPeso}
                                onChange={getValuePeso}
                            ></Slider>
                            </div>
                        </div>

                </div>
                </div>
                </div>


                <div>
                            <Atipicos data={EstadisticosDeUsuarioSeleccionado}></Atipicos>
                </div>
                </div> 
        </div>
    )
    
}

//Marco 2
//Marco 3

export default Grafica;