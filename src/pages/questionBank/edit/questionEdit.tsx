import { Form, Input, message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { memo, useEffect, useImperativeHandle, useState } from "react";
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const QuestionEdit = memo(
  ({ onRef, action, activeRecord, onHandle }: any, ref) => {
    useImperativeHandle(onRef, () => ({
      showModal,
    }));
    const [visible, setVisible] = useState(false);
    const showModal = () => {
      setVisible(!visible);
    };
    const submit = () => {
      form
        .validateFields()
        .then((value) => {
          let wrongAnswer = [];
          let rightAnswer = [];
          for (let i = 1; i <= 5; i++) {
            const c = value[`c${i}`];
            if (c) {
              value[`t${i}`] === "1"
                ? rightAnswer.push(c)
                : wrongAnswer.push(c);
            }
          }
          if (rightAnswer.length === 0) {
            message.error("答案或正确答案不能全部为空");
            return;
          }
          const rightJson = JSON.stringify(rightAnswer);
          const wrongJson = JSON.stringify(wrongAnswer);
          const data = { title: value.title, rightJson, wrongJson };
          console.log(data);
          showModal();
        })
        .catch((error) => {});
    };
    const [form] = Form.useForm();
    useEffect(() => {
      if (visible) {
        form.setFieldsValue({ t1: "1", t2: "2", t3: "2", t4: "2", t5: "2" });
      }
    }, [form, visible]);
    return (
      <Modal
        title="添加题目"
        width="600px"
        visible={visible}
        onOk={submit}
        okText="确认"
        cancelText="取消"
        onCancel={showModal}
        destroyOnClose
      >
        <Form {...layout} form={form} preserve={false}>
          <Form.Item
            label="题目"
            name="title"
            rules={[{ required: true, message: "请输入题目!" }]}
          >
            <Input placeholder="请输入题目" allowClear />
          </Form.Item>
          <Form.Item
            label="答案"
            tooltip={{
              title: "最多支持5项，不能为空",
            }}
          >
            <Input.Group compact>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <span
                    className="answer-item"
                    style={{ width: "100%" }}
                    key={i}
                  >
                    <Form.Item name={"t" + i} noStyle>
                      <Select style={{ width: "12%" }}>
                        <Option value="1">✔</Option>
                        <Option value="2">✘</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={"c" + i} noStyle>
                      <Input
                        style={{ width: "88%" }}
                        placeholder="请输答案并在左边选择相应对错"
                        allowClear
                      />
                    </Form.Item>
                  </span>
                );
              })}
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default QuestionEdit;
