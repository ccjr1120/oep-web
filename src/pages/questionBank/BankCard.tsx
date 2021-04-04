import { Button, Card, Empty } from "antd";
import { memo } from "react";

interface PropsType {
  history: any;
  item: BankType.ItemType;
}

const BankCard = memo(({ item, history }: PropsType) => {
  return (
    <div title={item.bankName}>
      <Card
        style={{ margin: "10px" }}
        title={item.bankName}
        hoverable
        extra={
          <Button
            onClick={() => {
              history.push({ pathname: "/bankEdit/", state: { item } });
            }}
            type="text"
            size="small"
            style={{ color: "#1890ff" }}
          >
            详情
          </Button>
        }
      >
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "10px", position: "absolute", top: "-24px" }}>
            {item.updateTime
              ? "最后更新时间:" + item.updateTime
              : "创建时间:" + item.createTime}
          </div>
          <div style={{ height: "220px", paddingTop: "20px" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>当前题库没有题目</span>}
            >
              <Button
                type="primary"
                onClick={() => {
                  history.push({
                    pathname: "/bankEdit",
                    state: { item },
                  });
                }}
              >
                Create Now
              </Button>
            </Empty>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default BankCard;
