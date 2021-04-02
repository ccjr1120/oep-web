import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
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

const loopMenuList = (menuList: []) => {
  return menuList.map((item: MenuType.RecordType) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    );
  });
};
interface PropsType {
  action: number;
  activeMenu?: MenuType.RecordType;
  onHandle: Function;
}
const AddOrUpdate = memo(
  forwardRef<ChildRef, PropsType>(({ action, activeMenu, onHandle }, ref) => {
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
          if (action !== 2) {
            fetchByBody("/admin/menu/add", value).then((resp) => {
              message.success("添加成功");
              setIsModalVisible(false);
              onHandle();
            });
          } else {
            fetchByBody("/admin/menu/update", {
              id: activeMenu?.id,
              ...value,
            }).then((resp) => {
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
    const [menuForm] = Form.useForm();
    const [firstMenuList, setFirstMenuList] = useState<[]>([]);
    useEffect(() => {
      if (isModalVisible) {
        fetchByBody("/admin/menu/listFirstMenu").then((resp: any) => {
          setFirstMenuList(resp);
          menuForm.setFieldsValue({parentId:activeMenu?.id||'/'})
          if (action === 2) {
            if (activeMenu) {
              const formData: MenuType.RecordType = Object.assign(
                {},
                activeMenu
              );
              formData.roles = JSON.parse(formData.roles);
              formData.roles = formData.roles.map((item: any) => {
                if (!isNaN(item)) {
                  item = parseInt(item);
                }
                return item;
              });
              menuForm.setFieldsValue(formData);
            }
          }
        });
      }
    }, [isModalVisible, activeMenu, action, menuForm]);
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
            name="parentId"
            rules={[{ required: true, message: "父级菜单不能为空" }]}
          >
            <Select placeholder="选择父级菜单" optionFilterProp="children">
              <Option value="/">Root</Option>
              {loopMenuList(firstMenuList)}
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
            name="roles"
            rules={[{ required: true, message: "请配置菜单权限!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              showArrow
              style={{ width: "100%" }}
              placeholder="请配置菜单权限"
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
  })
);

export default AddOrUpdate;
