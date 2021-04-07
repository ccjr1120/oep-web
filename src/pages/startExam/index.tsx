import { Button, Card, Form, Input, List, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { fetchByBody, fetchByParam } from "../../api/api";
import { SaveOutlined } from "@ant-design/icons";
import QuesItem from "./quesItem";

const StartExam = ({ history }: any) => {
  const [visible, setVisible] = useState(false);
  const [paperData, setPaperData] = useState([]);
  const [hintText, setHintTest] = useState<string>("");
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);
  const handleModelOk = () => {
    fetchByParam("/student/exam/start", { key: key })
      .then((resp) => {
        setPaperData(resp.data);
        setLoading(false);
        setVisible(false);
      })
      .catch(() => {});
  };
  const handleHintText = (s: string) => {
    setHintTest(s);
  };
  useEffect(() => {
    setLoading(true);
    fetchByBody("/student/exam/checkStart", {}).then((resp) => {
      if (resp.data) {
        setVisible(false);
        fetchByBody("/student/exam/continue", {}).then((resp) => {
          setPaperData(resp.data);
          setLoading(false);
        });
      } else {
        setVisible(true);
      }
    });
  }, []);
  return (
    <>
      <Card>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin
              style={{ marginTop: "160px" }}
              spinning={loading}
              tip="Loading..."
            ></Spin>
          </div>
        ) : (
          <List
            bordered
            dataSource={paperData}
            renderItem={(item, i) => (
              <List.Item>
                <QuesItem hintText={handleHintText} item={item} i={i + 1} />{" "}
              </List.Item>
            )}
          />
        )}
      </Card>
      <div
        className="fixed-btn"
        style={{
          right: "40px",
          boxShadow: "0px -2px 15px rgba(104, 100, 100, 0.55)",
        }}
      >
        <Button size="large" type="primary" icon={<SaveOutlined />}>
          提交
        </Button>
        <div
          style={{
            position: "absolute",
            fontSize: "12px",
            width: "200px",
            left: "-40px",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          {hintText}
        </div>
      </div>
      <Modal
        title="输入口令"
        visible={visible}
        closable={false}
        maskClosable={false}
        okButtonProps={{ disabled: !key }}
        onOk={() => {
          handleModelOk();
        }}
        onCancel={() => {
          history.go(-1);
        }}
      >
        <Form.Item
          label="口令"
          tooltip="进入一场考试的凭据，可从考试发起人那里获取"
        >
          <Input
            value={key}
            allowClear
            onChange={(e: any) => {
              setKey(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default StartExam;
