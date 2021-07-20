import { message } from "antd";
import React, { useEffect, useState } from "react";
import DashboardTable from "../../components/Dashboard/table";
import Upload from "../../components/firebase/firebase_configure";
import { platformApi } from "../../helpers";
import { getUserId } from "../../utils";
import { useHistory } from "react-router-dom";
import classes from "./home.module.css";
import Header from "../../components/header/header"

const Home = () => {
  const [url, setUrl] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [count, setCount] = useState(0);

  const upload = () => {
    setSpinning(true);
    const userId = getUserId();
    platformApi
      .post(`pdf/save/pdfFile/${userId}`, {
        fileName: filename,
        url: url,
      })
      .then((result) => {
        setTableData();
      })
      .catch((error) => {
        setSpinning(true);
        message.error(
          !error.response ? error.message : error.response.data.message,
          3
        );
      });
  };

  useEffect(() => {
    setTableData();
  }, []);

  const handleDeletePdf = (id) => {
    platformApi
      .delete(`/pdf/deletePdf/${id}`)
      .then((res) => {
        message.success("Pdf deleted success", 3);
        setTableData();
      })
      .catch((error) => {
        message.error(
          !error.response ? "PDF deletion failed" : error.response.data.message,
          3
        );
      });
  };

  const setTableData = () => {
    setSpinning(true);
    const userId = getUserId();
    platformApi
      .get(`/user/${userId}`)
      .then((result) => {
        let { data } = result;
        setData(data.pdfs);
        setSpinning(false);
      })
      .catch((error) => {
        setSpinning(false);
        message.error(
          !error.response ? error.message : error.response.data.message,
          3
        );
      });
  };

  return (
      <>
        <Header page="Home" />
        <div className={classes.home}>
            <Upload
            setUrl={setUrl}
            setUploaded={setUploaded}
            setFilename={setFilename}
            setSpinning={setSpinning}
            upload={upload}
        />

        <DashboardTable
            pagination={{
            pageSize: 10,
            defaultCurrent: 1,
            showQuickJumper: true,
            }}
            spinning={spinning}
            data={data}
            handleDeletePdf={handleDeletePdf}
            history={history}
        />
        </div>
    </>
  );
};

export default Home;
