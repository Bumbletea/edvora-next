import { AppBar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { IUser } from "../utils/types";
import Image from "next/image";

const Header: React.FC<{user : IUser}> = ({user}) => {
  return (
    <AppBar style={{ height: "84px",backgroundColor : "#101010" }} position="static">
      <div
        style={{
          marginLeft: "43px",
          marginTop: "21px",
          display: "flex",
          justifyContent: "space-between",
          marginRight: "20px",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "700", fontSize: "36px" }}>Edvora</span>
        <div style={{display : "flex", alignItems: "center"}}>
            <span style={{marginRight : "25px",fontSize : "20px",fontWeight : "700"}}>{user.name}</span>
          <Image
            src={user.url}
            alt="header"
            width={"45px"}
            height={"45px"}
            style={{ borderRadius: "22px" }}
          />
        </div>
      </div>
    </AppBar>
  );
};
export default Header;
