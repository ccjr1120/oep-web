import { Form, Input, Card, Tabs, Button, Col, Row } from "antd";
import {
  FileExcelOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./edit.scss";
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const EditBank = (props: any) => {
  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
      <Card style={{ flex: 1 }}>
        <h2
          style={{
            textAlign: "center",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "24px",
          }}
        >
          添加题库
        </h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="题库名">
            <Row>
              <Col span={20}>
                <Form.Item
                  name="name"
                  style={{ width: "100vw" }}
                  noStyle
                  rules={[{ required: true, message: "题库名不能为空!" }]}
                >
                  <Input placeholder="请输入题库名" allowClear />
                </Form.Item>
              </Col>
              <Col style={{ paddingTop: "10px" }} span={4}>
                {/* <span style={{ fontSize: "12px", color: "blue" }}>
                  下载Excel模板
                </span> */}
                <a style={{ fontSize: "12px" }} href="Excel导入模板.xlsx">
                  下载Excel模板
                </a>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="单选" key="1"></TabPane>
                <TabPane tab="多选" key="2"></TabPane>
              </Tabs>
            </div>
          </Form.Item>
        </Form>
      </Card>
      <div className="fixed-btn fixed-add">
        <Button
          style={{ background: "#31a7f0" }}
          type="primary"
          size="large"
          icon={<PlusOutlined />}
        >
          添加
        </Button>
      </div>
      <div className="fixed-btn fixed-excel">
        <Button
          style={{ background: "green" }}
          type="primary"
          size="large"
          icon={<FileExcelOutlined />}
        >
          导入
        </Button>
      </div>

      <div className="fixed-btn">
        <Button type="primary" size="large" icon={<CheckOutlined />}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default EditBank;
