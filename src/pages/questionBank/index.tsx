import { Card, Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import BankCard from "./BankCard";

const questionBank = () => {
  const data: Array<BankType.ItemType> = [
    {
      id: "1232",
      title: "Title 1",
      createTime: "2020-12-31",
    },
    {
      id: "1232",
      title: "Title 2",
      createTime: "2020-12-31",
    },
    {
      id: "1232",
      title: "Title 3",
      createTime: "2020-12-31",
      updateTime: "2020-12-31",
    },
    {
      id: "1232",
      title: "Title 5",
      createTime: "2020-12-31",
    },
    {
      id: "1232",
      title: "Title 4",
      createTime: "2020-12-31",
      updateTime: "2020-12-31",
    },
    {
      id: "1232",
      title: "Title 6",
      createTime: "2020-12-31",
    },
  ];

  return (
    <div>
      <Row style={{ margin: "6px 10px 0 10px", background: "#fff" }}>
        <Col span={12}>
          <Search placeholder="根据名称路径模糊搜索" enterButton />
        </Col>
      </Row>
      <Card style={{ margin: "0 10px" }}>
        <List
          grid={{
            gutter: 12,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <BankCard item={item} />
            </List.Item>
          )}
        />
        ,
      </Card>
    </div>
  );
};

export default questionBank;
