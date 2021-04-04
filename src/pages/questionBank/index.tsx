import { Button, Card, Col, List, Row } from "antd";
import Search from "antd/lib/input/Search";
import BankCard from "./BankCard";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { fetchByBody } from "../../api/api";
const { RangePicker } = DatePicker;

const QuestionBank = ({ history }: any) => {
  const fetch = () => {
    fetchByBody("/teacher/questionBank/list", {}).then((resp) => {
      if (resp.data) {
        setBankList(resp.data);
      }
    });
  };
  const [bankList, setBankList] = useState<Array<BankType.ItemType>>();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Row style={{ margin: "6px 10px 0 10px", background: "#fff" }}>
        <Col>
          <RangePicker />
        </Col>
        <Col span={6}>
          <Search
            style={{ marginLeft: "10px" }}
            placeholder="根据名称搜索"
            enterButton
          />
        </Col>
        <Button
          style={{ marginLeft: "40px" }}
          onClick={() => {
            history.push({ pathname: "/bankEdit/", state: {} });
          }}
          type="primary"
        >
          + 添加题库
        </Button>
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
          dataSource={bankList}
          renderItem={(item) => (
            <List.Item>
              <BankCard item={item} history={history} />
            </List.Item>
          )}
        />
        ,
      </Card>
    </div>
  );
};

export default QuestionBank;
