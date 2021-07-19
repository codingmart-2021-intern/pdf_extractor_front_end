import React from "react";
import classes from "./header.module.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

const Header = ({ page }) => {
  const history = useHistory();
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
    </div>
  );
};

export default Header;
