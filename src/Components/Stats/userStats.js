import React, { useState, useEffect } from "react";

function UserStats(selected) {
  console.log(selected, "ya");

  if (selected !== undefined) {
    return (
      <div
        style={{
          height: "12vh",
          backgroundColor: "red",
        }}
      ></div>
    );
  }
}

export default UserStats;
