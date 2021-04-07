import { Checkbox, Radio, RadioChangeEvent, Tag } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { memo, useEffect, useState } from "react";
import { fetchByBody, fetchByParam } from "../../api/api";

const QuesItem = memo(({ item, i }: any) => {
  const radioStyle = {
    display: "block",
    marginTop: "8px",
    height: "30px",
    lineHeight: "30px",
    fontSize: "18px",
    fontWeight: 490,
  };
  const [isOk, setIsOk] = useState(false);
  const [defaultValue, setDefaultValue] = useState<Array<any>>([]);
  const handleRadio = (e: RadioChangeEvent) => {
    setIsOk(false);
    if (e.target.value) {
      setDefaultValue([e.target.value]);
      const answer = [e.target.value];
      let value = { id: item.questionId, answer };
      fetchByBody("/student/exam/saveAnswer", value).then(() => {
        setIsOk(true);
      });
    } else {
      fetchByParam("/student/exam/clearAnswer", { id: item.questionId }).then(
        () => {
          setIsOk(false);
        }
      );
    }
  };
  const handleCheck = (value: CheckboxValueType[]) => {
    setDefaultValue(value);
    setIsOk(false);
    if (value && value.length > 0) {
      fetchByBody("/student/exam/saveAnswer", {
        id: item.questionId,
        answer: value,
      }).then(() => {
        setIsOk(true);
      });
    } else {
      fetchByParam("/student/exam/clearAnswer", { id: item.questionId }).then(
        () => {
          setIsOk(false);
        }
      );
    }
  };
  useEffect(() => {
    if (item.myAnswer != null) {
      setIsOk(true);
      setDefaultValue(item.myAnswer);
    }
  }, [item]);
  return (
    <div style={{ margin: "12px 20px" }}>
      <div>
        <div>
          <Tag
            style={{
              float: "left",
              marginTop: "7px",
              visibility: isOk ? "unset" : "hidden",
            }}
            color="success"
          >
            ✔
          </Tag>
          <div
            style={{
              marginBottom: 0,
              wordWrap: "break-word",
              overflow: "hidden",
              fontSize: "22px",
              fontWeight: 500,
            }}
          >
            第{i}题：{item.question}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "12px", marginLeft: "32px" }}>
        {item.type === 1 ? (
          <Radio.Group
            value={defaultValue[0]}
            onChange={(e) => {
              handleRadio(e);
            }}
          >
            {item.answerItems.map((item: any, i: number) => {
              return (
                <Radio key={i} value={item.value} style={radioStyle}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
        ) : (
          <Checkbox.Group
            value={defaultValue}
            onChange={(e) => {
              handleCheck(e);
            }}
          >
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
