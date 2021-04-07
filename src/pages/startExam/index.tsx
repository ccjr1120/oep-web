import { Button, Card, Form, Input, List, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { fetchByBody, fetchByParam } from "../../api/api";
import QuesItem from "./quesItem";

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
  const [loading, setLoading] = useState(false);
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
                <QuesItem item={item} i={i + 1} />{" "}
              </List.Item>
            )}
          />
        )}
      </Card>
      <div>
        <Button type="primary">131321</Button>
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
