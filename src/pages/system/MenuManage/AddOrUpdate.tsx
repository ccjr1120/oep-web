import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;

export interface ChildRef {
  showModal: Function;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddOrUpdate = forwardRef<ChildRef, any>(({ action, activeMenu }, ref) => {
  useImperativeHandle(ref, () => ({
    showModal,
  }));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    menuForm
      .validateFields()
      .then((value) => {
        console.log(value);
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [menuForm] = Form.useForm();
  return (
    <Modal
      title={["添加菜单", "添加子菜单", "编辑菜单"][action]}
      visible={isModalVisible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} form={menuForm} preserve={false}>
        <Form.Item
          label="父级菜单"
          name="parent"
          initialValue="/"
          rules={[{ required: true, message: "父级菜单不能为空" }]}
        >
          <Select placeholder="选择父级菜单" optionFilterProp="children">
            <Option value="/">Root</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
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
});

export default AddOrUpdate;
