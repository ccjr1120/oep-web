import { Button, Card, Form, Input, List, message, Spin } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { fetchByBody, fetchByParam } from "../../api/api";
import { SaveOutlined, SmileTwoTone } from "@ant-design/icons";
import QuesItem from "./quesItem";
import confirm from "antd/lib/modal/confirm";
import CountTo from "react-count-to";

const StartExam = ({ history }: any) => {
  const [visible, setVisible] = useState(false);
  const [paperData, setPaperData] = useState([]);
  const [hintText, setHintTest] = useState<string>("");
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);
  const [answerList, setAnswerList] = useState<Array<number>>([]);
  const [result, setResult] = useState<number>(0);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
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
  const handleAnswerList = (i: number, action: number) => {
    const data = [...answerList];
    if (action === 0) {
      data.splice(data.indexOf(i), 1);
    } else {
      if (data.indexOf(i) === -1) {
        data.push(i);
      }
    }
    setAnswerList(data);
  };
  useEffect(() => {
    setLoading(true);
    fetchByBody("/student/exam/checkStart", {}).then((resp) => {
      if (resp.data) {
        setVisible(false);
        fetchByBody("/student/exam/continue", {}).then((resp) => {
          setPaperData(resp.data);
          setLoading(false);
          const data: Array<number> = [];
          resp.data.forEach((item: any, i: number) => {
            if (item.myAnswer) {
              data.push(i + 1);
            }
          });
          setAnswerList(data);
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
                <QuesItem
                  handleAnswerList={handleAnswerList}
                  hintText={handleHintText}
                  item={item}
                  i={i + 1}
                />
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
        <Button
          onClick={() => {
            confirm({
              title: "确定要结束本场考试吗？",
              icon: <SmileTwoTone />,
              okText: "确认",
              okType: "primary",
              cancelText: "取消",
              onOk() {
                fetchByBody("/student/exam/done", {}).then((resp) => {
                  setResult(resp.data);
                  setResultVisible(true);
                  message.success("提交成功");
                });
              },
              onCancel() {},
            });
          }}
          size="large"
          type="primary"
          icon={<SaveOutlined />}
        >
          提交{answerList.length}/{paperData.length}
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
        title="计算成绩中"
        visible={resultVisible}
        closable={false}
        okButtonProps={{ disabled: !key }}
        width="240px"
        onOk={() => {
          history.push("/app/myExam");
        }}
        onCancel={() => {
          history.push("/app/myExam");
        }}
      >
        <div className="count-down">
          <CountTo to={result} speed={4234} />
        </div>
      </Modal>
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
