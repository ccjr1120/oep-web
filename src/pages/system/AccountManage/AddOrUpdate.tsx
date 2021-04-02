import { memo, useEffect, useImperativeHandle, useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import { fetchByBody } from "../../../api/api";
import { roleList } from "../../../constant";

const { Option } = Select;

export interface ChildRef {
  showModal: Function;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

interface PropsType {
  onRef?: React.RefObject<any>;
  action: number;
  activeRecord?: AcctType.RecordType;
  onHandle: Function;
}
const AddOrUpdate = memo(
  ({ onRef, action, activeRecord, onHandle }: PropsType, ref) => {
    useImperativeHandle(onRef, () => ({
      showModal,
    }));
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      userForm
        .validateFields()
        .then((value) => {
          if (action === 0) {
            fetchByBody("/admin/user/add", value).then(() => {
              message.success("添加成功");
              setIsModalVisible(false);
              onHandle();
            });
          } else {
            fetchByBody("/admin/user/update", {
              id: activeRecord?.id,
              ...value,
            }).then(() => {
              message.success("更新成功");
              setIsModalVisible(false);
              onHandle();
            });
          }
        })
        .catch(() => {});
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const [userForm] = Form.useForm();
    useEffect(() => {
      if (isModalVisible) {
        if (activeRecord) {
          userForm.setFieldsValue(activeRecord);
        }
      }
    }, [isModalVisible, activeRecord]);
    return (
      <Modal
        title={["添加账号", "编辑账号"][action]}
        visible={isModalVisible}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={userForm} preserve={false}>
          <Form.Item
            label="用户姓名"
            name="name"
            rules={[{ required: true, message: "请输入用户姓名!" }]}
          >
            <Input placeholder="请输入登录账号" allowClear />
          </Form.Item>
          <Form.Item
            label="登录账号"
            name="username"
            rules={[{ required: true, message: "请输入登录账号!" }]}
          >
            <Input placeholder="请输入登录账号" allowClear />
          </Form.Item>
          <Form.Item
            label="登录密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input type="password" placeholder="请输入用户密码" allowClear />
          </Form.Item>
          {action === 1 ? (
            ""
          ) : (
            <Form.Item
              label="重复密码"
              name="rePassowrd"
              rules={[
                {
                  required: true,
                  message: "请进行二次密码验证!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("重复密码验证不匹配!"));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="请输入登录账号" allowClear />
            </Form.Item>
          )}
          <Form.Item
            label="用户角色"
            name="roleId"
            rules={[{ required: true, message: "请选择用户角色!" }]}
          >
            <Select
              allowClear
              showArrow
              style={{ width: "100%" }}
              placeholder="请选择用户角色"
            >
              {roleList.map((item, i) => {
                return (
                  <Option key={i} value={i}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default AddOrUpdate;
