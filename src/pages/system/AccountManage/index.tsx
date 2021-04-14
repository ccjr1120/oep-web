import { Button, Card, Col, message, Row, Tag } from "antd";
import Search from "antd/lib/input/Search";
import confirm from "antd/lib/modal/confirm";
import { createRef, useState } from "react";
import { fetchByBody } from "../../../api/api";
import AutoTable, { AutoTableRefType } from "../../../components/AutoTable";
import { roleList } from "../../../constant";
import AddOrUpdate, { ChildRef } from "./AddOrUpdate";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const autoTableRef = createRef<AutoTableRefType>();
const dialogRef = createRef<ChildRef>();
const refreshTable = () => {
  if (autoTableRef.current) {
    autoTableRef.current.fetch();
  }
};
const fetch = (data: any) => {
  return fetchByBody("/admin/account/list", data);
};
const AccountManage = () => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "账号",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "权限",
      dataIndex: "roleId",
      key: "roleId",
      render: (_: String, record: AcctType.RecordType) => (
        <div>
          <Tag color="cyan">{roleList[record.roleId]}</Tag>
        </div>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "240px",
    },
    // {
    //   title: "锁定状态",
    //   dataIndex: "lockFlag",
    //   key: "lockFlag",
    //   render: (_: String, record: AcctType.RecordType) => (
    //     <div>
    //       {record.lockFlag ? (
    //         <Tag color="red">锁定</Tag>
    //       ) : (
    //         <Tag color="cyan">启用</Tag>
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: "操作",
      key: "option",
      dataIndex: "role",
      width: 140,
      fixed: "right" as "right",
      render: (_: String, record: AcctType.RecordType) => (
        <div>
          <Button
            onClick={() => {
              showModal(1, record);
            }}
            style={{ color: "#1890ff" }}
            type="text"
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
                  fetchByBody("/admin/account/del", record).then(() => {
                    message.success("删除成功");
                    refreshTable();
                  });
                },
                onCancel() {},
              });
            }}
            type="text"
            size="small"
            style={{ color: "red" }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  const onSearch = (value: string) => {
    if (value) {
      setCondition({ queryStr: value });
    } else {
      setCondition({});
    }
  };
  const [condition, setCondition] = useState({});
  const [action, setAction] = useState<number>(0);
  const [activeRecord, setActiveRecord] = useState<AcctType.RecordType>();
  const showModal = (
    action: number,
    record: AcctType.RecordType | undefined
  ) => {
    if (dialogRef.current) {
      setAction(action);
      setActiveRecord(record);
      dialogRef.current.showModal();
    }
  };
  return (
    <div>
      <Card>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={12}>
            <Search
              placeholder="根据姓名或账号模糊搜索"
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
                + 添加账号
              </Button>
            </div>
          </Col>
        </Row>
        <AutoTable
          onRef={autoTableRef}
          reqFun={fetch}
          condition={condition}
          columns={columns}
        />
      </Card>
      <AddOrUpdate
        onHandle={refreshTable}
        activeRecord={activeRecord}
        action={action}
        onRef={dialogRef}
      />
    </div>
  );
};

export default AccountManage;
