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
import {Slider, Modal, TextField, Button} from "@material-ui/core"
import { keys } from "@material-ui/core/styles/createBreakpoints";
import MaterialTable from "material-table"
import {makeStyles} from "@material-ui/core/styles"
import Grafica from "./graficas"
import { prototype } from "chart.js";


const cookies = new Cookies();

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   },
//   iconos:{
//     cursor: 'pointer'
//   }, 
//   inputMaterial:{
//     width: '100%'
//   }
// }));


function Stats(props) {

// const [DatosPreDiastolica,setDatosPreDiastolica] = useState("")
// const [DatosPreSistolica ,setDatosPreSistolica] = useState("")
// const [Fecha,setFecha] = useState("")

// ESTE ES PARA TRAER EL NOMBRE DE LOS USUARIOS

//Marco de referencia
// const styles = useStyles()
const [Data, setData] = useState([])
const [Buscador, setBuscador] = useState("")


const [Todos,setTodos] = useState([])
const [Paciente,setPaciente] = useState("")
const [valor,setValor]= useState(true)


const getUserInfo = async () => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.get(
      "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/userapps/stadisticas",
      config
    );
    setTodos(res.data.users);
    console.log("Estoy trayendo de la base de AWS")
    console.log(res.data.users)
  } catch (err) {
    alert(err);
  }
};

useEffect(() => {
  getUserInfo();
}, []);

// useEffect(()=>{
//   search(Todos)
// },[Buscador])

        //FUNCIÓN QUE TRAE LA TABLA {INICIO}

                // const Datatable = () =>{ 
                //   if(Data.length == 0){
                //     setData(Todos)
                //   }
                //   const columns = Data[0] && Object.keys(Data[0])
                //   return <div>
                //   <table cellPadding={0} cellSpacing={0}>
                //     <thead>
                //       <tr>{Data[0] && <th>Nombres</th>}
                //           {Data[0] && <th>Apellidos</th>}
                //           {Data[0] && <th>Documento de Identidad</th>}
                //           {Data[0] && <th>Presión</th>}
                //           {Data[0] && <th>Estado</th>}
                //           {Data[0] && <th>Búsqueda</th>}
                //       </tr>
                //     </thead>
                //     <tbody>

                //       {Data.map(row => <tr>
                //           <th>{row.displayName}</th>
                //           <th>{row.lastName}</th>
                //           <th>{row.docuId}</th>
                //           <th>{row.pressure}</th>
                //           <th>---</th>
                //           <th><button onClick={()=>PacienteSelecto(row._id)}>Buscar Paciente</button></th>
                //       </tr> )}

                //     </tbody> 


                //   </table>z
                  
                //   {/* {<ul>{Data.map(usuario=><li>{usuario.displayName}</li>)}</ul>} */}
                // </div>
                // }

                const LaTablaSuprema = () =>{
                  const data = Todos
                  data.map(usuario=>usuario.estado = "---")
                  const columns = [
                    {
                      title:"Nombre",
                      field:"displayName",
                      cellStyle: {
                        backgroundColor: 'white',
                        color: "black",
                        border:"solid white 1px",
                        fontFamily:"sans-serif",
                        fontSize:"15px",
                        fontWeight: "bold",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                      },
                    },
                    {
                      title:"Apellido",
                      field:"lastName",
                      cellStyle:{
                        backgroundColor: "white",
                        border:"solid white 1px",
                        fontFamily:"sans-serif",
                        fontSize:"15px",
                        fontWeight: "bold",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                      }
                    },
                    {
                      title:"Documento de identidad",
                      field:"docuId",
                      cellStyle:{
                        backgroundColor: "white",
                        border:"solid white 1px",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                      }
                    },
                    {
                      title:"Corre electrónico",
                      field:"email",
                      cellStyle:{
                        backgroundColor: "white",
                        border:"solid white 1px",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                      }
                    },
                    {
                      title:"Verificado",
                      field:"verified",
                      cellStyle:{
                        backgroundColor: "white",
                        border:"solid white 1px",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                        
                      } 
                    },
                    {
                      title:"estado",
                      field:"estado",
                      cellStyle:{
                        backgroundColor: "white",
                        border:"solid white 1px",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px"
                      } 
                    }
                  ]
                  return <MaterialTable title="Lista de Pacientes"
                    columns={columns}
                    data={data}
                    style={{width:"87%", margin:"auto", marginTop:"2%", marginBottom:"2%", border: "solid RGBA(4,72,99,0.68) 1px"}}
                    actions={[
                      {
                      icon : "search",
                      tooltip:"Ver datos estadísticos",
                      onClick: (event,rowData) => PacienteSelecto(rowData._id)
                    }
                    ]}

                    options={{
                      headerStyle: {
                        backgroundColor: "RGBA(4,72,99,0.68)",
                        color: '#FFF',
                        border:"solid white 1px",
                        fontSize: "16px",
                        fontFamily:"sans-serif",
                        fontWeight: "bold",
                      },

                      actionsCellStyle:{
                        border:"solid white 1px",
                        backgroundColor: 'white',
                        color: "black",
                        borderBottom: "solid RGBA(4,72,99,0.47) 1px" 
                      },

                      actionsColumnIndex: -1,
                      rowStyle: {
                        border:"solid white 1px"
                      },
                      pageSize: 5,
                    }}
                    localization={{
                      header:{
                        actions: "Ver más"
                      }
                    }}
                  ></MaterialTable>
                }
        
                const Preparo = () =>{
                  // console.log(Paciente[0].displayName)
                  return <div style={{background:"whitesmoke" }}>
                    <div className="Lista">
                      <button onClick={()=>Cambio()}>volver a la Lista</button>
                    </div>
                    <Grafica selecto = {Paciente}></Grafica>
                  
                    
                  </div>
                }
        
        //FUNCIÓN QUE TRAE LA TABLA {FIN}
        function PacienteSelecto(Seleccionado){
          const escogido = Todos.filter(usuario => usuario._id == Seleccionado)
          console.log(escogido)
          setPaciente(escogido)
          Cambio()
        }
        function Cambio(){
          setValor(!valor)
        }

        // function search(rows) {
        //   const l= rows.filter(row=> row.displayName.toLowerCase().indexOf(Buscador)>-1
        //                   || row.lastName.toLowerCase().indexOf(Buscador)>-1
        //   )
        //   setData(l)
        // }

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
    <div style={{margin:"5px"}}>
      {/* <div style={{display:"inline-block"}}>Buscar Paciente:</div>
      <input style={{margin:"10px"}}type="text" value={Buscador} onChange={(e) => setBuscador(e.target.value)}></input> */}
    </div>
    <div>
    {valor && <div>{Todos.length>0 && LaTablaSuprema()}</div>}
    </div>

    <div>
    {!valor && <div>{Paciente.length>0 && Preparo()}</div>}
    </div>
</div>
    
  );

  //MARCA DE RETORNO DE INICIO
}

export default withRouter(Stats);
