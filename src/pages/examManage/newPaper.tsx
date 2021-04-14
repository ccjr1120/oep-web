import { Card, Form, Input, message, Modal, Select, Space, Table } from "antd";
import { memo, useEffect, useImperativeHandle, useState } from "react";
import { fetchByBody } from "../../api/api";
import { randomString } from "../../utils";
const columns = [
  {
    title: "题库名",
    dataIndex: "bankName",
  },
  {
    title: "题目数量",
    dataIndex: "questionNumber",
  },
];

const NewPaper = memo(({ onRef, onHandle }: any, ref) => {
  useImperativeHandle(onRef, () => ({
    changeVisible,
  }));

  const changeVisible = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = useState<boolean>(false);
  const handleOk = () => {
    let data = form.getFieldsValue();
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      if (!data[keys[i]]) {
        message.error("选项不能为空");
        return;
      }
    }
    if (!selected || selected.length === 0) {
      message.error("题库至少选择一个");
      return;
    }
    data = { ...data, bankIds: selected };
    data["name"] = data.paperName;
    fetchByBody("/teacher/exam/add", data)
      .then(() => {
        message.success("添加成功");
        changeVisible();
        onHandle();
      })
      .catch(() => {});
  };
  const handleCancel = () => {
    changeVisible();
  };
  const [form] = Form.useForm();
  const onSelectChange = (selectedRowKeys: any) => {
    setSelected(selectedRowKeys);
  };
  const [selected, setSelected] = useState<Array<string>>();
  const rowSelection = {
    selected,
    onChange: onSelectChange,
  };
  const [bankList, setBankList] = useState();
  const fetch = (params = { current: 1, pageSize: 8 }) => {
    fetchByBody("/teacher/questionBank/listPage", params).then((resp) => {
      setBankList(resp.data.records);
      setPagination({
        pageSize: resp.data.size,
        ...resp.data,
      });
    });
  };
  const handleTableChange = (pagination: any) => {
    let { current, pageSize } = pagination;
    fetch({
      current,
      pageSize,
    });
  };
  const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
  useEffect(() => {
    if (visible) {
      fetch();
      const randomStr = randomString();
      form.setFieldsValue({
        minutes: "20",
        peopleNum: "60",
        questionNum: "100",
        isRandom: "0",
        randomStr,
      });
    }
  }, [form, visible]);
  return (
    <Modal
      width="1024px"
      title="举办一场考试"
      visible={visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} size="small" preserve={false} layout="inline">
        <Form.Item name="paperName" label="试卷名" required>
          <Input style={{ width: "380px" }} placeholder="请输入试卷名" />
        </Form.Item>
        <Space size="middle">
          <Form.Item
            name="randomStr"
            label="口令"
            style={{ marginTop: "10px" }}
            tooltip={"考试人员以此参与考试"}
            required
          >
            <Input style={{ width: "220px" }} placeholder="请输入口令" />
          </Form.Item>
          {/* <Form.Item
            name="minutes"
            style={{ marginTop: "10px" }}
            label="考试时间"
            required
          >
            <Input style={{ width: "120px" }} addonAfter="分钟" />
          </Form.Item> */}
          <Form.Item
            name="peopleNum"
            style={{ marginTop: "10px" }}
            label="人数限制"
            required
          >
            <Input style={{ width: "100px" }} addonAfter="个" />
          </Form.Item>
          <Form.Item
            name="questionNum"
            style={{ marginTop: "10px" }}
            label="题目数量"
            required
          >
            <Input style={{ width: "120px" }} addonAfter="个" />
          </Form.Item>
          <Form.Item
            name="isRandom"
            style={{ marginTop: "10px" }}
            label="是否随机"
            tooltip="选择是，每个学生的试卷都是不同的；否则相同。"
            required
          >
            <Select style={{ width: "60px" }}>
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="0">否</Select.Option>
            </Select>
          </Form.Item>
        </Space>
      </Form>
      <Card style={{ marginTop: "10px" }}>
        <Table
          pagination={pagination}
          rowSelection={rowSelection}
          columns={columns}
          rowKey="id"
          size="small"
          dataSource={bankList}
          onChange={handleTableChange}
        />
      </Card>
    </Modal>
  );
});

export default NewPaper;
