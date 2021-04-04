import { List, Typography } from "antd";
import { time } from "node:console";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const QuestionItem = ({ question }: any) => {
  return (
    <List
      header={<div>{question.title}</div>}
      footer={<div>{question.createTime}</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export default QuestionItem;
