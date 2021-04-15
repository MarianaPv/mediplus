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


const cookies = new Cookies();


function Stats(props) {

const [GraficaDePresionGeneral,setraficaDePresionGeneral] = useState([])
const [GraficandoFrecuenciaCardiaca,setGraficandoFrecuenciaCardiaca] = useState([])
const [GraficandoPeso,setGraficandoPeso]= useState([])

const [TodosLosUsuarios, setTodosLosUsuarios] = useState([]);
const [UsuarioSeleccionado,setUsuarioSeleccionado] = useState("")
const [EstadisticosDeUsuarioSeleccionado,setEstadisticosDeUsuarioSeleccionado] = useState("------")

const [selected, setSelected] = useState(null);
const [isUserStatsOpen, setIsUserStatsOpen] = useState(false);
const [searchedUser, setSearchedUser] = useState();
const [filteredUsers, setFilteredUsers] = useState([]);

const [LimiteSliderPresion, setLimiteSliderPresion] = useState(100)
const [LimiteSliderFrecuencia,setLimiteSliderFrecuencia] = useState(100)
const [LimiteSliderPeso,setLimiteSliderPeso] = useState(100)

// const [DatosPreDiastolica,setDatosPreDiastolica] = useState("")
// const [DatosPreSistolica ,setDatosPreSistolica] = useState("")
// const [Fecha,setFecha] = useState("")

// ESTE ES PARA TRAER EL NOMBRE DE LOS USUARIOS

  useEffect(()=>{
    if(!cookies.get('id')){
      window.location.href="/";
    }
  
  }, [])

  useEffect(()=>{
    try{
      
      axios.get("http://localhost:3001/userapps/stadisticas").then(res=>{
      setTodosLosUsuarios(res.data)
      console.log("TRAIGO NOMBRES")
      console.log(res.data)
      TraigoDatosDePacienteSeleccionado()
      
  })
    }catch (err){
      console.log("NO PUDIMOS TRAER PACIENTES")
    }
  },[])

  
  
          const TraigoDatosDePacienteSeleccionado =() =>{

                    console.log("TRAIGO LOS DATOS")
                    setEstadisticosDeUsuarioSeleccionado(selected)
                    console.log(EstadisticosDeUsuarioSeleccionado)
                    GraficaPresion()
                    GraficaFrecuenciaCardiaca()
                    GraficaPeso()

                    console.log(UsuarioSeleccionado)

                      // try{
                      //   setDatosPreDiastolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                      //     return valor.diastolicPressure
                      //   })
                      //   setDatosPreSistolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                      //     return valor.systolicPressure
                      //   })
                      //   setFecha = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                      //     return valor.date
                      //   })
                      // }catch (err){
                      //   console.log("Problemas")
                      // }
          
          
          }



                  //GRÁFICO DE PRESIÓN {INICIO}

                  const GraficaPresion = () =>{
                    
                                let DatosPresionDiastolica = [];
                                let DatosPresionSistolica = []
                                let Fechas = [];
                                let Sintomas = [];
                                let LimiteSistolica = [];
                                let LimiteDiastolica = [];
                                try{
                                  setLimiteSliderPresion(EstadisticosDeUsuarioSeleccionado.historicPressure.length - 1)
                                }catch(err){
                                  console.log("No se definen límites aun ")
                                }

                                try {
                                  DatosPresionDiastolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                                    return valor.diastolicPressure
                                  })
                                  DatosPresionSistolica = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                                    return valor.systolicPressure
                                  })
                                  Fechas = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                                    return valor.date
                                  })

                                            for (let x in Fechas){
                                              let numero = Fechas[x].indexOf("T")
                                              let Hora = Fechas[x].slice(numero+1, numero+3)
                                              let tiempo = "AM"
                                              if(parseInt(Hora,10)>12) {
                                                tiempo = "PM"
                                              }
                                              Fechas[x] = Fechas[x].substr(0,numero) + " " +tiempo
                                            }
                                            
                                            DatosPresionDiastolica=DatosPresionDiastolica.slice(LimitePresion,DatosPresionDiastolica.length)
                                            DatosPresionSistolica=DatosPresionSistolica.slice(LimitePresion,DatosPresionSistolica.length)
                                            Fechas=Fechas.slice(LimitePresion,Fechas.length)

                                } catch (err) {
                                  console.log("No se puudo")
                                }
                                for (let i = 0; i < DatosPresionDiastolica.length; i++) {
                                  LimiteSistolica.push(100)
                                  LimiteDiastolica.push(80)
                                }

                                try{
                                    setraficaDePresionGeneral({
                                      labels: Fechas,
                                          datasets:[
                                            {
                                              label: "PRESIÓN DIASTÓLICA",
                                              data: DatosPresionDiastolica,
                                              borderWidth: 2,
                                              borderColor: "rgba(0,66,63,0.6)",
                                              backgroundColor: "rgba(0,0,0,0)",
                                              lineTension: 0,
                                              pointBackgroundColor: "rgba(0,66,63,0.6)"
                                            },
                                            {
                                              label: "PRESIÓN SISTÓLICA",
                                              data: DatosPresionSistolica,
                                              borderWidth: 2,
                                              borderColor: "rgba(0,3,58,0.6)",
                                              backgroundColor: "rgba(0,0,0,0)",
                                              pointBackgroundColor:"rgba(0,3,58,0.6)" ,
                                              lineTension: 0
                                            },
                                            {
                                              label: "LÍMITE SISTÓLICA",
                                              data: LimiteSistolica,
                                              borderWidth: 1,
                                              borderColor: "rgba(117,0,0,0.51)",
                                              backgroundColor: "rgba(0,0,0,0)",
                                              pointBorderColor:"rgba(255,255,255,1)" ,
                                              lineTension: 0.1
                                            },
                                            {
                                              label: "LÍMITE DIASTÓLICA",
                                              data: LimiteDiastolica,
                                              borderWidth: 1,
                                              borderColor: "rgba(0,0,0,0.5)",
                                              backgroundColor: "rgba(0,0,0,0)",
                                              pointBorderColor:"rgba(255,255,255,1)" ,
                                              lineTension: 0.1
                                            }
                                          ]

                                    })}catch (err){
                                      setraficaDePresionGeneral({
                                        labels: [],
                                        datasets:[
                                          {
                                            label: "GRÁFICA PRESIÓN VS TIEMPO",
                                            data: [],
                                            backgroundColor:['rgba(75,102,103,0.5)'],
                                            borderWidth: 4
                                          }
                                        ]
                                      })
                                }

                      
                    }

                    //GRÁFICO DE PRESIÓN {fIN}

                    //GRÁFICO DE FRECUENCIA CARDIACA {ORIGEN}

                              const GraficaFrecuenciaCardiaca = () =>{
                              
                                let DatosFrecuenciaCardiaca = [];
                                let Fechas = [];
                                
                                try {
                                  DatosFrecuenciaCardiaca = EstadisticosDeUsuarioSeleccionado.historicHeartFreq.map(valor =>{
                                    return valor.heartFreq
                                  })
                                  Fechas = EstadisticosDeUsuarioSeleccionado.historicHeartFreq.map(valor =>{
                                    return valor.date
                                  })

                                            for (let x in Fechas){
                                              let numero = Fechas[x].indexOf("T")
                                              let Hora = Fechas[x].slice(numero+1, numero+3)
                                              let tiempo = "AM"
                                              if(parseInt(Hora,10)>12) {
                                                tiempo = "PM"
                                              }
                                              Fechas[x] = Fechas[x].substr(0,numero) + " " +tiempo
                                            }
                                            DatosFrecuenciaCardiaca=DatosFrecuenciaCardiaca.slice(LimitePresion,DatosFrecuenciaCardiaca.length)
                                            Fechas=Fechas.slice(LimitePresion,Fechas.length)
                                            

                                } catch (err) {
                                  console.log("No se puudo")
                                }

                                try{
                                  setGraficandoFrecuenciaCardiaca({
                                      labels: Fechas,
                                          datasets:[
                                            {
                                              label: "FRECUENCIA CARDIACA",
                                              data: DatosFrecuenciaCardiaca,
                                              borderWidth: 2,
                                              borderColor: "rgba(0,66,63,0.88)",
                                              backgroundColor: "rgba(0,0,0,0)",
                                              lineTension: 0,
                                              pointBackgroundColor: "rgba(0,66,63,0.88)"
                                            }
                                          ]

                                    })}catch (err){
                                      setGraficandoFrecuenciaCardiaca({
                                        labels: [],
                                        datasets:[
                                          {
                                            label: "FRECUENCIA CARDIACA",
                                            data: [],
                                            backgroundColor:['rgba(75,102,103,0.5)'],
                                            borderWidth: 4
                                          }
                                        ]
                                      })
                                }

                      
                    }

          //GRÁFICO DE FRECUENCIA CARDIACA {FIN}

                                  //GRÁFICO DE PESO {ORIGEN}

                                  const GraficaPeso= () =>{
                                                      
                                    let DatosPeso = [];
                                    let Fechas = [];
                                    
                                    try {
                                      DatosPeso = EstadisticosDeUsuarioSeleccionado.historicWeight.map(valor =>{
                                        return valor.weight
                                      })
                                      Fechas = EstadisticosDeUsuarioSeleccionado.historicWeight.map(valor =>{
                                        return valor.date
                                      })

                                                for (let x in Fechas){
                                                  let numero = Fechas[x].indexOf("T")
                                                  let Hora = Fechas[x].slice(numero+1, numero+3)
                                                  let tiempo = "AM"
                                                  if(parseInt(Hora,10)>12) {
                                                    tiempo = "PM"
                                                  }
                                                  Fechas[x] = Fechas[x].substr(0,numero) + " " +tiempo
                                                }
                                                DatosPeso=DatosPeso.slice(LimitePresion,DatosPeso.length)
                                                Fechas=Fechas.slice(LimitePeso,Fechas.length)          

                                    } catch (err) {
                                      console.log("No se puudo")
                                    }

                                    try{
                                      setGraficandoPeso({
                                          labels: Fechas,
                                              datasets:[
                                                {
                                                  label: "PESO",
                                                  data: DatosPeso,
                                                  borderWidth: 2,
                                                  borderColor: "rgba(0,3,58,0.7)",
                                                  backgroundColor: "rgba(0,0,0,0)",
                                                  lineTension: 0,
                                                  pointBackgroundColor: "rgba(0,3,58,0.7)"
                                                }
                                              ]

                                        })}catch (err){
                                          setGraficandoPeso({
                                            labels: [],
                                            datasets:[
                                              {
                                                label: "PESO",
                                                data: [],
                                                backgroundColor:['rgba(75,102,103,0.5)'],
                                                borderWidth: 4
                                              }
                                            ]
                                          })
                                    }

                          
                        }

                        //GRÁFICO DE PESP {FIN}


                    //Slider {ORIGEN}
                                  const marksPresion =[
                                    {
                                      value:0,
                                      label: "Mostrar mas datos"
                                    },
                                    {
                                      value:LimiteSliderPresion,
                                      label: "Mostrar menos datos"
                                    }
                                  ]
                                  
                                  const [LimitePresion,setLimitePresion] = useState("")

                                  const getValue = (e,value)=>{
                                    //console.log(value)
                                    setLimitePresion(value)
                                    try{
                                      setLimiteSliderPresion(EstadisticosDeUsuarioSeleccionado.historicPressure.length)
                                    }catch (err){
                                      setLimiteSliderPresion(100)
                                    }
                                    
                                    GraficaPresion()
                                    //TraigoDatosDePacienteSeleccionado()

                                  }
                    //Slider {FIN}

                    //SliderFrecuencia {ORIGEN}

                              const marksFrecuencia =[
                                {
                                  value:0,
                                  label: "Mostrar mas datos"
                                },
                                {
                                  value:LimiteSliderFrecuencia,
                                  label: "Mostrar menos datos"
                                }
                              ]
                              
                              const [LimiteFrecuencia,setLimiteFrecuencia] = useState("")

                              const getValueFrecuencia = (e,value)=>{
                                //console.log(value)
                                setLimiteFrecuencia(value)
                                try{
                                  setLimiteSliderFrecuencia(EstadisticosDeUsuarioSeleccionado.historicHeartFreq.length)
                                }catch (err){
                                  setLimiteSliderFrecuencia(100)
                                }
                                
                                GraficaFrecuenciaCardiaca()
                                //TraigoDatosDePacienteSeleccionado()

                              }
                    //SliderPeso {FIN}

                              //SliderFrecuencia {ORIGEN}

                              const marksPeso =[
                                {
                                  value:0,
                                  label: "Mostrar mas datos"
                                },
                                {
                                  value:LimiteSliderFrecuencia,
                                  label: "Mostrar menos datos"
                                }
                              ]
                              
                              const [LimitePeso,setLimitePeso] = useState("")

                              const getValuePeso = (e,value)=>{
                                //console.log(value)
                                setLimitePeso(value)
                                try{
                                  setLimiteSliderPeso(EstadisticosDeUsuarioSeleccionado.historicHeartFreq.length)
                                }catch (err){
                                  setLimiteSliderPeso(100)
                                }
                                
                                GraficaFrecuenciaCardiaca()
                                //TraigoDatosDePacienteSeleccionado()

                              }
                    //SliderPeso {FIN}

                  //GRÁFICO DE CONDICIONES {INICIO}
                                // const GraficaCondiciones = () =>{
                                //   let Sintomas = []
                                //   let TotalData ;
                                //   let EnReposo = 0;
                                //   let OtrasCondiciones = 0;
                                //   try{
                                //     Sintomas = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                                //       return valor.condition
                                //     })
                                //     //console.log("Sintomas")
                                //   }catch (err){
                                //     console.log("SE PRESENTA UN PROBLEMA EN TOMAR LOS SINTOMAS")
                                //   }
                                //   try{
                                //     TotalData = Sintomas.length;
                                //     for(let Dato in Sintomas) {
                                //       if (Sintomas[Dato] == "en reposo"){
                                //         EnReposo++;
                                //       }
                                //       else{
                                //         OtrasCondiciones++;
                                //       }
                                //     }
                                //   }catch (err){
                                //     console.log(err)
                                //   }
                                //   try{
                                //     setGraficaDeCondiciones({
                                //       labels: ["En Reposo","Otras condiciones"],
                                //           datasets:[
                                //             {
                                //               label: "GRÁFICA PRESIÓN DIASTÓLICA",
                                //               data: [EnReposo,OtrasCondiciones],
                                //               borderWidth: 4,
                                //               backgroundColor: ["rgba(14,50,108,0.7)","rgba(14,164,110,0.7)"]
                                //             }
                                //           ]
                                //     })
                                //   }catch(err){

                                //   }

                                // }

                  //GRÁFICO DE CONDICIONES {FIN}


                  //SELECCIÓN DE ESTADOS ANORMALES {INICIO}

                            //   const ObtencionDeAnormales = () =>{
                            //       let ValoresAnormales = []
                            //       let Fechas = [];
                            //       let Sintomas = [];


                            //       try {
                            //       ValoresAnormales = EstadisticosDeUsuarioSeleccionado.historicPressure.map(valor =>{
                            //         if (valor.diastolicPressure> 80 || valor.systolicPressure>100){
                            //           return valor
                            //         }
                            //       })
                            //       console.log(ValoresAnormales)
                            //   }catch (err){
                            //     console.log("PROBLEMAS PARA ENCONTRAR ESTOS DATOS")
                            //   }
                            //   setDatosAnormales(ValoresAnormales)

                            // }

                  //SELECCIÓN DE ESTADOS ANORMALES {FIN}



                  //Filtro {origen}

                  const onChange = (ele) => {
                    if (TodosLosUsuarios !== null) {
                      setFilteredUsers(TodosLosUsuarios.users);
                      setSearchedUser(ele);
                    }
                  };

                  const funciona = (ele) => {
                    try{
                    setSelected(ele);
                    console.log("Este es el Selected")
                    console.log(selected);
                    console.log("Este es el Selected")
                    UserStats(selected);
                    setIsUserStatsOpen(true);
                    }catch(err){
                      console.log(err)
                    }
                  };

                  useEffect(() => {
                    if (selected) {
                      setUsuarioSeleccionado(selected._id)
                      TraigoDatosDePacienteSeleccionado()
                      GraficaPresion()                    
                    }
                  }, [selected]);

                  //Filtro {fin}

