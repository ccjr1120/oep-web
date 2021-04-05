import { Form, Input, message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { memo, useEffect, useImperativeHandle, useState } from "react";
import { fetchByBody } from "../../../api/api";
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const QuestionEdit = memo(
  ({ onRef, activeItem, onHandle, bankId }: any, ref) => {
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
          const type = rightAnswer.length > 1 ? 2 : 1;
          const data = {
            id: activeItem?.id,
            bankId,
            title: value.title,
            rightAnswer: rightJson,
            wrongAnswer: wrongJson,
            type,
          };
          if (activeItem) {
            fetchByBody("/teacher/question/update", data)
              .then(() => {
                message.success("添加成功");
                onHandle();
                showModal();
              })
              .catch(() => {});
          } else {
            fetchByBody("/teacher/question/add", data)
              .then((resp) => {
                message.success("添加成功");
                onHandle();
                showModal();
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    };
    const [form] = Form.useForm();
    const toFormData = (item: any) => {
      let data: any = {
        title: item.title,
        t1: "",
        c1: "",
        t2: "",
        c2: "",
        t3: "",
        c3: "",
        t4: "",
        c4: "",
        t5: "",
        c5: "",
      };
      let i = 1;
      JSON.parse(item.rightAnswer).forEach((answer: string) => {
        data[`t${i}`] = "1";
        data[`c${i}`] = answer;
        i += 1;
      });
      JSON.parse(item.wrongAnswer).forEach((answer: string) => {
        data[`t${i}`] = "2";
        data[`c${i}`] = answer;
        i += 1;
      });
      form.setFieldsValue(data);
    };
    useEffect(() => {
      if (visible) {
        if (activeItem) {
          toFormData(activeItem);
        } else {
          form.setFieldsValue({ t1: "1", t2: "2", t3: "2", t4: "2", t5: "2" });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, visible, activeItem]);
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
