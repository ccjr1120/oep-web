import { Card, Form, Input, Radio, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { fetchByBody, fetchByParam } from "../../api/api";

const StartExam = ({ history }: any) => {
  const [visible, setVisible] = useState(false);
  const [paperData, setPaperData] = useState([]);
  const handleModelOk = () => {
    fetchByParam("/student/exam/start", { key: key })
      .then((resp) => {
        setPaperData(resp.data);
        setVisible(false);
      })
      .catch(() => {});
  };
  const [key, setKey] = useState();
  const [recordId, setRecordId] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchByBody("/student/exam/checkStart", {}).then((resp) => {
      if (resp.data) {
        setVisible(false);
        setRecordId(resp.data);
        setLoading(false);
      } else {
        setVisible(true);
      }
    });
  }, [recordId]);
  return (
    <>
      <Card>
        <div style={{ textAlign: "center" }}>
          <Spin
            style={{ marginTop: "240px" }}
            spinning={loading}
            tip="Loading..."
          ></Spin>
        </div>
        <Form>
          {paperData.map((item) => {
            return <>1</>;
          })}
          <Form.Item>
            <h2>1231232231</h2>
            <Radio.Group onChange={() => {}} value={1}>
              <Radio value={1}>A:</Radio>
              <Radio value={2}>B:</Radio>
              <Radio value={3}>C:</Radio>
              <Radio value={4}>D:</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="输入口令"
        visible={visible}
        closable={false}
        maskClosable={false}
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
