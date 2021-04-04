import { List, Typography } from "antd";
import QuestionItem from "./questionItem";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const QuestionList = ({ list }: any) => {
  return (
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <QuestionItem question={item} />{" "}
        </List.Item>
      )}
    />
  );
};

export default QuestionList;
