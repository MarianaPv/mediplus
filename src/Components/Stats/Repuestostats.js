import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Navigation from "../NavBar/Navigation";
import "./Stats.css";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchField from "react-search-field";
import UserStats from "./userStats";
import { LineChart, PieChart } from "react-chartkick";
import "chart.js";
//PUNTO DE REFERENCIA 
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Stats(props) {

useEffect(()=>{
  if(!cookies.get('id')){
    window.location.href="/";
  }
})
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState([]);
  const [weight, setWeight] = useState([]);
  const [patientsList, setPatientsList] = useState();
  const [searchedUser, setSearchedUser] = useState();
  const [isUserStatsOpen, setIsUserStatsOpen] = useState(false);
  const userToken = useSelector((state) => state.userInfo.token);
  const [userData, setUserData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserWeightChartData, setCurrentUserWeightChartData] = useState(
    {}
  );
  const [
    currentUserPressureChartData,
    setCurrentUserPressureChartData,
  ] = useState({});
  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const res = await axios.get("http://localhost:3001/userapps/stadisticas", config);
      setUserData(res.data);

      console.log(userData, "user");
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const onChange = (ele) => {
    if (userData !== null) {
      setFilteredUsers(userData.users);

      setSearchedUser(ele);

      // if (filteredUsers.includes(ele) === true) {
      //   setPatientsList(filteredUsers.filter(ele));
      //   console.log("hurray");
      // }
    }
  };

  const funciona = (ele) => {
    setSelected(ele);
    console.log(selected);
    UserStats(selected);
    setIsUserStatsOpen(true);
  };

  useEffect(() => {
    if (selected) {
      setIsUserStatsOpen(true);

      //FOR WEIGHT
      // {"2020-02-02": 45, "2020-03-03": 46}
      let hashMapWeightData = {};
      selected.historicWeight.map((weightObject, index) => {
        const completeWeightDateString = weightObject.date;
        const formattedWeightDateString = completeWeightDateString.substring(
          0,
          completeWeightDateString.indexOf("T")
        );
        const weight = parseFloat(weightObject.weight);
        hashMapWeightData[formattedWeightDateString] = weight;
      });
      setCurrentUserWeightChartData(hashMapWeightData);

      //FOR PRESSURE
      let hashMapPressureData = {};
      selected.historicPressure.map((pressureObject, index) => {
        const completePressureDateString = pressureObject.date;
        const formattedPressureDateString = completePressureDateString.substring(
          0,
          completePressureDateString.indexOf("T")
        );
        const pressure = parseFloat(pressureObject.pressure);
        hashMapPressureData[formattedPressureDateString] = pressure;
      });
      setCurrentUserPressureChartData(hashMapPressureData);
    }
  }, [selected]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navigation />

      <div className="blue">
        <div className="content1">Cuidandonos Mutuamente.</div>
        <div className="content2">
          Aquí podrás conocer las estadísticas de los pacientes a través del
          tiempo.
        </div>

        <div className="content2">
          Para conocer los datos de pacientes particulares, utiliza el siguiente
          filtro:
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
            <button className="buttonstat">Ver casos críticos</button>
          </div>
        </div>

        <img src={require("./flecha-hacia-abajo.png")} className="arrow" />
      </div>

      <div className="wave"></div>

      {isUserStatsOpen === true ? (
        <div className="chartContainer">
          <div className="chart">
            {" "}
            <LineChart
              title={"Peso vs tiempo"}
              xtitle={"Tiempo"}
              ytitle={"Peso"}
              data={currentUserWeightChartData}
            />
          </div>
          <div className="chart">
            {" "}
            <LineChart
              title={"Presión vs tiempo"}
              xtitle={"Tiempo"}
              ytitle={"Presión"}
              data={currentUserPressureChartData}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default withRouter(Stats);