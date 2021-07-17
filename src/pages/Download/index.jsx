import React, { useEffect, useState } from "react";
import { Select, Affix, Form, Tabs, Slider, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PDFviewer from "../../components/pdfviewer/pdfviewer";

const Index = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const children = [];
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState([]);

  function callback(key) {
    console.log(key);
  }

  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    console.log(selected, image);
  }, [selected]);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PDFviewer
          selected={selected}
          setSelected={setSelected}
          image={image}
          setImage={setImage}
        />
        <Affix offsetTop={170} style={{ width: "50%", padding: "50px" }}>
          <Tabs defaultActiveKey="1" onChange={callback}>
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
            <TabPane tab="Range PDF" key="2">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onSubmit}
              >
                <Form.Item name="pages" label="Select Pages">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={selected}
                    onChange={handleChange}
                  >
                    {selected.map(ele => {
                        return <Option key={ele}>{ele}</Option>
                    })}
                    
                  </Select>
                </Form.Item>
                <Form.Item name="slider" label="Range">
                  <Slider range />
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
            <TabPane tab="Category PDF" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Affix>
      </div>
    </>
  );
};

export default Index;
