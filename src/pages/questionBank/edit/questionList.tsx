import { List, Button } from "antd";
import QuestionItem from "./questionItem";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const QuestionList = ({ list, addQuestion }: any) => {
  return (
    <List
      header={
        <div>
          题目{" "}
          <Button
            style={{ color: "#31a7ff", marginLeft: "8px" }}
            type="text"
            size="small"
            onClick={addQuestion}
          >
            + 添加新题目
          </Button>
          <span
            style={{
              float: "right",
              fontSize: "12px",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            最近一次修改:2021-12-32 12:23
          </span>
        </div>
      }
      style={{ height: "auto" }}
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
