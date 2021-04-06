import { Button, Card, DatePicker, Form, Input, Select } from "antd";
const { RangePicker } = DatePicker;

const Filter = ({ query }: any) => {
  const [form] = Form.useForm();
  const handleQuery = () => {
    let { rangeTime } = form.getFieldsValue();
    if (rangeTime) {
      query({
        startDate: rangeTime[0],
        endDate: rangeTime[1],
        ...form.getFieldsValue(),
      });
    } else {
      query(form.getFieldsValue());
    }
  };
  return (
    <Card style={{ minHeight: "auto" }}>
      <Form form={form} layout="inline">
        <Form.Item name="name" style={{ marginTop: "10px" }} label="试卷名">
          <Input placeholder="请输入试卷名" allowClear />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "10px" }}
          name="rangeTime"
          label="考试时间"
        >
          <RangePicker allowClear />
        </Form.Item>
        <Form.Item name="type" style={{ marginTop: "10px" }} label="考试状态">
          <Select placeholder="请选择考试状态" allowClear style={{ width: "180px" }}>
            <Select.Option value={0}>正在进行</Select.Option>
            <Select.Option value={1}>已结束</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ marginTop: "10px" }}>
          <Button onClick={handleQuery} type="primary">
            查询
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Filter;
