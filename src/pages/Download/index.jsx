import React, { useEffect, useState } from "react";
import { platformApi } from "../../helpers/api";
import { Select, Affix, Form, Tooltip, Tabs, Slider, Button, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PDFviewer from "../../components/pdfviewer/pdfviewer";

const Index = () => {
  const { Option } = Select;
  const { Meta } = Card;
  const { TabPane } = Tabs;
  const [options, setOptions] = useState();
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState([]);

  const downloadSelected = () => {
    // /pdf/download

    platformApi
      .post("/pdf/download", {
        pdfId: 1,
        pageNos: [0, 1],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.response.data);
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
  };

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
  return (
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
                  <Slider range style={{ width: "70%" }} />
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
