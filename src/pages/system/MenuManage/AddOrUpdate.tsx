import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "antd";

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

  return (
    <Modal
      title={["添加菜单", "添加子菜单", "编辑菜单"][action]}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
});

export default AddOrUpdate;
