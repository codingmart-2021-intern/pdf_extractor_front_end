import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { platformApi } from "../../helpers/api";
import axios from "axios";
import {
  Select,
  Affix,
  Form,
  Tooltip,
  Tabs,
  Slider,
  Button,
  Card,
  message,
  Spin,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PDFviewer from "../../components/pdfviewer/pdfviewer";
import { getAccessToken } from "../../utils/index";
import Header from "../../components/header/header";

const Index = () => {
  const { Option } = Select;
  const { Meta } = Card;
  const history = useHistory();
  const { pdfid } = useParams();
  const { TabPane } = Tabs;
  const [options, setOptions] = useState();
  const [options2, setOptions2] = useState();
  const [dropdown, setDropdown] = useState([]);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [image2, setImage2] = useState([]);
  const [url, setUrl] = useState();
  const [pages, setPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [load4, setLoad4] = useState(false);

  const createPDF = (data) => {
    setLoad(true);

    axios(
      `https://pdf-extractor-backend.herokuapp.com/rest/api/v1/pdf/download`,
      {
        method: "POST",
        responseType: "blob", //Force to receive data in a Blob Format
        headers: {
          Authorization: getAccessToken(),
        },
        data,
      }
    )
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "pdfextractor.pdf");
        document.body.appendChild(link);
        link.click();
        setLoad(false);
      })
      .catch((error) => {
        message.error(
          !error.response ? error.message : error.response.data.message
        );
        setLoad(false);
      });
  };

  const downloadCategory = () => {
    setLoad(true);

    axios(
      `https://pdf-extractor-backend.herokuapp.com/rest/api/v1/pdf/category`,
      {
        method: "POST",
        responseType: "blob", //Force to receive data in a Blob Format
        headers: {
          Authorization: getAccessToken(),
        },
        data: {
          pdfId: pdfid,
          categories: category,
        },
      }
    )
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "pdfextractor.pdf");
        document.body.appendChild(link);
        link.click();
        setLoad(false);
      })
      .catch((error) => {
        message.error(
          !error.response ? error.message : error.response.data.message
        );
        setLoad(false);
      });
  };

  function handleChange(value) {
    setCategory(String(value).split(","));
  }

  const downloadSelected = () => {
    // /pdf/download
    createPDF({
      pdfId: pdfid,
      pageNos: selected,
    });
  };

  const downloadSorted = () => {
    let sortedArray = [...selected2];

    for (let i = 0; i < pages; i++) {
      if (!sortedArray.includes(i)) sortedArray.push(i);
    }

    createPDF({
      pdfId: pdfid,
      pageNos: sortedArray,
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

  const removeSelected2 = (id) => {
    let tempImage = [...image2];
    tempImage.splice(id, 1);

    setImage2([...tempImage]);

    let tempSelected = [...selected2];
    tempSelected.splice(id, 1);

    setSelected2([...tempSelected]);
  };

  const onSubmit = (values) => {
    if (values.slider) {
      let selectedPages = [];
      for (let i = values.slider[0]; i <= values.slider[1]; i++) {
        selectedPages.push(i - 1);
      }

      if (selectedPages.length > 0)
        createPDF({
          pdfId: pdfid,
          pageNos: selectedPages,
        });
      else message.error("Please select some range");
    } else message.error("Please select some range");
  };

  useEffect(() => {
    setIsLoading(true);
    platformApi
      .get(`/pdf/categorieslist/${pdfid}`)
      .then((response) => {
        let dropdownResponse = response.data;
        let removeDuplicate = [];
        dropdownResponse.forEach((cat) => {
          if (!removeDuplicate.includes(cat)) removeDuplicate.push(cat);
        });
        setDropdown(removeDuplicate);
      })
      .catch((error) => {
        setIsLoading(false);
        message.error(
          !error.response ? error.message : error.response.data.message
        );
        history.push("/");
      });

    platformApi
      .get(`/pdf/${pdfid}`)
      .then((response) => {
        setUrl(response.data.url);
        setPages(response.data.pages.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        message.error(
          !error.response ? error.message : error.response.data.message
        );
        history.push("/");
      });
  }, []);

  useEffect(() => {
    let tempSelected = [];

    setOptions2(
      image2.map((ele, i) => {
        if (!tempSelected.includes(ele)) {
          tempSelected.push(ele);
          return (
            <td>
              <Tooltip title={`Click image to delete`} color="red" key="red">
                <Card
                  onClick={() => removeSelected2(i)}
                  title={`Page ${selected2[i]}`}
                  hoverable
                  bordered={false}
                >
                  <img
                    alt={`Page ${selected2[i]}`}
                    src={ele}
                    // width="100px"
                    // height="170px"
                    className="img"
                  />
                </Card>
              </Tooltip>
            </td>
          );
        }
      })
    );
  }, [selected2, image2]);

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
                    // width="100px"
                    // height="170px"
                    className="img"
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
    <Spin
      size="large"
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  ) : (
    <>
      <Header page="Download" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        { url && <PDFviewer
          selected={selected}
          setSelected={setSelected}
          image={image}
          setImage={setImage}
          selected2={selected2}
          setSelected2={setSelected2}
          image2={image2}
          setImage2={setImage2}
          url={url}
        />}
        <Affix
          offsetTop={170}
          style={{ width: "50%", padding: "50px", marginRight: "40px" }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane
              tab="Sorted PDF"
              style={{
                overflowX: "scroll",
              }}
              key="1"
            >
              {image2.length === 0 && (
                <div>
                  <span style={{ color: "red" }}>
                    Select thumbnail in the tool bar
                  </span>
                </div>
              )}
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                style={{ position: "absolute" }}
                onClick={downloadSorted}
                disabled={image2.length === 0}
                loading={load}
              >
                Download
              </Button>
              <table style={{ marginTop: "60px" }}>
                <thead>
                  <tr>{options2}</tr>
                </thead>
              </table>
            </TabPane>
            <TabPane
              style={{
                overflowX: "scroll",
              }}
              tab="Select PDF"
              key="2"
            >
              {image.length === 0 && (
                <div>
                  <span style={{ color: "red" }}>
                    Select thumbnail in the tool bar
                  </span>
                </div>
              )}
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                style={{ position: "absolute" }}
                onClick={downloadSelected}
                disabled={image.length === 0}
                loading={load}
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
                    loading={load}
                  >
                    Download
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Category PDF" key="4">
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={downloadCategory}
                disabled={category.length === 0}
                loading={load}
              >
                Download
              </Button>
              <Select
                mode="tags"
                style={{ width: "100%", paddingTop: "10px" }}
                placeholder="Tags Mode"
                onChange={handleChange}
              >
                {dropdown.map((ele, i) => {
                  return <Option key={ele}>{ele}</Option>;
                })}
              </Select>
            </TabPane>
          </Tabs>
        </Affix>
      </div>
    </>
  );
};

export default Index;
