import { Button, Card, Col, Row, Table, Input } from "antd";
import { useRef, useState } from "react";
import AddOrUpdate, { ChildRef } from "./AddOrUpdate";
const { Search } = Input;

interface RecordType {
  id: String;
  name: String;
  path: String;
  role: Array<String> | undefined;
  children?: Array<RecordType>;
}

const dataSource: Array<RecordType> = [
  {
    id: "01",
    name: "菜单管理",
    path: "/menuManage",
    role: [],
    children: [
      {
        id: "1",
        name: "菜单管理",
        path: "/menuManage",
        role: [],
        children: [
          {
            id: "11",
            name: "菜单管理",
            path: "/menuManage",
            role: [],
          },
          {
            id: "12",
            name: "菜单管理",
            path: "/menuManage",
            role: [],
          },
        ],
      },
      {
        id: "2",
        name: "菜单管理",
        path: "/menuManage",
        role: [],
        children: [
          {
            id: "21",
            name: "菜单管理",
            path: "/menuManage",
            role: [],
          },
          {
            id: "22",
            name: "菜单管理",
            path: "/menuManage",
            role: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "菜单管理",
    path: "/menuManage",
    role: [],
  },
];

const MenuManage = () => {
  const dialogRef = useRef<ChildRef>(null);
  /**
   * 添加菜单，添加子菜单，编辑(0,1,2)
   */
  const [action, setAction] = useState(0);
  const [activeMenu, setActiveMenu] = useState<RecordType>();
  const showModal = (action: number, record: RecordType | undefined) => {
    if (dialogRef.current) {
      setActiveMenu(record);
      setAction(action);
      dialogRef.current.showModal();
    }
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "权限",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 200,
      fixed: "right" as "right",
      render: (_: String, record: RecordType) => (
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
              showModal(2, record);
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
            <Search placeholder="根据名称路径模糊搜索" enterButton />
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
        <Table
          rowKey="id"
          bordered
          dataSource={dataSource}
          columns={columns}
          size="middle"
        />
      </Card>
      <AddOrUpdate action={action} activeMenu={activeMenu} ref={dialogRef} />
    </div>
  );
};

export default MenuManage;
