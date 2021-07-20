import React from "react";
import classes from "./header.module.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { removeStorage } from "../../utils";



const Header = ({ page }) => {
  const history = useHistory();

  const onLogoutFunc=()=>{
    removeStorage();
    history.push("/login");
  }

  return (
    <div className={classes.nav}>
      {page === "Home" ? (
        <div style={{ cursor: "pointer" }}>
          <FilePdfOutlined /> PDF Extractor
        </div>
      ) : (
        <div onClick={() => history.goBack()} style={{ cursor: "pointer" }}>
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </div>
      )}

      <div className={classes.logout} onClick={onLogoutFunc}>
      <LogoutOutlined style={{marginRight:"10px"}} />  Logout
      </div>
    </div>
  );
};

export default Header;
