import { Button, Card, Table } from "antd";

interface RecordType {
  id: String;
  name: String;
  account: String;
  roleName: String;
}

const dataSource: Array<RecordType> = [
  {
    id: "1",
    name: "a",
    account: "123",
    roleName: "bv",
  },
  {
    id: "2",
    name: "b",
    account: "323",
    roleName: "abv",
  },
];

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "账号",
    dataIndex: "account",
    key: "account",
  },
  {
    title: "权限",
    dataIndex: "roleName",
    key: "roleName",
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
const AccountManage = () => {
  return (
    <div className="page-container">
      <Card>
        <Table rowKey="id" bordered dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default AccountManage;
