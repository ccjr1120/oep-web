import { Button, Tag } from "antd";
import { createRef, useState } from "react";
import { fetchByBody } from "../../api/api";
import AutoTable, { AutoTableRefType } from "../../components/AutoTable";
import Filter from "./filter";
import { PlaySquareOutlined } from "@ant-design/icons";
import NewPaper from "./newPaper";

const ExamManage = () => {
  const columns = [
    {
      title: "试卷名",
      dataIndex: "name",
      key: "name",
      align: "center",
      with: "240px",
    },
    {
      title: "口令",
      dataIndex: "randomStr",
      key: "randomStr",
      width: "120px",
      align: "center",
    },
    {
      title: "是否随机",
      dataIndex: "isRandom",
      key: "isRandom",
      width: "80px",
      align: "center",
      render: (value: number) => <> {value === 0 ? "否" : "是"}</>,
    },
    {
      title: "时间限制",
      dataIndex: "minutes",
      key: "minutes",
      width: "80px",
      align: "center",
      render: (value: String) => <div>{value}分钟</div>,
    },
    {
      title: "考试时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "160px",
      align: "center",
    },
    {
      title: "参与人数",
      dataIndex: "partNum",
      key: "partNum",
      width: "80px",
      align: "center",
      render: (value: String, record: MenuType.RecordType) => (
        <Button type="text" style={{ color: "#1890ff" }} size="small">
          {value}
        </Button>
      ),
    },
    {
      title: "平均分",
      dataIndex: "average",
      key: "average",
      width: "60px",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      width: "80px",
      align: "center",
      render: (value: number) => (
        <Tag color="cyan"> {["未开始", "正在进行", "已结束"][value]}</Tag>
      ),
    },
    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 120,
      align: "center",
      fixed: "right" as "right",
      render: (_: String, record: MenuType.RecordType) => (
        <Button type="text" style={{ color: "#1890ff" }} size="small">
          编辑
        </Button>
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
