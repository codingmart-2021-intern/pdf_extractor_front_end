import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { platformApi } from "../../helpers/api";
import axios from "axios";
import { Select, Affix, Form, Tooltip, Tabs, Slider, Button, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PDFviewer from "../../components/pdfviewer/pdfviewer";
import { getAccessToken } from "../../utils/index";

const Index = () => {
  const { Option } = Select;
  const { Meta } = Card;
  const history = useHistory();
  const { pdfid } = useParams();
  const { TabPane } = Tabs;
  const [options, setOptions] = useState();
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState();
  const [pages, setPages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const createPDF = (data) => {
    console.log(data);
    axios(`http://localhost:3002/rest/api/v1/pdf/download`, {
      method: "POST",
      responseType: "blob", //Force to receive data in a Blob Format
      headers: {
        Authorization: getAccessToken(),
      },
      data,
    })
      .then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "pdfextractor.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadSelected = () => {
    // /pdf/download
    createPDF({
      pdfId: pdfid,
      pageNos: selected,
    });
  };

  const removeSelected = (id) => {
    let tempImage = [...image];
    tempImage.splice(id, 1);

    setImage([...tempImage]);

    let tempSelected = [...selected];
    tempSelected.splice(id, 1);

    setSelected([...tempSelected]);
  };

  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
    let selectedPages = [];
    for(let i = values.slider[0]; i <= values.slider[1] ; i++ ){
      selectedPages.push(i-1);
    }
    createPDF({
      pdfId: pdfid,
      pageNos: selectedPages,
    });
  };

  useEffect(() => {
    platformApi
      .get(`/pdf/${pdfid}`)
      .then((response) => {
        setUrl(response.data.url);
        setPages(response.data.pages.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        history.push("/");
      });
  }, []);

  useEffect(() => {
    let tempSelected = [];

    setOptions(
      image.map((ele, i) => {
        if (!tempSelected.includes(ele)) {
          tempSelected.push(ele);
          return (
            <td>
              <Tooltip title={`Click image to delete`} color="red" key="red">
                <Card
                  onClick={() => removeSelected(i)}
                  title={`Page ${selected[i]}`}
                  hoverable
                  bordered={false}
                >
                  <img
                    alt={`Page ${selected[i]}`}
                    src={ele}
                    width="100px"
                    height="170px"
                  />
                </Card>
              </Tooltip>
            </td>
          );
        }
      })
    );
  }, [selected, image]);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <PDFviewer
          selected={selected}
          setSelected={setSelected}
          image={image}
          setImage={setImage}
        />
        <Affix
          offsetTop={170}
          style={{ width: "50%", padding: "50px", marginRight: "40px" }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Sorted PDF" key="1">
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
              >
                Download
              </Button>
            </TabPane>
            <TabPane
              style={{
                overflowX: "scroll",
              }}
              tab="Select PDF"
              key="2"
            >
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                style={{ position: "absolute" }}
                onClick={downloadSelected}
              >
                Download
              </Button>
              <table style={{ marginTop: "60px" }}>
                <thead>
                  <tr>{options}</tr>
                </thead>
              </table>
            </TabPane>
            <TabPane tab="Range PDF" key="3">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onSubmit}
              >
                <Form.Item name="slider" label="Range">
                  <Slider range min={1} max={pages} style={{ width: "70%" }} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size="large"
                    htmlType="submit"
                  >
                    Download
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Category PDF" key="4">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Affix>
      </div>
    </>
  );
};

export default Index;
