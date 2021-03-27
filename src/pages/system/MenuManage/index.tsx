import { Button, Card, Table } from "antd";

interface RecordType {
  id: String;
  name: String;
  path: String;
  role: Array<String> | undefined;
}

const dataSource: Array<RecordType> = [
  {
    id: "1",
    name: "菜单管理",
    path: "/menuManage",
    role: [],
  },
  {
    id: "2",
    name: "菜单管理",
    path: "/menuManage",
    role: [],
  },
];

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
    width: 140,
    fixed: "right" as "right",
    render: (_: String, record: RecordType) => (
      <div>
        <Button type="text" size="small">
          编辑
        </Button>
        <Button type="text" size="small">
          删除
        </Button>
      </div>
    ),
  },
];
const MenuManage = () => {
  return (
    <div className="page-container">
      <Card>
        <Table rowKey="id" bordered dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default MenuManage;
