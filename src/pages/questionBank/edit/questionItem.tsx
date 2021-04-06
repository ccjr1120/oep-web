import { Descriptions } from "antd";

const QuestionItem = ({ item }: any) => {
  return (
    <Descriptions
      column={1}
      size="small"
      labelStyle={{ width: "10em", fontSize: "12px" }}
      bordered
    >
      <Descriptions.Item label="题目">{item.title}</Descriptions.Item>
      {JSON.parse(item.rightAnswer).map((answer: string, i:number) => {
        return <Descriptions.Item key={i} label="正确答案">{answer}</Descriptions.Item>;
      })}
      {JSON.parse(item.wrongAnswer).map((answer: string, i:number) => {
        return <Descriptions.Item key={i} label="错误答案">{answer}</Descriptions.Item>;
      })}
      <Descriptions.Item label="最后修改时间:">
        {item.updateTime}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default QuestionItem;
