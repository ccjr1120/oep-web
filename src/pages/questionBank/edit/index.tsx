import { Form, Input, Card, Button, Col, Row, message } from "antd";
import {
  FileExcelOutlined,
  CheckOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "./edit.scss";
import QuestionEdit from "./questionEdit";
import { createRef, useEffect, useState } from "react";
import QuestionList from "./questionList";
import { fetchByParam } from "../../../api/api";
import { useForm } from "antd/lib/form/Form";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const modelRef = createRef<any>();
const BankEdit = ({ history, location }: any) => {
  const addQuestion = () => {
    if (!bankName) {
      message.error("添加题目前，标题不能为空");
      return;
    }
    modelRef.current?.showModal();
  };
  const [bankName, setBankName] = useState<string>();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [time, setTime] = useState<any>();
  const [bankId, setBankId] = useState<string>();
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bankName = e.target.value;
    setBankName(bankName);
    setSaveLoading(true);
    if (time) {
      clearTimeout(time);
    }
    if (!bankName) {
      setSaveLoading(false);
      return;
    }
    setTime(
      setTimeout(() => {
        if (bankId) {
          fetchByParam("/teacher/questionBank/update", { id: bankId, bankName })
            .then((resp) => {
              message.success("自动保存成功");
              setSaveLoading(false);
            })
            .catch(() => {
              setSaveLoading(false);
            });
        } else {
          fetchByParam("/teacher/questionBank/add", { bankName })
            .then((resp) => {
              message.success("自动保存成功");
              setBankId(resp.data);
              setSaveLoading(false);
            })
            .catch(() => {
              setSaveLoading(false);
            });
        }
      }, 2000)
    );
  };
  const [form] = useForm();
  useEffect(() => {
    if (location.state.item) {
      const item = location.state.item;
      setBankId(item.id);
      form.setFieldsValue({ name: item.bankName });
    }
  }, [location, bankId, form]);

  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
      <Card style={{ flex: 1 }}>
        <Button
          style={{ float: "left" }}
          icon={<RollbackOutlined />}
          size="large"
          type="text"
          onClick={() => {
            history.go(-1);
          }}
        ></Button>
        <h2
          style={{
            textAlign: "center",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "24px",
          }}
        >
          {location.state.item ? "题库详情" : "添加题库"}
        </h2>
        <Form {...layout} form={form} preserve={false}>
          <Form.Item label="题库名" tooltip={"2s内没有输入都会进行保存"}>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="name"
                  style={{ width: "100vw" }}
                  noStyle
                  rules={[{ required: true, message: "题库名不能为空!" }]}
                >
                  <Input
                    onChange={titleChange}
                    placeholder="请输入题库名"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col style={{ paddingTop: "10px" }} span={4}>
                <a style={{ fontSize: "12px" }} href="Excel导入模板.xlsx">
                  下载Excel模板
                </a>
              </Col>
            </Row>
          </Form.Item>
          <QuestionList addQuestion={addQuestion} bankId={bankId} />
        </Form>
      </Card>
      <div>
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
          <Button
            type="primary"
            loading={saveLoading}
            size="large"
            icon={<CheckOutlined />}
          >
            {saveLoading ? "自动保存中" : "保存"}
          </Button>
        </div>
      </div>
      <QuestionEdit onRef={modelRef} />
    </div>
  );
};

export default BankEdit;
