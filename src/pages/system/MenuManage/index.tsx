import { Button, Card, Col, Row, Input, message, Tag } from "antd";
import React, { useRef, useState } from "react";
import AutoTable, { AutoTableRefType } from "../../../components/AutoTable";
import AddOrUpdate, { ChildRef } from "./AddOrUpdate";
import { fetchMenuList } from "../../../api/system/menuManage";
import confirm from "antd/lib/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchByBody } from "../../../api/api";
import { roleList } from "../../../constant";

const { Search } = Input;

const MenuManage = () => {
  const dialogRef = useRef<ChildRef>(null);
  const autoTableRef = React.createRef<AutoTableRefType>();
  /**
   * 添加菜单，添加子菜单，编辑(0,1,2)
   */
  const [action, setAction] = useState(0);
  const [activeMenu, setActiveMenu] = useState<MenuType.RecordType>();
  const refreshTable = () => {
    if (autoTableRef.current) {
      autoTableRef.current.fetch();
    }
  };
  const showModal = (
    action: number,
    record: MenuType.RecordType | undefined
  ) => {
    if (dialogRef.current) {
      setActiveMenu(record);
      setAction(action);
      dialogRef.current.showModal();
    }
  };

  const [condition, setCondition] = useState({});
  const onSearch = (value: string) => {
    if (value) {
      setCondition({ queryStr: value });
    } else {
      setCondition({});
    }
  };

  const columns = [
    {
      title: "名称",
      width: 160,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "路径",
      width: 160,
      dataIndex: "path",
      key: "path",
    },
    {
      title: "权限",
      dataIndex: "role",
      key: "role",
      render: (_: String, record: MenuType.RecordType) => (
        <div>
          {JSON.parse(record.roles).map((item: number) => {
            return (
              <Tag key={item} color="cyan">
                {roleList[item]}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 200,
      fixed: "right" as "right",
      render: (_: String, record: MenuType.RecordType) => (
        <div>
          <Button
            onClick={() => {
              showModal(1, record);
            }}
            type="text"
            style={{ color: "#1890ff" }}
            size="small"
          >
            添加子菜单
          </Button>
          <Button
            onClick={() => {
              showModal(2, record);
            }}
            type="text"
            style={{ color: "#1890ff" }}
            size="small"
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              confirm({
                title: "确定要删除该菜单吗？",
                icon: <ExclamationCircleOutlined />,
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                  fetchByBody("/admin/menu/del", record).then(() => {
                    message.success("删除成功");
                    refreshTable();
                  });
                },
                onCancel() {},
              });
            }}
            type="text"
            style={{ color: "red" }}
            size="small"
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="page-container">
      <Card>
        <Row>
          <Col span={12}>
            <Search
              placeholder="根据名称路径模糊搜索"
              onSearch={onSearch}
              enterButton
            />
          </Col>
          <Col span={12}>
            <div style={{ margin: "0 0 10px 10px" }}>
              <Button
                onClick={() => {
                  showModal(0, undefined);
                }}
                type="primary"
              >
                + 添加菜单
              </Button>
            </div>
          </Col>
        </Row>
        <AutoTable
          onRef={autoTableRef}
          reqFun={fetchMenuList}
          condition={condition}
          columns={columns}
        />
      </Card>
      <AddOrUpdate
        onHandle={refreshTable}
        action={action}
        activeMenu={activeMenu}
        ref={dialogRef}
      />
    </div>
  );
};

export default MenuManage;
