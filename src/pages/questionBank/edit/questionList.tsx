import { List, Button, message } from "antd";
import { createRef, memo, useEffect, useState } from "react";
import { fetchByParam } from "../../../api/api";
import QuestionEdit from "./questionEdit";
import QuestionItem from "./questionItem";
import {
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

const modelRef = createRef<any>();
const QuestionList = memo(({ updateTime, bankName, bankId }: any) => {
  const addQuestion = () => {
    setActiveItem(undefined);
    if (!bankName) {
      message.error("添加题目前，标题不能为空");
      return;
    }
    modelRef.current?.showModal();
  };
  const [questionList, setQuestionList] = useState();
  const fetch = () => {
    fetchByParam("/teacher/question/list", { bankId: bankId || "" }).then(
      (resp) => {
        setQuestionList(resp.data);
      }
    );
  };
  const delItem = (id: String) => {
    confirm({
      title: "确定要删除该菜单吗？",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fetchByParam("/teacher/question/del", { id }).then(() => {
          message.success("删除成功");
          fetch();
        });
      },
      onCancel() {},
    });
  };
  const [activeItem, setActiveItem] = useState();
  const editItem = (item: any) => {
    setActiveItem(item);
    modelRef.current?.showModal();
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankId]);

  return (
    <>
      <List
        header={
          <div>
            题目
            <Button
              style={{ color: "#31a7ff", marginLeft: "8px" }}
              type="text"
              size="small"
              onClick={addQuestion}
            >
              + 添加新题目
            </Button>
            <Button
              style={{ color: "green" }}
              type="link"
              size="small"
              icon={<FileExcelOutlined />}
            >
              Excel导入
            </Button>
            <span
              style={{
                float: "right",
                fontSize: "12px",
                color: "rgba(0,0,0,0.6)",
              }}
            >
              最近一次修改:{updateTime}
            </span>
          </div>
        }
        style={{ minHeight: "40vh" }}
        bordered
        dataSource={questionList}
        renderItem={(item: any) => (
          <List.Item>
            <div
              style={{
                width: "100%",
                paddingRight: "20px",
                position: "relative",
              }}
            >
              <QuestionItem item={item} />
              <div
                style={{
                  float: "right",
                  position: "absolute",
                  bottom: "0",
                  right: "-20px",
                }}
              >
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    delItem(item.id);
                  }}
                ></Button>
                <br />
                <Button
                  icon={<EditOutlined />}
                  type="ghost"
                  style={{ marginTop: "8px", color: "#1890ff" }}
                  onClick={() => {
                    editItem(item);
                  }}
                />
              </div>
            </div>
          </List.Item>
        )}
      />
      <QuestionEdit
        bankId={bankId}
        onRef={modelRef}
        onHandle={fetch}
        activeItem={activeItem}
      />
    </>
  );
});

export default QuestionList;
