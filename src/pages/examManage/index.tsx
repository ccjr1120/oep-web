import { Button, Form, Input, message, Select, Tag } from "antd";
import { createRef, useState } from "react";
import { fetchByBody } from "../../api/api";
import AutoTable, { AutoTableRefType } from "../../components/AutoTable";
import Filter from "./filter";
import { PlaySquareOutlined } from "@ant-design/icons";
import NewPaper from "./newPaper";
import Modal from "antd/lib/modal/Modal";
import ExamRecord from "./examRecord";

const ExamManage = () => {
  const columns = [
    {
      title: "试卷名",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 240,
    },
    {
      title: "口令",
      dataIndex: "randomStr",
      key: "randomStr",
      width: "120px",
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      width: 80,
      align: "center",
      render: (value: number) => (
        <Tag color={["cyan", "red"][value]}>
          {["正在进行", "已结束"][value]}
        </Tag>
      ),
    },
    {
      title: "人数限制",
      dataIndex: "peopleNum",
      key: "peopleNum",
      width: "90px",
      align: "center",
    },
    {
      title: "参与人数",
      dataIndex: "partNum",
      key: "partNum",
      width: "80px",
      align: "center",
      render: (value: String, record: any) => (
        <Button
          type="text"
          onClick={() => {
            setExamId(record.id);
            setExamName(record.name);
            recordModelRef.current?.changeVisible();
          }}
          style={{ color: "#1890ff" }}
          size="small"
        >
          {value}
        </Button>
      ),
    },
    {
      title: "考试时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "160px",
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
      title: "平均分",
      dataIndex: "average",
      key: "average",
      width: "60px",
      align: "center",
    },

    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 120,
      align: "center",
      fixed: "right",
      render: (_: String, record: any) => (
        <Button
          type="text"
          onClick={() => {
            handleEdit(record);
          }}
          style={{ color: "#1890ff" }}
          size="small"
        >
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
  const recordModelRef = createRef<any>();
  const showModal = () => {
    if (modelRef.current) {
      modelRef.current.changeVisible();
    }
  };
  const handleEdit = (record: any) => {
    setActiveRecord(record);
    form.setFieldsValue({ ...record });
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const [activeRecord, setActiveRecord] = useState<any>();
  const [examId, setExamId] = useState();
  const [examName, setExamName] = useState();
  const [form] = Form.useForm();
  const handleOk = () => {
    let data = { id: activeRecord.id, ...form.getFieldsValue() };
    fetchByBody("/teacher/exam/update", data).then(() => {
      message.success("更新成功");
      autoTableRef.current?.fetch();
      setVisible(false);
    });
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
          举办一场考试
        </Button>
      </div>
      <NewPaper onRef={modelRef} onHandle={query} />
      <ExamRecord onRef={recordModelRef} examName={examName} examId={examId} />
      <Modal
        title="编辑试卷"
        visible={visible}
        destroyOnClose
        width="360px"
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          preserve={false}
          wrapperCol={{ span: 18 }}
        >
          {/* <Form.Item label="时间限制" name="minutes">
            <Input addonAfter="分钟" />
      </Form.Item>*/}
          <Form.Item label="人数限制" name="peopleNum">
            <Input addonAfter="人" />
          </Form.Item>
          <Form.Item
            name="state"
            style={{ marginTop: "10px" }}
            label="考试状态"
          >
            <Select placeholder="请选择考试状态" style={{ width: "100%" }}>
              <Select.Option value={0}>正在进行</Select.Option>
              <Select.Option value={1}>已结束</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExamManage;
