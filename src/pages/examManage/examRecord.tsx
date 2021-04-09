import { Modal } from "antd";
import { memo, useImperativeHandle, useState } from "react";
import { fetchByBody } from "../../api/api";
import AutoTable from "../../components/AutoTable";

const columns = [
  {
    title: "姓名",
    dataIndex: "sysUsername",
    key: "sysUsername",
    align: "center",
    width: 140,
  },
  {
    title: "分数",
    dataIndex: "grade",
    key: "grade",
    width: "120px",
    align: "center",
  },
  {
    title: "题目数量",
    dataIndex: "questionNum",
    key: "questionNum",
    width: "120px",
    align: "center",
  },
  {
    title: "错题数",
    dataIndex: "wrongNum",
    key: "wrongNum",
    width: "120px",
    align: "center",
  },
  {
    title: "开始时间",
    dataIndex: "createTime",
    key: "creaTime",
    width: "240px",
    align: "center",
  },
  {
    title: "完成时间",
    dataIndex: "updateTime",
    key: "updateTime",
    width: "240px",
    align: "center",
  },
];
const ExamRecord = memo(({ examId, examName, onRef }: any, ref) => {
  useImperativeHandle(onRef, () => ({
    changeVisible,
  }));
  const [visible, setVisible] = useState(false);
  const changeVisible = () => {
    setVisible(!visible);
  };
  const fetch = (data: any) => {
    return fetchByBody("/teacher/exam/listRecord", data);
  };
  return (
    <>
      <Modal
        title={"试卷名:" + examName}
        visible={visible}
        width="1024px"
        onOk={() => {
          changeVisible();
        }}
        onCancel={() => {
          changeVisible();
        }}
      >
        <AutoTable columns={columns} reqFun={fetch} condition={{ examId }} />
      </Modal>
    </>
  );
});

export default ExamRecord;
