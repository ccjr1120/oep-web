import { Button, Card, Table } from "antd";

interface RecordType {
  name: String;
  account: String;
  roleName: String;
}

const dataSource: Array<RecordType> = [
  {
    name: "a",
    account: "123",
    roleName: "bv",
  },
  {
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
const accountManage = () => {
  return (
    <div className="page-container">
      <Card>
        <Table bordered dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default accountManage;
