import { createRef } from "react";
import { fetchByBody } from "../../api/api";
import AutoTable from "../../components/AutoTable";

const MyExam = () => {
  const cloumns = [
    {
      title: "试卷名",
      dataIndex: "examName",
      key: "examName",
      align: "center",
      width: 240,
    },
    {
      title: "分数",
      dataIndex: "grade",
      key: "grade",
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
  const fetch = (data: any) => {
    return fetchByBody("/student/myExam", data);
  };
  const autoTableRef = createRef();
  return (
    <>
      <AutoTable
        onRef={autoTableRef}
        reqFun={fetch}
        columns={cloumns}
        condition={[]}
      />
    </>
  );
};

export default MyExam;
