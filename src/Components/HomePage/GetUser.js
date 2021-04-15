import React, { useState } from "react";
import axios from "axios";

export default async function submit(email, password, dispatch, ...props) {
  console.log("im in yes");

  const loginUser = { email, password };

  const setUser = (payload) => ({ type: "LOGIN_USER", payload });

  console.log(loginUser);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginRes = await axios.post(
      "http://localhost:3001/users/login",
      loginUser,
      config
    );

    if (loginRes.data.token) {
      dispatch(setUser(loginRes.data.token));
      localStorage.setItem("auth-token", loginRes.data.token);
      props.history.push("/estadisticas");
    } else {
      alert("no funcionó");
    }
  } catch (err) {
    alert(err);
  }
}
