import { Table } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";

export interface AutoTableRefType {
  fetch: Function;
}

interface PropsType {
  onRef?: React.RefObject<any>;
  columns: Array<any>;
  reqFun: Function;
  condition: {};
}

const AutoTable = ({ onRef, reqFun, condition, columns }: PropsType) => {
  useImperativeHandle(onRef, () => ({
    fetch,
  }));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const fetch = (params = { current: 1, pageSize: 10 }) => {
    let values = { ...params, ...condition };
    setLoading(true);
    reqFun(values).then((data: any) => {
      if (data) {
        setLoading(false);
        setData(data.records);
        setPagination({
          ...data,
        });
      }
    });
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition]);
  const handleTableChange = (pagination: any) => {
    let { current, pageSize } = pagination;
    fetch({
      current,
      pageSize,
    });
  };
  return (
    <Table
      rowKey="id"
      bordered
      loading={loading}
      dataSource={data}
      pagination={pagination}
      columns={columns}
      onChange={handleTableChange}
      size="middle"
    />
  );
};

export default AutoTable;
