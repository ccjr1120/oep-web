import { Checkbox, Radio, Tag } from "antd";
import { memo } from "react";

const QuesItem = memo(({ item, i }: any) => {
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  return (
    <div style={{ margin: "10px 16" }}>
      <div>
        <div style={{}}>
          <Tag style={{ float: "left" }} color="green">
            ✔
          </Tag>
          <div
            style={{
              marginBottom: 0,
              wordWrap: "break-word",
              overflow: "hidden",
            }}
          >
            第{i}题：{item.question}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        {item.type === 1 ? (
          <Radio.Group>
            {item.answerItems.map((item: any, i: number) => {
              return (
                <Radio key={i} value={item.value} style={radioStyle}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        ) : (
          <Checkbox.Group>
            {item.answerItems.map((item: any, i: number) => {
              return (
                <>
                  <Checkbox key={i} value={item.value}>
                    {item.label}
                  </Checkbox>
                  <br />
                </>
              );
            })}
          </Checkbox.Group>
        )}
      </div>
    </div>
  );
});

export default QuesItem;
