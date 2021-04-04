import { Descriptions } from "antd";

const QuestionItem = ({ question }: any) => {
  return (
    <Descriptions
      column={1}
      size="small"
      labelStyle={{ width: "8em", fontSize: "12px" }}
      bordered
    >
      <Descriptions.Item label="题目">
        CloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloudCloud
        Database
      </Descriptions.Item>
      <Descriptions.Item label="正确答案">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="正确答案">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="错误答案">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="错误答案">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="错误答案">Cloud Database</Descriptions.Item>
    </Descriptions>
  );
};

export default QuestionItem;
