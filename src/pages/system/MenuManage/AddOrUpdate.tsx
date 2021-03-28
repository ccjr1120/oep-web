import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;

export interface ChildRef {
  showModal: Function;
}

const AddOrUpdate = forwardRef<ChildRef, any>(({ action, activeMenu }, ref) => {
  useImperativeHandle(ref, () => ({
    showModal,
  }));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      title={["添加菜单", "添加子菜单", "编辑菜单"][action]}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="父级菜单"
          name="parent"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select
            mode="multiple"
            disabled
            showArrow
            style={{ width: "100%" }}
            placeholder="请选择父级菜单"
          >
            {["管理员", "教师", "学生"].map((item, i) => {
              return (
                <Option key={i} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: "请输入菜单名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="路由地址"
          name="path"
          rules={[{ required: true, message: "请输入路由地址!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="权限列表"
          name="roleList"
          rules={[{ required: true, message: "请配置菜单权限!" }]}
        >
          <Select
            mode="multiple"
            allowClear
            showArrow
            style={{ width: "100%" }}
            placeholder="请配置菜单权限"
          >
            {["管理员", "教师", "学生"].map((item, i) => {
              return (
                <Option key={i} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddOrUpdate;
