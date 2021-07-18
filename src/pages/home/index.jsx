import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import DashboardTable from '../../components/Dashboard/table';
import Upload from '../../components/firebase/firebase_configure';
import { platformApi } from '../../helpers';
import { getUserId } from '../../utils';
import { useHistory } from "react-router-dom";
import classes from "./home.module.css";

const Home = () => {
    const [url, setUrl] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [filename, setFilename] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([])
    const history = useHistory();

    useEffect(() => {
        if (uploaded && url && filename) {
            setSpinning(true)
            const userId = getUserId();
            platformApi.post(`/rest/api/v1/pdf/save/pdfFile/${userId}`,
                { fileName: filename, url: url }).then(result => {
                    setTableData()
                    setFilename(null)
                    setUrl(null)
                }).catch(err => {
                    setSpinning(true)
                    message.error("something went wrong", 3)
                })
        }
    }, [uploaded, url])


    useEffect(() => {
        setTableData()
    }, [])


    const handleDeletePdf = (id) => {
        console.log(id);
        platformApi.delete(`/rest/api/v1/pdf/deletePdf/${id}`).then(res => {
            message.success("Pdf deleted success", 3)
            setTableData()
        }).catch(err => {
            message.error("pdf deletion failed", 3)
        })
    }


    const setTableData = () => {
        setSpinning(true)
        const userId = getUserId();
        platformApi.get(`/rest/api/v1/user/${userId}`).then(result => {
            let { data } = result;
            setData(data.pdfs)
            setSpinning(false)
        }).catch(err => {
            setSpinning(false);
            message.error("something went wrong", 3)
        })
    }

    return (
        <div className={classes.home}>
            <Upload
                setUrl={setUrl}
                setUploaded={setUploaded}
                setFilename={setFilename}
                setSpinning={setSpinning}
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
    )
}

export default Home;