return (
  <div
  style={{
    width: "100vw",
    height: "100vh",
  }}
>   <Navigation />
    <div className="blue">
        <div className="content1">Cuidandonos Mutuamente.</div>
        <div className="content2">
          Aquí podrás conocer las estadísticas de los pacientes a través del
          tiempo.
        </div>
    </div>

              <div>
              <SearchField
                          placeholder="Buscar..."
                          onChange={(ele) => onChange(ele)}
                          classNames="test-class"
                        />
                        {filteredUsers
                          .filter((ele) => {
                            if (searchedUser === "") {
                              return null;
                            } else if (
                              ele.displayName
                                .toLowerCase()
                                .includes(searchedUser.toLowerCase())
                            ) {
                              return ele;
                            }
                          })
                          .map((ele, index) => {
                            if (filteredUsers) {
                              return (
                                <div key={index} style={{ backgroundColor: "white" }}>
                                  <p className="p" onClick={() => funciona(ele)}>
                                    {ele.displayName}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          })}{" "}
              </div>

    <button onClick= {TraigoDatosDePacienteSeleccionado} className="BOTON-FALSO">MOSTRAR ESTADÍSTICOS </button>
    <div>
        {/* HAREMOS AHORA EL SELECTOR, SERÁ TEMPORAL */}
          <div className = "Pacientes">
          </div> 
          <div className = "Intento">
          <div className = "Estadisticos">

                  <div className="DePresion">
                    <Line data = {GraficaDePresionGeneral} options={{
                        responsive:true,
                        title: {text: "ESTADÍSTICAS DE PRESION", display:true},
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true
                              }
                            }
                          ],
                          xAxes:[{
                            ticks:{
                              minRotation: 0,
                              fontSize: 10                            
                            }
                          }]
                        }
                      } }/>
                      <div style={{width:"70%", margin:"auto"}}>
                      <Slider 
                      max={LimiteSliderPresion}
                      step={2}
                      marks={marksPresion}
                      onChange={getValue}
                      ></Slider>
                      </div>
                  </div>

                  <div className="Segundos">
                    <Line data = {GraficandoFrecuenciaCardiaca} options={{
                        responsive:true,
                        title: {text: "FRECUENCIA CARDIACA", display:true},
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true
                              }
                            }
                          ]
                        }
                      } }/>
                      <div style={{width:"70%", margin:"auto"}}>
                      <Slider 
                      max={LimiteSliderFrecuencia}
                      step={2}
                      marks={marksFrecuencia}
                      onChange={getValueFrecuencia}
                      ></Slider>
                      </div>

                  </div>

                  <div className="Segundos">
                    <Line data = {GraficandoPeso} options={{
                        responsive:true,
                        title: {text: "PESO", display:true},
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true
                              }
                            }
                          ]
                        }
                      } }/>

                      <div style={{width:"70%", margin:"auto"}}>
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


</div>
    
  );

  //MARCA DE RETORNO DE INICIO
}

export default withRouter(Stats);