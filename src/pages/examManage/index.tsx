import { Button, message } from "antd";
import confirm from "antd/lib/modal/confirm";
import { createRef, useState } from "react";
import { fetchByBody } from "../../api/api";
import AutoTable, { AutoTableRefType } from "../../components/AutoTable";
import Filter from "./filter";
import {
  ExclamationCircleOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import NewPaper from "./newPaper";

const ExamManage = () => {
  const columns = [
    {
      title: "试卷名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "考试时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "参与人数",
      dataIndex: "address",
      key: "address",
    },
    { title: "平均分", dataIndex: "address", key: "address" },
    { title: "状态", dataIndex: "address", key: "address" },
    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 200,
      fixed: "right" as "right",
      render: (_: String, record: MenuType.RecordType) => (
        <div>
          {record.parentId !== "/" ? (
            ""
          ) : (
            <Button type="text" style={{ color: "#1890ff" }} size="small">
              添加子菜单
            </Button>
          )}
          <Button type="text" style={{ color: "#1890ff" }} size="small">
            编辑
          </Button>
          <Button
            onClick={() => {
              confirm({
                title: "确定要删除该菜单吗？",
                icon: <ExclamationCircleOutlined />,
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                  fetchByBody("/admin/menu/del", record).then(() => {
                    message.success("删除成功");
                  });
                },
                onCancel() {},
              });
            }}
            type="text"
            style={{ color: "red" }}
            size="small"
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  const autoTableRef = createRef<AutoTableRefType>();
  const fetch = (data: any) => {
    return fetchByBody("/teacher/exam/list", data);
  };
  const [condition, setCondition] = useState({});
  const query = (data: any) => {
    setCondition(data);
  };
  const modelRef = createRef<any>();
  const showModal = () => {
    if (modelRef.current) {
      modelRef.current.changeVisible();
    }
  };
  return (
    <>
      <Filter query={query} />
      <AutoTable
        onRef={autoTableRef}
        columns={columns}
        reqFun={fetch}
        condition={condition}
      />
      <div className="fixed-btn ">
        <Button
          onClick={showModal}
          type="primary"
          size="middle"
          icon={<PlaySquareOutlined />}
        >
          开始一场考试
        </Button>
      </div>
      <NewPaper onRef={modelRef} />
    </>
  );
};

export default ExamManage;
